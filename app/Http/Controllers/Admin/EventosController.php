<?php
namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use App\Databases\Contracts\EventosContract;
use App\Http\Requests\EventosRequest;
use Inertia\Inertia;
use Inertia\Response;

class EventosController extends Controller
{
    public function __construct(private readonly EventosContract $eventosRepository)
    {
    }

    public function index(): Response
    {
        return Inertia::render('Admin/Eventos/EventosIndex');
    }

    public function list(Request $request): JsonResponse
    {
        $dados = $this->eventosRepository->paginate($request->all())->toArray();
        $dados['filter_options'] = [
            'nome' => [
                'type' => 'text',
            ],
            'data' => [
                'type' => 'text',
            ],
            'hora' => [
                'type' => 'text',
            ]
        ];
        return response()->json($dados);
    }

    public function create(EventosRequest $request): JsonResponse
    {
        $params = $request->except('_token');
        $this->eventosRepository->create($params);
        return response()->json(['success' => true, 'message' => 'Eventos criado com sucesso!']);
    }

    public function edit(int $id): JsonResponse
    {
        $registro = $this->eventosRepository->getById($id);
        return response()->json($registro);
    }

    public function update(EventosRequest $request, int $id): JsonResponse
    {
        $params = $request->validated();
        $this->eventosRepository->update($id, $params);
        return response()->json(['success' => true, 'message' => 'Eventos atualizado com sucesso!']);
    }

    public function delete(int $id): JsonResponse
    {
        $this->eventosRepository->destroy($id);
        return response()->json(['success' => true, 'message' => 'Eventos excluído com sucesso!']);
    }
}
