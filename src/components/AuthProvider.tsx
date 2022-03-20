import { AuthContext, useProvide } from '@hooks/useAuth';

type AuthProviderProps = {
  children: JSX.Element;
};

function AuthProvider({ children }: AuthProviderProps) {
  const auth = useProvide();
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
}

export default AuthProvider;
