import axios from "axios";
import Cookies from "universal-cookie";
const cookies = new Cookies();

// export const serverUrl = "https://eacc-65-108-126-117.ngrok-free.app/";
export const serverUrl = "http://localhost:8000/";

export const baseURL = serverUrl + "api/";

const instance = axios.create({
  baseURL: baseURL,
  headers: {
    "Content-Type": "application/json"
  }
});

const updateToken = () => {
  const token = cookies.get("token");
  if (token) {
    instance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete instance.defaults.headers.common["Authorization"];
  }
};

// Initial update for the token
updateToken();

// Listen for changes to the token
cookies.addChangeListener(() => {
  updateToken();
});

export default instance;