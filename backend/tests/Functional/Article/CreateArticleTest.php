<?php

namespace App\Tests\Functional\Article;

use App\Factory\ArticleFactory;
use Symfony\Bundle\FrameworkBundle\Test\WebTestCase;
use Symfony\Component\HttpFoundation\Response;
use Zenstruck\Foundry\Test\ResetDatabase;

class CreateArticleTest extends WebTestCase
{
    use ResetDatabase;

    public function testCreateArticleSuccessfully(): void
    {
        $client = static::createClient();
        
        $client->request(
            'POST',
            '/api/articles',
            [],
            [],
            ['CONTENT_TYPE' => 'application/json'],
            json_encode([
                'title' => 'Test Article',
                'content' => 'This is a test article content that is long enough.',
                'category' => 'test'
            ])
        );

        $this->assertEquals(Response::HTTP_CREATED, $client->getResponse()->getStatusCode());
        
        $responseData = json_decode($client->getResponse()->getContent(), true);
        $this->assertEquals('success', $responseData['status']);
        $this->assertArrayHasKey('data', $responseData);
        $this->assertEquals('Test Article', $responseData['data']['title']);
    }

    public function testCreateArticleWithInvalidData(): void
    {
        $client = static::createClient();
        
        $client->request(
            'POST',
            '/api/articles',
            [],
            [],
            ['CONTENT_TYPE' => 'application/json'],
            json_encode([
                'title' => 'Te',  // Too short
                'content' => 'Short',    // Too short
                'category' => ''         // Empty
            ])
        );

        $this->assertEquals(Response::HTTP_BAD_REQUEST, $client->getResponse()->getStatusCode());
        
        $responseData = json_decode($client->getResponse()->getContent(), true);
        $this->assertEquals('error', $responseData['status']);
        $this->assertArrayHasKey('errors', $responseData);
    }
} 