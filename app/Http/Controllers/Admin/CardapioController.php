<?php
namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use App\Databases\Contracts\CardapioContract;
use App\Http\Requests\CardapioRequest;
use Inertia\Inertia;
use Inertia\Response;

class CardapioController extends Controller
{
    public function __construct(private readonly CardapioContract $cardapioRepository)
    {
    }

    public function index(): Response
    {
        return Inertia::render('Admin/Cardapio/CardapioIndex');
    }

    public function list(Request $request): JsonResponse
    {
        $dados = $this->cardapioRepository->paginate($request->all())->toArray();
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

    public function create(CardapioRequest $request): JsonResponse
    {
        $params = $request->except('_token');
        $this->cardapioRepository->create($params);
        return response()->json(['success' => true, 'message' => 'Cardapio criado com sucesso!']);
    }

    public function edit(int $id): JsonResponse
    {
        $registro = $this->cardapioRepository->getById($id);
        return response()->json($registro);
    }

    public function update(CardapioRequest $request, int $id): JsonResponse
    {
        $params = $request->validated();
        $this->cardapioRepository->update($id, $params);
        return response()->json(['success' => true, 'message' => 'Cardapio atualizado com sucesso!']);
    }

    public function delete(int $id): JsonResponse
    {
        $this->cardapioRepository->destroy($id);
        return response()->json(['success' => true, 'message' => 'Cardapio excluído com sucesso!']);
    }
}
