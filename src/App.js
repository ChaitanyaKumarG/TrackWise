import React from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./Pages/HomePage";
import LoginPage from "./Pages/Parent/LoginPage";
import StudentMarks from "./Pages/Parent/StudentMarks";
import StudentDetails from "./Pages/Parent/StudentDetailsPage";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/parentlogin" element={<LoginPage />} />
          <Route path="/studentprofile/:penNo" element={<StudentDetails />} />
          <Route path="/studentmarks/:StudentID" element={<StudentMarks />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
