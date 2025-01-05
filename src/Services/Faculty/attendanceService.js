import axios from "axios";

const BASE_URL = "http://127.0.0.1:1321";

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
