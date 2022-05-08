import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button, TextField, Grid, Typography } from "@mui/material";
import { useDispatch } from "react-redux";

import { registerUser } from "../../../store/user/userSlice";

const SignUp = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  let navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(registerUser({ firstName, lastName, username, password }));
    navigate("/");
  };
  return (
    <>
      <Grid item className="title">
        <Typography variant="h5">Register</Typography>
      </Grid>
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
              />
            </Grid>
            <Grid item>
              <Button variant="contained" type="submit" className="button-block">
                Sign Up
              </Button>
            </Grid>
          </Grid>
        </form>
      </Grid>

      <Grid item className="links">
        <p>
          Already have an account? <Link to="/login">Sign in</Link>
        </p>
      </Grid>

      <Grid item className="logo">
        <span>Copyright © Mobile2022</span>
      </Grid>
    </>
  );
};

export default SignUp;
