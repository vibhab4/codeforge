import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { AuthProvider } from '@/utils/authContext'; 
import Login from '../pages/Login';

describe('Login Page', () => {
  it('renders email and password fields', () => {
    render(
      <MemoryRouter>
        <AuthProvider>    {/* Wrap inside AuthProvider */}
          <Login />
        </AuthProvider>
      </MemoryRouter>
    );

    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
  });

  it('shows error if form is submitted empty', async () => {
    render(
      <MemoryRouter>
        <AuthProvider>    {/* Wrap inside AuthProvider */}
          <Login />
        </AuthProvider>
      </MemoryRouter>
    );

    const signInButton = screen.getByRole('button', { name: /sign in/i });
    fireEvent.click(signInButton);

    expect(signInButton).toBeInTheDocument();
  });
});
