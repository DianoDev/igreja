<?php

namespace App\Databases\Repositories;

use App\Databases\Contracts\CardapioEventoContract;
use App\Databases\Models\CardapioEvento;
use App\Databases\Models\IngredienteCardapioEvento;
use App\Databases\Models\Cardapio;
use App\Databases\Models\Ingrediente;
use App\Databases\Models\Eventos;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Support\Facades\DB;
use Exception;

class CardapioEventoRepository implements CardapioEventoContract
{
    public function getById(int $id)
    {
        return CardapioEvento::with(['pessoa', 'ingredientes'])->findOrFail($id);
    }

    public function getByEvento(int $idEvento)
    {
        return CardapioEvento::with(['pessoa', 'ingredientes'])
            ->where('id_evento', $idEvento)
            ->get();
    }

    public function paginate(array $pagination = [], array $columns = ['*']): LengthAwarePaginator
    {
        $query = CardapioEvento::with(['pessoa', 'ingredientes', 'evento']);

        // Filtros
        if (isset($pagination['id_evento'])) {
            $query->where('id_evento', $pagination['id_evento']);
        }

        if (isset($pagination['nome'])) {
            $keyword = mb_strtolower($pagination['nome']);
            $query->whereRaw('lower(nome) like ?', ["%{$keyword}%"]);
        }

        $query->orderBy($pagination['sort'] ?? 'nome', $pagination['sort_direction'] ?? 'asc');
        return $query->paginate($pagination['per_page'] ?? 10, $columns, 'page', $pagination['current_page'] ?? 1);
    }

    public function create(array $params, bool $autoCommit = true): bool
    {
        $autoCommit && DB::beginTransaction();
        try {
            $cardapioEvento = new CardapioEvento([
                'id_evento' => $params['id_evento'],
                'nome' => $params['nome'],
                'descricao' => $params['descricao'] ?? null,
                'valor_total' => $params['valor_total'] ?? 0,
                'id_pessoa' => $params['id_pessoa'] ?? null,
            ]);
            $cardapioEvento->save();

            // Se houver ingredientes
            if (isset($params['ingredientes']) && is_array($params['ingredientes'])) {
                foreach ($params['ingredientes'] as $ingrediente) {
                    IngredienteCardapioEvento::create([
                        'id_cardapio_evento' => $cardapioEvento->id,
                        'nome' => $ingrediente['nome'],
                        'quantidade' => $ingrediente['quantidade'],
                        'unidade_medida' => $ingrediente['unidade_medida'],
                        'valor_unitario' => $ingrediente['valor_unitario'] ?? 0,
                        'valor_total' => ($ingrediente['quantidade'] * ($ingrediente['valor_unitario'] ?? 0)),
                    ]);
                }
            }

            // Recalcular valor total do cardápio
            $this->recalcularValorTotal($cardapioEvento->id);

            // Se tem pessoa associada, atualizar o valor gasto do evento
            if ($cardapioEvento->id_pessoa) {
                $this->atualizarValorGastoEvento($cardapioEvento->id_evento);
            }

            $autoCommit && DB::commit();
            return true;
        } catch (Exception $ex) {
            $autoCommit && DB::rollBack();
            throw new Exception($ex->getMessage());
        }
    }

    public function update(int $id, array $params, bool $autoCommit = true): bool
    {
        $autoCommit && DB::beginTransaction();
        try {
            $cardapioEvento = $this->getById($id);
            $idPessoaAntigo = $cardapioEvento->id_pessoa;

            $cardapioEvento->update([
                'nome' => $params['nome'] ?? $cardapioEvento->nome,
                'descricao' => $params['descricao'] ?? $cardapioEvento->descricao,
                'id_pessoa' => $params['id_pessoa'] ?? $cardapioEvento->id_pessoa,
            ]);

            // Se houver ingredientes para atualizar
            if (isset($params['ingredientes']) && is_array($params['ingredientes'])) {
                // Remover ingredientes antigos
                IngredienteCardapioEvento::where('id_cardapio_evento', $id)->delete();

                // Adicionar novos ingredientes
                foreach ($params['ingredientes'] as $ingrediente) {
                    IngredienteCardapioEvento::create([
                        'id_cardapio_evento' => $id,
                        'nome' => $ingrediente['nome'],
                        'quantidade' => $ingrediente['quantidade'],
                        'unidade_medida' => $ingrediente['unidade_medida'],
                        'valor_unitario' => $ingrediente['valor_unitario'] ?? 0,
                        'valor_total' => ($ingrediente['quantidade'] * ($ingrediente['valor_unitario'] ?? 0)),
                    ]);
                }
            }

            // Recalcular valor total
            $this->recalcularValorTotal($id);

            // Se mudou a pessoa ou foi removida/adicionada, atualizar valor gasto do evento
            if ($idPessoaAntigo != $cardapioEvento->id_pessoa) {
                $this->atualizarValorGastoEvento($cardapioEvento->id_evento);
            }

            $autoCommit && DB::commit();
            return true;
        } catch (Exception $ex) {
            $autoCommit && DB::rollBack();
            throw new Exception($ex->getMessage());
        }
    }

    public function destroy(int $id, bool $autoCommit = true): bool
    {
        $autoCommit && DB::beginTransaction();
        try {
            $cardapioEvento = $this->getById($id);
            $idEvento = $cardapioEvento->id_evento;
            $tinhaPessoa = !is_null($cardapioEvento->id_pessoa);

            // Deletar ingredientes
            IngredienteCardapioEvento::where('id_cardapio_evento', $id)->delete();

            // Deletar cardápio
            $cardapioEvento->delete();

            // Se tinha pessoa associada, atualizar valor gasto do evento

                $this->atualizarValorGastoEvento($idEvento);


            $autoCommit && DB::commit();
            return true;
        } catch (Exception $ex) {
            $autoCommit && DB::rollBack();
            throw new Exception($ex->getMessage());
        }
    }

    /**
     * Importa um cardápio modelo para o evento
     */
    public function importarCardapio(int $idEvento, int $idCardapio): bool
    {
        DB::beginTransaction();
        try {
            // Buscar cardápio modelo com ingredientes
            $cardapioModelo = Cardapio::with('ingredientes')->findOrFail($idCardapio);

            // Criar novo cardápio do evento
            $cardapioEvento = new CardapioEvento([
                'id_evento' => $idEvento,
                'nome' => $cardapioModelo->nome,
                'descricao' => $cardapioModelo->descricao,
                'valor_total' => $cardapioModelo->valor_total,
            ]);
            $cardapioEvento->save();

            // Copiar ingredientes
            foreach ($cardapioModelo->ingredientes as $ingredienteModelo) {
                IngredienteCardapioEvento::create([
                    'id_cardapio_evento' => $cardapioEvento->id,
                    'nome' => $ingredienteModelo->nome,
                    'quantidade' => $ingredienteModelo->quantidade,
                    'unidade_medida' => $ingredienteModelo->unidade_medida,
                    'valor_unitario' => $ingredienteModelo->valor_unitario ?? 0,
                    'valor_total' => $ingredienteModelo->quantidade * ($ingredienteModelo->valor_unitario ?? 0),
                ]);
            }
            // Recalcular valor total
            $this->recalcularValorTotal($cardapioEvento->id);

            // Atualizar valor gasto do evento
            $this->atualizarValorGastoEvento($idEvento);
            DB::commit();
            return true;
        } catch (Exception $ex) {
            DB::rollBack();
            throw new Exception($ex->getMessage());
        }
    }

    /**
     * Associa ou desassocia uma pessoa ao cardápio
     */
    public function associarPessoa(int $idCardapioEvento, ?int $idPessoa): bool
    {
        DB::beginTransaction();
        try {
            $cardapioEvento = $this->getById($idCardapioEvento);
            $cardapioEvento->id_pessoa = $idPessoa;
            $cardapioEvento->save();

            // Atualizar valor gasto do evento
            $this->atualizarValorGastoEvento($cardapioEvento->id_evento);

            DB::commit();
            return true;
        } catch (Exception $ex) {
            DB::rollBack();
            throw new Exception($ex->getMessage());
        }
    }

    public function associarPessoaIngrediente(int $idIngrediente, ?int $idPessoa): bool
    {
        DB::beginTransaction();
        try {
            $ingrediente = IngredienteCardapioEvento::findOrFail($idIngrediente);
            $ingrediente->id_pessoa = $idPessoa;
            $ingrediente->save();

            // Buscar o cardápio e evento para atualizar valor_gasto
            $cardapioEvento = $ingrediente->cardapioEvento;
            $this->atualizarValorGastoEvento($cardapioEvento->id_evento);

            DB::commit();
            return true;
        } catch (Exception $ex) {
            DB::rollBack();
            throw new Exception($ex->getMessage());
        }
    }

    /**
     * Recalcula o valor total do cardápio baseado nos ingredientes
     */
    public function recalcularValorTotal(int $idCardapioEvento): void
    {
        $valorTotal = IngredienteCardapioEvento::where('id_cardapio_evento', $idCardapioEvento)
            ->sum('valor_total');

        CardapioEvento::where('id', $idCardapioEvento)->update([
            'valor_total' => $valorTotal
        ]);
    }

    /**
     * Atualiza o valor_gasto do evento baseado nos cardápios SEM pessoa associada
     */
    private function atualizarValorGastoEvento(int $idEvento): void
    {
        // Buscar todos os cardápios do evento
        $cardapiosIds = CardapioEvento::where('id_evento', $idEvento)->pluck('id');

        // Soma apenas ingredientes SEM pessoa associada (id_pessoa é null)
        $valorGasto = IngredienteCardapioEvento::whereIn('id_cardapio_evento', $cardapiosIds)
            ->whereNull('id_pessoa')
            ->sum('valor_total');

        Eventos::where('id', $idEvento)->update([
            'valor_gasto' => $valorGasto
        ]);
    }
}
