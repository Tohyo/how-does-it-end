<?php

namespace App\Action\Security;

use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Security\Http\Authentication\AuthenticationUtils;
use Symfony\Component\HttpKernel\Attribute\AsController;

#[AsController]
final class LoginAction
{
    public function __construct(
        private AuthenticationUtils $authenticationUtils
    ) {}

    #[Route('/api/login', name: 'app_login', methods: ['POST'])]
    public function __invoke(): Response
    {
        // The actual authentication is handled by the security system
        // This is just a fallback in case the security system doesn't intercept the request
        $error = $this->authenticationUtils->getLastAuthenticationError();
        
        if ($error) {
            return new JsonResponse([
                'error' => $error->getMessage()
            ], Response::HTTP_UNAUTHORIZED);
        }

        return new JsonResponse(['message' => 'Authentication required'], Response::HTTP_UNAUTHORIZED);
    }
} 