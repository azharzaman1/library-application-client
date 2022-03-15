import { useState } from "react";
import { Button, Grid, TextField } from "@mui/material";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useMutation } from "react-query";
import { useDispatch } from "react-redux";
import { axiosPrivate } from "../../../api/axios";
import { useSnackbar } from "notistack";
import { SET_USER } from "../../../redux/slices/userSlice";
import Heading from "../../../components/Generic/Heading";
import Container from "../../../components/Generic/Layout/Container";
import Text from "../../../components/Generic/Text";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loggingIn, setLoggingIn] = useState(false);

  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from?.pathname || "/";
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
        resetForm();
        setLoggingIn(false);
        dispatch(SET_USER(res.data.user));
        // if statusCode == 200, mean successful login
        res.status === 202 && navigate(from, { replace: true });
      },
      onError: (err) => {
        const statusText = err.response.statusText;
        setLoggingIn(false);
        enqueueSnackbar(statusText, {
          variant: "error",
        });
      },
    }
  );

  const handleLogin = () => {
    if (email && password) {
      setLoggingIn(true);

      login({
        email,
        pswd: password,
      });
    }
  };

  const resetForm = () => {
    setEmail("");
    setPassword("");
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <Container maxWidth={false}>
        <div className="flex flex-col items-center justify-center w-[450px] max-w-[100vw] mx-auto">
          <form
            onSubmit={handleLogin}
            className="py-8 px-6 w-full bg-white shadow rounded-lg border select-none"
          >
            <Grid container rowSpacing={3}>
              <Grid xs={12}>
                <Heading type="secondary" className="text-center mt-3">
                  Welcome back
                </Heading>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  autoFocus
                  fullWidth
                  autoComplete={false}
                  type="email"
                  id="email-input"
                  label="Email address"
                  variant="outlined"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  type="password"
                  id="fullname-input"
                  label="Password"
                  variant="outlined"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Grid>
              <input type="submit" className="hidden" />
              <Grid item xs={12}>
                <Button
                  disabled={loggingIn}
                  variant="contained"
                  fullWidth
                  onClick={handleLogin}
                >
                  {loggingIn ? "..." : "Login"}
                </Button>
              </Grid>
            </Grid>
          </form>
          <div className="flex items-center space-x-2 justify-center mt-2">
            <Text>Don't have an account?</Text>
            <Link
              to="/auth/register"
              className="hover:text-primary transition-colors duration-200"
            >
              Register
            </Link>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Login;
