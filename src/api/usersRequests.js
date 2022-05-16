import { axios, LOGIN_USER, REGISTER_USER } from "../constants/backend";

const loginUserRequest = async (username, password) => {
  try {
    const userData = await axios.post(LOGIN_USER, { username, password });
    return userData;
  } catch (error) {
    console.log(error.message);
  }
};

const registerUserRequest = async (userData) => {
  try {
    const userData = await axios.post(REGISTER_USER, {
      userData,
    });
    return userData;
  } catch (error) {
    console.log(error.message);
  }
};

export { loginUserRequest, registerUserRequest };
