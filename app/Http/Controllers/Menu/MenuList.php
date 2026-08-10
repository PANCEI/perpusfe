<?php

namespace App\Http\Controllers\Menu;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Menu;
class MenuList extends Controller
{
    //
    public function getMenuList(){
    // ambil semua menu utama
    $menlist = Menu::without('submenus')->get();
    return response()->json([
            'status'  => 'success',
            'message' => 'Berhasil mengambil daftar menu',
            'data'    => [
                'menuList' => $menlist
            ]
        ], 200);
    }
}
