<?php
namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use App\Databases\Contracts\PessoaContract;
use App\Http\Requests\PessoaRequest;
use Inertia\Inertia;
use Inertia\Response;

class PessoaController extends Controller
{
    public function __construct(private readonly PessoaContract $pessoaRepository)
    {
    }

    public function index(): Response
    {
        return Inertia::render('Admin/Pessoa/PessoaIndex');
    }

    public function list(Request $request): JsonResponse
    {
        $dados = $this->pessoaRepository->paginate($request->all())->toArray();
        $dados['filter_options'] = [
            'nome' => [
                'type' => 'text',
            ],
            'cpf' => [
                'type' => 'text',
            ],
            'telefone' => [
                'type' => 'text',
            ]
        ];
        return response()->json($dados);
    }

    public function create(PessoaRequest $request): JsonResponse
    {
        $params = $request->except('_token');
        $this->pessoaRepository->create($params);
        return response()->json(['success' => true, 'message' => 'Pessoa criado com sucesso!']);
    }

    public function edit(int $id): JsonResponse
    {
        $registro = $this->pessoaRepository->getById($id);
        return response()->json($registro);
    }

    public function update(PessoaRequest $request, int $id): JsonResponse
    {
        $params = $request->except('_token');
        $this->pessoaRepository->update($id, $params);
        return response()->json(['success' => true, 'message' => 'Pessoa atualizado com sucesso!']);
    }

    public function delete(int $id): JsonResponse
    {
        $this->pessoaRepository->destroy($id);
        return response()->json(['success' => true, 'message' => 'Pessoa excluído com sucesso!']);
    }
}
