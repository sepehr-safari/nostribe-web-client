import ChatList from '../ChatList';

export default function Messages() {
  return (
    <>
      <div className="hidden lg:flex justify-center items-center h-full w-1/2 mx-auto text-neutral-500">
        Sun Tzu once said, 'The supreme art of messaging is to encrypt your text but not your emojis. They'll never decipher your true intent behind that duck face.
      </div>
      <div className="lg:hidden">
        <ChatList />
      </div>
    </>
  )
}
