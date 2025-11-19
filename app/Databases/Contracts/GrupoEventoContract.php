<?php

namespace App\Databases\Contracts;

use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;

interface GrupoEventoContract
{
    public function getById(int $id);

    public function getByEvento(int $idEvento);

    public function paginate(array $pagination = [], array $columns = ['*']): LengthAwarePaginator;

    public function create(array $params, bool $autoCommit = true): bool;

    public function update(int $id, array $params, bool $autoCommit = true): bool;

    public function destroy(int $id, bool $autoCommit = true): bool;

    public function importarGrupo(int $idEvento, int $idGrupo): bool;

    public function adicionarPessoa(int $idGrupoEvento, int $idPessoa): bool;

    public function removerPessoa(int $idPessoaGrupoEvento): bool;
}
