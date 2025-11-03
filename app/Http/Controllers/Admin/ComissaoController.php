<?php
namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use App\Databases\Contracts\ComissaoContract;
use App\Databases\Contracts\CargoContract;
use App\Http\Requests\ComissaoRequest;
use Inertia\Inertia;
use Inertia\Response;

class ComissaoController extends Controller
{
    public function __construct(
        private readonly ComissaoContract $comissaoRepository,
        private readonly CargoContract $cargoRepository
    ) {
    }

    public function index(): Response
    {
        return Inertia::render('Admin/Comissao/ComissaoIndex');
    }

    public function list(Request $request): JsonResponse
    {
        $dados = $this->comissaoRepository->paginate($request->all())->toArray();
        $dados['filter_options'] = [
            'nome' => [
                'type' => 'text',
            ],
            'ano' => [
                'type' => 'number',
            ]
        ];
        return response()->json($dados);
    }

    public function create(ComissaoRequest $request): JsonResponse
    {
        $params = $request->except('_token');
        $this->comissaoRepository->create($params);
        return response()->json(['success' => true, 'message' => 'Comissão criada com sucesso!']);
    }

    public function edit(int $id): JsonResponse
    {
        $registro = $this->comissaoRepository->getById($id);
        return response()->json($registro);
    }

    public function info(int $id): Response
    {
        $comissao = $this->comissaoRepository->getById($id);
        $cargos = $this->cargoRepository->getAll();

        return Inertia::render('Admin/Comissao/ComissaoInfo', [
            'comissao' => $comissao,
            'cargos' => $cargos
        ]);
    }

    public function update(ComissaoRequest $request, int $id): JsonResponse
    {
        $params = $request->validated();
        $this->comissaoRepository->update($id, $params);
        return response()->json(['success' => true, 'message' => 'Comissão atualizada com sucesso!']);
    }

    public function delete(int $id): JsonResponse
    {
        $this->comissaoRepository->destroy($id);
        return response()->json(['success' => true, 'message' => 'Comissão excluída com sucesso!']);
    }
}
