<?php

namespace App\Events;

use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast; // 🚀 WAJIB
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class SendNotification implements ShouldBroadcast // 🚀 Pastikan ada 'implements ShouldBroadcast'
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public $message;
    public $userId;

    // 1. Terima data dari Controller lewat constructor
    public function __construct($message, $userId)
    {
        $this->message = $message;
        $this->userId = $userId;
    }

    // 2. Tentukan nama Channel-nya (Kita pakai Public Channel dulu agar mudah ditest)
        // 🚀 1. Channel harus mengarah ke "notification-channel.{id}"
    public function broadcastOn(): array
    {
        return [
            new Channel('notification-channel.' . $this->userId),
        ];
    }

    // 🚀 2. Nama Event harus "MenuNotification" (tanpa titik di Laravel)
    public function broadcastAs()
    {
        return 'MenuNotification';
    }
}
