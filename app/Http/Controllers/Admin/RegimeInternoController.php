<?php
namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use App\Databases\Contracts\RegimeInternoContract;
use App\Http\Requests\RegimeInternoRequest;
use Inertia\Inertia;
use Inertia\Response;

class RegimeInternoController extends Controller
{
    public function __construct(private readonly RegimeInternoContract $regimeInternoRepository)
    {
    }

    public function index(): Response
    {
        return Inertia::render('Admin/RegimeInterno/RegimeInternoIndex');
    }

    public function list(Request $request): JsonResponse
    {
        $dados = $this->regimeInternoRepository->paginate($request->all())->toArray();
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

    public function create(RegimeInternoRequest $request): JsonResponse
    {
        $params = $request->except('_token');
        $this->regimeInternoRepository->create($params);
        return response()->json(['success' => true, 'message' => 'RegimeInterno criado com sucesso!']);
    }

    public function edit(int $id): JsonResponse
    {
        $registro = $this->regimeInternoRepository->getById($id);
        return response()->json($registro);
    }

    public function update(RegimeInternoRequest $request, int $id): JsonResponse
    {
        $params = $request->validated();
        $this->regimeInternoRepository->update($id, $params);
        return response()->json(['success' => true, 'message' => 'RegimeInterno atualizado com sucesso!']);
    }

    public function delete(int $id): JsonResponse
    {
        $this->regimeInternoRepository->destroy($id);
        return response()->json(['success' => true, 'message' => 'RegimeInterno excluído com sucesso!']);
    }
}
