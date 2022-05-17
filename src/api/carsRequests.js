import { axios, CAR_SERVICE } from "../constants/backend";

const getAllCarsRequest = async () => {
  try {
    const vehiclesData = await axios.get(`${CAR_SERVICE}/all`);
    return vehiclesData;
  } catch (error) {
    console.log(error.message);
  }
};

const createCarRequest = async (token, data) => {
  try {
    return await axios.post(CAR_SERVICE, data, {
      headers: { Authorization: `Bearer ${token}` },
    });
  } catch (error) {
    console.log(error.message);
  }
};

const editCarRequest = async (token, data, userId) => {
  try {
    return await axios.put(`${CAR_SERVICE}/${userId}`, data, {
      headers: { Authorization: `Bearer ${token}` },
    });
  } catch (error) {
    console.log(error.message);
  }
};

const deleteCarRequest = async (token, vehicleId, userId) => {
  try {
    return await axios.delete(`${CAR_SERVICE}/${vehicleId}/${userId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  } catch (error) {
    console.log(error.message);
  }
};

export { getAllCarsRequest, createCarRequest, editCarRequest, deleteCarRequest };
