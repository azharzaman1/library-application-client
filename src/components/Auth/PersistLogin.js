import { Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import useRefreshToken from "../../hooks/useRefreshToken";
import { useDispatch } from "react-redux";
import { SET_USER } from "../../redux/slices/userSlice";

const PersistLogin = () => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const refresh = useRefreshToken();
  const currentUser = useAuth();

  useEffect(() => {
    let mounted = true;
    const verifyRefreshToken = async () => {
      try {
        await refresh();
      } catch (err) {
        console.log(err);
      } finally {
        mounted && setIsLoading(false);
      }
    };
    !currentUser?.accessToken ? verifyRefreshToken() : setIsLoading(false);

    return () => {
      mounted = false;
    };
  }, [currentUser, refresh, dispatch]);

  useEffect(() => {
    console.log("isLoading", isLoading);
    console.log("Access Token In Persist", currentUser?.accessToken);
  }, [isLoading, currentUser]);

  return <>{isLoading ? <div>Loading...</div> : <Outlet />}</>;
};

export default PersistLogin;
