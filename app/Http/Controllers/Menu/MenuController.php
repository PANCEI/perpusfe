<?php

namespace App\Http\Controllers\Menu;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Events\SendNotification; // 🚀 1. PASTIKAN EVENT INI SUDAH DI-IMPORT DI ATAS

class MenuController extends Controller
{
    public function getUserMenus(Request $request)
    {
        $user = $request->user();

        if (!$user || !$user->akses) {
            return response()->json([
                'status' => 'error',
                'message' => 'Hak akses pengguna tidak ditemukan.',
                'menus' => []
            ], 403);
        }

        // 1. Ambil data menu utama milik id_akses user saat ini
        $menus = $user->akses->menus()
            ->with(['submenus' => function($query) {
                $query->orderBy('id', 'asc');
            }])
            ->orderBy('urutan', 'asc')
            ->get();

        // 2. Mapping data menu & submenu sekaligus cek tabel user_permissions
        $formattedMenus = $menus->map(function ($menu) use ($user) {
            return [
                'id' => $menu->id,
                'name' => $menu->menu,
                'jenis' => $menu->jenis,

                // Proses pengecekan hak akses spesifik pada tingkat anak (Submenu)
                'sub_menu' => $menu->submenus->map(function ($sub) use ($user) {

                    $permission = DB::table('user_permissions')
                        ->where('id_user', $user->id)
                        ->where('id_submenu', $sub->id)
                        ->first();

                    if ($permission) {
                        $canCreate = (bool) $permission->bisa_create;
                        $canRead   = (bool) $permission->bisa_read;
                        $canUpdate = (bool) $permission->bisa_update;
                        $canDelete = (bool) $permission->bisa_delete;
                    } else {
                        $canCreate = false;
                        $canRead   = true;
                        $canUpdate = false;
                        $canDelete = false;
                    }

                    return [
                        'id' => $sub->id,
                        'name' => $sub->nama_sub_menu,
                        'jenis' => 'File',
                        'icon' => $sub->icon ?? 'FileText',
                        'url' => $sub->url ?? '#',
                        'permissions' => [
                            'create' => $canCreate,
                            'read'   => $canRead,
                            'update' => $canUpdate,
                            'delete' => $canDelete,
                        ]
                    ];
                })->toArray(),
            ];
        });

        // ===================================================================
        // 🚀 2. TEMPATKAN PEMICU NOTIFIKASI DI SINI UNTUK UJI COBA REAL-TIME
        // ===================================================================
        $pesanUjiCoba = "Koneksi WebSocket Berhasil! Akun " . $user->name . " terhubung ke Reverb.";
        event(new SendNotification($pesanUjiCoba, $user->id));
        // ===================================================================

        return response()->json([
            'menus' => $formattedMenus
        ], 200);
    }
}
