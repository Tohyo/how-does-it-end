<?php

namespace App\Tests\Functional\Article;

use App\Tests\Factory\ArticleFactory;
use Symfony\Bundle\FrameworkBundle\Test\WebTestCase;
use Symfony\Component\HttpFoundation\Response;
use Zenstruck\Foundry\Test\ResetDatabase;
use Zenstruck\Foundry\Test\Factories;
class GetArticleTest extends WebTestCase
{
    use ResetDatabase, Factories;

    private $client;

    protected function setUp(): void
    {
        $this->client = static::createClient();
    }

    public function testGetArticleSuccessfully(): void
    {
        $article = ArticleFactory::createOne([
            'title' => 'Test Article',
            'content' => 'Test content',
            'category' => 'test'
        ]);

        $this->client->request(
            'GET',
            '/api/articles/' . $article->getId(),
            [],
            [],
            ['CONTENT_TYPE' => 'application/json']
        );

        $this->assertEquals(Response::HTTP_OK, $this->client->getResponse()->getStatusCode());
        
        $responseData = json_decode($this->client->getResponse()->getContent(), true);
        $this->assertEquals('Test Article', $responseData['title']);
    }

    public function testGetNonExistentArticle(): void
    {
        $this->client->request(
            'GET',
            '/api/articles/999999',
            [],
            [],
            ['CONTENT_TYPE' => 'application/json']
        );

        $this->assertEquals(Response::HTTP_NOT_FOUND, $this->client->getResponse()->getStatusCode());
        
        $responseData = json_decode($this->client->getResponse()->getContent(), true);
        $this->assertEquals('error', $responseData['status']);
        $this->assertEquals('Resource not found', $responseData['message']);
    }
} 