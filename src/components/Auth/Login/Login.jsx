import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { Box, Alert, IconButton, Collapse } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { Button, TextField, Grid, Typography } from "@mui/material";

import { loginUser } from "../../../store/user/userSlice";
import { addError, removeError } from "../../../store/error/errorsSlice";
import { loginUserRequest } from "../../../api/usersRequests";

const initialFormFields = {
  username: "",
  password: "",
};

const Login = () => {
  //store the input values in state
  const [formFields, setFormFields] = useState(initialFormFields);

  //get errors from state
  const errors = useSelector((state) => state.errors.value);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { username, password } = formFields;

  //handle the submit logic
  const handleSubmit = async (e) => {
    e.preventDefault();

    const existingUser = await loginUserRequest(username, password);
    if (existingUser.status === 200) {
      dispatch(loginUser(existingUser.data));
    }

    const isLoggedIn = localStorage.getItem("user");
    if (isLoggedIn) {
      navigate("/");
    } else {
      dispatch(addError("Username or password is wrong!"));
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
      {errors.error ? (
        <Box sx={{ width: "100%" }}>
          <Collapse in={errors.open}>
            <Alert
              severity="error"
              action={
                <IconButton
                  aria-label="close"
                  color="inherit"
                  size="small"
                  onClick={() => {
                    dispatch(removeError());
                  }}
                >
                  <CloseIcon fontSize="inherit" />
                </IconButton>
              }
              sx={{ mb: 2 }}
            >
              {errors.error}
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
