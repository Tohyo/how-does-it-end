<?php

namespace App\Tests\Functional\Auth;

use Symfony\Bundle\FrameworkBundle\Test\WebTestCase;
use Symfony\Component\HttpFoundation\Response;
use Zenstruck\Foundry\Test\ResetDatabase;
use Zenstruck\Foundry\Test\Factories;
use App\Tests\Factory\UserFactory;

class RegistrationTest extends WebTestCase
{
    use ResetDatabase, Factories;

    public function testSuccessfulRegistration(): void
    {
        $client = static::createClient();
        
        $client->request(
            'POST',
            '/api/register',
            [],
            [],
            ['CONTENT_TYPE' => 'application/json'],
            json_encode([
                'email' => 'test@example.com',
                'password' => 'StrongPassword123!',
            ])
        );

        $this->assertEquals(Response::HTTP_CREATED, $client->getResponse()->getStatusCode());
    }

    public function testRegistrationWithInvalidData(): void
    {
        $client = static::createClient();
        
        $client->request(
            'POST',
            '/api/register',
            [],
            [],
            ['CONTENT_TYPE' => 'application/json'],
            json_encode([
                'email' => 'invalid-email',
                'password' => 'weak',
            ])
        );

        $this->assertEquals(Response::HTTP_BAD_REQUEST, $client->getResponse()->getStatusCode());
    }

    public function testRegistrationWithExistingEmail(): void
    {
        $client = static::createClient();
        
        // First registration
        $client->request(
            'POST',
            '/api/register',
            [],
            [],
            ['CONTENT_TYPE' => 'application/json'],
            json_encode([
                'email' => 'existing@example.com',
                'password' => 'StrongPassword123!',
            ])
        );

        // Second registration with same email
        $client->request(
            'POST',
            '/api/register',
            [],
            [],
            ['CONTENT_TYPE' => 'application/json'],
            json_encode([
                'email' => 'existing@example.com',
                'password' => 'AnotherPassword123!',
            ])
        );

        $this->assertEquals(Response::HTTP_BAD_REQUEST, $client->getResponse()->getStatusCode());
    }
} 