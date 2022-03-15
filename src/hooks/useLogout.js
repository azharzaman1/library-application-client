import { useDispatch } from "react-redux";
import { axiosPrivate } from "../api/axios";
import { LOGOUT } from "../redux/slices/userSlice";
import { useSnackbar } from "notistack";

const useLogout = () => {
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const logout = async () => {
    dispatch(LOGOUT());
    try {
      const response = await axiosPrivate.get("/auth/logout");
      enqueueSnackbar(response.statusText, { variant: "success" });
    } catch (err) {
      console.log(err);
    }
  };
  return logout;
};

export default useLogout;
