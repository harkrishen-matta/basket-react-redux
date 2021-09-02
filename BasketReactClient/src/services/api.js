import axios from "axios";

export const url = "http://localhost:9001";

const api = axios.create({
    baseURL: url,
});

export default api;
