<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('ingredientes', function (Blueprint $table) {
            $table->id();
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
        Schema::dropIfExists('ingredientes');
    }
};
