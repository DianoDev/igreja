<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Databases\Models\Ata;
use Carbon\Carbon;

class AtasSeeder extends Seeder
{
    public function run(): void
    {
        $atas = [
            [
                'nome' => 'Ata da Primeira Reunião de Festeiros de São Benedito 2026',
                'descricao' => 'Primeira reunião dos festeiros para organização da Festa de São Benedito 2026'
            ],
            [
                'nome' => 'Ata da Reunião de Planejamento das Terças-Feiras',
                'descricao' => 'Definição do calendário e responsáveis pelas terças-feiras'
            ],
            [
                'nome' => 'Ata da Reunião sobre Cardápios e Compras',
                'descricao' => 'Definição dos cardápios e lista de compras para os eventos'
            ],
            [
                'nome' => 'Ata da Eleição da Comissão de Festeiros',
                'descricao' => 'Eleição e posse dos membros da Comissão de Festeiros para 2026'
            ],
            [
                'nome' => 'Ata da Reunião sobre Grande Festa - Detalhes Finais',
                'descricao' => 'Últimos ajustes para a Grande Festa de São Benedito em julho'
            ],
            [
                'nome' => 'Ata da Assembleia Geral Ordinária 2025',
                'descricao' => 'Assembleia Geral Ordinária anual da Paróquia'
            ],
        ];

        foreach ($atas as $ata) {
            Ata::create($ata);
        }
    }
}
