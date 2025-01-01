import axios from "axios";

const BASE_URL = "http://127.0.0.1:1321";

export const fetchStudentMarks = async (StudentID) => {
  const response = await axios.get(`${BASE_URL}/studentmarks/student/${StudentID}`);
  return response.data;
};