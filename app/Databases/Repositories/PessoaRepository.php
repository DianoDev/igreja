<?php
namespace App\Databases\Repositories;

use App\Databases\Contracts\PessoaContract;
use App\Databases\Models\Pessoa;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Support\Facades\DB;
use Exception;

class PessoaRepository implements PessoaContract
{
    public function __construct(private Pessoa $pessoa)
    {
    }

    public function getById(int $id): Model
    {
        return Pessoa::query()
            ->where('id', '=', $id)
            ->firstOrFail();
    }

    public function getAll(): Collection
    {
        return Pessoa::query()->get();
    }

    public function paginate(array $pagination = [], array $columns = ['*']): LengthAwarePaginator
    {
        $query = Pessoa::query();

        if (isset($pagination['nome'])) {
            $keyword = mb_strtolower($pagination['nome']);
            $query->whereRaw('lower(nome) like ?', ["%{$keyword}%"]);
        }
        if (isset($pagination['cpf'])) {
            $keyword = mb_strtolower($pagination['cpf']);
            $query->whereRaw('lower(cpf) like ?', ["%{$keyword}%"]);
        }
        if (isset($pagination['telefone'])) {
            $keyword = mb_strtolower($pagination['telefone']);
            $query->whereRaw('lower(telefone) like ?', ["%{$keyword}%"]);
        }

        $query->orderBy($pagination['sort'] ?? 'nome', $pagination['sort_direction'] ?? 'asc');
        return $query->paginate($pagination['per_page'] ?? 10, $columns, 'page', $pagination['current_page'] ?? 1);
    }

    public function create(array $params, bool $autoCommit = true): bool
    {
        $autoCommit && DB::beginTransaction();
        try {
            $pessoa = new Pessoa([
                'nome' => $params['nome'],
                'cpf' => $params['cpf'],
                'telefone' => $params['telefone']
            ]);
            $pessoa->save();

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
            $pessoa = $this->getById($id);
            $pessoa->update($params);

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
            $pessoa = $this->getById($id);
            $pessoa->delete();
            $autoCommit && DB::commit();
        } catch (Exception $ex) {
            $autoCommit && DB::rollBack();
            throw new Exception($ex->getMessage());
        }

        return true;
    }
}
