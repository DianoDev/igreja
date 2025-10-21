<?php

use App\Http\Controllers\Admin\RegimeInternoController;
use App\Http\Controllers\Admin\CargoController;
use App\Http\Controllers\Admin\PessoaController;
use App\Http\Controllers\PessoasController;
use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';

Route::group(['prefix' => 'admin/pessoas'], function () {
    Route::get('/', [PessoaController::class, 'index'])->name('admin.pessoas.index');
    Route::get('/list', [PessoaController::class, 'list'])->name('admin.pessoas.list');
    Route::get('/{id}', [PessoaController::class, 'edit'])->name('admin.pessoas.edit');
    Route::post('/', [PessoaController::class, 'create'])->name('admin.pessoas.create');
    Route::post('/{id}', [PessoaController::class, 'update'])->name('admin.pessoas.update');
    Route::delete('/{id}', [PessoaController::class, 'delete'])->name('admin.pessoas.delete');
});

Route::group(['prefix' => 'admin/cargo'], function () {
    Route::get('/', [CargoController::class, 'index'])->name('admin.cargo.index');
    Route::get('/list', [CargoController::class, 'list'])->name('admin.cargo.list');
    Route::get('/{id}', [CargoController::class, 'edit'])->name('admin.cargo.edit');
    Route::post('/', [CargoController::class, 'create'])->name('admin.cargo.create');
    Route::post('/{id}', [CargoController::class, 'update'])->name('admin.cargo.update');
    Route::delete('/{id}', [CargoController::class, 'delete'])->name('admin.cargo.delete');
});
Route::group(['prefix' => 'admin/regime-interno'], function () {
    Route::get('/', [RegimeInternoController::class, 'index'])->name('admin.regime_interno.index');
    Route::get('/list', [RegimeInternoController::class, 'list'])->name('admin.regime_interno.list');
    Route::get('/{id}', [RegimeInternoController::class, 'edit'])->name('admin.regime_interno.edit');
    Route::post('/', [RegimeInternoController::class, 'create'])->name('admin.regime_interno.create');
    Route::post('/{id}', [RegimeInternoController::class, 'update'])->name('admin.regime_interno.update');
    Route::delete('/{id}', [RegimeInternoController::class, 'delete'])->name('admin.regime_interno.delete');
});