<?php
namespace App\Databases\Repositories;

use App\Databases\Contracts\CargoEventoContract;
use App\Databases\Models\CargoEvento;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;
use Exception;

class CargoEventoRepository implements CargoEventoContract
{
    public function __construct(private CargoEvento $cargoEvento)
    {
    }

    public function getById(int $id): Model
    {
        return CargoEvento::query()
            ->with(['pessoa', 'cargo', 'evento'])
            ->where('id', '=', $id)
            ->firstOrFail();
    }

    public function getAll(): Collection
    {
        return CargoEvento::query()
            ->with(['pessoa', 'cargo', 'evento'])
            ->get();
    }

    public function getByEvento(int $idEvento): Collection
    {
        return CargoEvento::query()
            ->with(['pessoa', 'cargo'])
            ->where('id_evento', $idEvento)
            ->get();
    }

    public function create(array $params, bool $autoCommit = true): bool
    {
        $autoCommit && DB::beginTransaction();
        try {
            $cargoEvento = new CargoEvento([
                'id_evento' => $params['id_evento'],
                'id_pessoa' => $params['id_pessoa'],
                'id_cargo' => $params['id_cargo']
            ]);
            $cargoEvento->save();

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
            $cargoEvento = $this->getById($id);
            $cargoEvento->update($params);

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
            $cargoEvento = $this->getById($id);
            $cargoEvento->delete();
            $autoCommit && DB::commit();
        } catch (Exception $ex) {
            $autoCommit && DB::rollBack();
            throw new Exception($ex->getMessage());
        }

        return true;
    }
}
