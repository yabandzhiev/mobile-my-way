import React, { useEffect } from "react";
import MaterialTable from "material-table";
import { useSelector } from "react-redux";

import ErrorPopup from "../ErrorPopup/ErrorPopup";

import { columns } from "../../constants/columns";

import {
  useErrorActionsDispatch,
  useCrudActionsDispatch,
} from "../../common/hooks/useActions";

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
  const { addError, removeError } = useErrorActionsDispatch();
  const { setNewState, addNewVehicle, removeVehicle, updateVehicle } =
    useCrudActionsDispatch();
  //get cars,user and errors from state
  const data = JSON.parse(JSON.stringify(useSelector((state) => state.vehicles.value)));
  const userData = useSelector((state) => state.user.value.loggedInUser);
  const errors = useSelector((state) => state.errors.value);
  let localStorageUser = "";

  const userId = userData ? userData.id : "";
  let dataToDisplay = data;
  const lengthOfTable = dataToDisplay.length > 10 ? 20 : 10;

  useEffect(() => {
    removeError();

    getVehicles();
  }, []);

  const getVehicles = async () => {
    const vehiclesResult = await getAllCarsRequest();
    return setNewState(vehiclesResult.data);
  };

  //Check if there is user and sort cars
  if (userId) {
    localStorageUser = JSON.parse(localStorage.getItem("user"));
    const userVehicles = data.filter((vehicle) => vehicle.user.id === userId);
    const restOfVehicles = data.filter((vehicle) => vehicle.user.id !== userId);

    dataToDisplay = [...userVehicles, ...restOfVehicles];
  }

  return (
    <div>
      {errors.error ? <ErrorPopup error={errors.error} open={errors.open} /> : ""}

      <MaterialTable
        columns={columns}
        data={dataToDisplay}
        title="Mobile"
        options={{
          addRowPosition: "first",
          pageSize: lengthOfTable,
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
                    addError("Fill in all fields first!");
                    reject();
                  } else {
                    const add = async () => {
                      newData.user = userData;
                      const response = await createCarRequest(
                        localStorageUser.token,
                        newData
                      );
                      removeError();

                      addNewVehicle(response.data);

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
                      addError("Fill in all fields first!");
                      reject();
                      return;
                    }
                  }

                  const edit = async () => {
                    removeError();
                    updateVehicle(newData);
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
                    removeVehicle([oldData]);
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
