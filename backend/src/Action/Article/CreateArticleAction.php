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
final class CreateArticleAction 
{
    public function __construct(
        private EntityManagerInterface $entityManager
    ) {}

    #[Route('/api/articles', name: 'app_articles_create', methods: ['POST'])]
    public function __invoke(#[MapRequestPayload] Article $article): Response
    {
        $this->entityManager->persist($article);
        $this->entityManager->flush();

        return new JsonResponse([
            'status' => 'success',
            'data' => $article
        ], Response::HTTP_CREATED);
    }
} 