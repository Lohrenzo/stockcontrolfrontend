import axios from "axios";

// const BASE_URL = "http://localhost:8080/";
const BASE_URL = "https://stockcontrolbackend.onrender.com/";

export default axios.create({
    baseURL: BASE_URL
});

export const axiosPrivate =  axios.create({
    // Attach interceptors to the axios 
    baseURL: BASE_URL,
    headers: { "Content-Type": "application/json" },
    withCredentials: true,
});
