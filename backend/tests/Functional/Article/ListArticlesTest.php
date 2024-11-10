<?php

namespace App\Tests\Functional\Article;

use App\Tests\Factory\ArticleFactory;
use Symfony\Bundle\FrameworkBundle\Test\WebTestCase;
use Symfony\Component\HttpFoundation\Response;
use Zenstruck\Foundry\Test\ResetDatabase;
use Zenstruck\Foundry\Test\Factories;

class ListArticlesTest extends WebTestCase
{
    use ResetDatabase, Factories;

    private $client;

    protected function setUp(): void
    {
        $this->client = static::createClient();
        parent::setUp();
        ArticleFactory::createSequence([
            ['title' => 'First Article', 'category' => 'tech'],
            ['title' => 'Second Article', 'category' => 'science'],
            ['title' => 'Third Article', 'category' => 'tech']
        ]);
    }

    public function testListAllArticles(): void
    {
        $this->client->request('GET', '/api/articles');

        $this->assertEquals(Response::HTTP_OK, $this->client->getResponse()->getStatusCode());
        
        $responseData = json_decode($this->client->getResponse()->getContent(), true);
        $this->assertCount(3, $responseData);
    }
} 