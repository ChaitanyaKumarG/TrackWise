import React, { } from "react";
import "./Assets/StyleSheets/App.css";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import HomePage from "./Pages/HomePage";
import LoginPage from "./Pages/Parent/LoginPage";
import StudentMarks from "./Pages/Parent/StudentMarks";
import FLoginPage from "./Pages/Faculty/LoginPage";
import PostMarks from "./Pages/Faculty/PostMarks";
import ReleaseMarks from "./Pages/Admin/ReleaseMarks";
import ALoginPage from "./Pages/Admin/ALoginPage";
import AHomePage from "./Pages/Admin/AHomePage";
import ShowData from "./Pages/Admin/ShowData";
import FacultyData from "./Pages/Admin/FacultyData";
import StudentData from "./Pages/Admin/StudentData";
import CreateData from "./Pages/Admin/CreateDataPage";
import CreateStudent from "./Pages/Admin/CreateStudent";
import CreateFaculty from "./Pages/Admin/CreateFaculty";
import PostNews from "./Pages/Admin/PostNews";
import StudentProfile from "./Pages/Parent/StudentProfile";
import Header from "./Components/Header";
import BottomNav from "./Components/Common/BottomNav";
import TimeTable from "./Components/Common/TimeTable";
import Quiz from "./Components/Common/Quiz";
import BackButtonHandler from "./Components/Common/BackButtonHandler";
import Attendance from "./Pages/Faculty/PostAttendance";
import AttendanceReport from "./Pages/Parent/AttendanceReport";
import FHomePage from "./Pages/Faculty/FHomePage";
import Login from "./Pages/Login";
import SchoolHomepage from "./Pages/SchoolHomePage";
import MarksData from "./Pages/Admin/MarksData";
import Absentees from "./Pages/Admin/Absentees";
import MarksGeneration from "./Pages/Admin/GenerateRanks";



function Appcontent() {

  const location = useLocation();
  const hidebottamnav = [
    "/",
  ];

  return (
    <div style={{ height: "100vh" }}>
        <BackButtonHandler />
        <Header />
        <Routes>
          <Route path="/home" element={<HomePage />} />
          <Route path="/" element={<SchoolHomepage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/timetable" element={<TimeTable />} />
          <Route path="/quiz" element={<Quiz />} />
          {/*//Parent Routes*/}
          <Route path="/parentlogin" element={<LoginPage />} />
          <Route path="/studentprofile/:penNo" element={<StudentProfile />} />
          <Route path="/studentmarks/:StudentID" element={<StudentMarks />} />
          <Route path="/attendance/:StudentID" element={<AttendanceReport />} />
          {/*//Faculty Routes */}
          <Route path="/facultylogin" element={<FLoginPage />} />
          <Route path="/postmarks" element={<PostMarks />} />
          <Route path="/facultyhomepage" element={<FHomePage />} />
          <Route path="/postattendance" element={<Attendance />} />
          {/* //Admin Routes */}
          <Route path="/adminlogin" element={<ALoginPage />} />
          <Route path="/adminhomepage" element={<AHomePage />} />
          <Route path="/showdata" element={<ShowData />} />
          <Route path="/facultydata" element={<FacultyData />} />
          <Route path="/studentdata" element={<StudentData />} />
          <Route path="/createdata" element={<CreateData />} />
          <Route path="/createstudent" element={<CreateStudent />} />
          <Route path="/createfaculty" element={<CreateFaculty />} />
          <Route path="/postnews" element={<PostNews />} />
          <Route path="/releasemarks" element={<ReleaseMarks />} />
          <Route path="/marksdata" element={<MarksData/>} />
          <Route path="/absentees" element={<Absentees/>}/>
          <Route path="/marksgeneration" element={<MarksGeneration/>}/>
        </Routes>

        {hidebottamnav.includes(location.pathname) ? null : <BottomNav />}

    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Appcontent />
    </BrowserRouter>
  );
}

export default App;
