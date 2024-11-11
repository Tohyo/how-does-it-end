<?php

namespace App\EventListener;

use Lexik\Bundle\JWTAuthenticationBundle\Event\JWTCreatedEvent;
use Symfony\Component\DependencyInjection\Attribute\AutoconfigureTag;

#[AutoconfigureTag('kernel.event_listener', [
    'event' => 'lexik_jwt_authentication.on_jwt_created',
    'method' => '__invoke'
])]
class JWTCreatedListener
{
    public function __invoke(JWTCreatedEvent $event): void
    {
        $user = $event->getUser();
        $payload = $event->getData();

        // Add user data to the JWT payload
        $payload['id'] = $user->getId();
        $payload['email'] = $user->getUserIdentifier();

        $event->setData($payload);
    }
} 