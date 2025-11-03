<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('comissao', function (Blueprint $table) {
            $table->id();
            $table->string('nome');
            $table->integer('ano');
            $table->foreignId('id_pessoa')->constrained('pessoas')->onDelete('cascade');
            $table->foreignId('id_cargo')->constrained('cargo')->onDelete('cascade');
            $table->timestamps();
            $table->softDeletes();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('cargo_evento');
    }
};
