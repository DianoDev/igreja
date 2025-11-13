<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Databases\Models\Cargo;

class CargoSeeder extends Seeder
{
    public function run(): void
    {
        $cargos = [
            ['nome' => 'Rei'],
            ['nome' => 'Rainha'],
            ['nome' => 'Juiz de Vara'],
            ['nome' => 'Juíza de Vara'],
            ['nome' => 'Capitão do Mastro'],
            ['nome' => 'Alferes de Bandeira'],
            ['nome' => 'Juizinho de Ramalhete'],
            ['nome' => 'Juizinha de Ramalhete'],
            ['nome' => 'Festeiro de Promessa'],
        ];

        foreach ($cargos as $cargo) {
            Cargo::create($cargo);
        }
    }
}
