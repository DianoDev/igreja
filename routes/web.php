<?php

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

Route::group(['prefix' => 'pessoas'], function () {
    Route::get('/', [PessoasController::class, 'index'])->name('pessoas.index');
    Route::get('/list', [PessoasController::class, 'list'])->name('pessoas.list');
    Route::get('/{id}', [PessoasController::class, 'edit'])->name('pessoas.edit');
    Route::post('/', [PessoasController::class, 'create'])->name('pessoas.create');
    Route::post('/{id}', [PessoasController::class, 'update'])->name('pessoas.update');
    Route::delete('/{id}', [PessoasController::class, 'delete'])->name('pessoas.delete');
});