<?php
namespace App\Databases\Repositories;

use App\Databases\Contracts\CardapioEventoContract;
use App\Databases\Contracts\EventosContract;
use App\Databases\Models\CardapioEvento;
use App\Databases\Models\Cardapio;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Support\Facades\DB;
use Exception;

class CardapioEventoRepository implements CardapioEventoContract
{
    public function __construct(
        private CardapioEvento $cardapioEvento,
        private EventosContract $eventosRepository
    ) {
    }

    public function getByEvento(int $idEvento): Collection
    {
        return CardapioEvento::query()
            ->with('cardapio')
            ->where('id_evento', $idEvento)
            ->get();
    }

    public function syncCardapios(int $idEvento, array $cardapioIds): bool
    {
        DB::beginTransaction();
        try {
            // Remove todos os cardápios anteriores do evento
            CardapioEvento::where('id_evento', $idEvento)->delete();

            // Adiciona os novos cardápios
            foreach ($cardapioIds as $cardapioId) {
                CardapioEvento::create([
                    'id_evento' => $idEvento,
                    'id_cardapio' => $cardapioId
                ]);
            }

            // Atualiza o valor_gasto do evento
            $valorTotal = $this->getValorTotalEvento($idEvento);
            $this->eventosRepository->updateValorGasto($idEvento, $valorTotal);

            DB::commit();
            return true;
        } catch (Exception $ex) {
            DB::rollBack();
            throw new Exception($ex);
        }
    }

    public function getValorTotalEvento(int $idEvento): float
    {
        $cardapiosEvento = CardapioEvento::query()
            ->where('id_evento', $idEvento)
            ->pluck('id_cardapio');

        if ($cardapiosEvento->isEmpty()) {
            return 0.0;
        }

        return Cardapio::query()
            ->whereIn('id', $cardapiosEvento)
            ->sum('valor_total');
    }
}
