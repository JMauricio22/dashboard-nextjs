import Header from '@components/Header';
import Nav from '@common/Nav';

export default function MainLayout({ children }) {
  return (
    <div className="min-h-screen h-auto bg-white dark:bg-gray-800">
      <Header />
      <Nav />
      <main>
        <div className="max-w-7xl h-full md:py-0 mx-auto py-6 px-6 lg:px-8">{children}</div>
      </main>
    </div>
  );
}
