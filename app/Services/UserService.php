<?php

namespace App\Services;

use App\Events\BalanceEvent;
use App\Models\User;

class UserService
{
    public function setBalance(User $user, float $amount): void
    {
        $user->update(['balance' => $amount]);
        BalanceEvent::dispatch($user);
    }

    public function addBalance(User $user, float $amount): void
    {
        $newBalance = $user->balance + $amount;
        $this->setBalance($user, $newBalance);
    }

    public function removeBalance(User $user, float $amount): void
    {
        $newBalance = $user->balance - $amount;
        $this->setBalance($user, $newBalance);
    }
}
