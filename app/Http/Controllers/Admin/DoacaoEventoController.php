<?php
namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use App\Databases\Contracts\DoacaoEventoContract;
use App\Databases\Contracts\PessoaContract;

class DoacaoEventoController extends Controller
{
    public function __construct(
        private readonly DoacaoEventoContract $doacaoEventoRepository,
        private readonly PessoaContract $pessoaRepository
    ) {
    }

    public function buscarPessoa(Request $request): JsonResponse
    {
        $query = $request->get('query', '');

        if (strlen($query) < 2) {
            return response()->json([]);
        }

        $pessoas = $this->pessoaRepository->paginate([
            'nome' => $query,
            'per_page' => 10
        ]);

        return response()->json($pessoas->items());
    }

    public function listarPorEvento(int $idEvento): JsonResponse
    {
        $doacoes = $this->doacaoEventoRepository->getByEvento($idEvento);
        return response()->json($doacoes);
    }

    public function adicionar(Request $request): JsonResponse
    {
        $request->validate([
            'id_evento' => 'required|integer',
            'id_pessoa' => 'required|integer',
            'valor' => 'required|numeric|min:0',
        ]);

        $this->doacaoEventoRepository->create($request->all());

        return response()->json([
            'success' => true,
            'message' => 'Doação registrada com sucesso!'
        ]);
    }

    public function atualizar(Request $request, int $id): JsonResponse
    {
        $request->validate([
            'valor' => 'required|numeric|min:0',
        ]);

        $this->doacaoEventoRepository->update($id, [
            'valor' => $request->get('valor')
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Doação atualizada com sucesso!'
        ]);
    }

    public function remover(int $id): JsonResponse
    {
        $this->doacaoEventoRepository->destroy($id);

        return response()->json([
            'success' => true,
            'message' => 'Doação removida com sucesso!'
        ]);
    }
}
