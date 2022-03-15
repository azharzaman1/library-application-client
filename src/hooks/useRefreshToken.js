import { useDispatch } from "react-redux";
import { axiosPrivate } from "../api/axios";
import { LOGOUT, SET_USER } from "../redux/slices/userSlice";
import useAuth from "./useAuth";

const useRefreshToken = () => {
  const dispatch = useDispatch();
  const currentUser = useAuth();

  const refresh = async () => {
    try {
      const response = await axiosPrivate.get("/api/v1/tokens/refresh");
      console.log("Refresh Token Response", response.data);
      dispatch(SET_USER({ ...currentUser, ...response.data }));
      return response.data.accessToken;
    } catch (err) {
      if (err.response.status === 403) {
        // mean refresh token in cookie is not valid or expired
        dispatch(LOGOUT());
        console.log(err.response);
      }
      console.log(err.response);
    }
  };
  return refresh;
};

export default useRefreshToken;
