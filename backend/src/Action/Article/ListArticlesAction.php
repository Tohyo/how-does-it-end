<?php

namespace App\Action\Article;

use App\Repository\ArticleRepository;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpKernel\Attribute\AsController;

#[AsController]
final class ListArticlesAction
{
    public function __construct(
        private ArticleRepository $articleRepository
    ) {}

    #[Route('/api/articles', name: 'app_articles_list', methods: ['GET'])]
    public function __invoke(): Response
    {
        return new JsonResponse(
            $this->articleRepository->findBy([], ['createdAt' => 'DESC'], 10)
        );
    }
} 