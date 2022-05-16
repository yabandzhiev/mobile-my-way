import { createSlice } from "@reduxjs/toolkit";

const user = JSON.parse(localStorage.getItem("user"));
const initialState = {
  value: {
    loggedInUser: user ? user : {},
    allUsers: [
      [1, "pesho", "1234", "Pesho", "Peshov"],
      [2, "sasho", "1234", "Sasho", "Sashkov"],
    ],
  },
};
const setLocalStorageUser = (token, id, username, firstName, lastName) => {
  return localStorage.setItem(
    "user",
    JSON.stringify(token, id, username, firstName, lastName)
  );
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginUser: (state, action) => {
      const token = action.payload.jwtToken;
      const { id, username, firstName, lastName } = action.payload.user;

      state.value.loggedInUser = { token, id, username, firstName, lastName };
      setLocalStorageUser({ token, id, username, firstName, lastName });
    },
    logoutUser: (state, action) => {
      localStorage.removeItem("user");
      state.value.loggedInUser = {};
    },
  },
});

export const { registerUser, loginUser, logoutUser } = userSlice.actions;

export default userSlice.reducer;
