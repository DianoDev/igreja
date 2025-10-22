<?php

namespace App\Providers;

use App\Databases\Contracts\CargoEventoContract;
use App\Databases\Contracts\DoacaoEventoContract;
use App\Databases\Repositories\CargoEventoRepository;
use App\Databases\Repositories\DoacaoEventoRepository;
use Illuminate\Support\Facades\Vite;
use App\Databases\Contracts\CardapioContract;
use App\Databases\Repositories\CardapioRepository;
use App\Databases\Contracts\EventosContract;
use App\Databases\Repositories\EventosRepository;
use App\Databases\Contracts\AtaContract;
use App\Databases\Repositories\AtaRepository;
use App\Databases\Contracts\EstatutoContract;
use App\Databases\Repositories\EstatutoRepository;
use App\Databases\Contracts\RegimeInternoContract;
use App\Databases\Repositories\RegimeInternoRepository;
use App\Databases\Contracts\CargoContract;
use App\Databases\Repositories\CargoRepository;
use App\Databases\Contracts\PessoaContract;
use App\Databases\Repositories\PessoaRepository;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        app()->bind(CardapioContract::class, CardapioRepository::class);
        app()->bind(EventosContract::class, EventosRepository::class);
        app()->bind(AtaContract::class, AtaRepository::class);
        app()->bind(EstatutoContract::class, EstatutoRepository::class);
        app()->bind(RegimeInternoContract::class, RegimeInternoRepository::class);
        app()->bind(CargoContract::class, CargoRepository::class);
        app()->bind(PessoaContract::class, PessoaRepository::class);
        app()->bind(CargoEventoContract::class, CargoEventoRepository::class);
        app()->bind(DoacaoEventoContract::class, DoacaoEventoRepository::class);
        Vite::prefetch(concurrency: 3);
    }
}
