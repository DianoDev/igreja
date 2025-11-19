<?php

namespace App\Databases\Repositories;

use App\Databases\Contracts\GrupoEventoContract;
use App\Databases\Models\GrupoEvento;
use App\Databases\Models\PessoaGrupoEvento;
use App\Databases\Models\Grupo;
use App\Databases\Models\PessoaGrupo;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Support\Facades\DB;
use Exception;

class GrupoEventoRepository implements GrupoEventoContract
{
    public function getById(int $id)
    {
        return GrupoEvento::with(['pessoas.pessoa'])->findOrFail($id);
    }

    public function getByEvento(int $idEvento)
    {
        return GrupoEvento::with(['pessoas.pessoa'])
            ->where('id_evento', $idEvento)
            ->get();
    }

    public function paginate(array $pagination = [], array $columns = ['*']): LengthAwarePaginator
    {
        $query = GrupoEvento::with(['pessoas.pessoa', 'evento']);

        // Filtros
        if (isset($pagination['id_evento'])) {
            $query->where('id_evento', $pagination['id_evento']);
        }

        if (isset($pagination['nome'])) {
            $keyword = mb_strtolower($pagination['nome']);
            $query->whereRaw('lower(nome) like ?', ["%{$keyword}%"]);
        }

        $query->orderBy($pagination['sort'] ?? 'nome', $pagination['sort_direction'] ?? 'asc');
        return $query->paginate($pagination['per_page'] ?? 10, $columns, 'page', $pagination['current_page'] ?? 1);
    }

    public function create(array $params, bool $autoCommit = true): bool
    {
        $autoCommit && DB::beginTransaction();
        try {
            $grupoEvento = new GrupoEvento([
                'id_evento' => $params['id_evento'],
                'nome' => $params['nome'],
            ]);
            $grupoEvento->save();

            // Se houver pessoas
            if (isset($params['pessoas']) && is_array($params['pessoas'])) {
                foreach ($params['pessoas'] as $idPessoa) {
                    PessoaGrupoEvento::create([
                        'id_grupo_evento' => $grupoEvento->id,
                        'id_pessoa' => $idPessoa,
                    ]);
                }
            }

            $autoCommit && DB::commit();
            return true;
        } catch (Exception $ex) {
            $autoCommit && DB::rollBack();
            throw new Exception($ex->getMessage());
        }
    }

    public function update(int $id, array $params, bool $autoCommit = true): bool
    {
        $autoCommit && DB::beginTransaction();
        try {
            $grupoEvento = $this->getById($id);

            $grupoEvento->update([
                'nome' => $params['nome'],
            ]);

            // Atualizar pessoas se fornecidas
            if (isset($params['pessoas']) && is_array($params['pessoas'])) {
                // Remover pessoas antigas
                PessoaGrupoEvento::where('id_grupo_evento', $id)->delete();

                // Adicionar novas pessoas
                foreach ($params['pessoas'] as $idPessoa) {
                    PessoaGrupoEvento::create([
                        'id_grupo_evento' => $id,
                        'id_pessoa' => $idPessoa,
                    ]);
                }
            }

            $autoCommit && DB::commit();
            return true;
        } catch (Exception $ex) {
            $autoCommit && DB::rollBack();
            throw new Exception($ex->getMessage());
        }
    }

    public function destroy(int $id, bool $autoCommit = true): bool
    {
        $autoCommit && DB::beginTransaction();
        try {
            $grupoEvento = $this->getById($id);

            // Deletar pessoas do grupo
            PessoaGrupoEvento::where('id_grupo_evento', $id)->delete();

            // Deletar grupo
            $grupoEvento->delete();

            $autoCommit && DB::commit();
            return true;
        } catch (Exception $ex) {
            $autoCommit && DB::rollBack();
            throw new Exception($ex->getMessage());
        }
    }

    /**
     * Importa um grupo modelo para o evento
     */
    public function importarGrupo(int $idEvento, int $idGrupo): bool
    {
        DB::beginTransaction();
        try {
            // Buscar grupo modelo com pessoas
            $grupoModelo = Grupo::findOrFail($idGrupo);
            $pessoasGrupo = PessoaGrupo::where('id_grupo', $idGrupo)->get();

            // Criar novo grupo do evento
            $grupoEvento = new GrupoEvento([
                'id_evento' => $idEvento,
                'nome' => $grupoModelo->nome,
            ]);
            $grupoEvento->save();

            // Copiar pessoas
            foreach ($pessoasGrupo as $pessoaGrupo) {
                PessoaGrupoEvento::create([
                    'id_grupo_evento' => $grupoEvento->id,
                    'id_pessoa' => $pessoaGrupo->id_pessoa,
                ]);
            }

            DB::commit();
            return true;
        } catch (Exception $ex) {
            DB::rollBack();
            throw new Exception($ex->getMessage());
        }
    }

    /**
     * Adiciona uma pessoa ao grupo do evento
     */
    public function adicionarPessoa(int $idGrupoEvento, int $idPessoa): bool
    {
        DB::beginTransaction();
        try {
            // Verificar se a pessoa já está no grupo
            $existe = PessoaGrupoEvento::where('id_grupo_evento', $idGrupoEvento)
                ->where('id_pessoa', $idPessoa)
                ->exists();

            if ($existe) {
                throw new Exception('Pessoa já está neste grupo');
            }

            PessoaGrupoEvento::create([
                'id_grupo_evento' => $idGrupoEvento,
                'id_pessoa' => $idPessoa,
            ]);

            DB::commit();
            return true;
        } catch (Exception $ex) {
            DB::rollBack();
            throw new Exception($ex->getMessage());
        }
    }

    /**
     * Remove uma pessoa do grupo do evento
     */
    public function removerPessoa(int $idPessoaGrupoEvento): bool
    {
        DB::beginTransaction();
        try {
            $pessoaGrupoEvento = PessoaGrupoEvento::findOrFail($idPessoaGrupoEvento);
            $pessoaGrupoEvento->delete();

            DB::commit();
            return true;
        } catch (Exception $ex) {
            DB::rollBack();
            throw new Exception($ex->getMessage());
        }
    }
}
