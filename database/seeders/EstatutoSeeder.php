<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Databases\Models\Estatuto;

class EstatutoSeeder extends Seeder
{
    public function run(): void
    {
        $estatutos = [
            [
                'nome' => 'Estatuto da Paróquia 2024',
                'descricao' => 'Estatuto completo da Paróquia Nossa Senhora do Rosário e São Benedito - Ano 2024'
            ],
            [
                'nome' => 'Estatuto da Irmandade de São Benedito',
                'descricao' => 'Estatuto da Irmandade de São Benedito - Tradição desde 1722'
            ],
            [
                'nome' => 'Regras para Assembleia Geral',
                'descricao' => 'Regras e procedimentos para Assembleia Geral da Paróquia'
            ],
        ];

        foreach ($estatutos as $estatuto) {
            Estatuto::create($estatuto);
        }
    }
}
