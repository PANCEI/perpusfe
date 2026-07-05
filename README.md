🚀 Enterprise Real-Time Notification System (Laravel Reverb + React Echo)
Repositori ini mencakup konfigurasi sistem notifikasi real-time menggunakan Laravel 11+ (Reverb) sebagai Backend Broadcast Server dan React (Vite) sebagai Frontend Client.

🖥️ 1. Backend Setup (Laravel)
Sisi backend bertanggung jawab untuk memicu (trigger) Event dan memancarkannya lewat jalur WebSocket lokal menggunakan Laravel Reverb.

📦 Dependensi yang Diinstal
Di sisi Laravel, dependensi utama dikelola via Composer. Driver Pusher PHP dibutuhkan karena Reverb berjalan menggunakan protokol Pusher secara native.

laravel/reverb: Server WebSocket bawaan Laravel berkinerja tinggi.

pusher/pusher-php-server: SDK PHP untuk menjembatani broadcast event ke protokol Reverb.

🛠️ Langkah Instalasi & Konfigurasi
Aktifkan Ekstensi cURL di PHP
Buka file php.ini Anda, cari dan hilangkan tanda titik koma (;) pada baris berikut:

Ini, TOML
extension=curl
Jalankan Perintah Broadcasting

Bash
php artisan install:broadcasting
Pilih driver reverb saat muncul pilihan di terminal.

Install Dependensi Driver Manual (Jika diperlukan)

Bash
composer require pusher/pusher-php-server
composer dump-autoload
Konfigurasi Environment (.env)
Pastikan baris berikut sudah terisi dengan string non-null di .env Laravel:

Cuplikan kode
BROADCAST_CONNECTION=reverb

REVERB_APP_ID=123456
REVERB_APP_KEY=myreverbkey12345
REVERB_APP_SECRET=myreverbsecret12345
REVERB_HOST="127.0.0.1"
REVERB_PORT=8080
REVERB_SCHEME="http"
Menjalankan Server WebSocket
Buka terminal baru di folder backend, lalu jalankan:

Bash
php artisan reverb:start
💻 2. Frontend Setup (React Vite)
Sisi frontend bertindak sebagai Client atau pendengar (Listener) yang menangkap sinyal WebSocket dari backend lalu menampilkannya ke layar user.

📦 Dependensi yang Diinstal
Di sisi React, dependensi dikelola via NPM.

laravel-echo: Library JavaScript untuk berlangganan channel dan mendengarkan event WebSocket secara ringkas.

pusher-js: Driver penghubung client berbasis JavaScript (diperlukan oleh Laravel Echo).

react-hot-toast (Opsional): Library UI untuk memunculkan pop-up notifikasi melayang yang interaktif.

🛠️ Langkah Instalasi & Konfigurasi
Install Library via NPM
Jalankan perintah ini di dalam direktori root proyek React Anda:

Bash
npm install --save-dev laravel-echo pusher-js
npm install react-hot-toast
Konfigurasi Environment (.env)
Buat atau sesuaikan file .env di proyek React Anda, samakan nilainya dengan kunci di Laravel:

Cuplikan kode
VITE_REVERB_APP_KEY="myreverbkey12345"
VITE_REVERB_HOST="localhost"
VITE_REVERB_PORT=8080
Inisialisasi Echo (src/utils/echo.js)
Buat file instansiasi Echo agar bisa di-import secara global di komponen React:

JavaScript
import Echo from 'laravel-echo';
import Pusher from 'pusher-js';

window.Pusher = Pusher;

const echo = new Echo({
    broadcaster: 'reverb',
    key: import.meta.env.VITE_REVERB_APP_KEY,
    wsHost: import.meta.env.VITE_REVERB_HOST ?? 'localhost',
    wsPort: import.meta.env.VITE_REVERB_PORT ?? 8080,
    wssPort: import.meta.env.VITE_REVERB_PORT ?? 8080,
    forceTLS: (import.meta.env.VITE_REVERB_SCHEME ?? 'https') === 'https',
    enabledTransports: ['ws', 'wss'],
});

export default echo;
Menjalankan Project Frontend

Bash
npm run dev
⚡ Alur Pengujian Fitur Notifikasi
Untuk memastikan sistem berjalan, skema pengujian dilakukan dengan:

Memanggil Event di Laravel: event(new MenuNotificationEvent($message, $userId));

Server Reverb menangkap pancaran data tersebut pada port 8080.

Komponen React (misalnya di DashboardLayout) yang mendengarkan channel notification-channel.${userId} akan langsung memicu toast.success(data.message) muncul di layar browser detik itu juga tanpa perlu refresh halaman.

💡 Catatan Tambahan Developer
Jangan lupa jalankan php artisan reverb:start di terminal terpisah selama masa pengembangan (development) agar gerbang WebSocket lokal tetap terbuka menerima koneksi dari React.
