import {
  DashboardLeftSidebar,
  DashboardRightSidebar,
  Header,
  Navbar,
} from '@/components';

import { ExclamationTriangleIcon } from '@heroicons/react/24/outline';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <header className="w-full z-20 shadow-lg shadow-black fixed top-0">
        <Header />

        <Navbar />
      </header>

      <main className="flex justify-center pt-32">
        <div className="flex w-full max-w-screen-xl justify-between">
          <DashboardLeftSidebar />

          <section className="flex flex-col w-full md:w-3/4 lg:w-1/2 px-2 py-4 gap-4">
            <div className="alert alert-warning shadow-lg text-sm">
              <div>
                <ExclamationTriangleIcon width={20} />
                <span>
                  Nostribe is still under development. Some parts might not be
                  functioning yet.
                </span>
              </div>
            </div>

            {children}
          </section>

          <DashboardRightSidebar />
        </div>
      </main>
    </>
  );
}
