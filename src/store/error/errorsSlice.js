import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: {
    error: "",
    open: false,
  },
};

export const errorsSlice = createSlice({
  name: "errors",
  initialState,
  reducers: {
    addError: (state, action) => {
      state.value.open = true;
      state.value.error = action.payload;
    },
    removeError: (state, action) => {
      state.value.open = false;
      state.value.error = "";
    },
  },
});

export const { addError, removeError } = errorsSlice.actions;

export default errorsSlice.reducer;
