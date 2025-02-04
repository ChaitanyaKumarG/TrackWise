import axios from "axios";

const BASE_URL = "https://be-six-sandy.vercel.app";

const attendanceService = {
  getStudentsByClass: (classID) => {
    return axios.get(`${BASE_URL}/student/class/${classID}`);
  },

  submitAttendance: (attendanceData) => {
    return axios.post(`${BASE_URL}/attendance`, attendanceData);
  },

  grtAttendanceByDate: (date) => {
    return axios.get(`${BASE_URL}/attendance/date/${date}`);
  },

  getAttendanceByClass: (classID) => {
    return axios.get(`${BASE_URL}/attendance/class/${classID}`);
  },

  getAttendanceByStudentId: (StudentID) => {
    return axios.get(`${BASE_URL}/attendance/student/${StudentID}`);
  },

  sendAbsenteeEmails: (date) => {
    return axios.post("http://127.0.0.1:1321/attendance/sendemails", {date});
  },

//   sendAbsenteeEmails: (date) => {
//     // Format the date to match exactly what the API expects
//     const formattedDate = new Date(date).toISOString().split("T")[0];
//     return axios.post("127.0.0.1:1321/attendance/sendemails", {
//       date: formattedDate,
//     });
//   },
};

export default attendanceService;
