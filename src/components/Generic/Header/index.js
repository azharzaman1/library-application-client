import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="flex justify-between px-3 md:px-6 lg:px-16 bg-white shadow border-b border-gray-200 py-3">
      <div>
        <h3 className="font-semibold text-xl">Library Application</h3>
      </div>
      <nav className="flex-1 flex justify-end items-center space-x-2 md:space-x-3 lg:space-x-5">
        <Link
          className="hover:text-primary transition-all duration-150"
          to="students"
        >
          Students
        </Link>
        <Link
          className="hover:text-primary transition-all duration-150"
          to="books"
        >
          Books
        </Link>
      </nav>
    </header>
  );
};

export default Header;
