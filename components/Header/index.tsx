import UserEmber from './UserEmber';

const Header = () => {
  return (
    <div className="absolute top-0 z-20 w-full">
      <div className="lg:w-1/2 lg:mx-auto bg-base-200 bg-opacity-50 shadow-lg shadow-black backdrop-blur-lg">
        <div className="flex w-full items-center justify-between">
          <div className="flex w-1/4 justify-end gap-2">
            <UserEmber />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
