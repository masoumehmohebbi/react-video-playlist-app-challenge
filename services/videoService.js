import axios from "axios";

export function getVideoLists() {
  return axios.get(`http://localhost:5000/data`).then(({ data }) => data);
}
