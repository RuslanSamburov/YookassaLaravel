<?php

namespace App\Listeners;

use App\Events\YookassaEvent;
use App\Models\Replenishment;
use App\Services\UserService;
use YooKassa\Model\Notification\{NotificationEventType, NotificationSucceeded};

class YookassaSucceededNotification
{
    public function __construct(
        private UserService $userService,
    ) {}

    public function handle(YookassaEvent $event): void
    {
        if ($event->data['event'] == NotificationEventType::PAYMENT_SUCCEEDED) {
            $notification = new NotificationSucceeded($event->data);
            $payment = $notification->getObject();
            $replenishment = Replenishment::where('uuid', $payment->id)->first();
            if ($replenishment) {
                $user = $replenishment->user;
                $this->userService->addBalance($user, $notification->getObject()->amount->value);
            }
        }
    }
}
