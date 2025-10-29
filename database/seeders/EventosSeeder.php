<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Databases\Models\Eventos;
use Carbon\Carbon;

class EventosSeeder extends Seeder
{
    public function run(): void
    {
        $ano = 2026;

        $eventos = [
            // Terças-feiras de Janeiro/2026
            [
                'nome' => '1ª Terça-feira - Janeiro 2026',
                'data' => Carbon::create($ano, 1, 7)->format('Y-m-d'),
                'hora' => '19:00',
                'valor_gasto' => 0,
                'valor_arrecadado' => 0
            ],
            [
                'nome' => '2ª Terça-feira - Janeiro 2026',
                'data' => Carbon::create($ano, 1, 14)->format('Y-m-d'),
                'hora' => '19:00',
                'valor_gasto' => 0,
                'valor_arrecadado' => 0
            ],
            [
                'nome' => '3ª Terça-feira - Janeiro 2026',
                'data' => Carbon::create($ano, 1, 21)->format('Y-m-d'),
                'hora' => '19:00',
                'valor_gasto' => 0,
                'valor_arrecadado' => 0
            ],
            [
                'nome' => '4ª Terça-feira - Janeiro 2026',
                'data' => Carbon::create($ano, 1, 28)->format('Y-m-d'),
                'hora' => '19:00',
                'valor_gasto' => 0,
                'valor_arrecadado' => 0
            ],

            // Feijoada de São Benedito
            [
                'nome' => 'Feijoada de São Benedito',
                'data' => Carbon::create($ano, 2, 10)->format('Y-m-d'),
                'hora' => '12:00',
                'valor_gasto' => 0,
                'valor_arrecadado' => 0
            ],

            // Terças-feiras de Fevereiro/2026
            [
                'nome' => '1ª Terça-feira - Fevereiro 2026',
                'data' => Carbon::create($ano, 2, 3)->format('Y-m-d'),
                'hora' => '19:00',
                'valor_gasto' => 0,
                'valor_arrecadado' => 0
            ],
            [
                'nome' => '2ª Terça-feira - Fevereiro 2026',
                'data' => Carbon::create($ano, 2, 10)->format('Y-m-d'),
                'hora' => '19:00',
                'valor_gasto' => 0,
                'valor_arrecadado' => 0
            ],
            [
                'nome' => '3ª Terça-feira - Fevereiro 2026',
                'data' => Carbon::create($ano, 2, 17)->format('Y-m-d'),
                'hora' => '19:00',
                'valor_gasto' => 0,
                'valor_arrecadado' => 0
            ],
            [
                'nome' => '4ª Terça-feira - Fevereiro 2026',
                'data' => Carbon::create($ano, 2, 24)->format('Y-m-d'),
                'hora' => '19:00',
                'valor_gasto' => 0,
                'valor_arrecadado' => 0
            ],

            // Aniversário de Morte de São Benedito
            [
                'nome' => 'Aniversário de Morte de São Benedito',
                'data' => Carbon::create($ano, 4, 7)->format('Y-m-d'),
                'hora' => '19:00',
                'valor_gasto' => 0,
                'valor_arrecadado' => 0
            ],

            // Terças-feiras de Abril/2026
            [
                'nome' => '1ª Terça-feira - Abril 2026',
                'data' => Carbon::create($ano, 4, 7)->format('Y-m-d'),
                'hora' => '19:00',
                'valor_gasto' => 0,
                'valor_arrecadado' => 0
            ],
            [
                'nome' => '2ª Terça-feira - Abril 2026',
                'data' => Carbon::create($ano, 4, 14)->format('Y-m-d'),
                'hora' => '19:00',
                'valor_gasto' => 0,
                'valor_arrecadado' => 0
            ],
            [
                'nome' => '3ª Terça-feira - Abril 2026',
                'data' => Carbon::create($ano, 4, 21)->format('Y-m-d'),
                'hora' => '19:00',
                'valor_gasto' => 0,
                'valor_arrecadado' => 0
            ],
            [
                'nome' => '4ª Terça-feira - Abril 2026',
                'data' => Carbon::create($ano, 4, 28)->format('Y-m-d'),
                'hora' => '19:00',
                'valor_gasto' => 0,
                'valor_arrecadado' => 0
            ],

            // Baile de Abertura
            [
                'nome' => 'Baile de Abertura da Festa de São Benedito',
                'data' => Carbon::create($ano, 6, 27)->format('Y-m-d'),
                'hora' => '20:00',
                'valor_gasto' => 0,
                'valor_arrecadado' => 0
            ],

            // Lavantamento do Mastro
            [
                'nome' => 'Lavantamento do Mastro',
                'data' => Carbon::create($ano, 6, 30)->format('Y-m-d'),
                'hora' => '18:00',
                'valor_gasto' => 0,
                'valor_arrecadado' => 0
            ],

            // Grande Festa de São Benedito (4 dias)
            [
                'nome' => 'Grande Festa de São Benedito - Dia 1',
                'data' => Carbon::create($ano, 7, 2)->format('Y-m-d'),
                'hora' => '18:00',
                'valor_gasto' => 0,
                'valor_arrecadado' => 0
            ],
            [
                'nome' => 'Grande Festa de São Benedito - Dia 2',
                'data' => Carbon::create($ano, 7, 3)->format('Y-m-d'),
                'hora' => '18:00',
                'valor_gasto' => 0,
                'valor_arrecadado' => 0
            ],
            [
                'nome' => 'Grande Festa de São Benedito - Dia 3',
                'data' => Carbon::create($ano, 7, 4)->format('Y-m-d'),
                'hora' => '18:00',
                'valor_gasto' => 0,
                'valor_arrecadado' => 0
            ],
            [
                'nome' => 'Grande Festa de São Benedito - Dia 4 (Final)',
                'data' => Carbon::create($ano, 7, 5)->format('Y-m-d'),
                'hora' => '18:00',
                'valor_gasto' => 0,
                'valor_arrecadado' => 0
            ],

            // Terças-feiras de Julho/2026
            [
                'nome' => '1ª Terça-feira - Julho 2026',
                'data' => Carbon::create($ano, 7, 7)->format('Y-m-d'),
                'hora' => '19:00',
                'valor_gasto' => 0,
                'valor_arrecadado' => 0
            ],
            [
                'nome' => '2ª Terça-feira - Julho 2026',
                'data' => Carbon::create($ano, 7, 14)->format('Y-m-d'),
                'hora' => '19:00',
                'valor_gasto' => 0,
                'valor_arrecadado' => 0
            ],
            [
                'nome' => '3ª Terça-feira - Julho 2026',
                'data' => Carbon::create($ano, 7, 21)->format('Y-m-d'),
                'hora' => '19:00',
                'valor_gasto' => 0,
                'valor_arrecadado' => 0
            ],
            [
                'nome' => '4ª Terça-feira - Julho 2026',
                'data' => Carbon::create($ano, 7, 28)->format('Y-m-d'),
                'hora' => '19:00',
                'valor_gasto' => 0,
                'valor_arrecadado' => 0
            ],

            // Almoço da Cuiabania
            [
                'nome' => 'Almoço da Cuiabania',
                'data' => Carbon::create(2025, 11, 15)->format('Y-m-d'),
                'hora' => '12:00',
                'valor_gasto' => 0,
                'valor_arrecadado' => 0
            ],

            // Terças-feiras de Novembro/2025
            [
                'nome' => '1ª Terça-feira - Novembro 2025',
                'data' => Carbon::create(2025, 11, 5)->format('Y-m-d'),
                'hora' => '19:00',
                'valor_gasto' => 0,
                'valor_arrecadado' => 0
            ],
            [
                'nome' => '2ª Terça-feira - Novembro 2025',
                'data' => Carbon::create(2025, 11, 12)->format('Y-m-d'),
                'hora' => '19:00',
                'valor_gasto' => 0,
                'valor_arrecadado' => 0
            ],
            [
                'nome' => '3ª Terça-feira - Novembro 2025',
                'data' => Carbon::create(2025, 11, 19)->format('Y-m-d'),
                'hora' => '19:00',
                'valor_gasto' => 0,
                'valor_arrecadado' => 0
            ],
            [
                'nome' => '4ª Terça-feira - Novembro 2025',
                'data' => Carbon::create(2025, 11, 26)->format('Y-m-d'),
                'hora' => '19:00',
                'valor_gasto' => 0,
                'valor_arrecadado' => 0
            ],
        ];

        foreach ($eventos as $evento) {
            Eventos::create($evento);
        }
    }
}
