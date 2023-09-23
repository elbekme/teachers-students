import axios from "axios";

const request = axios.create({
    baseURL: "https://650d6acca8b42265ec2c2fba.mockapi.io/api/v1/",
    timeout: 10000,
});

export default request;
