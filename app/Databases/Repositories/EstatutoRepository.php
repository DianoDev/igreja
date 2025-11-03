<?php
namespace App\Databases\Repositories;

use App\Databases\Contracts\EstatutoContract;
use App\Databases\Models\Arquivo;
use App\Databases\Models\Estatuto;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Support\Facades\DB;
use Exception;
use Illuminate\Support\Str;

class EstatutoRepository implements EstatutoContract
{
    public function __construct(private Estatuto $estatuto)
    {
    }

    public function getById(int $id): Model
    {
        return Estatuto::query()
            ->where('id', '=', $id)
            ->with('arquivo')
            ->firstOrFail();
    }

    public function getAll(): Collection
    {
        return Estatuto::query()->get();
    }

    public function paginate(array $pagination = [], array $columns = ['*']): LengthAwarePaginator
    {
        $query = Estatuto::query();

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
            $estatuto = new Estatuto([
                'nome' => $params['nome'],
                'descricao' => $params['descricao']
            ]);
            $estatuto->save();

            if (isset($params['arquivo'])) {
                $this->uploadArquivo($params, $estatuto->id);
            }

            $autoCommit && DB::commit();
            return true;
        } catch (Exception $ex) {
            $autoCommit && DB::rollBack();
            throw new Exception($ex);
        }
    }

    /**
     * Realiza upload do arquivo e salva no banco
     */
    private function uploadArquivo(array $params, int $estatutoId): void
    {
        $hash = Str::uuid();
        $name = $params['arquivo']->getClientOriginalName();
        $mime = $params['arquivo']->getClientMimeType();
        $size = $params['arquivo']->getSize();
        $extension = $params['arquivo']->getClientOriginalExtension();
        $destino = sprintf("uploads/%s", date("Y/m/d"));
        $filename = sprintf("%s.%s", $hash, strtolower($extension));

        // CORREÇÃO: Especificar explicitamente o disco 'public'
        $params['arquivo']->storeAs($destino, $filename, 'public');

        $arquivo = new Arquivo([
            'tabela' => 'estatuto',
            'chave' => $estatutoId,
            'titulo' => $params['titulo_arquivo'] ?? $name,
            'nome' => $name,
            'tamanho' => $size,
            'content_type' => $mime,
            'hash' => "{$destino}/{$filename}",
        ]);
        $arquivo->save();
    }

    public function update(int $id, array $params, bool $autoCommit = true): bool
    {
        $autoCommit && DB::beginTransaction();
        try {
            $estatuto = $this->getById($id);

            // Verificar se deve excluir arquivo existente
            if (isset($params['remover_arquivo']) && $params['remover_arquivo'] == true) {
                $this->excluirArquivo($id);
                unset($params['remover_arquivo']);
            }

            // Upload de arquivo se existir
            if (isset($params['arquivo'])) {
                $this->uploadArquivo($params, $id);
                unset($params['titulo_arquivo']);
                unset($params['arquivo']);
            }

            $estatuto->update($params);

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
            $estatuto = $this->getById($id);
            $estatuto->delete();
            $autoCommit && DB::commit();
        } catch (Exception $ex) {
            $autoCommit && DB::rollBack();
            throw new Exception($ex->getMessage());
        }

        return true;
    }

    /**
     * Exclui arquivo(s) associado(s) ao registro
     */
    private function excluirArquivo(int $estatutoId): void
    {
        // Buscar arquivos associados
        $arquivo = Arquivo::where('tabela', 'estatuto')
            ->where('chave', $estatutoId)
            ->whereNull('deleted_at')
            ->first();

        if ($arquivo) {
            $arquivo->delete();
        }
    }
}
