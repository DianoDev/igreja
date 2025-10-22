<?php
namespace App\Databases\Repositories;

use App\Databases\Contracts\EventosContract;
use App\Databases\Models\Eventos;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Support\Facades\DB;
use Exception;

class EventosRepository implements EventosContract
{
    public function __construct(private Eventos $eventos)
    {
    }

    public function getById(int $id): Model
    {
        return Eventos::query()
            ->where('id', '=', $id)
            ->firstOrFail();
    }

    public function getAll(): Collection
    {
        return Eventos::query()->get();
    }

    public function paginate(array $pagination = [], array $columns = ['*']): LengthAwarePaginator
    {
        $query = Eventos::query();

        if (isset($pagination['nome'])) {
            $keyword = mb_strtolower($pagination['nome']);
            $query->whereRaw('lower(nome) like ?', ["%{$keyword}%"]);
        }
        if (isset($pagination['data'])) {
            $keyword = mb_strtolower($pagination['data']);
            $query->whereRaw('lower(data) like ?', ["%{$keyword}%"]);
        }
        if (isset($pagination['hora'])) {
            $keyword = mb_strtolower($pagination['hora']);
            $query->whereRaw('lower(hora) like ?', ["%{$keyword}%"]);
        }

        $query->orderBy($pagination['sort'] ?? 'nome', $pagination['sort_direction'] ?? 'asc');
        return $query->paginate($pagination['per_page'] ?? 10, $columns, 'page', $pagination['current_page'] ?? 1);
    }

    public function create(array $params, bool $autoCommit = true): bool
    {
        $autoCommit && DB::beginTransaction();
        try {
            $eventos = new Eventos([
                'nome' => $params['nome'],
                'data' => $params['data'],
                'hora' => $params['hora'],
                'valor_gasto' => 0,
                'valor_arrecadado' => 0
            ]);
            $eventos->save();

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
            $eventos = $this->getById($id);
            $eventos->update($params);

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
            $eventos = $this->getById($id);
            $eventos->delete();
            $autoCommit && DB::commit();
        } catch (Exception $ex) {
            $autoCommit && DB::rollBack();
            throw new Exception($ex->getMessage());
        }

        return true;
    }

    public function updateValorGasto(int $id, float $valor): bool
    {
        try {
            $eventos = $this->getById($id);
            $eventos->update(['valor_gasto' => $valor]);
            return true;
        } catch (Exception $ex) {
            throw new Exception($ex);
        }
    }

    public function updateValorArrecadado(int $id, float $valor): bool
    {
        try {
            $eventos = $this->getById($id);
            $eventos->update(['valor_arrecadado' => $valor]);
            return true;
        } catch (Exception $ex) {
            throw new Exception($ex);
        }
    }
}
