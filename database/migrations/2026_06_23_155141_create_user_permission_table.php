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
        Schema::create('user_permissions', function (Blueprint $table) {
            $table->id();

            // Relasi ke tabel users milik Anda dan tabel submenu baru
            $table->foreignId('id_user')->constrained('users')->onDelete('cascade');
            $table->foreignId('id_submenu')->constrained('submenu')->onDelete('cascade');

            // Penentu aksi CRUD individu user
            $table->tinyInteger('bisa_create')->default(0);
            $table->tinyInteger('bisa_read')->default(1);
            $table->tinyInteger('bisa_update')->default(0);
            $table->tinyInteger('bisa_delete')->default(0);

            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('user_permissions');
    }
};
