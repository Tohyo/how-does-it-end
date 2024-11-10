<?php

namespace App\Tests\Unit\Repository;

use App\Entity\Article;
use App\Repository\ArticleRepository;
use Symfony\Bundle\FrameworkBundle\Test\KernelTestCase;
use Zenstruck\Foundry\Test\ResetDatabase;

class ArticleRepositoryTest extends KernelTestCase
{
    use ResetDatabase;

    private ArticleRepository $repository;

    protected function setUp(): void
    {
        self::bootKernel();
        $this->repository = static::getContainer()->get(ArticleRepository::class);
    }

    public function testFindByCategory(): void
    {
        // Create test articles
        $article1 = new Article(title: 'Test 1', content: 'Content 1', category: 'tech');
        $article2 = new Article(title: 'Test 2', content: 'Content 2', category: 'science');
        
        $em = static::getContainer()->get('doctrine')->getManager();
        $em->persist($article1);
        $em->persist($article2);
        $em->flush();

        $techArticles = $this->repository->findBy(['category' => 'tech']);
        $this->assertCount(1, $techArticles);
        $this->assertEquals('tech', $techArticles[0]->category);
    }

    public function testSearch(): void
    {
        // Create test article
        $article = new Article(
            title: 'Unique Search Title',
            content: 'Searchable content',
            category: 'test'
        );
        
        $em = static::getContainer()->get('doctrine')->getManager();
        $em->persist($article);
        $em->flush();

        $results = $this->repository->search('Unique Search');
        $this->assertCount(1, $results);
        $this->assertEquals('Unique Search Title', $results[0]->title);
    }
} 