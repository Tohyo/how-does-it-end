import { render, act } from '@testing-library/react';
import { AuthProvider, useAuth } from '../AuthContext';
import { renderHook } from '@testing-library/react-hooks';

describe('AuthContext', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('provides initial authentication state', () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <AuthProvider>{children}</AuthProvider>
    );

    const { result } = renderHook(() => useAuth(), { wrapper });

    expect(result.current.isAuthenticated).toBe(false);
    expect(result.current.user).toBeNull();
    expect(result.current.token).toBeNull();
  });

  it('handles login correctly', () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <AuthProvider>{children}</AuthProvider>
    );

    const { result } = renderHook(() => useAuth(), { wrapper });

    act(() => {
      result.current.login('test-token', { id: 1, email: 'test@example.com', name: 'Test User' });
    });

    expect(result.current.isAuthenticated).toBe(true);
    expect(result.current.token).toBe('test-token');
    expect(result.current.user).toEqual({
      id: 1,
      email: 'test@example.com',
      name: 'Test User'
    });
  });

  it('handles logout correctly', () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <AuthProvider>{children}</AuthProvider>
    );

    const { result } = renderHook(() => useAuth(), { wrapper });

    act(() => {
      result.current.login('test-token', { id: 1, email: 'test@example.com', name: 'Test User' });
      result.current.logout();
    });

    expect(result.current.isAuthenticated).toBe(false);
    expect(result.current.user).toBeNull();
    expect(result.current.token).toBeNull();
  });
}); 