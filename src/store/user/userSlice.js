import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuid } from "uuid";

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
const setLocalStorageUser = (id, username, firstName, lastName) => {
  return localStorage.setItem(
    "user",
    JSON.stringify([id, username, firstName, lastName])
  );
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    registerUser: (state, action) => {
      const { username, password, firstName, lastName } = action.payload;
      const randomId = uuid();

      setLocalStorageUser(randomId, username, firstName, lastName);

      state.value.allUsers.push([randomId, username, password, firstName, lastName]);
      state.value.loggedInUser = { randomId, username, firstName, lastName };
    },
    loginUser: (state, action) => {
      const { username, password } = action.payload;
      const existingUser = state.value.allUsers?.find((user) => user[1] === username);

      if (existingUser) {
        const userPassword = existingUser[2];
        if (userPassword === password) {
          const userId = existingUser[0];
          const firstName = existingUser[3];
          const lastName = existingUser[4];
          state.value.loggedInUser = { userId, username, firstName, lastName };
          setLocalStorageUser(userId, username, firstName, lastName);
        }
      } else {
        return state;
      }
    },
    logoutUser: (state, action) => {
      localStorage.removeItem("user");
      state.value.loggedInUser = {};
    },
  },
});

export const { registerUser, loginUser, logoutUser } = userSlice.actions;

export default userSlice.reducer;
