import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Signup from './components/userOne/userOneSignupCom';
import RegisterationNavbar from './components/shared/registerationNavbar';
import Login from './components/shared/login/Login';
import AddStudent from './components/User/Student/addSrudentForm';
import ViewAllStudents from './components/User/Student/addSrudentForm';
import CreateLecturer from './components/User/Instructor/createLecturerPage'
import AllLecturer from './components/User/Instructor/AllInstructorTable';
import ListOfStudents from './components/User/Instructor/List of students';


import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <Router>
      <div className="app">
        <Routes>
          {/* Default Route */}
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/register" element={<RegisterationNavbar />} />
          <Route path="/view-students" element={<ViewAllStudents />} />
          <Route path="/add-student" element={<AddStudent />} />
          <Route path="/All-lecturers" element={<CreateLecturer userType='Lecturer' />} />
         { //<Route path="/create-lecturer" element={<AllLecturer userType='Lecturer' />} />
         }
          <Route path="/list-student-lecturer" element={<ListOfStudents />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
