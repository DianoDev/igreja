<?php

namespace App\Http\Controllers\Admin;

use App\Databases\Contracts\GrupoEventoContract;
use App\Databases\Contracts\GrupoContract;
use App\Databases\Models\Pessoa;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class GrupoEventoController extends Controller
{
    public function __construct(
        private readonly GrupoEventoContract $grupoEventoRepository,
        private readonly GrupoContract $grupoRepository
    ) {
    }

    /**
     * Lista grupos de um evento específico
     */
    public function listarPorEvento(int $idEvento): JsonResponse
    {
        try {
            $grupos = $this->grupoEventoRepository->getByEvento($idEvento);
            return response()->json($grupos);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Erro ao listar grupos: ' . $e->getMessage()
            ], 500);
        }
    }

    /**
     * Busca pessoas para adicionar ao grupo
     */
    public function buscarPessoa(Request $request): JsonResponse
    {
        $termo = $request->get('termo', '');

        $pessoas = Pessoa::where(function($query) use ($termo) {
            $query->where('nome', 'ILIKE', "%{$termo}%")
                  ->orWhere('cpf', 'ILIKE', "%{$termo}%");
        })
        ->limit(10)
        ->get(['id', 'nome', 'cpf']);

        return response()->json($pessoas);
    }

    /**
     * Adiciona um grupo ao evento (criar novo)
     */
    public function adicionar(Request $request): JsonResponse
    {
        $request->validate([
            'id_evento' => 'required|integer',
            'nome' => 'required|string|max:255',
        ]);

        try {
            $this->grupoEventoRepository->create($request->all());

            return response()->json([
                'success' => true,
                'message' => 'Grupo adicionado com sucesso!'
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Erro ao adicionar grupo: ' . $e->getMessage()
            ], 500);
        }
    }

    /**
     * Remove um grupo do evento
     */
    public function remover(int $id): JsonResponse
    {
        try {
            $this->grupoEventoRepository->destroy($id);

            return response()->json([
                'success' => true,
                'message' => 'Grupo removido com sucesso!'
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Erro ao remover grupo: ' . $e->getMessage()
            ], 500);
        }
    }

    /**
     * Busca detalhes de um grupo
     */
    public function detalhes(int $id): JsonResponse
    {
        try {
            $grupo = $this->grupoEventoRepository->getById($id);
            return response()->json($grupo);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Grupo não encontrado'
            ], 404);
        }
    }

    /**
     * Lista grupos modelo disponíveis para importar
     */
    public function listarGruposModelo(): JsonResponse
    {
        $grupos = $this->grupoRepository->getAll();
        return response()->json($grupos);
    }

    /**
     * Importa um grupo modelo para o evento
     */
    public function importar(Request $request): JsonResponse
    {
        $request->validate([
            'id_evento' => 'required|integer',
            'id_grupo' => 'required|integer',
        ]);

        try {
            $this->grupoEventoRepository->importarGrupo(
                $request->id_evento,
                $request->id_grupo
            );

            return response()->json([
                'success' => true,
                'message' => 'Grupo importado com sucesso!'
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Erro ao importar grupo: ' . $e->getMessage()
            ], 500);
        }
    }

    /**
     * Adiciona uma pessoa ao grupo do evento
     */
    public function adicionarPessoa(Request $request): JsonResponse
    {
        $request->validate([
            'id_grupo_evento' => 'required|integer',
            'id_pessoa' => 'required|integer',
        ]);

        try {
            $this->grupoEventoRepository->adicionarPessoa(
                $request->id_grupo_evento,
                $request->id_pessoa
            );

            return response()->json([
                'success' => true,
                'message' => 'Pessoa adicionada ao grupo com sucesso!'
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Erro ao adicionar pessoa: ' . $e->getMessage()
            ], 500);
        }
    }

    /**
     * Remove uma pessoa do grupo do evento
     */
    public function removerPessoa(int $id): JsonResponse
    {
        try {
            $this->grupoEventoRepository->removerPessoa($id);

            return response()->json([
                'success' => true,
                'message' => 'Pessoa removida do grupo com sucesso!'
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Erro ao remover pessoa: ' . $e->getMessage()
            ], 500);
        }
    }

    /**
     * Atualiza um grupo do evento
     */
    public function atualizar(Request $request, int $id): JsonResponse
    {
        $request->validate([
            'nome' => 'required|string|max:255',
        ]);

        try {
            $this->grupoEventoRepository->update($id, $request->all());

            return response()->json([
                'success' => true,
                'message' => 'Grupo atualizado com sucesso!'
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Erro ao atualizar grupo: ' . $e->getMessage()
            ], 500);
        }
    }
}
