<?php

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
