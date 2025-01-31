import axios from "axios";

const BASE_URL = "https://be-six-sandy.vercel.app";

export const fetchAllFaculty = async () => {
  const response = await axios.get(`${BASE_URL}/faculty`);
  return response.data;
};

export const createFaculty = async(facultyData)=>{
  const response = await axios.post(`${BASE_URL}/faculty`, facultyData)
  return response.data

};

export const deleteFaculty = async(id) =>{
  await axios.delete(`${BASE_URL}/faculty/${id}`);
};

export const updateFaculty = async (id, facultyData) =>{
  await axios.put(`${BASE_URL}/faculty/${id}`, facultyData);
}