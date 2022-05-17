import React, { useEffect } from "react";
import MaterialTable from "material-table";
import { useSelector, useDispatch } from "react-redux";
import { Box, Alert, IconButton, Collapse } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

import { columns } from "../../constants/columns";

import {
  setNewState,
  addNewVehicle,
  removeVehicle,
  updateVehicle,
} from "../../store/vehicles/vehicleSlice";

import { addError, removeError } from "../../store/error/errorsSlice";

import {
  createCarRequest,
  deleteCarRequest,
  editCarRequest,
  getAllCarsRequest,
} from "../../api/carsRequests";

//check if rows are empty
const validateRow = (row) => {
  return Object.values(row).length === columns.length;
};

const Catalog = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(removeError());
    const getVehicles = async () => {
      const vehiclesResult = await getAllCarsRequest();
      return dispatch(setNewState(vehiclesResult.data));
    };
    getVehicles();
  }, []);

  //get cars,user and errors from state
  const data = JSON.parse(JSON.stringify(useSelector((state) => state.vehicles.value)));
  const userData = useSelector((state) => state.user.value.loggedInUser);
  const errors = useSelector((state) => state.errors.value);
  let localStorageUser = "";

  const userId = userData ? userData.id : "";
  let dataToDisplay = data;

  //Check if there is user and sort cars
  if (userId) {
    localStorageUser = JSON.parse(localStorage.getItem("user"));
    const userVehicles = data.filter((vehicle) => vehicle.user.id === userId);
    const restOfVehicles = data.filter((vehicle) => vehicle.user.id !== userId);

    dataToDisplay = [...userVehicles, ...restOfVehicles];
  }

  return (
    <div>
      {errors.error ? (
        <Box sx={{ width: "100%" }}>
          <Collapse in={errors.open}>
            <Alert
              severity="error"
              action={
                <IconButton
                  aria-label="close"
                  color="inherit"
                  size="small"
                  onClick={() => {
                    dispatch(removeError());
                  }}
                >
                  <CloseIcon fontSize="inherit" />
                </IconButton>
              }
              sx={{ backgroundColor: "rgb(253, 237, 237) !important" }}
            >
              {errors.error}
            </Alert>
          </Collapse>
        </Box>
      ) : (
        ""
      )}
      <MaterialTable
        columns={columns}
        data={dataToDisplay}
        title="Mobile"
        options={{
          addRowPosition: "first",
          pageSize: dataToDisplay.length > 10 ? 20 : 10,
        }}
        editable={{
          isEditable: (rowData) => (userId ? rowData.user.id === userId : rowData),
          isEditHidden: (rowData) => (userId ? rowData.user.id !== userId : rowData),
          isDeletable: (rowData) => (userId ? rowData.user.id === userId : rowData),
          isDeleteHidden: (rowData) => (userId ? rowData.user.id !== userId : rowData),

          onRowAdd: userId
            ? (newData) =>
                new Promise((resolve, reject) => {
                  const isDataValid = validateRow(newData);
                  if (!isDataValid) {
                    dispatch(addError("Fill in all fields first!"));
                    reject();
                  } else {
                    const add = async () => {
                      newData.user = userData;
                      const response = await createCarRequest(
                        localStorageUser.token,
                        newData
                      );
                      dispatch(removeError());

                      dispatch(addNewVehicle(response.data));

                      resolve();
                    };
                    add();
                  }
                })
            : null,

          onRowUpdate: userId
            ? (newData) =>
                new Promise((resolve, reject) => {
                  //check if every field is filled
                  for (let key in newData) {
                    if (newData[key] === "" || newData[key] === 0) {
                      dispatch(addError("Fill in all fields first!"));
                      reject();
                      return;
                    }
                  }

                  const edit = async () => {
                    dispatch(removeError());
                    dispatch(updateVehicle(newData));
                    await editCarRequest(localStorageUser.token, newData, userId);
                    resolve();
                  };
                  edit();
                })
            : null,

          onRowDelete: userId
            ? (oldData) =>
                new Promise((resolve, reject) => {
                  const deleteRow = async () => {
                    dispatch(removeVehicle([oldData]));
                    await deleteCarRequest(localStorageUser.token, oldData.id, userId);

                    resolve();
                  };
                  deleteRow();
                })
            : null,
        }}
      />
    </div>
  );
};

export default Catalog;
