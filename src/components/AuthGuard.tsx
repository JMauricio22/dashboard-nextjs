import { useEffect } from 'react';
import { useAuth } from '@hooks/useAuth';
import Loading from '@common/Loading';
import { useRouter } from 'next/router';

type AuthGuardProps = {
  children: JSX.Element;
};

const AuthGuard = ({ children }: AuthGuardProps) => {
  const { user, loading, setRedirect } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      if (!user) {
        setRedirect(router.route);
        router.push('/login');
      }
    }
  }, []);

  if (loading) {
    return <Loading />;
  }

  if (!loading && user) {
    return <>{children}</>;
  }

  return null;
};

export default AuthGuard;
