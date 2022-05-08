import React from "react";
import MaterialTable from "material-table";
import { useSelector, useDispatch } from "react-redux";
import { v4 as uuid } from "uuid";

import { addNewVehicle, removeVehicle } from "../store/vehicles/vehicleSlice";

const columns = [
  { title: "Make", field: "make" },
  {
    title: "Model",
    field: "model",
    initialEditValue: "initial edit value",
  },
  { title: "Year", field: "year", type: "numeric" },
  {
    title: "Engine Type",
    field: "engineType",
    lookup: { 1: "Petrol", 2: "Diesel", 3: "Hybrid", 4: "Electric", 5: "LPG" },
  },
  { title: "Gear Box", field: "gearbox", lookup: { 1: "Automatic", 2: "Manual" } },
  { title: "Condition", field: "condition", lookup: { 1: "Used", 2: "New" } },
  { title: "Horse Power", field: "horsePower", type: "numeric" },
  { title: "Color", field: "color" },
  { title: "Price", field: "price", type: "currency" },
  { title: "City", field: "city" },
  { title: "Mileage", field: "mileage", type: "numeric" },
  { title: "Extras", field: "extras" },
];

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

          onRowAdd: (newData) =>
            new Promise((resolve, reject) => {
              setTimeout(() => {
                newData.id = uuid();
                newData.userId = userId;
                dispatch(addNewVehicle(newData));

                resolve();
              }, 1000);
            }),
          onRowUpdate: (newData, oldData) =>
            new Promise((resolve, reject) => {
              setTimeout(() => {
                const dataUpdate = [...data];
                const index = oldData.tableData.id;
                dataUpdate[index] = newData;
                // setData([...dataUpdate]);

                resolve();
              }, 1000);
            }),
          onRowDelete: (oldData) =>
            new Promise((resolve, reject) => {
              setTimeout(() => {
                dispatch(removeVehicle([oldData]));

                resolve();
              }, 1000);
            }),
        }}
        options={{}}
      />
    </div>
  );
};

export default Catalog;
