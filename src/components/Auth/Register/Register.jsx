import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { TextField, Grid, Typography } from "@mui/material";
import { useSelector } from "react-redux";

import AuthFooter from "../AuthFooter/AuthFooter";
import AuthButton from "../AuthButton/AuthButton";
import ErrorPopup from "../../ErrorPopup/ErrorPopup";

import {
  loginUserRequest,
  registerUserRequest,
} from "../../../api/usersRequests";

import {
  useAuthActionsDispatch,
  useErrorActionsDispatch,
} from "../../../common/hooks/useActions";

const initialFormFields = {
  email: "",
  password: "",
  firstName: "",
  lastName: "",
};

const Register = () => {
  const { loginUser } = useAuthActionsDispatch();
  const { addError, removeError } = useErrorActionsDispatch();
  //store the values in state
  const [formFields, setFormFields] = useState(initialFormFields);

  //get the values
  const { email, password, firstName, lastName } = formFields;

  //form input error state
  const [errorText, setErrorText] = useState(initialFormFields);

  //get errors from state
  const errors = useSelector((state) => state.errors.value);

  let navigate = useNavigate();

  //validate every input length
  const checkInputLength = (e, name) => {
    if (e.target.value.length < 3 || e.target.value.length > 15) {
      setErrorText({
        ...errorText,
        [name]: `${name} must be between 3 and 15 letters`,
      });
    } else {
      setErrorText({ ...errorText, [name]: null });
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    checkInputLength(e, name);

    setFormFields({ ...formFields, [name]: value });
  };

  //handle submit logic
  const handleSubmit = async (e) => {
    e.preventDefault();

    const isFormValid = Object.values(errorText).every((val) => {
      if (val !== null) {
        return false;
      }
      return true;
    });

    if (!isFormValid) {
      addError("Please fill in all fields correctly!");
      return;
    }

    const register = await registerUserRequest({
      email,
      password,
      firstName,
      lastName,
    });

    if (register?.status === 200) {
      const login = await loginUserRequest(email, password);

      loginUser(login.data);
      removeError();

      navigate("/");
    }
  };
  return (
    <>
      <Grid item className="title">
        <Typography variant="h5">Register</Typography>
      </Grid>

      {errors.error ? (
        <ErrorPopup error={errors.error} open={errors.open} />
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
                onChange={handleChange}
                error={errorText.firstName}
                helperText={errorText.firstName}
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
                onChange={handleChange}
                error={errorText.lastName}
                helperText={errorText.lastName}
              />
            </Grid>
          </Grid>

          <br />
          <Grid
            container
            direction="column"
            spacing={2}
            className="input-fields"
          >
            <Grid item>
              <TextField
                type="text"
                label="Email"
                name="email"
                variant="outlined"
                required
                fullWidth
                autoFocus
                value={email}
                onChange={handleChange}
                error={errorText.email}
                helperText={errorText.email}
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
                onChange={handleChange}
                error={errorText.password}
                helperText={errorText.password}
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
