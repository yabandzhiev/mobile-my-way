export const columns = [
  {
    title: "Make",
    field: "make",
  },
  {
    title: "Model",
    field: "model",
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
