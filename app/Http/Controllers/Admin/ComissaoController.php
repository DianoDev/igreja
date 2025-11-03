<?php
namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use App\Databases\Contracts\ComissaoContract;
use App\Http\Requests\ComissaoRequest;
use Inertia\Inertia;
use Inertia\Response;

class ComissaoController extends Controller
{
    public function __construct(private readonly ComissaoContract $comissaoRepository)
    {
    }

    public function index(): Response
    {
        return Inertia::render('Admin/Comissao/ComissaoIndex');
    }

    public function list(Request $request): JsonResponse
    {
        $dados = $this->comissaoRepository->paginate($request->all())->toArray();
        $dados['filter_options'] = [
            'ano' => [
                'type' => 'text',
            ],
            'id_pessoa' => [
                'type' => 'text',
            ],
            'id_cargo' => [
                'type' => 'text',
            ]
        ];
        return response()->json($dados);
    }

    public function create(ComissaoRequest $request): JsonResponse
    {
        $params = $request->except('_token');
        $this->comissaoRepository->create($params);
        return response()->json(['success' => true, 'message' => 'Comissao criado com sucesso!']);
    }

    public function edit(int $id): JsonResponse
    {
        $registro = $this->comissaoRepository->getById($id);
        return response()->json($registro);
    }

    public function update(ComissaoRequest $request, int $id): JsonResponse
    {
        $params = $request->validated();
        $this->comissaoRepository->update($id, $params);
        return response()->json(['success' => true, 'message' => 'Comissao atualizado com sucesso!']);
    }

    public function delete(int $id): JsonResponse
    {
        $this->comissaoRepository->destroy($id);
        return response()->json(['success' => true, 'message' => 'Comissao excluído com sucesso!']);
    }
}
