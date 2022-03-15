import { useDispatch } from "react-redux";
import { axiosPrivate } from "../api/axios";
import { SET_USER } from "../redux/slices/userSlice";
import useAuth from "./useAuth";

const useRefreshToken = () => {
  const dispatch = useDispatch();
  const currentUser = useAuth();

  const refresh = async () => {
    const response = await axiosPrivate.get("/api/v1/tokens/refresh");
    console.log("Refresh Token Response", response.data);
    console.log("prev token", currentUser?.accessToken);
    console.log("new token", response.data.accessToken);
    dispatch(SET_USER({ ...currentUser, ...response.data }));

    return response.data.accessToken;
  };
  return refresh;
};

export default useRefreshToken;
