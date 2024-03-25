import { navLists } from "../constants";
import { appleImg, bagImg, searchImg } from "../utils";

const Navbar = () => {
  return (
    <header className="w-full py-5 sm:px-10 px-5 flex justify-between items-center">
      <nav className="w-full flex screen-max-width">
        <img src={appleImg} alt="apple" width={18} height={14} />
        <div className="flex flex-1 justify-center max-sm:hidden">
          {navLists.map((nav) => (
            <div key={nav}>{nav}</div>
          ))}
        </div>

        <img src={searchImg} alt="search" width={18} height={18} />
        <img src={bagImg} alt="bag" width={18} height={18} />
      </nav>
    </header>
  );
};

export default Navbar;
