import { axios, LOGIN_USER, REGISTER_USER } from "../constants/backend";

const loginUserRequest = async (username, password) => {
  try {
    const userData = await axios.post(LOGIN_USER, { username, password });
    return userData;
  } catch (error) {
    console.log(error.message);
    return error;
  }
};

const registerUserRequest = async (userData) => {
  try {
    const userDataResult = await axios.post(REGISTER_USER, userData);
    return userDataResult;
  } catch (error) {
    console.log(error.message);
    return error;
  }
};

export { loginUserRequest, registerUserRequest };
