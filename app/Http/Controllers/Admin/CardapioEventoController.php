<?php
namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use App\Databases\Contracts\CardapioContract;
use App\Databases\Contracts\CardapioEventoContract;

class CardapioEventoController extends Controller
{
    public function __construct(
        private readonly CardapioContract $cardapioRepository,
        private readonly CardapioEventoContract $cardapioEventoRepository
    ) {
    }

    public function edit(int $idEvento): JsonResponse
    {
        // Lista todos os cardápios disponíveis
        $cardapios = $this->cardapioRepository->getAll();

        // Lista os cardápios já selecionados para este evento
        $cardapiosSelecionados = $this->cardapioEventoRepository->getByEvento($idEvento);
        $idsSelecionados = $cardapiosSelecionados->pluck('id_cardapio')->toArray();

        // Calcula o valor total do evento
        $valorTotal = $this->cardapioEventoRepository->getValorTotalEvento($idEvento);

        return response()->json([
            'cardapios' => $cardapios,
            'selecionados' => $idsSelecionados,
            'valor_total' => $valorTotal,
            'id_evento' => $idEvento
        ]);
    }

    public function salvar(Request $request, int $idEvento): JsonResponse
    {
        $request->validate([
            'cardapios' => 'required|array',
            'cardapios.*' => 'integer|exists:cardapio,id'
        ]);

        $this->cardapioEventoRepository->syncCardapios($idEvento, $request->cardapios);

        $valorTotal = $this->cardapioEventoRepository->getValorTotalEvento($idEvento);

        return response()->json([
            'success' => true,
            'message' => 'Cardápios do evento atualizados com sucesso!',
            'valor_total' => $valorTotal
        ]);
    }

    /**
     * Lista cardápios de um evento
     */
    public function listarPorEvento(int $idEvento): JsonResponse
    {
        $cardapios = $this->cardapioEventoRepository->getByEvento($idEvento);
        return response()->json($cardapios);
    }

    /**
     * Associa ou remove uma pessoa de um ingrediente
     */
    public function associarPessoaIngrediente(Request $request, int $idIngrediente): JsonResponse
    {
        $request->validate([
            'id_pessoa' => 'nullable|integer',
        ]);

        try {
            $this->cardapioEventoRepository->associarPessoaIngrediente($idIngrediente, $request->id_pessoa);

            $mensagem = $request->id_pessoa
                ? 'Pessoa associada ao ingrediente com sucesso!'
                : 'Pessoa removida do ingrediente com sucesso!';

            return response()->json([
                'success' => true,
                'message' => $mensagem
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Erro ao associar pessoa: ' . $e->getMessage()
            ], 500);
        }
    }

    /**
     * Lista cardápios modelo disponíveis para importar
     */
    public function listarCardapiosModelo(): JsonResponse
    {
        $cardapios = $this->cardapioRepository->getAll();
        return response()->json($cardapios);
    }

    /**
     * Importa um cardápio modelo para o evento
     */
    public function importar(Request $request): JsonResponse
    {
        $request->validate([
            'id_evento' => 'required|integer',
            'id_cardapio' => 'required|integer',
        ]);

        try {
            $this->cardapioEventoRepository->importarCardapio(
                $request->id_evento,
                $request->id_cardapio
            );

            return response()->json([
                'success' => true,
                'message' => 'Cardápio importado com sucesso!'
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Erro ao importar cardápio: ' . $e->getMessage()
            ], 500);
        }
    }

    /**
     * Associa ou remove uma pessoa de um cardápio
     */
    public function associarPessoa(Request $request, int $id): JsonResponse
    {
        $request->validate([
            'id_pessoa' => 'nullable|integer',
        ]);

        try {
            $this->cardapioEventoRepository->associarPessoa($id, $request->id_pessoa);

            $mensagem = $request->id_pessoa
                ? 'Pessoa associada ao cardápio com sucesso!'
                : 'Pessoa removida do cardápio com sucesso!';

            return response()->json([
                'success' => true,
                'message' => $mensagem
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Erro ao associar pessoa: ' . $e->getMessage()
            ], 500);
        }
    }

    /**
     * Atualiza um cardápio do evento
     */
    public function atualizar(Request $request, int $id): JsonResponse
    {
        $request->validate([
            'nome' => 'required|string|max:255',
            'descricao' => 'nullable|string',
            'ingredientes' => 'nullable|array',
            'ingredientes.*.nome' => 'required|string',
            'ingredientes.*.quantidade' => 'required|numeric|min:0',
            'ingredientes.*.unidade_medida' => 'required|string',
            'ingredientes.*.valor_unitario' => 'required|numeric|min:0',
        ]);

        try {
            $this->cardapioEventoRepository->update($id, $request->all());

            return response()->json([
                'success' => true,
                'message' => 'Cardápio atualizado com sucesso!'
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Erro ao atualizar cardápio: ' . $e->getMessage()
            ], 500);
        }
    }

    /**
     * Remove um cardápio do evento
     */
    public function remover(int $id): JsonResponse
    {
        try {
            $this->cardapioEventoRepository->destroy($id);

            return response()->json([
                'success' => true,
                'message' => 'Cardápio removido com sucesso!'
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Erro ao remover cardápio: ' . $e->getMessage()
            ], 500);
        }
    }

    /**
     * Busca detalhes de um cardápio
     */
    public function detalhes(int $id): JsonResponse
    {
        try {
            $cardapio = $this->cardapioEventoRepository->getById($id);
            return response()->json($cardapio);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Cardápio não encontrado'
            ], 404);
        }
    }
}
