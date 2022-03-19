import { useContext, createContext, useState, useEffect } from 'react';
import Auth from '@utils/auth';
import { User, AuthError } from '@customTypes/user/auth';

export interface UseAuth {
  user: User | null;
  auth: Auth;
  error: AuthError;
  loading: boolean;
  setRedirect(redirectTo: string): void;
  getRedirect(): string;
  clearRedirect(): void;
}

const REDIRECT_KEY = 'redirect_to';

export const DEFAULT_REDIRECT = '/dashboard';

const setRedirect = (redirectTo: string) => window.sessionStorage.setItem(REDIRECT_KEY, redirectTo);
const getRedirect = (): string => window.sessionStorage.getItem(REDIRECT_KEY) || DEFAULT_REDIRECT;
const clearRedirect = () => window.sessionStorage.removeItem(REDIRECT_KEY);

const auth = new Auth();

export const AuthContext = createContext<UseAuth>({} as UseAuth);

export function useProvide() {
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState<AuthError>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    auth
      .onAuthLoading(setLoading)
      .onAuthStateChanged((user: User, error: AuthError) => {
        if (user) {
          setUser(user);
          setError(null);
        } else {
          setUser(null);
          if (error) {
            setError(error);
          }
        }
        setLoading(false);
      })
      .resolveUser();
  }, []);

  return {
    user,
    auth,
    error,
    loading,
    setRedirect,
    getRedirect,
    clearRedirect,
  };
}

export const useAuth = () => useContext(AuthContext);
