import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { jwtDecode } from 'jwt-decode';

interface JWTPayload {
  id: number;
  email: string;
  name: string;
  exp: number;
}

export async function GET() {
  const cookieStore = await cookies();
  const token = cookieStore.get('token');

  if (!token) {
    return NextResponse.json(
      { error: 'Not authenticated' },
      { status: 401 }
    );
  }

  try {
    // Decode the JWT token to get user information
    const decoded = jwtDecode<JWTPayload>(token.value);

    // Check if token is expired
    if (decoded.exp * 1000 < Date.now()) {
      cookieStore.delete('token');
      return NextResponse.json(
        { error: 'Token expired' },
        { status: 401 }
      );
    }

    // Return user data from the token
    return NextResponse.json({
      id: decoded.id,
      email: decoded.email,
      name: decoded.name
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Invalid token' },
      { status: 401 }
    );
  }
} 