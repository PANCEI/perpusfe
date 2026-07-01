<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\Menu\MenuController;

Route::post('/login', [AuthController::class, 'login']);
// Route::get('/user', function (Request $request) {
//     return $request->user();
// })->middleware('auth:sanctum');
Route::middleware(['auth:sanctum', 'token.timeout'])->group(function () {

    // Route User Profil
    Route::get('/user', function (Request $request) {
        return $request->user();
    });

    // Contoh Rute Manajemen Lainnya
    // Route::get('/sidebar-menu', [MenuController::class, 'index']);
    Route::get('/user/menus', [MenuController::class, 'getUserMenus']);

});
