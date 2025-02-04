import axios from "axios";

const BASE_URL = "https://be-six-sandy.vercel.app";

// Service for handling all API requests
const postingMarksService = {
  // Fetch classes
  getClasses: () => axios.get(`${BASE_URL}/class`),

  //get all marks
  getAllMarks: () => axios.get(`${BASE_URL}/studentmarks`),

  // Fetch subjects
  getSubjects: () => axios.get(`${BASE_URL}/subject`),

  // Fetch test types
  getTestTypes: () => axios.get(`${BASE_URL}/testtype`),

  // Fetch students by class
  getStudentsByClass: (classID) =>
    axios.get(`${BASE_URL}/student/class/${classID}`),
    
  // Submit marks
  submitMarks: (marksData) => axios.post(`${BASE_URL}/studentmarks`, marksData),
};

export default postingMarksService;