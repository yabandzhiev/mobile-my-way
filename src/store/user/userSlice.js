import { createSlice } from "@reduxjs/toolkit";

const user = JSON.parse(localStorage.getItem("user"));
const initialState = {
  value: {
    loggedInUser: user ? user : {},
  },
};
const setLocalStorageUser = (token, id, email, firstName, lastName) => {
  return localStorage.setItem(
    "user",
    JSON.stringify(token, id, email, firstName, lastName)
  );
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginUser: (state, action) => {
      const token = action.payload.jwtToken;
      const { id, email, firstName, lastName } = action.payload.user;

      state.value.loggedInUser = { id, email, firstName, lastName };
      setLocalStorageUser({ token, id, email, firstName, lastName });
    },
    logoutUser: (state, action) => {
      localStorage.removeItem("user");
      state.value.loggedInUser = {};
    },
  },
});

export const { registerUser, loginUser, logoutUser } = userSlice.actions;

export default userSlice.reducer;
