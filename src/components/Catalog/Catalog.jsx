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

const Catalog = () => {
  const data = JSON.parse(JSON.stringify(useSelector((state) => state.vehicles.value)));
  const userData = useSelector((state) => state.user.value.loggedInUser);
  const dispatch = useDispatch();

  let dataToDisplay = data;
  let userId = userData ? userData.userId : "";

  if (userId) {
    const userVehicles = data.filter((vehicle) => vehicle.userId === userId);
    const restOfData = data.filter((vehicle) => vehicle.userId !== userId);

    restOfData.unshift(...userVehicles);
    dataToDisplay = restOfData;
  }

  return (
    <div>
      <MaterialTable
        columns={columns}
        data={dataToDisplay}
        title="Mobile"
        editable={{
          isEditable: (rowData) => (userId ? rowData.userId === userId : rowData),
          isEditHidden: (rowData) => (userId ? rowData.userId !== userId : rowData),
          isDeletable: (rowData) => (userId ? rowData.userId === userId : rowData),
          isDeleteHidden: (rowData) => (userId ? rowData.userId !== userId : rowData),

          ...(userId && {
            onRowAdd: (newData) =>
              new Promise((resolve, reject) => {
                setTimeout(() => {
                  newData.id = uuid();
                  newData.userId = userId;
                  dispatch(addNewVehicle(newData));

                  resolve();
                }, 1000);
              }),
          }),
          ...(userId && {
            onRowUpdate: (newData) =>
              new Promise((resolve, reject) => {
                setTimeout(() => {
                  dispatch(updateVehicle(newData));

                  resolve();
                }, 1000);
              }),
          }),
          ...(userId && {
            onRowDelete: (oldData) =>
              new Promise((resolve, reject) => {
                setTimeout(() => {
                  dispatch(removeVehicle([oldData]));

                  resolve();
                }, 1000);
              }),
          }),
        }}
      />
    </div>
  );
};

export default Catalog;
