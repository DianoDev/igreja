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
            ['nome' => 'Adjar Roque de Arruda', 'cpf' => '12345678909', 'telefone' => '(65) 99972-9767'],
            ['nome' => 'Ana Carolina Miranda de Oliveira dos Santos', 'cpf' => '12345678910', 'telefone' => '(65) 99267-5137'],
            ['nome' => 'Anderson Benedito Ribeiro de Souza', 'cpf' => '12345678911', 'telefone' => '(65) 99958-0888'],
            ['nome' => 'Demerval Valeriano da Silva', 'cpf' => '12345678912', 'telefone' => '(65) 99998-1580'],
            ['nome' => 'Eliane Dias de Almeida', 'cpf' => '12345678913', 'telefone' => '(65) 99676-3561'],
            ['nome' => 'Evanildes Soares do Prado', 'cpf' => '12345678914', 'telefone' => '(65) 99946-8481'],
            ['nome' => 'Lenir Rondon do Prado Arruda', 'cpf' => '12345678915', 'telefone' => '(65) 99972-9767'],
            ['nome' => 'Neuza de Araújo', 'cpf' => '12345678916', 'telefone' => '(65) 99983-1327'],
            ['nome' => 'Robinson Arruda Garcia', 'cpf' => '12345678917', 'telefone' => '(65) 99311-4715'],

            // Outras pessoas
            ['nome' => 'Maria Antonele', 'cpf' => '12345678918', 'telefone' => '(65) 99876-5432'],
            ['nome' => 'Maria Claudia', 'cpf' => '12345678919', 'telefone' => '(65) 99765-4321'],

            // Pessoas para doações fictícias
            ['nome' => 'João da Silva', 'cpf' => '98765432101', 'telefone' => '(65) 99111-2222'],
            ['nome' => 'Maria Aparecida Santos', 'cpf' => '98765432102', 'telefone' => '(65) 99222-3333'],
            ['nome' => 'Pedro Henrique Oliveira', 'cpf' => '98765432103', 'telefone' => '(65) 99333-4444'],
            ['nome' => 'Ana Paula Costa', 'cpf' => '98765432104', 'telefone' => '(65) 99444-5555'],
            ['nome' => 'Carlos Alberto Souza', 'cpf' => '98765432105', 'telefone' => '(65) 99555-6666'],
            ['nome' => 'Francisca Lima', 'cpf' => '98765432106', 'telefone' => '(65) 99666-7777'],
            ['nome' => 'José Roberto Alves', 'cpf' => '98765432107', 'telefone' => '(65) 99777-8888'],
            ['nome' => 'Mariana Ferreira', 'cpf' => '98765432108', 'telefone' => '(65) 99888-9999'],
            ['nome' => 'Paulo Cesar Dias', 'cpf' => '98765432109', 'telefone' => '(65) 99999-0000'],
            ['nome' => 'Sandra Regina Mendes', 'cpf' => '98765432110', 'telefone' => '(65) 98888-1111'],
        ];

        foreach ($pessoas as $pessoa) {
            Pessoa::create($pessoa);
        }
    }
}
