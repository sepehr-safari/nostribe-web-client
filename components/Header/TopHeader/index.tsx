import { Avatar, Searchbar } from '@/components';
import UserEmber from './UserEmber';

const TopHeader = () => {
  return (
    <nav className="navbar justify-center">
      <div className="w-full max-w-screen-xl">
        <div className="flex w-full items-center justify-between">
          <div className="flex w-1/4 items-center gap-2">
            <Avatar url="/nostribe.png" />

            <h1 className="text-lg font-bold normal-case md:text-xl">
              Nostribe
            </h1>
          </div>

          <div className="flex w-1/3 px-2">
            <Searchbar />
          </div>

          <div className="flex w-1/4 justify-end gap-2">
            <UserEmber />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default TopHeader;
