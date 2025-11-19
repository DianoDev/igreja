<?php
namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use App\Databases\Contracts\GrupoContract;
use App\Http\Requests\GrupoRequest;
use Inertia\Inertia;
use Inertia\Response;

class GrupoController extends Controller
{
    public function __construct(private readonly GrupoContract $grupoRepository)
    {
    }

    public function index(): Response
    {
        return Inertia::render('Admin/Grupo/GrupoIndex');
    }

    public function list(Request $request): JsonResponse
    {
        $dados = $this->grupoRepository->paginate($request->all())->toArray();
        $dados['filter_options'] = [
            'nome' => [
                'type' => 'text',
            ]
        ];
        return response()->json($dados);
    }

    public function create(GrupoRequest $request): JsonResponse
    {
        $params = $request->except('_token');
        $this->grupoRepository->create($params);
        return response()->json(['success' => true, 'message' => 'Grupo criado com sucesso!']);
    }

    public function edit(int $id): JsonResponse
    {
        $registro = $this->grupoRepository->getById($id);
        return response()->json($registro);
    }

    public function update(GrupoRequest $request, int $id): JsonResponse
    {
        $params = $request->validated();
        $this->grupoRepository->update($id, $params);
        return response()->json(['success' => true, 'message' => 'Grupo atualizado com sucesso!']);
    }

    public function delete(int $id): JsonResponse
    {
        $this->grupoRepository->destroy($id);
        return response()->json(['success' => true, 'message' => 'Grupo excluído com sucesso!']);
    }

    public function info(int $id): Response
    {
        $grupo = $this->grupoRepository->getById($id);
        return Inertia::render('Admin/Grupo/GrupoInfo', [
            'grupo' => $grupo,
        ]);
    }
}
