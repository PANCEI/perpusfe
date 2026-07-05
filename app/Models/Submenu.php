<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Submenu extends Model
{
    protected $table = 'submenu';

    /**
     * Kebalikan dari hasMany (Submenu dimiliki oleh satu Menu Utama)
     */
    public function menu()
    {
        return $this->belongsTo(Menu::class, 'id_menu', 'id');
    }
}
