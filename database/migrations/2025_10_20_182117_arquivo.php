<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('arquivo', function (Blueprint $table) {
            $table->id();
            $table->string('tabela');
            $table->string('chave');
            $table->string('titulo');
            $table->string('descricao')->nullable();
            $table->string('nome');
            $table->string('tamanho');
            $table->string('content_type');
            $table->string('hash');
            $table->timestamps();
            $table->softDeletes();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('arquivo');
    }
};
