import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { TextField, Grid, Typography } from "@mui/material";

import AuthFooter from "../AuthFooter/AuthFooter";
import AuthButton from "../AuthButton/AuthButton";
import ErrorPopup from "../../ErrorPopup/ErrorPopup";

import {
  useAuthActionsDispatch,
  useErrorActionsDispatch,
} from "../../../common/hooks/useActions";

import { loginUserRequest } from "../../../api/usersRequests";

const initialFormFields = {
  email: "",
  password: "",
};

const Login = () => {
  const { loginUser } = useAuthActionsDispatch();
  const { addError, removeError } = useErrorActionsDispatch();
  //store the input values in state
  const [formFields, setFormFields] = useState(initialFormFields);

  //get errors from state
  const errors = useSelector((state) => state.errors.value);
  const navigate = useNavigate();

  const { email, password } = formFields;

  //handle the submit logic
  const handleSubmit = async (e) => {
    e.preventDefault();

    const existingUser = await loginUserRequest(email, password);
    if (existingUser) {
      removeError();
      loginUser(existingUser.data);
      navigate("/");
    } else {
      addError("Email or password is wrong!");
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
        <ErrorPopup error={errors.error} open={errors.open} />
      ) : (
        ""
      )}

      <Grid item>
        <form onSubmit={handleSubmit}>
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
                onChange={handleChange}
                value={email}
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
            <AuthButton buttonText={"Sign In"} />
          </Grid>
        </form>
      </Grid>

      <AuthFooter isSignIn={true} />
    </>
  );
};
export default Login;
