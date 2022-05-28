import { useDispatch } from "react-redux";
import { bindActionCreators } from "@reduxjs/toolkit";

import { registerUser, loginUser, logoutUser } from "../../store/user/userSlice";
import { addError, removeError } from "../../store/error/errorsSlice";
import {
  setNewState,
  addNewVehicle,
  removeVehicle,
  updateVehicle,
} from "../../store/vehicles/vehicleSlice";

export const useCrudActionsDispatch = () => {
  const dispatch = useDispatch();
  return bindActionCreators(
    { setNewState, addNewVehicle, removeVehicle, updateVehicle },
    dispatch
  );
};

export const useAuthActionsDispatch = () => {
  const dispatch = useDispatch();
  return bindActionCreators({ loginUser, registerUser, logoutUser }, dispatch);
};

export const useErrorActionsDispatch = () => {
  const dispatch = useDispatch();
  return bindActionCreators({ addError, removeError }, dispatch);
};
