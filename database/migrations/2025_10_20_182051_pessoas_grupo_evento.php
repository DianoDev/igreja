<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('pessoas_grupo_evento', function (Blueprint $table) {
            $table->id();
            $table->foreignId('id_grupo_evento')->constrained('grupo_evento')->onDelete('cascade');
            $table->integer('id_pessoa')->nullable();
            $table->softDeletes();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('pessoas_grupo_evento');
    }
};
