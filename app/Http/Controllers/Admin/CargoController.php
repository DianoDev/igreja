<?php
namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use App\Databases\Contracts\CargoContract;
use App\Http\Requests\CargoRequest;
use Inertia\Inertia;
use Inertia\Response;

class CargoController extends Controller
{
    public function __construct(private readonly CargoContract $cargoRepository)
    {
    }

    public function index(): Response
    {
        return Inertia::render('Admin/Cargo/CargoIndex');
    }

    public function list(Request $request): JsonResponse
    {
        $dados = $this->cargoRepository->paginate($request->all())->toArray();
        $dados['filter_options'] = [
            'nome' => [
                'type' => 'text',
            ]
        ];
        return response()->json($dados);
    }

    public function create(CargoRequest $request): JsonResponse
    {
        $params = $request->except('_token');
        $this->cargoRepository->create($params);
        return response()->json(['success' => true, 'message' => 'Cargo criado com sucesso!']);
    }

    public function edit(int $id): JsonResponse
    {
        $registro = $this->cargoRepository->getById($id);
        return response()->json($registro);
    }

    public function update(CargoRequest $request, int $id): JsonResponse
    {
        $params = $request->except('_token');
        $this->cargoRepository->update($id, $params);
        return response()->json(['success' => true, 'message' => 'Cargo atualizado com sucesso!']);
    }

    public function delete(int $id): JsonResponse
    {
        $this->cargoRepository->destroy($id);
        return response()->json(['success' => true, 'message' => 'Cargo excluído com sucesso!']);
    }
}
