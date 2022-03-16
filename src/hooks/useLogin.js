import { useSnackbar } from "notistack";
import { useMutation } from "react-query";
import { useDispatch } from "react-redux";
import { axiosPrivate } from "../api/axios";
import { SET_USER, SET_USER_TYPE } from "../redux/slices/userSlice";

const useLogin = () => {
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  // react-query login user
  const { mutate: login } = useMutation(
    async (userData) => {
      return await axiosPrivate.post("/auth/login", userData);
    },
    {
      onSuccess: (res) => {
        console.log("User login response", res);
        enqueueSnackbar(res.statusText, {
          variant: "success",
        });
        dispatch(SET_USER(res.data?.user));
        dispatch(SET_USER_TYPE(res.data?.user.roles));
      },
      onError: (err) => {
        const statusText = err.response.statusText;
        enqueueSnackbar(statusText, {
          variant: "error",
        });
      },
    }
  );

  return login;
};

export default useLogin;
