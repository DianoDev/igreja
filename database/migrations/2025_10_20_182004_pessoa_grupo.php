<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('pessoa_grupo', function (Blueprint $table) {
            $table->id();
            $table->foreignId('id_grupo')->constrained('grupos');
            $table->foreignId('id_pessoa')->constrained('pessoas');
            $table->timestamps();
            $table->softDeletes();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('pessoa_grupo');
    }
};
