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
        Schema::create('submenu', function (Blueprint $table) {
            $table->id();
            $table->string('nama_sub_menu', 100);
            $table->string('url', 100);
            $table->string('path', 100);

            // Relasi ke tabel menu (induk)
            $table->foreignId('id_menu')->constrained('menu')->onDelete('cascade');

            $table->string('icon', 50)->nullable()->default('List');
            $table->text('sub')->nullable(); // Kolom cadangan bawaan database Anda
            $table->timestamps();
            $table->softDeletes(); // Untuk deleted_at sesuai schema Anda
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('submenu');
    }
};
