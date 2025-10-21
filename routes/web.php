<?php

use App\Http\Controllers\Admin\CardapioController;
use App\Http\Controllers\Admin\EventosController;
use App\Http\Controllers\Admin\AtaController;
use App\Http\Controllers\Admin\EstatutoController;
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
Route::group(['prefix' => 'admin/estatuto'], function () {
    Route::get('/', [EstatutoController::class, 'index'])->name('admin.estatuto.index');
    Route::get('/list', [EstatutoController::class, 'list'])->name('admin.estatuto.list');
    Route::get('/{id}', [EstatutoController::class, 'edit'])->name('admin.estatuto.edit');
    Route::post('/', [EstatutoController::class, 'create'])->name('admin.estatuto.create');
    Route::post('/{id}', [EstatutoController::class, 'update'])->name('admin.estatuto.update');
    Route::delete('/{id}', [EstatutoController::class, 'delete'])->name('admin.estatuto.delete');
});
Route::group(['prefix' => 'admin/atas'], function () {
    Route::get('/', [AtaController::class, 'index'])->name('admin.atas.index');
    Route::get('/list', [AtaController::class, 'list'])->name('admin.atas.list');
    Route::get('/{id}', [AtaController::class, 'edit'])->name('admin.atas.edit');
    Route::post('/', [AtaController::class, 'create'])->name('admin.atas.create');
    Route::post('/{id}', [AtaController::class, 'update'])->name('admin.atas.update');
    Route::delete('/{id}', [AtaController::class, 'delete'])->name('admin.atas.delete');
});
Route::group(['prefix' => 'admin/eventos'], function () {
    Route::get('/', [EventosController::class, 'index'])->name('admin.eventos.index');
    Route::get('/list', [EventosController::class, 'list'])->name('admin.eventos.list');
    Route::get('/{id}', [EventosController::class, 'edit'])->name('admin.eventos.edit');
    Route::post('/', [EventosController::class, 'create'])->name('admin.eventos.create');
    Route::post('/{id}', [EventosController::class, 'update'])->name('admin.eventos.update');
    Route::delete('/{id}', [EventosController::class, 'delete'])->name('admin.eventos.delete');
});
Route::group(['prefix' => 'admin/cardapio'], function () {
    Route::get('/', [CardapioController::class, 'index'])->name('admin.cardapio.index');
    Route::get('/list', [CardapioController::class, 'list'])->name('admin.cardapio.list');
    Route::get('/{id}', [CardapioController::class, 'edit'])->name('admin.cardapio.edit');
    Route::post('/', [CardapioController::class, 'create'])->name('admin.cardapio.create');
    Route::post('/{id}', [CardapioController::class, 'update'])->name('admin.cardapio.update');
    Route::delete('/{id}', [CardapioController::class, 'delete'])->name('admin.cardapio.delete');
});