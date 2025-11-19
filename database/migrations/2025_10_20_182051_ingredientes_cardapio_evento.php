<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('ingredientes_cardapio_evento', function (Blueprint $table) {
            $table->id();
            $table->foreignId('id_cardapio_evento')->constrained('cardapio_evento')->onDelete('cascade');
            $table->integer('id_pessoa')->nullable();
            $table->string('nome', 255);
            $table->string('quantidade')->nullable();
            $table->string('unidade_medida');
            $table->decimal('valor_unitario', 15, 2);
            $table->decimal('valor_total', 15, 2);
            $table->timestamps();
            $table->softDeletes();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('ingredientes_cardapio_evento');
    }
};
