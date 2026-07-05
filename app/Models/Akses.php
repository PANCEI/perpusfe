<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\Menu;

class Akses extends Model
{
    protected $table = 'akses';
    protected $fillable = ['nama_akses', 'keterangan'];
    public function menus()
    {
        // Jika nama tabel pivot Anda adalah 'menuakses'
        return $this->belongsToMany(Menu::class, 'menuakses', 'id_akses', 'id_menu');
    }
}
