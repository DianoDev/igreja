<?php
namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use App\Databases\Contracts\EstatutoContract;
use App\Http\Requests\EstatutoRequest;
use Inertia\Inertia;
use Inertia\Response;

class EstatutoController extends Controller
{
    public function __construct(private readonly EstatutoContract $estatutoRepository)
    {
    }

    public function index(): Response
    {
        return Inertia::render('Admin/Estatuto/EstatutoIndex');
    }

    public function list(Request $request): JsonResponse
    {
        $dados = $this->estatutoRepository->paginate($request->all())->toArray();
        $dados['filter_options'] = [
            'nome' => [
                'type' => 'text',
            ],
            'descricao' => [
                'type' => 'text',
            ]
        ];
        return response()->json($dados);
    }

    public function create(EstatutoRequest $request): JsonResponse
    {
        $params = $request->except('_token');
        $this->estatutoRepository->create($params);
        return response()->json(['success' => true, 'message' => 'Estatuto criado com sucesso!']);
    }

    public function edit(int $id): JsonResponse
    {
        $registro = $this->estatutoRepository->getById($id);
        return response()->json($registro);
    }

    public function update(EstatutoRequest $request, int $id): JsonResponse
    {
        $params = $request->validated();
        $this->estatutoRepository->update($id, $params);
        return response()->json(['success' => true, 'message' => 'Estatuto atualizado com sucesso!']);
    }

    public function delete(int $id): JsonResponse
    {
        $this->estatutoRepository->destroy($id);
        return response()->json(['success' => true, 'message' => 'Estatuto excluído com sucesso!']);
    }
}
