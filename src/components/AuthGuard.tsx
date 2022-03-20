import { useEffect } from 'react';
import { useAuth } from '@hooks/useAuth';
import Loading from '@common/Loading';
import { useRouter } from 'next/router';

type AuthGuardProps = {
  children: JSX.Element;
};

function AuthGuard({ children }: AuthGuardProps) {
  const { user, loading, setRedirect } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      if (!user) {
        setRedirect(router.route);
        router.push('/login');
      }
    }
  }, [loading]);

  if (loading) {
    return <Loading />;
  }

  if (!loading && user) {
    // eslint-disable-next-line react/jsx-no-useless-fragment
    return <>{children}</>;
  }

  return null;
}

export default AuthGuard;
