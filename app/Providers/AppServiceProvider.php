<?php

namespace App\Providers;

use Illuminate\Support\Facades\Vite;
use App\Databases\Contracts\PessoaContract;
use App\Databases\Repositories\PessoaRepository;
use App\Databases\Contracts\PessoasContract;
use App\Databases\Repositories\PessoasRepository;
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
        app()->bind(PessoaContract::class, PessoaRepository::class);
        app()->bind(PessoasContract::class, PessoasRepository::class);
        Vite::prefetch(concurrency: 3);
    }
}
