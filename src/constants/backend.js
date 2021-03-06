import Axios from "axios";

const BASE_URL = "http://207.154.210.226/";

const CAR_SERVICE = "/cars";
const LOGIN_USER = "/users/login";
const REGISTER_USER = "/users/register";

const axios = Axios.create({ baseURL: BASE_URL });

export { axios, CAR_SERVICE, LOGIN_USER, REGISTER_USER };
