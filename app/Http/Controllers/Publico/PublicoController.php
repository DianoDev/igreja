<?php

namespace App\Http\Controllers\Publico;

use App\Http\Controllers\Controller;
use App\Databases\Models\Eventos;
use App\Databases\Models\Ata;
use App\Databases\Models\RegimeInterno;
use App\Databases\Models\Estatuto;
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
            ->take(10)
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
     * Detalhes de um evento específico
     */
    public function eventoDetalhes(int $id): Response
    {
        $evento = Eventos::with(['cargos.pessoa', 'doacoes.pessoa', 'cardapios.cardapio'])
            ->findOrFail($id);

        return Inertia::render('Publico/EventoDetalhes', [
            'evento' => $evento
        ]);
    }

    /**
     * Lista todas as atas públicas
     */
    public function atas(): Response
    {
        $atas = Ata::orderBy('created_at', 'desc')->get();

        return Inertia::render('Publico/Atas', [
            'atas' => $atas
        ]);
    }

    /**
     * Detalhes de uma ata específica
     */
    public function ataDetalhes(int $id): Response
    {
        $ata = Ata::findOrFail($id);

        return Inertia::render('Publico/AtaDetalhes', [
            'ata' => $ata
        ]);
    }

    /**
     * Lista todos os regimes internos
     */
    public function regimesInternos(): Response
    {
        $regimesInternos = RegimeInterno::orderBy('created_at', 'desc')->get();

        return Inertia::render('Publico/RegimesInternos', [
            'regimesInternos' => $regimesInternos
        ]);
    }

    /**
     * Detalhes de um regime interno específico
     */
    public function regimeInternoDetalhes(int $id): Response
    {
        $regimeInterno = RegimeInterno::findOrFail($id);

        return Inertia::render('Publico/RegimeInternoDetalhes', [
            'regimeInterno' => $regimeInterno
        ]);
    }

    /**
     * Lista todos os estatutos
     */
    public function estatutos(): Response
    {
        $estatutos = Estatuto::orderBy('created_at', 'desc')->get();

        return Inertia::render('Publico/Estatutos', [
            'estatutos' => $estatutos
        ]);
    }

    /**
     * Detalhes de um estatuto específico
     */
    public function estatutoDetalhes(int $id): Response
    {
        $estatuto = Estatuto::findOrFail($id);

        return Inertia::render('Publico/EstatutoDetalhes', [
            'estatuto' => $estatuto
        ]);
    }

    /**
     * Página sobre a paróquia
     */
    public function sobre(): Response
    {
        return Inertia::render('Publico/Sobre');
    }
}
