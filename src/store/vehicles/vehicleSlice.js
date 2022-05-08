import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: [
    {
      id: 1,
      userId: 1,
      make: "Opel",
      model: "Zafira",
      year: 2005,
      engineType: 5,
      gearbox: 1,
      condition: 1,
      horsePower: 100,
      color: "Blue",
      price: 2999,
      city: "Pleven",
      mileage: 123000,
      extras:
        "Cloth Seats, Cruise Control, Multi-Functional Steering Wheel, AC, Navigation ",
    },
    {
      id: 2,
      userId: 2,
      make: "Mini",
      model: "Cooper",
      year: 2009,
      engineType: 1,
      gearbox: 2,
      condition: 1,
      horsePower: 90,
      color: "Red",
      price: 4999,
      city: "Sliven",
      mileage: 93000,
      extras: "AC, Multi-Functional Steering Wheel, Heated Seats, Leather ",
    },
  ],
};

export const vehicleSlice = createSlice({
  name: "vehicles",
  initialState,
  reducers: {
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
  },
});

export const { addNewVehicle, removeVehicle } = vehicleSlice.actions;

export default vehicleSlice.reducer;
