import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import { Box, Alert, IconButton, Collapse } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

import { loginUser } from "../../../store/user/userSlice";
import { Button, TextField, Grid, Typography } from "@mui/material";

const initialFormFields = {
  username: "",
  password: "",
};

const Login = () => {
  //store the input values in state
  const [formFields, setFormFields] = useState(initialFormFields);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //add error popup
  const [error, setError] = useState("");
  const [open, setOpen] = useState(false);

  const { username, password } = formFields;

  //handle the submit logic
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser({ username, password }));

    const isLoggedIn = localStorage.getItem("user");
    if (isLoggedIn) {
      navigate("/");
    } else {
      setError("Username or password is wrong!");
      setOpen(true);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormFields({ ...formFields, [name]: value });
  };
  return (
    <>
      <Grid item className="title">
        <Typography variant="h5">Sign in</Typography>
      </Grid>
      {error ? (
        <Box sx={{ width: "100%" }}>
          <Collapse in={open}>
            <Alert
              severity="error"
              action={
                <IconButton
                  aria-label="close"
                  color="inherit"
                  size="small"
                  onClick={() => {
                    setOpen(false);
                  }}
                >
                  <CloseIcon fontSize="inherit" />
                </IconButton>
              }
              sx={{ mb: 2 }}
            >
              {error}
            </Alert>
          </Collapse>
        </Box>
      ) : (
        ""
      )}
      <Grid item>
        <form onSubmit={handleSubmit}>
          <Grid container direction="column" spacing={2} className="input-fields">
            <Grid item>
              <TextField
                type="text"
                label="Username"
                name="username"
                variant="outlined"
                onChange={handleChange}
                value={username}
                required
                fullWidth
                autoFocus
              />
            </Grid>
            <Grid item>
              <TextField
                type="password"
                label="Password"
                name="password"
                variant="outlined"
                onChange={handleChange}
                value={password}
                fullWidth
                required
              />
            </Grid>
            <Grid item>
              <Button variant="contained" type="submit" className="button-block">
                Sign In
              </Button>
            </Grid>
          </Grid>
        </form>
      </Grid>

      <Grid item className="links">
        <Link to="/register">Dont have an account?</Link>
      </Grid>
      <Grid item className="links">
        <Link to="/">Continue to catalog</Link>
      </Grid>
      <Grid item className="logo">
        <img src="/carLogo.png" alt="logo" />
        <br />
        <span>Copyright © Mobile2022</span>
      </Grid>
    </>
  );
};
export default Login;
