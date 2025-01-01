import axios from "axios";

const BASE_URL = "http://127.0.0.1:1321"

const adminServices = {

    getAll: async()=>{
        const response = await axios.get(`${BASE_URL}/admin`);
        return response.data
    }
}


export default adminServices