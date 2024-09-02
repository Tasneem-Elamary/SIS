import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Signup from './components/userOne/userOneSignupCom';
import RegisterationNavbar from './components/shared/registerationNavbar';
import CreateLecturerForm from './components/userOne/createLecturerForm';
import Login from './components/shared/login/Login';
import AddStudent from './components/userOne/addSrudentForm/AddStudent';
import ViewAllStudents from './components/userOne/addSrudentForm/viewStudentsForm/ViewAllStudents';
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
          <Route path="/create-lecturer" element={<CreateLecturerForm userType='Lecturer' />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
