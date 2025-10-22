<?php
namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use App\Databases\Contracts\CargoEventoContract;
use App\Databases\Contracts\PessoaContract;

class CargoEventoController extends Controller
{
    public function __construct(
        private readonly CargoEventoContract $cargoEventoRepository,
        private readonly PessoaContract $pessoaRepository
    ) {
    }

    public function buscarPessoa(Request $request): JsonResponse
    {
        $query = $request->get('query', '');

        if (strlen($query) < 2) {
            return response()->json([]);
        }

        $pessoas = $this->pessoaRepository->paginate([
            'nome' => $query,
            'per_page' => 10
        ]);

        return response()->json($pessoas->items());
    }

    public function listarPorEvento(int $idEvento): JsonResponse
    {
        $cargos = $this->cargoEventoRepository->getByEvento($idEvento);
        return response()->json($cargos);
    }

    public function adicionar(Request $request): JsonResponse
    {
        $request->validate([
            'id_evento' => 'required|integer',
            'id_pessoa' => 'required|integer',
            'id_cargo' => 'required|integer',
        ]);

        $this->cargoEventoRepository->create($request->all());

        return response()->json([
            'success' => true,
            'message' => 'Cargo atribuído com sucesso!'
        ]);
    }

    public function remover(int $id): JsonResponse
    {
        $this->cargoEventoRepository->destroy($id);

        return response()->json([
            'success' => true,
            'message' => 'Cargo removido com sucesso!'
        ]);
    }
}
