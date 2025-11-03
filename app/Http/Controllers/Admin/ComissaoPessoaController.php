<?php
namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use App\Databases\Models\ComissaoPessoa;
use App\Databases\Contracts\PessoaContract;

class ComissaoPessoaController extends Controller
{
    public function __construct(
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

    public function listarPorComissao(int $idComissao): JsonResponse
    {
        $integrantes = ComissaoPessoa::with(['pessoa', 'cargo'])
            ->where('id_comissao', $idComissao)
            ->get();

        return response()->json($integrantes);
    }

    public function adicionar(Request $request): JsonResponse
    {
        $request->validate([
            'id_comissao' => 'required|integer',
            'id_pessoa' => 'required|integer',
            'id_cargo' => 'required|integer',
        ]);

        ComissaoPessoa::create($request->all());

        return response()->json([
            'success' => true,
            'message' => 'Integrante adicionado com sucesso!'
        ]);
    }

    public function remover(int $id): JsonResponse
    {
        $integrante = ComissaoPessoa::findOrFail($id);
        $integrante->delete();

        return response()->json([
            'success' => true,
            'message' => 'Integrante removido com sucesso!'
        ]);
    }
}
