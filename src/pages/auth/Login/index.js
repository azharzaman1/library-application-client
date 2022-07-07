import { useEffect, useState } from "react";
import {
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormHelperText,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
} from "@mui/material";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useMutation } from "react-query";
import { useDispatch, useSelector } from "react-redux";
import { axiosPrivate } from "../../../api/axios";
import { useSnackbar } from "notistack";
import {
  selectSessionPersist,
  SET_SESSION_PERSIST,
  SET_USER,
  SET_USER_TYPE,
} from "../../../redux/slices/userSlice";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Heading from "../../../components/Generic/Heading";
import Container from "../../../components/Generic/Layout/Container";
import Text from "../../../components/Generic/Text";

const Login = () => {
  const persistSession = useSelector(selectSessionPersist);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loggingIn, setLoggingIn] = useState(false);

  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  console.log(location.state?.from?.pathname);
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
        const roles = Object.values(res.data.user.roles);
        dispatch(SET_USER({ ...res.data.user, roles }));
        dispatch(SET_USER_TYPE(roles));

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

  const handlePersistanceChange = (e) => {
    dispatch(SET_SESSION_PERSIST(e.target.checked));
  };

  useEffect(() => {
    localStorage.setItem("library-application-session-persist", persistSession);
  }, [persistSession]);

  const handleClickShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
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
                  helperText="Test email: admin@library.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControl variant="outlined" fullWidth>
                  <InputLabel htmlFor="login-password-input">
                    Password
                  </InputLabel>
                  <OutlinedInput
                    id="login-password-input"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    label="Password"
                    aria-describedby="login-password-helper-text"
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    }
                  />
                  <FormHelperText id="login-password-helper-text">
                    Test password: admin
                  </FormHelperText>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <FormGroup>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={persistSession}
                        onChange={handlePersistanceChange}
                      />
                    }
                    label="Remember me"
                  />
                </FormGroup>
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
