<?php
namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use App\Databases\Contracts\AtaContract;
use App\Http\Requests\AtaRequest;
use Inertia\Inertia;
use Inertia\Response;

class AtaController extends Controller
{
    public function __construct(private readonly AtaContract $ataRepository)
    {
    }

    public function index(): Response
    {
        return Inertia::render('Admin/Ata/AtaIndex');
    }

    public function list(Request $request): JsonResponse
    {
        $dados = $this->ataRepository->paginate($request->all())->toArray();
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

    public function create(AtaRequest $request): JsonResponse
    {
        $params = $request->except('_token');
        $this->ataRepository->create($params);
        return response()->json(['success' => true, 'message' => 'Ata criado com sucesso!']);
    }

    public function edit(int $id): JsonResponse
    {
        $registro = $this->ataRepository->getById($id);
        return response()->json($registro);
    }

    public function update(AtaRequest $request, int $id): JsonResponse
    {
        $params = $request->except('_token');
        $this->ataRepository->update($id, $params);
        return response()->json(['success' => true, 'message' => 'Ata atualizado com sucesso!']);
    }

    public function delete(int $id): JsonResponse
    {
        $this->ataRepository->destroy($id);
        return response()->json(['success' => true, 'message' => 'Ata excluído com sucesso!']);
    }
}
