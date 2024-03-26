import axios from "axios";
// export const devBaseurl = "http://127.0.0.1:8000/api";
export const prodBaseUrl = "http://localhost:3000";
const headers = {
  Accept: "application/json",
  "Content-Type": "application/x-www-form-urlencoded",
};
const api = axios.create({
  // baseURL: "http://127.0.0.1:8000/api",
  baseURL: prodBaseUrl,
  headers: headers,
});

let token = null;
if (typeof window !== "undefined") {
  token = localStorage.getItem("token"); // Corrected variable name
}
if (token) {
  api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
}

export default api;
