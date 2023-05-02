import {
  DashboardLeftSidebar,
  DashboardRightSidebar,
} from '@/components';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <main className="flex justify-center">
        <div className="flex w-full max-w-screen-xl justify-between">
          <DashboardLeftSidebar />

          <section className="flex w-full flex-col gap-4 px-2 py-4 md:w-3/4 lg:w-1/2">
            {children}
          </section>

          <DashboardRightSidebar />
        </div>
      </main>
    </>
  );
}
