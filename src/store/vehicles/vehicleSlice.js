import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: [],
};

export const vehicleSlice = createSlice({
  name: "vehicles",
  initialState,
  reducers: {
    setNewState: (state, action) => {
      state.value = action.payload;
    },
    addNewVehicle: (state, action) => {
      state.value.push(action.payload);
    },
    removeVehicle: (state, action) => {
      const vehicles = action.payload;

      vehicles.forEach((vehicle) => {
        state.value = state.value.filter((state) => {
          return state.id !== vehicle.id;
        });
      });
    },
    updateVehicle: (state, action) => {
      const vehicleId = action.payload.id;

      const findVehicle = state.value.find((veh) => veh.id === vehicleId);
      if (findVehicle) {
        const vehicleIndex = state.value.indexOf(findVehicle);
        state.value[vehicleIndex] = action.payload;
      }
    },
  },
});

export const { setNewState, addNewVehicle, removeVehicle, updateVehicle } =
  vehicleSlice.actions;

export default vehicleSlice.reducer;
