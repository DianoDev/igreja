<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Databases\Models\Cardapio;

class CardapioSeeder extends Seeder
{
    public function run(): void
    {
        $cardapios = [
            [
                'nome' => 'Maria Isabel, Farofa de Banana e Tutu de Feijão',
                'descricao' => 'Prato tradicional da Festa de São Benedito - 1ª Terça-feira',
                'valor_total' => 450.00
            ],
            [
                'nome' => 'Tchá co Bôlo e Jantar Completo',
                'descricao' => 'Chá com bolo típico cuiabano e jantar - Terças-feiras',
                'valor_total' => 380.00
            ],
            [
                'nome' => 'Almoço da Cuiabania',
                'descricao' => 'Pratos típicos da culinária cuiabana',
                'valor_total' => 850.00
            ],
            [
                'nome' => 'Feijoada de São Benedito',
                'descricao' => 'Feijoada tradicional servida em fevereiro',
                'valor_total' => 920.00
            ],
            [
                'nome' => 'Cardápio Grande Festa - Dia 1',
                'descricao' => 'Primeiro dia da Grande Festa de São Benedito (02/07)',
                'valor_total' => 1500.00
            ],
            [
                'nome' => 'Cardápio Grande Festa - Dia 2',
                'descricao' => 'Segundo dia da Grande Festa de São Benedito (03/07)',
                'valor_total' => 1500.00
            ],
            [
                'nome' => 'Cardápio Grande Festa - Dia 3',
                'descricao' => 'Terceiro dia da Grande Festa de São Benedito (04/07)',
                'valor_total' => 1500.00
            ],
            [
                'nome' => 'Cardápio Grande Festa - Dia 4',
                'descricao' => 'Quarto dia da Grande Festa de São Benedito (05/07)',
                'valor_total' => 1500.00
            ],
            [
                'nome' => 'Arroz Carreteiro',
                'descricao' => 'Arroz carreteiro com carne seca',
                'valor_total' => 320.00
            ],
            [
                'nome' => 'Bolo de Arroz com Queijo',
                'descricao' => 'Bolos típicos cuiabanos',
                'valor_total' => 280.00
            ],
            [
                'nome' => 'Carne Seca com Banana da Terra',
                'descricao' => 'Prato tradicional mato-grossense',
                'valor_total' => 420.00
            ],
            [
                'nome' => 'Farofa Banana Completa',
                'descricao' => 'Farofa de banana com bacon e calabresa',
                'valor_total' => 250.00
            ],
            [
                'nome' => 'Tutu de Feijão Completo',
                'descricao' => 'Tutu de feijão com farinha e acompanhamentos',
                'valor_total' => 220.00
            ],
            [
                'nome' => 'Maria Isabel Completa',
                'descricao' => 'Maria Isabel (arroz com carne seca) completa',
                'valor_total' => 380.00
            ],
            [
                'nome' => 'Lanche para Cozinheiros',
                'descricao' => 'Lanche especial para equipe da cozinha',
                'valor_total' => 120.00
            ],
        ];

        foreach ($cardapios as $cardapio) {
            Cardapio::create($cardapio);
        }
    }
}
