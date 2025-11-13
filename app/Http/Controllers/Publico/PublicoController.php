<?php

namespace App\Http\Controllers\Publico;

use App\Databases\Models\Avisos;
use App\Databases\Models\Comissao;
use App\Http\Controllers\Controller;
use App\Databases\Models\Eventos;
use App\Databases\Models\Ata;
use App\Databases\Models\RegimeInterno;
use App\Databases\Models\Estatuto;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Inertia\Response;
use Carbon\Carbon;
use Barryvdh\DomPDF\Facade\Pdf;
class PublicoController extends Controller
{
    /**
     * Página inicial pública com próximos eventos
     */
    public function index(): Response
    {
        $proximosEventos = Eventos::where('data', '>=', Carbon::now())
            ->orderBy('data', 'asc')
            ->orderBy('hora', 'asc')
            ->take(7)
            ->get();

        // Buscar comissão do ano atual
        $anoAtual = Carbon::now()->year;
        $comissao = Comissao::with(['integrantes.pessoa', 'integrantes.cargo'])
            ->where('ano', $anoAtual)
            ->first();
// Buscar avisos ativos que não expiraram
        $avisos = Avisos::where('ativo', true)
            ->where(function($query) {
                $query->where('data_expiração', '>=', Carbon::now())
                    ->orWhereNull('data_expiração');
            })
            ->orderBy('created_at', 'desc')
            ->get();
        // Se não existir comissão do ano atual, buscar do ano anterior
        if (!$comissao) {
            $comissao = Comissao::with(['integrantes.pessoa', 'integrantes.cargo'])
                ->where('ano', $anoAtual - 1)
                ->first();
        }

        return Inertia::render('Publico/Index', [
            'proximosEventos' => $proximosEventos,
            'comissao' => $comissao,
            'avisos' => $avisos,
        ]);
    }

    /**
     * Lista todos os eventos públicos
     */
    public function eventos(): Response
    {
        // Buscar apenas eventos futuros (a partir de hoje)
        $eventos = Eventos::whereDate('data', '>=', Carbon::today())
            ->orderBy('data', 'asc')
            ->orderBy('hora', 'asc')
            ->get();

        // Buscar comissão do ano atual
        $anoAtual = Carbon::now()->year;
        $comissao = Comissao::with(['integrantes.pessoa', 'integrantes.cargo'])
            ->where('ano', $anoAtual)
            ->first();

        if (!$comissao) {
            $comissao = Comissao::with(['integrantes.pessoa', 'integrantes.cargo'])
                ->where('ano', $anoAtual - 1)
                ->first();
        }

        return Inertia::render('Publico/Eventos', [
            'eventos' => $eventos,
            'comissao' => $comissao,
        ]);
    }

    public function antigos(): Response
    {
        // Buscar apenas eventos passados (antes de hoje)
        $eventos = Eventos::whereDate('data', '<', Carbon::today())
            ->orderBy('data', 'desc')
            ->orderBy('hora', 'desc')
            ->get();

        // Buscar comissão do ano atual
        $anoAtual = Carbon::now()->year;
        $comissao = Comissao::with(['integrantes.pessoa', 'integrantes.cargo'])
            ->where('ano', $anoAtual)
            ->first();

        if (!$comissao) {
            $comissao = Comissao::with(['integrantes.pessoa', 'integrantes.cargo'])
                ->where('ano', $anoAtual - 1)
                ->first();
        }

        return Inertia::render('Publico/EventosAntigos', [
            'eventos' => $eventos,
            'comissao' => $comissao,
        ]);
    }

    public function contas(): Response
    {
        // Buscar apenas eventos passados (antes de hoje)
        $eventos = Eventos::query()->get();

        return Inertia::render('Publico/Contas', [
            'eventos' => $eventos,
        ]);
    }

    /**
     * Detalhes de um evento específico com arquivos anexos
     */
    public function eventoDetalhes(int $id): Response
    {
        $evento = Eventos::with([
            'cargos.pessoa',
            'cargos.cargo',
            'doacoes.pessoa',
            'cardapios.ingredientes.pessoa',
            'fotos'
        ])->findOrFail($id);

        $arquivos = DB::table('arquivo')
            ->where('tabela', 'eventos')
            ->where('chave', $id)
            ->whereNull('deleted_at')
            ->get();

        // Usar comissão do ano apenas se o evento não tiver comissão própria
        $comissao = $evento->cargos->isNotEmpty()
            ? null
            : $this->buscarComissaoAno();

        return Inertia::render('Publico/EventoDetalhes', [
            'evento' => $evento,
            'arquivos' => $arquivos,
            'comissao' => $comissao,
        ]);
    }
    public function eventoDetalhesPdf(int $id)
    {
        $evento = Eventos::with([
            'cargos.pessoa',
            'cargos.cargo',
            'doacoes.pessoa',
            'cardapios.ingredientes.pessoa',
            'fotos'
        ])->findOrFail($id);

        $arquivos = DB::table('arquivo')
            ->where('tabela', 'eventos')
            ->where('chave', $id)
            ->whereNull('deleted_at')
            ->get();

        $comissao = $evento->cargos->isNotEmpty()
            ? null
            : $this->buscarComissaoAno();

        // Calcular saldo
        $saldo = $evento->valor_arrecadado - $evento->valor_gasto;

        // Calcular valor total a pagar (ingredientes sem responsável)
        $valor_a_pagar = 0;

        foreach ($evento->cardapios as $cardapio) {
            foreach ($cardapio->ingredientes as $ingrediente) {
                if (is_null($ingrediente->id_pessoa)) {
                    $valor_a_pagar += floatval($ingrediente->valor_total);
                }
            }
        }

        $pdf = Pdf::loadView('pdf.evento-detalhes', [
            'evento' => $evento,
            'arquivos' => $arquivos,
            'comissao' => $comissao,
            'saldo' => $saldo,
            'valor_a_pagar' => $valor_a_pagar,
        ]);

        $pdf->setPaper('a4', 'portrait');

        return $pdf->download('evento-' . $evento->id . '-' . ($evento->nome) . '.pdf');
    }
    private function buscarComissaoAno(): ?Comissao
    {
        $anoAtual = Carbon::now()->year;

        return Comissao::with(['integrantes.pessoa', 'integrantes.cargo'])
            ->whereIn('ano', [$anoAtual, $anoAtual - 1])
            ->orderBy('ano', 'desc')
            ->first();
    }

    /**
     * Lista todas as atas públicas com arquivos
     */
    public function atas(): Response
    {
        $atas = Ata::query()->with('arquivo')->orderBy('created_at', 'asc')->get();

        return Inertia::render('Publico/Atas', [
            'atas' => $atas
        ]);
    }

    /**
     * Detalhes de uma ata específica com arquivos
     */
    public function ataDetalhes(int $id): Response
    {
        $ata = Ata::findOrFail($id);

        // Buscar arquivos anexos à ata
        $arquivos = DB::table('arquivo')
            ->where('tabela', 'ata')
            ->where('chave', $id)
            ->whereNull('deleted_at')
            ->get();

        return Inertia::render('Publico/AtaDetalhes', [
            'ata' => $ata,
            'arquivos' => $arquivos
        ]);
    }

    /**
     * Lista todos os regimes internos
     */
    public function regimesInternos(): Response
    {
        $regimesInternos =  RegimeInterno::query()->with('arquivo')->orderBy('created_at', 'asc')->get();

        return Inertia::render('Publico/RegimesInternos', [
            'regimesInternos' => $regimesInternos
        ]);
    }

    /**
     * Detalhes de um regime interno específico com arquivos
     */
    public function regimeInternoDetalhes(int $id): Response
    {
        $regimeInterno = RegimeInterno::findOrFail($id);

        // Buscar arquivos anexos ao regime interno
        $arquivos = DB::table('arquivo')
            ->where('tabela', 'regime_interno')
            ->where('chave', $id)
            ->whereNull('deleted_at')
            ->get();

        return Inertia::render('Publico/RegimeInternoDetalhes', [
            'regimeInterno' => $regimeInterno,
            'arquivos' => $arquivos
        ]);
    }

    /**
     * Lista todos os estatutos
     */
    public function estatutos(): Response
    {
        $estatutos = Estatuto::query()->with('arquivo')->orderBy('created_at', 'asc')->get();

        // Buscar quantidade de arquivos para cada estatuto
        $estatutos->each(function($estatuto) {
            $estatuto->total_arquivos = DB::table('arquivo')
                ->where('tabela', 'estatuto')
                ->where('chave', $estatuto->id)
                ->whereNull('deleted_at')
                ->count();
        });

        return Inertia::render('Publico/Estatutos', [
            'estatutos' => $estatutos
        ]);
    }

    /**
     * Detalhes de um estatuto específico com arquivos
     */
    public function estatutoDetalhes(int $id): Response
    {
        $estatuto = Estatuto::findOrFail($id);

        // Buscar arquivos anexos ao estatuto
        $arquivos = DB::table('arquivo')
            ->where('tabela', 'estatuto')
            ->where('chave', $id)
            ->whereNull('deleted_at')
            ->get();

        return Inertia::render('Publico/EstatutoDetalhes', [
            'estatuto' => $estatuto,
            'arquivos' => $arquivos
        ]);
    }

    /**
     * Página sobre a paróquia
     */
    public function sobre(): Response
    {
        return Inertia::render('Publico/Sobre');
    }

    /**
     * Download de arquivo anexo
     */
    public function downloadArquivo(int $id)
    {
        $arquivo = DB::table('arquivo')
            ->where('id', $id)
            ->whereNull('deleted_at')
            ->first();

        if (!$arquivo) {
            abort(404, 'Arquivo não encontrado');
        }

        $caminho = storage_path('app/public/' . $arquivo->hash);

        if (!file_exists($caminho)) {
            abort(404, 'Arquivo não encontrado no servidor');
        }

        return response()->download($caminho, $arquivo->titulo ?: 'arquivo');
    }

    /**
     * Lista todos os avisos públicos
     */
    public function avisos(): Response
    {
        $avisos = Avisos::where('ativo', true)
            ->where(function($query) {
                $query->where('data_expiração', '>=', Carbon::now())
                    ->orWhereNull('data_expiração');
            })
            ->orderBy('created_at', 'desc')
            ->get();

        return Inertia::render('Publico/Avisos', [
            'avisos' => $avisos
        ]);
    }

    /**
     * Página da comissão atual
     */
    public function comissao(): Response
    {
        $anoAtual = Carbon::now()->year;
        $comissao = Comissao::with(['integrantes.pessoa', 'integrantes.cargo'])
            ->where('ano', $anoAtual)
            ->first();

        // Se não existir comissão do ano atual, buscar do ano anterior
        if (!$comissao) {
            $comissao = Comissao::with(['integrantes.pessoa', 'integrantes.cargo'])
                ->where('ano', $anoAtual - 1)
                ->first();
        }

        return Inertia::render('Publico/Comissao', [
            'comissao' => $comissao
        ]);
    }

    /**
     * Galeria com todas as fotos dos eventos
     */
    public function fotos(): Response
    {
        // Buscar todos os eventos com fotos
        $eventos = Eventos::with('fotos')
            ->whereHas('fotos')
            ->orderBy('data', 'desc')
            ->get();

        // Contar total de fotos
        $totalFotos = 0;
        foreach ($eventos as $evento) {
            $totalFotos += $evento->fotos->count();
        }

        return Inertia::render('Publico/Fotos', [
            'eventos' => $eventos,
            'totalFotos' => $totalFotos
        ]);
    }
}
