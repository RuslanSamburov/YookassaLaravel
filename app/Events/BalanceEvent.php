<?php

namespace App\Events;

use App\Models\User;
use Illuminate\Broadcasting\{Channel, InteractsWithSockets, PrivateChannel};
use Illuminate\Contracts\Broadcasting\ShouldBroadcastNow;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class BalanceEvent implements ShouldBroadcastNow
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public function __construct(
        public User $user,
    ) {}

    public function broadcastOn(): Channel
    {
        return new PrivateChannel('balance.' . $this->user->id);
    }

    public function broadcastAs(): string
    {
        return 'stream-balance';
    }

    public function broadcastWith(): array
    {
        return [
            'balance' => $this->user->balance,
        ];
    }
}
