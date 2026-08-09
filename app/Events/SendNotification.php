<?php

namespace App\Events;

use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Contracts\Broadcasting\ShouldBroadcastNow;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class SendNotification implements ShouldBroadcastNow
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public $message;
    public $userId;
    public $type;
    public $action;
    public $menu;

    // Putar balik urutan: $message dulu, baru $userId (sama seperti Kode 1)
    public function __construct($message, $userId, $type = null, $action = null, $menu = null)
    {
        $this->message = $message;
        $this->userId  = $userId;
        $this->type    = $type;
        $this->action  = $action;
        $this->menu    = $menu;
    }

    public function broadcastOn(): array
    {
        return [
            new Channel('notification-channel.' . $this->userId),
        ];
    }

    public function broadcastAs()
    {
        return 'MenuNotification';
    }

    public function broadcastWith(): array
    {
        return [
            'message' => $this->message,
            'type'    => $this->type,
            'action'  => $this->action,
            'menu'    => $this->menu,
        ];
    }
}
