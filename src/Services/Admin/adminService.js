import axios from "axios";

const BASE_URL = "https://be-six-sandy.vercel.app";

console.log(BASE_URL);

const adminServices = {
  getAll: async () => {
    const response = await axios.get(`${BASE_URL}/admin`);
    return response.data;
  },
};

export default adminServices;
