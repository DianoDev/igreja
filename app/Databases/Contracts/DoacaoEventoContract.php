<?php

namespace App\Databases\Contracts;

use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;

interface DoacaoEventoContract
{
    public function getById(int $id): Model;
    public function getAll(): Collection;
    public function getByEvento(int $idEvento): Collection;
    public function create(array $params, bool $autoCommit = true): bool;
    public function update(int $id, array $params, bool $autoCommit = true): bool;
    public function destroy(int $id, bool $autoCommit = true): bool;
}
