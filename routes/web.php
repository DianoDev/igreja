<?php

use App\Http\Controllers\Admin\CardapioController;
use App\Http\Controllers\Admin\CardapioEventoController;
use App\Http\Controllers\Admin\CargoEventoController;
use App\Http\Controllers\Admin\DoacaoEventoController;
use App\Http\Controllers\Admin\EventosController;
use App\Http\Controllers\Admin\AtaController;
use App\Http\Controllers\Admin\EstatutoController;
use App\Http\Controllers\Admin\GaleriaEventoController;
use App\Http\Controllers\Admin\RegimeInternoController;
use App\Http\Controllers\Admin\CargoController;
use App\Http\Controllers\Admin\PessoaController;
use App\Http\Controllers\Admin\ArquivoController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\Publico\PublicoController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    // Rotas Admin - Pessoas
    Route::group(['prefix' => 'admin/pessoas'], function () {
        Route::get('/', [PessoaController::class, 'index'])->name('admin.pessoas.index');
        Route::get('/list', [PessoaController::class, 'list'])->name('admin.pessoas.list');
        Route::get('/{id}', [PessoaController::class, 'edit'])->name('admin.pessoas.edit');
        Route::post('/', [PessoaController::class, 'create'])->name('admin.pessoas.create');
        Route::post('/{id}', [PessoaController::class, 'update'])->name('admin.pessoas.update');
        Route::delete('/{id}', [PessoaController::class, 'delete'])->name('admin.pessoas.delete');
    });

    // Rotas Admin - Cargo
    Route::group(['prefix' => 'admin/cargo'], function () {
        Route::get('/', [CargoController::class, 'index'])->name('admin.cargo.index');
        Route::get('/list', [CargoController::class, 'list'])->name('admin.cargo.list');
        Route::get('/{id}', [CargoController::class, 'edit'])->name('admin.cargo.edit');
        Route::post('/', [CargoController::class, 'create'])->name('admin.cargo.create');
        Route::post('/{id}', [CargoController::class, 'update'])->name('admin.cargo.update');
        Route::delete('/{id}', [CargoController::class, 'delete'])->name('admin.cargo.delete');
    });

    // Rotas Admin - Regime Interno
    Route::group(['prefix' => 'admin/regime-interno'], function () {
        Route::get('/', [RegimeInternoController::class, 'index'])->name('admin.regime_interno.index');
        Route::get('/list', [RegimeInternoController::class, 'list'])->name('admin.regime_interno.list');
        Route::get('/{id}', [RegimeInternoController::class, 'edit'])->name('admin.regime_interno.edit');
        Route::post('/', [RegimeInternoController::class, 'create'])->name('admin.regime_interno.create');
        Route::post('/{id}', [RegimeInternoController::class, 'update'])->name('admin.regime_interno.update');
        Route::delete('/{id}', [RegimeInternoController::class, 'delete'])->name('admin.regime_interno.delete');
    });

    Route::prefix('admin/evento/{idEvento}/galeria')->group(function () {
        Route::get('/', [GaleriaEventoController::class, 'index'])->name('admin.eventos.galeria');
        Route::get('/list', [GaleriaEventoController::class, 'listar'])->name('admin.eventos.galeria.list');
        Route::post('/upload', [GaleriaEventoController::class, 'upload'])->name('admin.eventos.galeria.upload');
        Route::delete('/{idFoto}', [GaleriaEventoController::class, 'excluir'])->name('admin.eventos.galeria.excluir');
        Route::put('/{idFoto}', [GaleriaEventoController::class, 'atualizar'])->name('admin.eventos.galeria.atualizar');
        Route::post('/excluir-multiplas', [GaleriaEventoController::class, 'excluirMultiplas'])->name('admin.eventos.galeria.excluir-multiplas');
    });

    // Rotas Admin - Estatuto
    Route::group(['prefix' => 'admin/estatuto'], function () {
        Route::get('/', [EstatutoController::class, 'index'])->name('admin.estatuto.index');
        Route::get('/list', [EstatutoController::class, 'list'])->name('admin.estatuto.list');
        Route::get('/{id}', [EstatutoController::class, 'edit'])->name('admin.estatuto.edit');
        Route::post('/', [EstatutoController::class, 'create'])->name('admin.estatuto.create');
        Route::post('/{id}', [EstatutoController::class, 'update'])->name('admin.estatuto.update');
        Route::delete('/{id}', [EstatutoController::class, 'delete'])->name('admin.estatuto.delete');
    });

    // Rotas Admin - Atas
    Route::group(['prefix' => 'admin/atas'], function () {
        Route::get('/', [AtaController::class, 'index'])->name('admin.atas.index');
        Route::get('/list', [AtaController::class, 'list'])->name('admin.atas.list');
        Route::get('/{id}', [AtaController::class, 'edit'])->name('admin.atas.edit');
        Route::post('/', [AtaController::class, 'create'])->name('admin.atas.create');
        Route::post('/{id}', [AtaController::class, 'update'])->name('admin.atas.update');
        Route::delete('/{id}', [AtaController::class, 'delete'])->name('admin.atas.delete');
    });

    // Rotas Admin - Eventos
    Route::group(['prefix' => 'admin/eventos'], function () {
        Route::get('/', [EventosController::class, 'index'])->name('admin.eventos.index');
        Route::get('/list', [EventosController::class, 'list'])->name('admin.eventos.list');
        Route::get('/{id}', [EventosController::class, 'edit'])->name('admin.eventos.edit');
        Route::get('/{id}/info', [EventosController::class, 'info'])->name('admin.eventos.info');
        Route::post('/', [EventosController::class, 'create'])->name('admin.eventos.create');
        Route::post('/{id}', [EventosController::class, 'update'])->name('admin.eventos.update');
        Route::delete('/{id}', [EventosController::class, 'delete'])->name('admin.eventos.delete');
    });

    // Rotas Admin - Cardápio
    Route::group(['prefix' => 'admin/cardapio'], function () {
        Route::get('/', [CardapioController::class, 'index'])->name('admin.cardapio.index');
        Route::get('/list', [CardapioController::class, 'list'])->name('admin.cardapio.list');
        Route::get('/{id}/ingredientes', [CardapioController::class, 'ingredientes'])->name('admin.cardapio.edit');
        Route::get('/{id}', [CardapioController::class, 'edit'])->name('admin.cardapio.edit');
        Route::get('/{id}/ingredientes/edit', [CardapioController::class, 'getIngredientes']);
        Route::post('/{id}/ingredientes', [CardapioController::class, 'saveIngredientes']);
        Route::post('/', [CardapioController::class, 'create'])->name('admin.cardapio.create');
        Route::post('/{id}', [CardapioController::class, 'update'])->name('admin.cardapio.update');
        Route::delete('/{id}', [CardapioController::class, 'delete'])->name('admin.cardapio.delete');
    });

    // Rotas Admin - Cargo Evento
    Route::prefix('admin/cargo-evento')->group(function () {
        Route::get('/buscar-pessoa', [CargoEventoController::class, 'buscarPessoa'])->name('cargo-evento.buscar-pessoa');
        Route::get('/evento/{idEvento}', [CargoEventoController::class, 'listarPorEvento'])->name('cargo-evento.listar-evento');
        Route::post('/adicionar', [CargoEventoController::class, 'adicionar'])->name('cargo-evento.adicionar');
        Route::delete('/{id}', [CargoEventoController::class, 'remover'])->name('cargo-evento.remover');
    });

    // Rotas Admin - Doação Evento
    Route::prefix('admin/doacao-evento')->group(function () {
        Route::get('/buscar-pessoa', [DoacaoEventoController::class, 'buscarPessoa'])->name('doacao-evento.buscar-pessoa');
        Route::get('/evento/{idEvento}', [DoacaoEventoController::class, 'listarPorEvento'])->name('doacao-evento.listar-evento');
        Route::post('/adicionar', [DoacaoEventoController::class, 'adicionar'])->name('doacao-evento.adicionar');
        Route::put('/{id}', [DoacaoEventoController::class, 'atualizar'])->name('doacao-evento.atualizar');
        Route::delete('/{id}', [DoacaoEventoController::class, 'remover'])->name('doacao-evento.remover');
    });

    // Rotas Admin - Cardápio Evento
    Route::prefix('admin/cardapio-evento')->group(function () {
        Route::get('/{idEvento}/edit', [CardapioEventoController::class, 'edit'])->name('cardapio-evento.edit');
        Route::post('/{idEvento}', [CardapioEventoController::class, 'salvar'])->name('cardapio-evento.salvar');
    });
});

require __DIR__.'/auth.php';

// Página inicial pública
Route::get('/', [PublicoController::class, 'index'])->name('publico.index');

// Eventos públicos
Route::prefix('publico/eventos')->group(function () {
    Route::get('/', [PublicoController::class, 'eventos'])->name('publico.eventos');
    Route::get('/{id}', [PublicoController::class, 'eventoDetalhes'])->name('publico.eventos.detalhes');
});

// Atas públicas
Route::prefix('publico/atas')->group(function () {
    Route::get('/', [PublicoController::class, 'atas'])->name('publico.atas');
    Route::get('/{id}', [PublicoController::class, 'ataDetalhes'])->name('publico.atas.detalhes');
});

// Regimes Internos públicos
Route::prefix('publico/regimes-internos')->group(function () {
    Route::get('/', [PublicoController::class, 'regimesInternos'])->name('publico.regimes_internos');
    Route::get('/{id}', [PublicoController::class, 'regimeInternoDetalhes'])->name('publico.regimes_internos.detalhes');
});

// Estatutos públicos
Route::prefix('publico/estatutos')->group(function () {
    Route::get('/', [PublicoController::class, 'estatutos'])->name('publico.estatutos');
    Route::get('/{id}', [PublicoController::class, 'estatutoDetalhes'])->name('publico.estatutos.detalhes');
});

// Sobre a Paróquia
Route::get('/publico/sobre', [PublicoController::class, 'sobre'])->name('publico.sobre');

// Download de Arquivos Anexos
Route::get('/publico/arquivo/{id}', [PublicoController::class, 'downloadArquivo'])->name('publico.arquivo.download');

Route::group(['prefix' => 'storage'], function () {
    Route::get('/uploads/{ano}/{mes}/{dia}/{hash}',
        [App\Http\Controllers\Admin\ArquivoController::class, 'download']
    )->name('storage.download');
});
