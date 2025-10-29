<?php
namespace App\Databases\Repositories;

use App\Databases\Contracts\DoacaoEventoContract;
use App\Databases\Contracts\EventosContract;
use App\Databases\Models\DoacaoEvento;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;
use Exception;

class DoacaoEventoRepository implements DoacaoEventoContract
{
    public function __construct(
        private DoacaoEvento $doacaoEvento,
        private EventosContract $eventosRepository
    ) {
    }

    public function getById(int $id): Model
    {
        return DoacaoEvento::query()
            ->with(['pessoa', 'evento'])
            ->where('id', '=', $id)
            ->firstOrFail();
    }

    public function getAll(): Collection
    {
        return DoacaoEvento::query()
            ->with(['pessoa', 'evento'])
            ->get();
    }

    public function getByEvento(int $idEvento): Collection
    {
        return DoacaoEvento::query()
            ->with(['pessoa'])
            ->where('id_evento', $idEvento)
            ->get();
    }

    public function create(array $params, bool $autoCommit = true): bool
    {
        $autoCommit && DB::beginTransaction();
        try {
            $doacaoEvento = new DoacaoEvento([
                'id_pessoa' => $params['id_pessoa'],
                'id_evento' => $params['id_evento'],
                'valor' => $params['valor']
            ]);
            $doacaoEvento->save();

            // Atualiza o valor_arrecadado do evento
            $this->atualizarValorArrecadado($params['id_evento']);

            $autoCommit && DB::commit();
            return true;
        } catch (Exception $ex) {
            $autoCommit && DB::rollBack();
            throw new Exception($ex);
        }
    }

    public function update(int $id, array $params, bool $autoCommit = true): bool
    {
        $autoCommit && DB::beginTransaction();
        try {
            $doacaoEvento = $this->getById($id);
            $idEvento = $doacaoEvento->id_evento;
            $doacaoEvento->update($params);

            // Atualiza o valor_arrecadado do evento
            $this->atualizarValorArrecadado($idEvento);

            $autoCommit && DB::commit();
            return true;
        } catch (Exception $ex) {
            $autoCommit && DB::rollBack();
            throw new Exception($ex);
        }
    }

    public function destroy(int $id, bool $autoCommit = true): bool
    {
        $autoCommit && DB::beginTransaction();
        try {
            $doacaoEvento = $this->getById($id);
            $idEvento = $doacaoEvento->id_evento;
            $doacaoEvento->delete();

            // Atualiza o valor_arrecadado do evento
            $this->atualizarValorArrecadado($idEvento);

            $autoCommit && DB::commit();
        } catch (Exception $ex) {
            $autoCommit && DB::rollBack();
            throw new Exception($ex->getMessage());
        }

        return true;
    }

    /**
     * Atualiza o valor_arrecadado do evento com base na soma das doações
     */
    private function atualizarValorArrecadado(int $idEvento): void
    {
        $valorTotal = DoacaoEvento::query()
            ->where('id_evento', $idEvento)
            ->sum('valor');

        $this->eventosRepository->updateValorArrecadado($idEvento, $valorTotal);
    }
}
