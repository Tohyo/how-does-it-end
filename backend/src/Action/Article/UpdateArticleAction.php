<?php

namespace App\Action\Article;

use App\Entity\Article;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpKernel\Attribute\AsController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Validator\Validator\ValidatorInterface;
#[AsController]
final class UpdateArticleAction
{
    public function __construct(
        private EntityManagerInterface $entityManager,
        private ValidatorInterface $validator
    ) {}

    #[Route('/api/articles/{id}', name: 'app_articles_update', methods: ['PUT'])]
    public function __invoke(Article $article, Request $request): Response
    {
        $data = $request->toArray();

        $article->title = $data['title'];
        $article->content = $data['content'];
        $article->category = $data['category'];

        $errors = $this->validator->validate($article);
        if (count($errors) > 0) {
            return new JsonResponse(['errors' => $errors], Response::HTTP_UNPROCESSABLE_ENTITY);
        }

        $this->entityManager->persist($article);
        $this->entityManager->flush();

        return new JsonResponse([
            'status' => 'success',
            'data' => $article
        ], Response::HTTP_OK);
    }
} 