<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('comissao_pessoa', function (Blueprint $table) {
            $table->id();
            $table->foreignId('id_comissao')->constrained('comissao')->onDelete('cascade');
            $table->foreignId('id_pessoa')->constrained('pessoas')->onDelete('cascade');
            $table->foreignId('id_cargo')->constrained('cargo')->onDelete('cascade');
            $table->timestamps();
            $table->softDeletes();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('comissao_pessoa');
    }
};
