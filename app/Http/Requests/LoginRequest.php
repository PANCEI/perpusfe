<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Http\Exceptions\HttpResponseException;


class LoginRequest extends FormRequest
{
    /**
     * Tentukan apakah user diizinkan untuk melakukan request ini.
     */
    public function authorize()
    {
      //  Ubah menjadi true agar request tidak ditolak
        return true;
    }

  /**
     * Tulis aturan validasi di sini.
     */
    public function rules()
    {
       return [
            'username' => 'required|string',
            'password' => 'required|string',
        ];
    }
    /**
     * costum validasi
     *
     */
    public function messages(){
        return [
            'username.required' => 'Nama pengguna atau ID Anggota wajib diisi.',
            'password.required' => 'Kata sandi wajib diisi.',
        ];

    }
 /**
 * Secara default mengembalikan HTTP 422 (Unprocessable Content)
 * jika data tidak dapat diproses.
 *
 * @return \Illuminate\Http\JsonResponse
 */
protected function failedValidation(Validator $validator){
    throw new HttpResponseException(response()->json([
        'status'=>'error',
        'message'=>'validasi gagal',
        'errors'=>$validator->errors()
    ], 422));
}
}
