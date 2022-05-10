import React from "react";
import MaterialTable from "material-table";
import { useSelector, useDispatch } from "react-redux";
import { v4 as uuid } from "uuid";

import { columns } from "../../constants/columns";
import {
  addNewVehicle,
  removeVehicle,
  updateVehicle,
} from "../../store/vehicles/vehicleSlice";

//check if rows are empty
const validateRow = (row) => {
  return Object.values(row).length === columns.length;
};

const Catalog = () => {
  //get cars and user from state
  const data = JSON.parse(JSON.stringify(useSelector((state) => state.vehicles.value)));
  const userData = useSelector((state) => state.user.value.loggedInUser);
  const dispatch = useDispatch();

  const userId = userData ? userData.userId : "";
  let dataToDisplay = data;

  //Check if there is user and sort cars
  if (userId) {
    const userVehicles = data.filter((vehicle) => vehicle.userId === userId);
    const restOfVehicles = data.filter((vehicle) => vehicle.userId !== userId);

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
          isEditable: (rowData) => (userId ? rowData.userId === userId : rowData),
          isEditHidden: (rowData) => (userId ? rowData.userId !== userId : rowData),
          isDeletable: (rowData) => (userId ? rowData.userId === userId : rowData),
          isDeleteHidden: (rowData) => (userId ? rowData.userId !== userId : rowData),

          onRowAdd: userId
            ? (newData) =>
                new Promise((resolve, reject) => {
                  const isDataValid = validateRow(newData);
                  if (!isDataValid) {
                    reject();
                  } else {
                    setTimeout(() => {
                      newData.id = uuid();
                      newData.userId = userId;
                      dispatch(addNewVehicle(newData));

                      resolve();
                    }, 1000);
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

                  setTimeout(() => {
                    dispatch(updateVehicle(newData));

                    resolve();
                  }, 1000);
                })
            : null,

          onRowDelete: userId
            ? (oldData) =>
                new Promise((resolve, reject) => {
                  setTimeout(() => {
                    dispatch(removeVehicle([oldData]));

                    resolve();
                  }, 1000);
                })
            : null,
        }}
      />
    </div>
  );
};

export default Catalog;
