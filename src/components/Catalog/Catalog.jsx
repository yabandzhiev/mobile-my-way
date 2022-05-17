import React, { useEffect } from "react";
import MaterialTable from "material-table";
import { useSelector, useDispatch } from "react-redux";

import { columns } from "../../constants/columns";
import {
  setNewState,
  addNewVehicle,
  removeVehicle,
  updateVehicle,
} from "../../store/vehicles/vehicleSlice";
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
    const getVehicles = async () => {
      const vehiclesResult = await getAllCarsRequest();
      return dispatch(setNewState(vehiclesResult.data));
      //rezultata slagame v state-a i sled tova promeni v state-a/ pri refresh -> request s promenite ot state-a kum api
    };
    getVehicles();
  }, []);

  //get cars and user from state
  const data = JSON.parse(JSON.stringify(useSelector((state) => state.vehicles.value)));
  const userData = useSelector((state) => state.user.value.loggedInUser);
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
      <MaterialTable
        columns={columns}
        data={dataToDisplay}
        title="Mobile"
        options={{ addRowPosition: "first", pageSize: dataToDisplay.length > 5 ? 10 : 5 }}
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
                    reject();
                  } else {
                    const add = async () => {
                      newData.user = userData;
                      const response = await createCarRequest(
                        localStorageUser.token,
                        newData
                      );
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
                    if (newData[key] === "") {
                      return reject();
                    }
                  }

                  const edit = async () => {
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
