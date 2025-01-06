import axios from "axios";

const BASE_URL = process.env.REACT_APP_API_URL;

export const fetchStudentMarks = async (StudentID) => {
  const response = await axios.get(`${BASE_URL}/studentmarks/student/${StudentID}`);
  return response.data;
};