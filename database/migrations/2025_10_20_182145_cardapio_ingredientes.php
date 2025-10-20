<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('cardapio_ingredientes', function (Blueprint $table) {
            $table->id();
            $table->foreignId('id_ingrediente')->constrained('ingredientes')->onDelete('cascade');
            $table->foreignId('id_cardapio')->constrained('cardapio')->onDelete('cascade');
            $table->timestamps();
            $table->softDeletes();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('cardapio_ingredientes');
    }
};
