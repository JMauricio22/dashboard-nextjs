import { useRouter } from 'next/router';

export default function Nav() {
  const router = useRouter();
  const route = router.pathname.substring(1);

  if (route) {
    return (
      <nav className="bg-white shadow dark:shadow-none dark:bg-gray-800">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="lg:text-3xl text-xl font-bold text-gray-900 capitalize dark:text-white">{route}</h1>
        </div>
      </nav>
    );
  }

  return null;
}
