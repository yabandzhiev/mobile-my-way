import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button, TextField, Grid, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { v4 as uuid } from "uuid";
import CloseIcon from "@mui/icons-material/Close";
import { Box, Alert, IconButton, Collapse } from "@mui/material";

import AuthFooter from "../AuthFooter/AuthFooter";

import { addError, removeError } from "../../../store/error/errorsSlice";
import { loginUserRequest, registerUserRequest } from "../../../api/usersRequests";
import { loginUser } from "../../../store/user/userSlice";
import AuthButton from "../AuthButton/AuthButton";

const Register = () => {
  //store the values in state
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  //get errors from state
  const errors = useSelector((state) => state.errors.value);

  let navigate = useNavigate();
  const dispatch = useDispatch();

  //handle submit logic
  const handleSubmit = async (e) => {
    e.preventDefault();

    //iznasqne !!!
    if (
      firstName.length < 3 ||
      lastName.length < 3 ||
      username.length < 3 ||
      password.length < 3
    ) {
      return dispatch(addError("Something isn't the exact length it has to be!"));
    }

    const id = uuid();
    const register = await registerUserRequest({
      id,
      username,
      password,
      firstName,
      lastName,
    });

    if (register.status === 200) {
      const login = await loginUserRequest(username, password);

      dispatch(loginUser(login.data));
      dispatch(removeError());

      navigate("/");
    }
  };
  return (
    <>
      <Grid item className="title">
        <Typography variant="h5">Register</Typography>
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
          <Grid container columnSpacing={2} className="name-input-fields">
            <Grid item>
              <TextField
                type="text"
                label="First name"
                name="firstName"
                variant="outlined"
                required
                autoFocus
                fullWidth
                value={firstName}
                onChange={(e) => {
                  setFirstName(e.target.value);
                }}
                error={firstName.length < 3 || firstName.length > 30}
                helperText={
                  firstName.length < 3
                    ? "Name must be 3 letters or more!"
                    : " " && firstName.length > 30
                    ? "Name must be below 30 letters"
                    : ""
                }
              />
            </Grid>
            <Grid item>
              <TextField
                type="text"
                label="Last Name"
                name="lastName"
                variant="outlined"
                required
                autoFocus
                fullWidth
                value={lastName}
                onChange={(e) => {
                  setLastName(e.target.value);
                }}
                //iznasqne otnovo! isTextLengthInBoundary
                error={lastName.length < 3 || lastName.length > 30}
                //errorMessage
                helperText={
                  lastName.length < 3
                    ? "Last name must be 3 letters or more!"
                    : " " && lastName.length > 30
                    ? "Last name must be below 30 letters"
                    : ""
                }
              />
            </Grid>
          </Grid>

          <br />
          <Grid container direction="column" spacing={2} className="input-fields">
            <Grid item>
              <TextField
                type="text"
                label="Username"
                name="username"
                variant="outlined"
                required
                fullWidth
                autoFocus
                value={username}
                onChange={(e) => {
                  setUsername(e.target.value);
                }}
                error={username.length < 3 || username.length > 30}
                helperText={
                  username.length < 3
                    ? "Username must be 3 letters or more!"
                    : " " && username.length > 30
                    ? "Username must be below 30 letters"
                    : ""
                }
              />
            </Grid>
            <Grid item>
              <TextField
                type="password"
                label="Password"
                name="password"
                variant="outlined"
                required
                fullWidth
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                error={password.length < 3 || password.length > 30}
                helperText={
                  password.length < 3
                    ? "Password must be 3 letters or more!"
                    : " " && password.length > 30
                    ? "Password must be below 30 letters"
                    : ""
                }
              />
            </Grid>
            <AuthButton buttonText={"Sign Up"} />
          </Grid>
        </form>
      </Grid>

      <AuthFooter />
    </>
  );
};

export default Register;
