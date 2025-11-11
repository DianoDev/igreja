<?php

namespace App\Databases\Contracts;

use Illuminate\Contracts\Pagination\LengthAwarePaginator;

interface CardapioEventoContract
{
    public function getById(int $id);
    public function getByEvento(int $idEvento);
    public function paginate(array $pagination = []): LengthAwarePaginator;
    public function create(array $params, bool $autoCommit = true): bool;
    public function update(int $id, array $params, bool $autoCommit = true): bool;
    public function destroy(int $id, bool $autoCommit = true): bool;
    public function importarCardapio(int $idEvento, int $idCardapio): bool;
    public function associarPessoa(int $idCardapioEvento, ?int $idPessoa): bool;
    public function recalcularValorTotal(int $idCardapioEvento): void;
}
