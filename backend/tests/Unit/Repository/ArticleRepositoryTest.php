<?php

namespace App\Tests\Unit\Repository;

use App\Tests\Factory\ArticleFactory;
use App\Repository\ArticleRepository;
use Symfony\Bundle\FrameworkBundle\Test\KernelTestCase;
use Zenstruck\Foundry\Test\ResetDatabase;
use Zenstruck\Foundry\Test\Factories;
class ArticleRepositoryTest extends KernelTestCase
{
    use ResetDatabase, Factories;

    private ArticleRepository $repository;

    protected function setUp(): void
    {
        parent::setUp();
        self::bootKernel();
        
        $this->repository = static::getContainer()->get(ArticleRepository::class);
    }

    public function testSearchByTitle(): void
    {
        ArticleFactory::createOne([
            'title' => 'Test Search Title',
            'content' => 'Test content for search functionality',
            'category' => 'test'
        ]);

        $results = $this->repository->search('Search Title');

        $this->assertCount(1, $results);
        $this->assertEquals('Test Search Title', $results[0]->title);
    }

    public function testSearchByCategory(): void
    {
        ArticleFactory::createOne([
            'title' => 'Category Test',
            'content' => 'Test content for category search',
            'category' => 'special-category'
        ]);

        $results = $this->repository->search(null, 'special-category');
        
        $this->assertNotEmpty($results);
        $this->assertEquals('special-category', $results[0]->category);
    }
} 