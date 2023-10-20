import axios from "axios";
import Cookies from "universal-cookie";
const cookies = new Cookies();

const instance = axios.create({
  baseURL: "http://127.0.0.1:8000/api/",
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