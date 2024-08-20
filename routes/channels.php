<?php

use App\Models\User;
use Illuminate\Support\Facades\Broadcast;

Broadcast::channel('balance.{userId}', function (User $user, int $userId) {
    return $user->id == $userId;
});
