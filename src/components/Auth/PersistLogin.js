import { Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import useRefreshToken from "../../hooks/useRefreshToken";
import { useDispatch, useSelector } from "react-redux";
import { selectSessionPersist, SET_USER } from "../../redux/slices/userSlice";

const PersistLogin = () => {
  const dispatch = useDispatch();
  const persistSession = useSelector(selectSessionPersist);
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
    !currentUser?.accessToken && persistSession
      ? verifyRefreshToken()
      : setIsLoading(false);

    return () => {
      mounted = false;
    };
  }, [currentUser, persistSession, refresh, dispatch]);

  return (
    <>
      {!persistSession ? (
        <Outlet />
      ) : isLoading ? (
        <div>Loading...</div>
      ) : (
        <Outlet />
      )}
    </>
  );
};

export default PersistLogin;
