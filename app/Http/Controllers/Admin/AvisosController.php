<?php
namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use App\Databases\Contracts\AvisosContract;
use App\Http\Requests\AvisosRequest;
use Inertia\Inertia;
use Inertia\Response;

class AvisosController extends Controller
{
    public function __construct(private readonly AvisosContract $avisosRepository)
    {
    }

    public function index(): Response
    {
        return Inertia::render('Admin/Avisos/AvisosIndex');
    }

    public function list(Request $request): JsonResponse
    {
        $dados = $this->avisosRepository->paginate($request->all())->toArray();
        $dados['filter_options'] = [
            'nome' => [
                'type' => 'text',
            ],
            'descricao' => [
                'type' => 'text',
            ],
            'data_expiração' => [
                'type' => 'text',
            ],
            'ativo' => [
                'type' => 'text',
            ]
        ];
        return response()->json($dados);
    }

    public function create(AvisosRequest $request): JsonResponse
    {
        $params = $request->except('_token');
        $this->avisosRepository->create($params);
        return response()->json(['success' => true, 'message' => 'Avisos criado com sucesso!']);
    }

    public function edit(int $id): JsonResponse
    {
        $registro = $this->avisosRepository->getById($id);
        return response()->json($registro);
    }

    public function update(AvisosRequest $request, int $id): JsonResponse
    {
        $params = $request->except('_token');
        $this->avisosRepository->update($id, $params);
        return response()->json(['success' => true, 'message' => 'Avisos atualizado com sucesso!']);
    }

    public function delete(int $id): JsonResponse
    {
        $this->avisosRepository->destroy($id);
        return response()->json(['success' => true, 'message' => 'Avisos excluído com sucesso!']);
    }
}
