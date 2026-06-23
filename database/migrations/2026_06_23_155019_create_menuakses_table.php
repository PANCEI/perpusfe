<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
  public function up(): void
    {
        Schema::create('menuakses', function (Blueprint $table) {
            $table->id();

            // Relasi ke tabel menu dan tabel akses yang sudah Anda miliki
            $table->foreignId('id_menu')->constrained('menu')->onDelete('cascade');
            $table->foreignId('id_akses')->constrained('akses')->onDelete('cascade');

            $table->timestamps();
            $table->softDeletes();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('menuakses');
    }
};
