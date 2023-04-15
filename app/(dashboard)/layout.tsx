import {
  DashboardLeftSidebar,
  DashboardRightSidebar,
  Header,
} from '@/components';

import { ExclamationTriangleIcon } from '@heroicons/react/24/outline';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />

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
