import {
  NavSidebar,
  DiscoverSidebar,
  Header,
  Footer,
} from '@/components';

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
            {children}
          </section>
          <DiscoverSidebar />
          <Footer />
        </div>
      </main>
    </>
  );
}
