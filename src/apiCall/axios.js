import axios from "axios";

// const BASE_URL = "http://127.0.0.1:8080/";
const BASE_URL = "http://localhost:8080/";

export default axios.create({
    baseURL: BASE_URL
});

export const axiosPrivate =  axios.create({
    // Attach interceptors to the axios 
    baseURL: BASE_URL,
    headers: { "Content-Type": "application/json" },
    withCredentials: true,
});
