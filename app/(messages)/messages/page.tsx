import ChatList from '../ChatList';

export default function Messages() {
  return (
    <>
      <div className="hidden lg:flex justify-center items-center h-full w-1/2 mx-auto text-neutral-500">
        Messages will be here.
      </div>
      <div className="lg:hidden">
        <ChatList />
      </div>
    </>
  );
}
