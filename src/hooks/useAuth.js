import { useDebugValue } from "react";
import { selectUser } from "../redux/slices/userSlice";
import { useSelector } from "react-redux";

const useAuth = () => {
  const currentUser = useSelector(selectUser);
  useDebugValue(currentUser, (currentUser) =>
    currentUser ? "Logged In" : "Logged Out"
  );
  return currentUser;
};

export default useAuth;
