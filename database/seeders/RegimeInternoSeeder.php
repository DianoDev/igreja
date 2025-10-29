<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Databases\Models\RegimeInterno;

class RegimeInternoSeeder extends Seeder
{
    public function run(): void
    {
        $regimesInternos = [
            [
                'nome' => 'Regimento Interno Festa de São Benedito 2026',
                'descricao' => 'Regimento interno completo da Festa de São Benedito 2026 - Arquidiocese de Cuiabá, Paróquia de Nossa Senhora do Rosário e São Benedito'
            ],
            [
                'nome' => 'Normas para Festeiros',
                'descricao' => 'Normas e responsabilidades dos festeiros da Festa de São Benedito'
            ],
            [
                'nome' => 'Regulamento das Terças-Feiras',
                'descricao' => 'Regulamento específico para os eventos das terças-feiras ao longo do ano'
            ],
            [
                'nome' => 'Normas da Comissão de Festeiros',
                'descricao' => 'Atribuições e responsabilidades da Comissão de Festeiros'
            ],
        ];

        foreach ($regimesInternos as $regimeInterno) {
            RegimeInterno::create($regimeInterno);
        }
    }
}
