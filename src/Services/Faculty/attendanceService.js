import axios from "axios";

const BASE_URL = process.env.REACT_APP_API_URL;

const attendanceService = {
  getStudentsByClass: (classID) => {
    return axios.get(`${BASE_URL}/student/class/${classID}`);
  },

  submitAttendance: (attendanceData) => {
    return axios.post(`${BASE_URL}/attendance`, attendanceData);
  },

  getAttendanceByClass: (classID) => {
    return axios.get(`${BASE_URL}/attendance/class/${classID}`);
  },

  getAttendanceByStudentId: (StudentID) => {
    return axios.get(`${BASE_URL}/attendance/student/${StudentID}`);
  },
};

export default attendanceService;
