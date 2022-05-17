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
    lookup: {
      GASOLINE: "GASOLINE",
      DIESEL: "DIESEL",
      HYBRID: "HYBRID",
      ELECTRIC: "ELECTRIC",
    },
  },
  {
    title: "Gear Box",
    field: "gearBox",
    lookup: { AUTOMATIC: "AUTOMATIC", MANUAL: "MANUAL" },
  },
  {
    title: "Condition",
    field: "condition",
    lookup: { USED: "USED", NEW: "NEW", PARTS: "PARTS" },
  },
  { title: "Horse Power", field: "horsePower", type: "numeric" },
  { title: "Color", field: "color" },
  { title: "Price", field: "price", type: "currency" },
  { title: "City", field: "city" },
  { title: "Mileage", field: "mileage", type: "numeric" },
  { title: "Extras", field: "extras" },
];
