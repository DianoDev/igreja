<?php
namespace App\Databases\Repositories;

use App\Databases\Contracts\AtaContract;
use App\Databases\Models\Arquivo;
use App\Databases\Models\Ata;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Exception;
use Illuminate\Support\Str;

class AtaRepository implements AtaContract
{
    public function __construct(private Ata $ata)
    {
    }

    public function getById(int $id): Model
    {
        return Ata::query()
            ->where('id', '=', $id)
            ->with('arquivo')
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
            if (isset($params['arquivo'])) {
                $this->uploadArquivo($params, $ata->id);
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
    private function uploadArquivo(array $params, int $ataId): void
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
            'tabela' => 'ata',
            'chave' => $ataId,
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
            $ata = $this->getById($id);

            // Verificar se deve excluir arquivo existente
            if (isset($params['remover_arquivo']) && $params['remover_arquivo'] == true) {
                $this->excluirArquivo($id);
            }

            // Upload de arquivo se existir (antes de fazer unset)
            if (isset($params['arquivo'])) {
                // Remove arquivo antigo antes de fazer upload do novo
                $this->excluirArquivo($id);
                $this->uploadArquivo($params, $id);
            }

            // Remove parâmetros que não devem ser atualizados na tabela ata
            unset($params['titulo_arquivo']);
            unset($params['arquivo']);
            unset($params['remover_arquivo']);

            // Atualiza apenas os campos da ata
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

            // Excluir arquivo físico e registro antes de deletar a ata
            $this->excluirArquivo($id, true);

            $ata->delete();
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
    private function excluirArquivo(int $ataId, bool $excluirFisicamente = false): void
    {
        // Buscar arquivos associados
        $arquivo = Arquivo::where('tabela', 'ata')
            ->where('chave', $ataId)
            ->whereNull('deleted_at')
            ->first();

        if ($arquivo) {
            // Se deve excluir fisicamente, remove o arquivo do storage
            if ($excluirFisicamente && $arquivo->hash) {
                Storage::disk('public')->delete($arquivo->hash);
            }

            $arquivo->delete();
        }
    }
}
