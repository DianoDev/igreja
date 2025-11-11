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

    /**
     * Lista cardápios de um evento
     */
    public function listarPorEvento(int $idEvento): JsonResponse
    {
        $cardapios = $this->cardapioEventoRepository->getByEvento($idEvento);
        return response()->json($cardapios);
    }

    /**
     * Cria um novo cardápio para o evento
     */
    public function criar(Request $request): JsonResponse
    {
        try {
            $this->cardapioEventoRepository->create($request->all());

            return response()->json([
                'success' => true,
                'message' => 'Cardápio criado com sucesso!'
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Erro ao criar cardápio: ' . $e->getMessage()
            ], 500);
        }
    }

    /**
     * Atualiza um cardápio do evento
     */
    public function atualizar(Request $request, int $id): JsonResponse
    {
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
     * Associa ou remove uma pessoa de um ingrediente
     */
    public function associarPessoaIngrediente(Request $request, int $idIngrediente): JsonResponse
    {

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
     * Cria um novo ingrediente para um cardápio
     */
    public function criarIngrediente(Request $request): JsonResponse
    {

        try {
            $valorTotal = $request->quantidade * $request->valor_unitario;

            $ingrediente = \App\Databases\Models\IngredienteCardapioEvento::create([
                'id_cardapio_evento' => $request->id_cardapio_evento,
                'nome' => $request->nome,
                'quantidade' => $request->quantidade,
                'unidade_medida' => $request->unidade_medida,
                'valor_unitario' => $request->valor_unitario,
                'valor_total' => $valorTotal,
                'id_pessoa' => $request->id_pessoa,
            ]);

            // Recalcular valor total do cardápio
            $this->cardapioEventoRepository->recalcularValorTotal($request->id_cardapio_evento);

            // Atualizar valor gasto do evento
            $cardapioEvento = $this->cardapioEventoRepository->getById($request->id_cardapio_evento);
            $this->cardapioEventoRepository->atualizarValorGastoEvento($cardapioEvento->id_evento);

            return response()->json([
                'success' => true,
                'message' => 'Ingrediente criado com sucesso!',
                'data' => $ingrediente
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Erro ao criar ingrediente: ' . $e->getMessage()
            ], 500);
        }
    }

    /**
     * Atualiza um ingrediente
     */
    public function atualizarIngrediente(Request $request, int $id): JsonResponse
    {

        try {
            $ingrediente = \App\Databases\Models\IngredienteCardapioEvento::findOrFail($id);

            $valorTotal = $request->quantidade * $request->valor_unitario;

            $ingrediente->update([
                'nome' => $request->nome,
                'quantidade' => $request->quantidade,
                'unidade_medida' => $request->unidade_medida,
                'valor_unitario' => $request->valor_unitario,
                'valor_total' => $valorTotal,
                'id_pessoa' => $request->id_pessoa,
            ]);

            // Recalcular valor total do cardápio
            $this->cardapioEventoRepository->recalcularValorTotal($ingrediente->id_cardapio_evento);

            // Atualizar valor gasto do evento
            $cardapioEvento = $ingrediente->cardapioEvento;
            $this->cardapioEventoRepository->atualizarValorGastoEvento($cardapioEvento->id_evento);

            return response()->json([
                'success' => true,
                'message' => 'Ingrediente atualizado com sucesso!',
                'data' => $ingrediente
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Erro ao atualizar ingrediente: ' . $e->getMessage()
            ], 500);
        }
    }

    /**
     * Remove um ingrediente
     */
    public function removerIngrediente(int $id): JsonResponse
    {
        try {
            $ingrediente = \App\Databases\Models\IngredienteCardapioEvento::findOrFail($id);
            $idCardapioEvento = $ingrediente->id_cardapio_evento;
            $cardapioEvento = $ingrediente->cardapioEvento;

            $ingrediente->delete();

            // Recalcular valor total do cardápio
            $this->cardapioEventoRepository->recalcularValorTotal($idCardapioEvento);

            // Atualizar valor gasto do evento
            $this->cardapioEventoRepository->atualizarValorGastoEvento($cardapioEvento->id_evento);

            return response()->json([
                'success' => true,
                'message' => 'Ingrediente removido com sucesso!'
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Erro ao remover ingrediente: ' . $e->getMessage()
            ], 500);
        }
    }
}
