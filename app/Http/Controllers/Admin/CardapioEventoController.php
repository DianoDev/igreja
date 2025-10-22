<?php
namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use App\Databases\Contracts\CardapioContract;
use App\Databases\Contracts\CardapioEventoContract;

class CardapioEventoController extends Controller
{
    public function __construct(
        private readonly CardapioContract $cardapioRepository,
        private readonly CardapioEventoContract $cardapioEventoRepository
    ) {
    }

    public function edit(int $idEvento): JsonResponse
    {
        // Lista todos os cardápios disponíveis
        $cardapios = $this->cardapioRepository->getAll();

        // Lista os cardápios já selecionados para este evento
        $cardapiosSelecionados = $this->cardapioEventoRepository->getByEvento($idEvento);
        $idsSelecionados = $cardapiosSelecionados->pluck('id_cardapio')->toArray();

        // Calcula o valor total do evento
        $valorTotal = $this->cardapioEventoRepository->getValorTotalEvento($idEvento);

        return response()->json([
            'cardapios' => $cardapios,
            'selecionados' => $idsSelecionados,
            'valor_total' => $valorTotal,
            'id_evento' => $idEvento
        ]);
    }

    public function salvar(Request $request, int $idEvento): JsonResponse
    {
        $request->validate([
            'cardapios' => 'required|array',
            'cardapios.*' => 'integer|exists:cardapio,id'
        ]);

        $this->cardapioEventoRepository->syncCardapios($idEvento, $request->cardapios);

        $valorTotal = $this->cardapioEventoRepository->getValorTotalEvento($idEvento);

        return response()->json([
            'success' => true,
            'message' => 'Cardápios do evento atualizados com sucesso!',
            'valor_total' => $valorTotal
        ]);
    }
}
