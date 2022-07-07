import { useState } from "react";
import {
  Button,
  FormControl,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
} from "@mui/material";
import Heading from "../../../components/Generic/Heading";
import Container from "../../../components/Generic/Layout/Container";
import Text from "../../../components/Generic/Text";
import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "react-query";
import axios from "../../../api/axios";
import { useSnackbar } from "notistack";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Visibility from "@mui/icons-material/Visibility";

const Register = () => {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [registering, setRegistering] = useState(false);

  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  // react-query register user
  const { mutate: register } = useMutation(
    async (userData) => {
      return await axios.post("/auth/register", userData);
    },
    {
      onSuccess: (res) => {
        console.log("User register response", res);
        enqueueSnackbar(res.statusText, {
          variant: "success",
        });
        resetForm();
        setRegistering(false);

        res.status === 201 && navigate("/auth/login", { replace: true });
      },
      onError: (err) => {
        const statusText = err.response.statusText;
        setRegistering(false);
        enqueueSnackbar(statusText, {
          variant: "error",
        });
      },
    }
  );

  const handleRegister = (e) => {
    e.preventDefault();
    if (email && password && userName) {
      setRegistering(true);

      register({
        username: userName,
        email,
        pswd: password,
      });
    }
  };

  const resetForm = () => {
    setUserName("");
    setEmail("");
    setPassword("");
  };

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
            onSubmit={handleRegister}
            className="py-8 px-6 w-full bg-white shadow rounded-lg border select-none"
          >
            <Grid container rowSpacing={3}>
              <Grid xs={12}>
                <Heading type="secondary" className="text-center mt-3">
                  Register an account
                </Heading>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  autoFocus
                  fullWidth
                  type="text"
                  name="username"
                  id="username-input"
                  label="Username"
                  variant="outlined"
                  value={userName}
                  onChange={(e) =>
                    setUserName(
                      e.target.value.toLowerCase().replace(/\s+/g, "")
                    )
                  }
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  autoComplete={false}
                  type="email"
                  name="email"
                  id="email-input"
                  label="Email address"
                  variant="outlined"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth variant="outlined">
                  <InputLabel htmlFor="login-password-input">
                    Password
                  </InputLabel>
                  <OutlinedInput
                    id="login-password-input"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
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
                    label="Password"
                  />
                </FormControl>
              </Grid>
              <input type="submit" className="hidden" />
              <Grid item xs={12}>
                <Button
                  disabled={registering}
                  variant="contained"
                  fullWidth
                  onClick={handleRegister}
                >
                  {registering ? "..." : "Register account"}
                </Button>
              </Grid>
            </Grid>
          </form>
          <div className="flex items-center space-x-2 justify-center mt-2">
            <Text>Already have an account?</Text>
            <Link
              to="/auth/login"
              className="hover:text-primary transition-colors duration-200"
            >
              Login
            </Link>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Register;
