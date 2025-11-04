<?php
namespace App\Http\Controllers\Admin;

use App\Databases\Models\Cardapio;
use App\Databases\Models\Ingrediente;
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

    public function ingredientes($id): Response
    {
        $registro = $this->cardapioRepository->getById($id);
        return Inertia::render('Admin/Cardapio/Ingredientes',['cardapio'=>$registro]);
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

    public function getIngredientes($id)
    {
        $ingredientes = Ingrediente::where('id_cardapio', $id)->get();
        return response()->json($ingredientes);
    }
    public function saveIngredientes(Request $request, $id)
    {
        $validated = $request->validate([
            'ingredientes.*.nome' => 'required|string|max:255',
            'ingredientes.*.quantidade' => 'nullable|numeric',
            'ingredientes.*.unidade_medida' => 'required|string',
            'ingredientes.*.valor_unitario' => 'required|numeric|min:0',
            'ingredientes.*.valor_total' => 'required|numeric|min:0',
            'valor_total_cardapio' => 'required|numeric|min:0',
        ]);

        // Inserir novos ingredientes
        foreach ($validated['ingredientes'] as $ingrediente) {
            Ingrediente::create([
                'id_cardapio' => $id,
                'nome' => $ingrediente['nome'],
                'quantidade' => $ingrediente['quantidade'],
                'unidade_medida' => $ingrediente['unidade_medida'],
                'valor_unitario' => $ingrediente['valor_unitario'],
                'valor_total' => $ingrediente['valor_total'],
            ]);
        }

        // Atualizar valor total do cardápio
        Cardapio::where('id', $id)->update([
            'valor_total' => $validated['valor_total_cardapio']
        ]);

        return response()->json(['message' => 'Ingredientes salvos com sucesso!']);
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
        $params = $request->except('_token');
        $this->cardapioRepository->update($id, $params);
        return response()->json(['success' => true, 'message' => 'Cardapio atualizado com sucesso!']);
    }

    public function delete(int $id): JsonResponse
    {
        $this->cardapioRepository->destroy($id);
        return response()->json(['success' => true, 'message' => 'Cardapio excluído com sucesso!']);
    }
}
