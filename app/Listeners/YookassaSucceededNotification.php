<?php

namespace App\Listeners;

use App\Events\YookassaEvent;
use App\Models\Replenishment;
use YooKassa\Model\Notification\{NotificationEventType, NotificationSucceeded};

class YookassaSucceededNotification
{
    /**
     * Create the event listener.
     */
    public function __construct()
    {
        //
    }

    /**
     * Handle the event.
     */
    public function handle(YookassaEvent $event): void
    {
        if ($event->data['event'] == NotificationEventType::PAYMENT_SUCCEEDED) {
            $notification = new NotificationSucceeded($event->data);
            $payment = $notification->getObject();
            $replenishment = Replenishment::where('uuid', $payment->id)->first();
            if ($replenishment) {
                $user = $replenishment->user;
                $newBalance = $user->balance + $notification->getObject()->amount->value;
                $user->update(['balance' => $newBalance]);
            }
        }
    }
}
