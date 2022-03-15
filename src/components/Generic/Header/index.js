import { Divider } from "@mui/material";
import { Link } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
import UserMenu from "./UserMenu";

const Header = () => {
  const currentUser = useAuth();
  return (
    <header className="flex justify-between px-3 md:px-6 lg:px-16 bg-white shadow border-b border-gray-200 py-3">
      <div>
        <h3 className="font-semibold text-xl">
          <Link to="/">Library Application</Link>
        </h3>
      </div>
      <div className="flex-1 flex justify-end items-center space-x-2 md:space-x-3 lg:space-x-4">
        <nav className="flex space-x-2 md:space-x-3 lg:space-x-5">
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
        <Divider orientation="vertical" flexItem />
        <div className="user-nav">
          {currentUser ? (
            <div>
              <UserMenu />
            </div>
          ) : (
            <div className="flex items-center space-x-2">
              <Link
                to="/auth/login"
                className="hover:text-primary transition-colors duration-150"
              >
                Login
              </Link>
              <div>/</div>
              <Link
                to="/auth/register"
                className="hover:text-primary transition-colors duration-150"
              >
                Register
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
