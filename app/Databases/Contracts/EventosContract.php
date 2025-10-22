<?php

namespace App\Databases\Contracts;

use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Pagination\LengthAwarePaginator;

interface EventosContract
{
    public function getById(int $id): Model;
    public function getAll(): Collection;
    public function paginate(array $pagination = [], array $columns = ['*']): LengthAwarePaginator;
    public function create(array $params, bool $autoCommit = true): bool;
    public function update(int $id, array $params, bool $autoCommit = true): bool;
    public function destroy(int $id, bool $autoCommit = true): bool;
    public function updateValorGasto(int $id, float $valor): bool;
    public function updateValorArrecadado(int $id, float $valor): bool;
}
