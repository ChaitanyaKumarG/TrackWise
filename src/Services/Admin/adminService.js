import axios from "axios";

const BASE_URL = process.env.REACT_APP_API_URL;

console.log(BASE_URL);

const adminServices = {
  getAll: async () => {
    const response = await axios.get(`${BASE_URL}/admin`);
    return response.data;
  },
};

export default adminServices;
