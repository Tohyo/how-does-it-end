<?php

namespace App\Action\Article;

use App\Entity\Article;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpKernel\Attribute\AsController;

#[AsController]
final class GetArticleAction
{
    #[Route('/api/articles/{id}', name: 'app_article_get', methods: ['GET'])]
    public function __invoke(Article $article): Response
    {
        return new JsonResponse($article);
    }
} 