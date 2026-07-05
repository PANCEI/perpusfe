<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Menu extends Model
{
    // Nama tabel di database Anda
    protected $table = 'menu';

    /**
     * Hubungan ke tabel submenu (Satu Menu Utama punya Banyak Sub Menu)
     */
    public function submenus()
    {
        // Parameter: NamaModelTarget, Foreign_Key_di_tabel_submenu, Local_Key_di_tabel_menu
        return $this->hasMany(Submenu::class, 'id_menu', 'id');
    }

    /**
     * Hubungan ke tabel akses via pivot menuakses
     */
    public function akses()
    {
        return $this->belongsToMany(Akses::class, 'menuakses', 'id_menu', 'id_akses');
    }
}
