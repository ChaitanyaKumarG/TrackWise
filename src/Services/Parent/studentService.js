import axios from "axios";

const BASE_URL = process.env.REACT_APP_API_URL;

export const fetchAllStudents = async () => {
  const response = await axios.get(`${BASE_URL}/student`);
  return response.data;
};

export const fetchStudentDetails = async (penNo) => {
  const response = await axios.get(`${BASE_URL}/student/penno/${penNo}`);
  return response.data[0];
};

export const fetchStudentDetailsbyID = async (studentID) => {
  const response = await axios.get(`${BASE_URL}/student/id/${studentID}`);
  return response.data[0];
};

export const fetchStudentDetailsbyClass = async (classID) => {
  const response = await axios.get(`${BASE_URL}/student/id/${classID}`);
  return response.data[0];
};

export const createStudent = async (studentData)=> {
  const response = await axios.post(`${BASE_URL}/student`, studentData)
  return response.data
}