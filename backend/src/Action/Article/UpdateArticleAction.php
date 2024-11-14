<?php

namespace App\Action\Article;

use App\Entity\Article;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpKernel\Attribute\AsController;
use Symfony\Component\HttpKernel\Attribute\MapRequestPayload;

#[AsController]
final class UpdateArticleAction
{
    public function __construct(
        private EntityManagerInterface $entityManager
    ) {}

    #[Route('/api/articles/{id}', name: 'app_articles_update', methods: ['PUT'])]
    public function __invoke(#[MapRequestPayload()] Article $article): Response
    {
        $this->entityManager->flush();

        return new JsonResponse([
            'status' => 'success',
            'data' => $article
        ], Response::HTTP_OK);
    }
} 