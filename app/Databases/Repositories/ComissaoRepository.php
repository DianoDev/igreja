<?php
namespace App\Databases\Repositories;

use App\Databases\Contracts\ComissaoContract;
use App\Databases\Models\Comissao;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Support\Facades\DB;
use Exception;

class ComissaoRepository implements ComissaoContract
{
    public function __construct(private Comissao $comissao)
    {
    }

    public function getById(int $id): Model
    {
        return Comissao::query()
            ->with(['integrantes.pessoa', 'integrantes.cargo'])
            ->where('id', '=', $id)
            ->firstOrFail();
    }

    public function getAll(): Collection
    {
        return Comissao::query()
            ->with(['integrantes.pessoa', 'integrantes.cargo'])
            ->get();
    }

    public function paginate(array $pagination = [], array $columns = ['*']): LengthAwarePaginator
    {
        $query = Comissao::query()->with(['integrantes.pessoa', 'integrantes.cargo']);

        if (isset($pagination['nome'])) {
            $keyword = mb_strtolower($pagination['nome']);
            $query->whereRaw('lower(nome) like ?', ["%{$keyword}%"]);
        }

        if (isset($pagination['ano'])) {
            $query->where('ano', '=', $pagination['ano']);
        }

        $query->orderBy($pagination['sort'] ?? 'ano', $pagination['sort_direction'] ?? 'desc');
        return $query->paginate($pagination['per_page'] ?? 10, $columns, 'page', $pagination['current_page'] ?? 1);
    }

    public function create(array $params, bool $autoCommit = true): bool
    {
        $autoCommit && DB::beginTransaction();
        try {
            $comissao = new Comissao([
                'nome' => $params['nome'],
                'ano' => $params['ano']
            ]);
            $comissao->save();

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
            $comissao = $this->getById($id);
            $comissao->update($params);

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
            $comissao = $this->getById($id);
            $comissao->delete();
            $autoCommit && DB::commit();
        } catch (Exception $ex) {
            $autoCommit && DB::rollBack();
            throw new Exception($ex->getMessage());
        }

        return true;
    }
}
