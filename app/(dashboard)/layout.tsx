import NavSidebar from '@/components/NavSidebar';
import Discover from '@/components/Discover';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <main className="flex justify-center">
        <div className="flex w-full max-w-screen-xl justify-between relative">
          <NavSidebar />
          <section className="relative flex h-full w-full flex-col md:w-full lg:w-1/2">
            <Header />
            <div className="overflow-x-hidden">
              {children}
            </div>
          </section>
          <aside className="hidden sticky top-0 right-0 flex-col gap-4 z-20 px-2 py-4 lg:flex lg:w-80 h-screen max-h-screen">
            <Discover />
          </aside>
          <Footer />
        </div>
      </main>
    </>
  );
}
