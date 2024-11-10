<?php

namespace App\Tests\Functional\Auth;

use App\Tests\Factory\UserFactory;
use Symfony\Bundle\FrameworkBundle\Test\WebTestCase;
use Symfony\Component\HttpFoundation\Response;
use Zenstruck\Foundry\Test\ResetDatabase;
use Zenstruck\Foundry\Test\Factories;

class LoginTest extends WebTestCase
{
    use ResetDatabase, Factories;

    private $client;

    protected function setUp(): void
    {
        parent::setUp();
        $this->client = static::createClient();
        
        // Create a test user with properly hashed password
        UserFactory::createOne([
            'email' => 'test@example.com',
            'password' => 'TestPassword123!',
        ]);
    }

    public function testSuccessfulLogin(): void
    {
        $this->client->request(
            'POST',
            '/api/login',
            [],
            [],
            ['CONTENT_TYPE' => 'application/json'],
            json_encode([
                'email' => 'test@example.com',
                'password' => 'TestPassword123!'
            ])
        );

        $this->assertEquals(Response::HTTP_OK, $this->client->getResponse()->getStatusCode());
        
        $responseData = json_decode($this->client->getResponse()->getContent(), true);
        $this->assertArrayHasKey('token', $responseData);
    }

    public function testLoginWithInvalidCredentials(): void
    {
        $this->client->request(
            'POST',
            '/api/login',
            [],
            [],
            ['CONTENT_TYPE' => 'application/json'],
            json_encode([
                'email' => 'test@example.com',
                'password' => 'WrongPassword123!'
            ])
        );

        $this->assertEquals(Response::HTTP_UNAUTHORIZED, $this->client->getResponse()->getStatusCode());
    }
} 