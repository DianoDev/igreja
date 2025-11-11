<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('cardapio_evento', function (Blueprint $table) {
            $table->id();
            $table->foreignId('id_evento')->constrained('eventos')->onDelete('cascade');
            $table->string('nome', 255);
            $table->string('descricao')->nullable();
            $table->decimal('valor_total', 15, 2);
            $table->timestamps();
            $table->softDeletes();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('cardapio_evento');
    }
};
