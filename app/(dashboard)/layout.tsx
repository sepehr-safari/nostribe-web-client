import {
  DashboardLeftSidebar,
  DashboardRightSidebar,
  Header
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
          <DashboardLeftSidebar />
          <Header />
          <section className="flex h-full pt-14 w-full max-h-screen flex-col gap-4 px-2 py-4 md:w-full lg:w-1/2 overflow-y-scroll">
            {children}
          </section>
          <DashboardRightSidebar />
        </div>
      </main>
    </>
  );
}
