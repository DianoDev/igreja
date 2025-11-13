<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Databases\Models\Pessoa;

class PessoaSeeder extends Seeder
{
    public function run(): void
    {
        $pessoas = [
            // Festeiros Titulares
            ['nome' => 'Joselito Espírito Santo de Paula', 'cpf' => '12345678901', 'telefone' => '(65) 99931-6103'],
            ['nome' => 'Júlia Asckar', 'cpf' => '12345678902', 'telefone' => '(65) 99983-5736'],

            // Juízes
            ['nome' => 'Dilmar Portilho Meira', 'cpf' => '12345678903', 'telefone' => '(65) 98402-8505'],
            ['nome' => 'Marina Eubank', 'cpf' => '12345678904', 'telefone' => '(65) 98116-5195'],

            // Capitão do Mastro
            ['nome' => 'José Duarte', 'cpf' => '12345678905', 'telefone' => '(65) 98112-0019'],

            // Alferes de Bandeira
            ['nome' => 'Maria Cláudia Almeida Figueiredo', 'cpf' => '12345678906', 'telefone' => '(65) 99691-0044'],

            // Juizinhos de Ramalhete
            ['nome' => 'Guilherme Andrade Silva Carneiro', 'cpf' => '12345678907', 'telefone' => '(67) 99985-6065'],
            ['nome' => 'Maria Antoniele Orkel de Araújo Pereira da Silva', 'cpf' => '12345678908', 'telefone' => '(65) 99286-6218'],

            // Festeiros de Promessa
            ['nome' => 'Adjar Roque de Arruda', 'cpf' => '', 'telefone' => '(65) 99972-9767'],
            ['nome' => 'Ana Carolina Miranda de Oliveira dos Santos', 'cpf' => '', 'telefone' => '(65) 99267-5137'],
            ['nome' => 'Anderson Benedito Ribeiro de Souza', 'cpf' => '', 'telefone' => '(65) 99958-0888'],
            ['nome' => 'Demerval Valeriano da Silva', 'cpf' => '', 'telefone' => '(65) 99998-1580'],
            ['nome' => 'Eliane Dias de Almeida', 'cpf' => '', 'telefone' => '(65) 99676-3561'],
            ['nome' => 'Evanildes Soares do Prado', 'cpf' => '', 'telefone' => '(65) 99946-8481'],
            ['nome' => 'Lenir Rondon do Prado Arruda', 'cpf' => '', 'telefone' => '(65) 99972-9767'],
            ['nome' => 'Neuza de Araújo', 'cpf' => '', 'telefone' => '(65) 99983-1327'],
            ['nome' => 'Robinson Arruda Garcia', 'cpf' => '', 'telefone' => '(65) 99311-4715'],
        ];

        foreach ($pessoas as $pessoa) {
            Pessoa::create($pessoa);
        }
    }
}
