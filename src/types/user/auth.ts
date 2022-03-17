export interface User {
  email: string;
  name: string;
}

export type AuthError = Record<'message', string> | null;

export type UserStateChangedCallback = (user: User | null, error: AuthError) => void;

export type AuthLoadingCallback = (loading: boolean) => void;
