<?php
namespace App\Databases\Repositories;

use App\Databases\Contracts\AvisosContract;
use App\Databases\Models\Avisos;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Support\Facades\DB;
use Exception;

class AvisosRepository implements AvisosContract
{
    public function __construct(private Avisos $avisos)
    {
    }

    public function getById(int $id): Model
    {
        return Avisos::query()
            ->where('id', '=', $id)
            ->firstOrFail();
    }

    public function getAll(): Collection
    {
        return Avisos::query()->get();
    }

    public function paginate(array $pagination = [], array $columns = ['*']): LengthAwarePaginator
    {
        $query = Avisos::query();

        if (isset($pagination['nome'])) {
            $keyword = mb_strtolower($pagination['nome']);
            $query->whereRaw('lower(nome) like ?', ["%{$keyword}%"]);
        }
        if (isset($pagination['descricao'])) {
            $keyword = mb_strtolower($pagination['descricao']);
            $query->whereRaw('lower(descricao) like ?', ["%{$keyword}%"]);
        }
        if (isset($pagination['data_expiração'])) {
            $keyword = mb_strtolower($pagination['data_expiração']);
            $query->whereRaw('lower(data_expiração) like ?', ["%{$keyword}%"]);
        }
        if (isset($pagination['ativo'])) {
            $keyword = mb_strtolower($pagination['ativo']);
            $query->whereRaw('lower(ativo) like ?', ["%{$keyword}%"]);
        }

        $query->orderBy($pagination['sort'] ?? 'nome', $pagination['sort_direction'] ?? 'asc');
        return $query->paginate($pagination['per_page'] ?? 10, $columns, 'page', $pagination['current_page'] ?? 1);
    }

    public function create(array $params, bool $autoCommit = true): bool
    {
        $autoCommit && DB::beginTransaction();
        try {
            $avisos = new Avisos([
                'nome' => $params['nome'],
                'descricao' => $params['descricao'],
                'data_expiração' => $params['data_expiração'],
                'ativo' => $params['ativo']
            ]);
            $avisos->save();

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
            $avisos = $this->getById($id);
            $avisos->update($params);

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
            $avisos = $this->getById($id);
            $avisos->delete();
            $autoCommit && DB::commit();
        } catch (Exception $ex) {
            $autoCommit && DB::rollBack();
            throw new Exception($ex->getMessage());
        }

        return true;
    }
}
