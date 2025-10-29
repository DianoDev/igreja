<?php

namespace App\Http\Controllers\Publico;

use App\Http\Controllers\Controller;
use App\Databases\Models\Eventos;
use App\Databases\Models\Ata;
use App\Databases\Models\RegimeInterno;
use App\Databases\Models\Estatuto;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Inertia\Response;
use Carbon\Carbon;

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
            ->take(5)
            ->get();

        return Inertia::render('Publico/Index', [
            'proximosEventos' => $proximosEventos
        ]);
    }

    /**
     * Lista todos os eventos públicos
     */
    public function eventos(): Response
    {
        $eventos = Eventos::orderBy('data', 'desc')
            ->orderBy('hora', 'desc')
            ->get();

        return Inertia::render('Publico/Eventos', [
            'eventos' => $eventos
        ]);
    }

    /**
     * Detalhes de um evento específico com arquivos anexos
     */
    public function eventoDetalhes(int $id): Response
    {
        // Carregar evento com todos os relacionamentos
        $evento = Eventos::with([
            'cargos.pessoa',
            'cargos.cargo',
            'doacoes.pessoa',
            'cardapios.cardapio',
            'fotos'
        ])->findOrFail($id);

        // Buscar arquivos anexos ao evento (documentos, não fotos da galeria)
        $arquivos = DB::table('arquivo')
            ->where('tabela', 'eventos')
            ->where('chave', $id)
            ->whereNull('deleted_at')
            ->get();

        return Inertia::render('Publico/EventoDetalhes', [
            'evento' => $evento,
            'arquivos' => $arquivos
        ]);
    }

    /**
     * Lista todas as atas públicas com arquivos
     */
    public function atas(): Response
    {
        $atas = Ata::orderBy('created_at', 'desc')->get();

        // Buscar quantidade de arquivos para cada ata
        $atas->each(function($ata) {
            $ata->total_arquivos = DB::table('arquivo')
                ->where('tabela', 'ata')
                ->where('chave', $ata->id)
                ->whereNull('deleted_at')
                ->count();
        });

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
        $regimesInternos = RegimeInterno::orderBy('created_at', 'desc')->get();

        // Buscar quantidade de arquivos para cada regime
        $regimesInternos->each(function($regime) {
            $regime->total_arquivos = DB::table('arquivo')
                ->where('tabela', 'regime_interno')
                ->where('chave', $regime->id)
                ->whereNull('deleted_at')
                ->count();
        });

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
        $estatutos = Estatuto::orderBy('created_at', 'desc')->get();

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
}
