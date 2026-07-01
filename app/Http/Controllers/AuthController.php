<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator; // ini untuk menggunakan validasi untuk inputan
use Illuminate\Support\Facades\Hash; // ini untuk melakukan enkripis dan melakukan decrypth password
use App\Http\Requests\LoginRequest; // pisahkan dari controller agar lebih gampang di maintain
use App\Models\User;
class AuthController extends Controller
{
    public function login(LoginRequest $request) {
        // validasi input
        // $validator = validator::make($request->all(), [
        //     'username'=>'required|string',
        //     ''
        // ]);
        // ambil data yang sudah tervalidasi
        $credentials = $request->validated();
       $user = User::with('akses')->where('name', $credentials['username'])->first();
        if(!$user){
            $user = User::with('akses')->where('email', $credentials['username'])->first();
        }
//  return response()->json([
//         'data'=>$user
//         ]);
//echo Hash::make($credentials['password']);
        if (!$user || !Hash::check($credentials['password'], $user->password)) {
            return response()->json([
                'status'  => 'error',
                // 'message' => Hash::make($credentials['password'])
                'message' => 'Username atau password salah'
            ], 401);
        }
        // return response()->json([
        // 'data'=>'berhasii dapatkan  datanya'
        // ]);
        // 6. Terbitkan Token Sanctum
        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'status'  => 'success',
            'message' => 'Login berhasil',
            'user'    => [
                'id'       => $user->id,
                'name'     => $user->name,
                'username' => $user->username,
                'role'     => $user->akses->akses ? $user->akses->akses : '',
                'id_role' =>$user->id_akses
            ],
            'token'   => $token
        ], 200);


    }
}
