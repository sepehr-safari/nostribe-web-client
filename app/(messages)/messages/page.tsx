import ChatList from '../ChatList';

export default function Messages() {
  return (
    <>
      <div className="hidden lg:flex justify-center items-center h-full w-1/2 mx-auto text-neutral-500">
        Pick from your ongoing chit-chats, kick off a new giggle-fest, or just continue freestyle belly flopping in the sea of notes.
      </div>
      <div className="lg:hidden">
        <ChatList />
      </div>
    </>
  )
}
