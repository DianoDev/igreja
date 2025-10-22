<?php

namespace App\Databases\Contracts;

use Illuminate\Database\Eloquent\Collection;

interface CardapioEventoContract
{
    public function getByEvento(int $idEvento): Collection;
    public function syncCardapios(int $idEvento, array $cardapioIds): bool;
    public function getValorTotalEvento(int $idEvento): float;
}
