<?php

namespace App\EventListener;

use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpKernel\Event\ExceptionEvent;
use Symfony\Component\HttpKernel\Exception\HttpException;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\EventDispatcher\Attribute\AsEventListener;

#[AsEventListener]
class ValidationExceptionListener
{
    public function __invoke(ExceptionEvent $event): void
    {
        $exception = $event->getThrowable();
        
        if ($exception instanceof NotFoundHttpException) {
            $response = new JsonResponse([
                'status' => 'error',
                'message' => 'Resource not found'
            ], Response::HTTP_NOT_FOUND);
            
            $event->setResponse($response);

            return;
        }
        
        if ($exception instanceof HttpException) {
            $response = new JsonResponse([
                'status' => 'error',
                'errors' => explode("\n", $exception->getMessage())
            ], Response::HTTP_UNPROCESSABLE_ENTITY);
            
            $event->setResponse($response);
        }
    }
} 