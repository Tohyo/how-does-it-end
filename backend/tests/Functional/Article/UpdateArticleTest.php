<?php

namespace App\Tests\Functional\Article;

use App\Tests\Factory\ArticleFactory;
use Symfony\Bundle\FrameworkBundle\KernelBrowser;
use Symfony\Bundle\FrameworkBundle\Test\WebTestCase;
use Symfony\Component\HttpFoundation\Response;
use Zenstruck\Foundry\Test\ResetDatabase;
use Zenstruck\Foundry\Test\Factories;

class UpdateArticleTest extends WebTestCase
{
    use ResetDatabase, Factories;

    private KernelBrowser $client;

    protected function setUp(): void
    {
        $this->client = static::createClient();
        parent::setUp();
    }

    public function testUpdateArticleSuccessfully(): void
    {
        $article = ArticleFactory::createOne();

        $this->client->request(
            'PUT',
            '/api/articles/' . $article->getId(),
            [],
            [],
            ['CONTENT_TYPE' => 'application/json'],
            json_encode([
                'title' => 'Test Article',
                'content' => 'This is a test article content that is long enough.',
                'category' => 'test'
            ])
        );

        $this->assertEquals(Response::HTTP_OK, $this->client->getResponse()->getStatusCode());
        
        $responseData = json_decode($this->client->getResponse()->getContent(), true);
        $this->assertEquals('success', $responseData['status']);
        $this->assertEquals('Test Article', $responseData['data']['title']);
    }

    public function testUpdateArticleWithInvalidData(): void
    {
        $article = ArticleFactory::createOne();

        $this->client->request(
            'PUT',
            '/api/articles/' . $article->getId(),
            [],
            [],
            ['CONTENT_TYPE' => 'application/json'],
            json_encode([
                'title' => 'Te', // Too short
                'content' => 'Short',
                'category' => ''
            ])
        );
        $this->assertEquals(422, $this->client->getResponse()->getStatusCode());
    }
} 