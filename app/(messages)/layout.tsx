import NavSidebar from '@/components/NavSidebar';
import ChatList from './ChatList';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function MessagesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <main className="flex justify-center">
        <div className="flex w-full max-w-screen-xl justify-between relative">
          <NavSidebar />
          <section className="pb-16 md:pb-0 relative flex h-full w-full flex-col md:w-full lg:w-3/4">
            <Header />
            <div className="flex flex-row">
              <aside className="hidden flex-col gap-4 z-20 px-2 py-4 lg:flex lg:w-1/2 overflow-y-scroll overflow-x-hidden h-screen">
                <ChatList />
              </aside>
              <div className="flex w-full overflow-x-hidden h-screen">
                {children}
              </div>
            </div>
          </section>
        </div>
      </main>
    </>
  );
}
