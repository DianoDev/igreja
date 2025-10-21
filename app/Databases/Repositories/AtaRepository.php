<?php
namespace App\Databases\Repositories;

use App\Databases\Contracts\AtaContract;
use App\Databases\Models\Ata;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Support\Facades\DB;
use Exception;

class AtaRepository implements AtaContract
{
    public function __construct(private Ata $ata)
    {
    }

    public function getById(int $id): Model
    {
        return Ata::query()
            ->where('id', '=', $id)
            ->firstOrFail();
    }

    public function getAll(): Collection
    {
        return Ata::query()->get();
    }

    public function paginate(array $pagination = [], array $columns = ['*']): LengthAwarePaginator
    {
        $query = Ata::query();

        if (isset($pagination['nome'])) {
            $keyword = mb_strtolower($pagination['nome']);
            $query->whereRaw('lower(nome) like ?', ["%{$keyword}%"]);
        }
        if (isset($pagination['descricao'])) {
            $keyword = mb_strtolower($pagination['descricao']);
            $query->whereRaw('lower(descricao) like ?', ["%{$keyword}%"]);
        }

        $query->orderBy($pagination['sort'] ?? 'nome', $pagination['sort_direction'] ?? 'asc');
        return $query->paginate($pagination['per_page'] ?? 10, $columns, 'page', $pagination['current_page'] ?? 1);
    }

    public function create(array $params, bool $autoCommit = true): bool
    {
        $autoCommit && DB::beginTransaction();
        try {
            $ata = new Ata([
                'nome' => $params['nome'],
                'descricao' => $params['descricao']
            ]);
            $ata->save();

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
            $ata = $this->getById($id);
            $ata->update($params);

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
            $ata = $this->getById($id);
            $ata->delete();
            $autoCommit && DB::commit();
        } catch (Exception $ex) {
            $autoCommit && DB::rollBack();
            throw new Exception($ex->getMessage());
        }

        return true;
    }
}
