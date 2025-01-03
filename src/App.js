import React from "react";
import "./Assets/StyleSheets/App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
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
import Taskbar from "./Components/Common/Navbar";
import Header from "./Components/Header";
import BottomNav from "./Components/Common/BottomNav";
import TimeTable from "./Components/Common/TimeTable";
import Quiz from "./Components/Common/Quiz";

function App() {
  return (
    <div style={{ height: "100vh" }}>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/timetable" element={<TimeTable />} />
          <Route path="/quiz" element={<Quiz/>} />
          {/*//Parent Routes*/}
          <Route path="/parentlogin" element={<LoginPage />} />
          <Route path="/studentprofile/:penNo" element={<StudentProfile />} />
          <Route path="/studentmarks/:StudentID" element={<StudentMarks />} />
          {/*//Faculty Routes */}
          <Route path="/facultylogin" element={<FLoginPage />} />
          <Route path="/postmarks" element={<PostMarks />} />
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
        </Routes>

        <BottomNav />
      </BrowserRouter>
    </div>
  );
}
export default App;
