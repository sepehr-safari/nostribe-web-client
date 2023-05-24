import NavSidebar from '@/components/NavSidebar';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';

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
          <section className="pb-16 md:pb-0 relative flex h-full w-full flex-col">
            <Header />
            <div className="flex flex-row">
              <div className="w-64 lg:w-96 flex flex-col">
                <Link href="/settings" className="btn btn-ghost">
                  Account
                </Link>
                <Link href="/settings/relays" className="btn btn-ghost">
                  Relays
                </Link>
                <Link href="/settings/iris" className="btn btn-ghost">
                  iris.to
                </Link>
              </div>
              <div className="w-full overflow-x-hidden">{children}</div>
            </div>
          </section>
          <Footer />
        </div>
      </main>
    </>
  );
}
