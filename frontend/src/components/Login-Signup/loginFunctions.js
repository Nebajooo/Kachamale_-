import axios from "axios";

const BASE_URL = "http://localhost:8080";

export function logUserIn(userCredentials) {
  return axios.post(`${BASE_URL}/login`, userCredentials, {
    headers: {
      "Content-Type": "application/json",
    },
  });
}

export function loadRoutes() {
  const authToken = sessionStorage.getItem("authToken") || "";
  return axios.get(`${BASE_URL}/user/profile`, {
    params: { secret_token: authToken },
  });
}

export function getCurrentUserDetails(authToken) {
  return axios.get(`${BASE_URL}/user/profile`, {
    params: { secret_token: authToken },
  });
}
