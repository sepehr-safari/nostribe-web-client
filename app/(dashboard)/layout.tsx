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
      <header className="fixed top-0 z-20 w-full bg-base-200 bg-opacity-50 shadow-lg shadow-black backdrop-blur-lg">
        <Header />

        <Navbar />
      </header>

      <main className="flex justify-center pt-32">
        <div className="flex w-full max-w-screen-xl justify-between">
          <DashboardLeftSidebar />

          <section className="flex w-full flex-col gap-4 px-2 py-4 md:w-3/4 lg:w-1/2">
            <div className="alert alert-warning text-sm shadow-lg">
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
