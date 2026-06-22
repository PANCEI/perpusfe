<?php

namespace App\Models;

use Database\Factories\UserFactory;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Attributes\Hidden;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsTo; // 🚀 Import untuk relasi belongsTo
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens; // 🚀 WAJIB IMPORT INI agar bisa generate token Sanctum

// 1. Daftarkan kolom 'username' dan 'akses_id' ke dalam Fillable PHP 8 Attribute
#[Fillable(['name', 'email', 'password', 'username', 'akses_id'])]
#[Hidden(['password', 'remember_token'])]
class User extends Authenticatable
{
    /** @use HasFactory<UserFactory> */
    // 2. Pasang trait HasApiTokens di dalam class
    use HasApiTokens, HasFactory, Notifiable;

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }

    /**
     * 🚀 MENYELESAIKAN RELASI YANG TERPOTONG
     * Menghubungkan user ke tabel 'akses'
     */
    public function akses(): BelongsTo
    {
        // Parameter 1: Nama model target (Akses)
        // Parameter 2: Foreign key di tabel 'users' yang mengarah ke tabel akses
        // Parameter 3: Primary key di tabel 'akses'
        return $this->belongsTo(Akses::class, 'akses_id', 'id');
    }
}
