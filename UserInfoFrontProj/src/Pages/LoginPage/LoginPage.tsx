import React, { useEffect, useState } from "react";
import {
  makeStyles,
  Paper,
  Typography,
  TextField,
  Button,
  CircularProgress,
} from "@material-ui/core";
import FormValidator from "./LoginFormValidations";
import { loginAuthenticationRequest } from "./Requests/LoginAuthenticationRequest";
import { Alert, Stack } from "@mui/material";
import backgroundImage from './../../assets/background.jpg'
import { useNavigate } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
    minHeight: '100vh',
    background: `url(${backgroundImage}) no-repeat center center fixed`,
    backgroundSize: 'cover',
  },
  paper: {
    padding: theme.spacing(2),
    width: 300,
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: theme.spacing(2),
  },
  loading: {
    display: "flex",
    justifyContent: "center",
    marginTop: theme.spacing(2),
  },
}));

const LoginPage: React.FC = () => {
  const classes = useStyles();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isValidEmail, setIsValidEmail] = useState(true);
  const [isValidPassword, setIsValidPassword] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loginButtonDisabled, setLoginDisabled] = useState(true);
  
  let navigate = useNavigate();

  const toggleLoginDisabled = () => {
    if (isValidEmail && isValidPassword) {
      setLoginDisabled(false);
    } else {
      setLoginDisabled(true);
    }
  };

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsValidEmail(FormValidator.isValidEmail(e.target.value));
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsValidPassword(FormValidator.isValidPassword(e.target.value));
    setPassword(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    loginAuthenticationRequest(username, password).then((result) => {
      navigate("/info", { state: { userDetails: result } });
    }).catch(() => {
      setError("Login failed. Please check your credentials.");
      setLoading(false);
    });
  };

  useEffect(() => {
    toggleLoginDisabled();
  }, [username, password]);

  return (
    <div className={classes.root}>
      <Paper className={classes.paper} elevation={3}>
        <Typography variant="h5" align="center">
          Login
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <TextField
            type="email"
            label="Username"
            variant="outlined"
            value={username}
            onChange={handleUsernameChange}
            error={!isValidEmail}
            helperText={username === '' || isValidEmail ? '' : 'Please enter a valid email eg:example@gmail.com'}
            required
            autoComplete="true"
          />
          <TextField
            label="Password"
            variant="outlined"
            type="password"
            value={password}
            error={!isValidPassword}
            helperText={password === '' || isValidPassword ? '' : "Password must be at least 8 characters and contain 1 capital letter"}
            onChange={handlePasswordChange}
            required
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={loading || loginButtonDisabled}
          >
            {loading ? <CircularProgress size={24} color="inherit" /> : "Login"}
          </Button>
        </form>
        {error && (
          <Stack sx={{ mt: 2 }}>
            <Alert severity="error">{error}</Alert>
          </Stack>
        )}
        {loading && (
          <div className={classes.loading}>
            <CircularProgress />
          </div>
        )}
      </Paper>
    </div>
  );
};

export default LoginPage;