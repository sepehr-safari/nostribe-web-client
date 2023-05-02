import { HomeIcon, PaperAirplaneIcon, PlusCircleIcon } from '@heroicons/react/24/outline';

const Footer = () => {
  return (
    <div className="fixed md:hidden bottom-0 z-10 w-full bg-base-200">
      <div className="flex w-full h-full items-stretch p-4">
        <a href="/" className="flex-grow flex items-center justify-center">
          <HomeIcon className="h-6 w-6" />
        </a>
        <a href="/" className="flex-grow flex items-center justify-center">
          <PaperAirplaneIcon className="h-6 w-6" />
        </a>
        <a href="/" className="flex-grow flex items-center justify-center">
          <PlusCircleIcon className="h-6 w-6" />
        </a>
      </div>
    </div>
  );
};

export default Footer;
