<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->call([
            // Tabelas básicas
            PessoaSeeder::class,
            CargoSeeder::class,
        ]);

        $this->command->info('✅ Seeders executados com sucesso!');
        $this->command->info('');
        $this->command->info('📊 Dados populados:');
        $this->command->info('  • ' . \App\Databases\Models\Pessoa::count() . ' Pessoas');
        $this->command->info('  • ' . \App\Databases\Models\Cargo::count() . ' Cargos');
        $this->command->info('  • ' . \App\Databases\Models\Cardapio::count() . ' Cardápios');
        $this->command->info('  • ' . \App\Databases\Models\Eventos::count() . ' Eventos');
        $this->command->info('  • ' . \App\Databases\Models\RegimeInterno::count() . ' Regimes Internos');
        $this->command->info('  • ' . \App\Databases\Models\Estatuto::count() . ' Estatutos');
        $this->command->info('  • ' . \App\Databases\Models\Ata::count() . ' Atas');
    }
}
