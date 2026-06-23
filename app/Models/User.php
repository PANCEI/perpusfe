<?php

namespace App\Models;

use Database\Factories\UserFactory;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Attributes\Hidden;
use Illuminate\Database\Eloquent\Factories\HasFactory;
//use Illuminate\Database\Eloquent\Relations\BelongsToMany; // 🚀 WAJIB IMPORT INI
use Illuminate\Database\Eloquent\Relations\BelongsTo; // 🚀 WAJIB IMPORT INI
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

// Bersihkan 'akses_id' dari Fillable karena mappingnya sekarang lewat tabel aksesuser
#[Fillable(['name', 'email', 'password', 'username'])]
#[Hidden(['password', 'remember_token'])]
class User extends Authenticatable
{
    /** @use HasFactory<UserFactory> */
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
     * 🚀 RELASI MAPPING KE TABEL AKSES VIA TABEL JEMBATAN (aksesuser)
     */
    /**
     * 🚀 RELASI LANGSUNG (ONE-TO-MANY) - SANGAT CEPAT
     */
    public function akses(): BelongsTo
    {
        // Parameter 2: Foreign key yang ada di tabel users saat ini
        // Parameter 3: Primary key di tabel akses
        return $this->belongsTo(Akses::class, 'id_akses', 'id');
    }
}
