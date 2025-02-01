import axios from "axios";

const BASE_URL = "https://be-six-sandy.vercel.app";

export const fetchAllStudentMarks = async () => {
  const response = await axios.get(`${BASE_URL}/studentmarks}`);
  return response.data;
};

export const fetchStudentMarks = async (StudentID) => {
  const response = await axios.get(`${BASE_URL}/studentmarks/student/${StudentID}`);
  return response.data;
};

