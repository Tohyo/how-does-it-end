<?php

namespace App\Action\Article;

use App\Entity\Article;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpKernel\Attribute\AsController;

#[AsController]
final class UpdateArticleAction
{
    public function __construct(
        private EntityManagerInterface $entityManager
    ) {}

    #[Route('/api/articles/{id}', name: 'app_articles_update', methods: ['PUT'])]
    public function __invoke(Article $article, Request $request): Response
    {
        $data = json_decode($request->getContent(), true);
        
        $article->setTitle($data['title']);
        $article->setContent($data['content']);
        $article->setCategory($data['category']);
        $article->setUpdatedAt(new \DateTimeImmutable());

        $this->entityManager->flush();

        return new JsonResponse($article);
    }
} 