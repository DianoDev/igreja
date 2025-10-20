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
            $table->string('tabela', 255);
            $table->unsignedBigInteger('chave');
            $table->string('titulo')->nullable();
            $table->string('hash')->nullable();
            $table->timestamps();
            $table->softDeletes();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('arquivo');
    }
};
