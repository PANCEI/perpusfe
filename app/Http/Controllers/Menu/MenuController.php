<?php

namespace App\Http\Controllers\Menu;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB; //
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
                'name' => $menu->menu, // Kolom 'menu' sesuai gambar tabel menu sebelumnya
                'jenis' => $menu->jenis,
                // 'icon' => $menu->menu === 'Dashboard' ? 'LayoutDashboard' : 'FileText',
                // 'url' => $menu->menu === 'Dashboard' ? '/dashboard' : '#',

                // Proses pengecekan hak akses spesifik pada tingkat anak (Submenu)
                'sub_menu' => $menu->submenus->map(function ($sub) use ($user) {

                    // 🚀 Cari data izin di tabel user_permissions berdasarkan id_user & id_submenu
                    $permission = DB::table('user_permissions')
                        ->where('id_user', $user->id)
                        ->where('id_submenu', $sub->id)
                        ->first();

                    // Kondisi jika data permission ditemukan di database
                    if ($permission) {
                        $canCreate = (bool) $permission->bisa_create;
                        $canRead   = (bool) $permission->bisa_read;
                        $canUpdate = (bool) $permission->bisa_update;
                        $canDelete = (bool) $permission->bisa_delete;
                    } else {
                        // 🚀 Kondisi default jika data TIDAK ADA: hanya diberikan permission read saja
                        $canCreate = false;
                        $canRead   = true;
                        $canUpdate = false;
                        $canDelete = false;
                    }

                    return [
                        'id' => $sub->id,
                        'name' => $sub->nama_submenu, // Sesuaikan dengan nama kolom asli di tabel submenu Anda
                        'jenis' => 'File',
                        'icon' => $sub->icon ?? 'FileText',
                        'url' => $sub->url ?? '#',

                        // 🔐 Menyuntikkan object permissions ke frontend React agar tombol Action bisa di-hide/show
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

        return response()->json([
            'menus' => $formattedMenus
        ], 200);
    }
}



