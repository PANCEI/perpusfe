<?php

namespace App\Http\Controllers\Menu;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class MenuController extends Controller
{
    // method untuk mendapatkan menu berdasarkan role user
    public function getUserMenus(Request $request){
        $user = $request->user();
        return response()->json([
            'status' => 'success',
            'menus' => $user // asumsikan relasi antara user dan akses sudah didefinisikan
        ]);
    }
}
