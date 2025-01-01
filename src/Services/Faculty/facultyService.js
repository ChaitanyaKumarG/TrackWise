import axios from "axios";

const BASE_URL = "http://127.0.0.1:1321";

export const fetchAllFaculty = async () => {
  const response = await axios.get(`${BASE_URL}/faculty`);
  return response.data;
};

export const createFaculty = async(facultyData)=>{
  const response = await axios.post(`${BASE_URL}/faculty`, facultyData)
  return response.data

}