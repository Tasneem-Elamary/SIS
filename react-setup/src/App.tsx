import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Signup from './components/userOne/userOneSignupCom';
import RegisterationNavbar from './components/shared/registerationNavbar';
import Login from './components/shared/login/Login';
import CreateLecturer from './components/User/Instructor/createLecturerPage';
import AllLecturer from './components/User/Instructor/AllInstructorTable';
import ListOfStudents from './components/User/Instructor/List of students';
import 'bootstrap/dist/css/bootstrap.min.css';
import ViewAllStudents from './components/User/Student/viewStudentsForm/ViewAllStudents';
import AddStudent from './components/User/Student/addSrudentForm/AddStudent';
import RegulationDetails from './components/shared/regulation/regulationDetails';
import Regulations from './components/shared/regulation/regulation';
import Logistics from './components/logistics/logistics';
import RoomSchedule from './components/logistics/roomSchedule';
 // Import the new RoomSchedule component

function App() {
  return (
    <Router>
    
      <div className="app">
        <Routes>
          {/* Default Route */}
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<Login />} />
          <Route path="/logistics" element={<Logistics />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/register" element={<RegisterationNavbar />} />
          <Route path="/view-students" element={<ViewAllStudents />} />
          <Route path="/add-student" element={<AddStudent />} />
          <Route path="/regulation-details" element={<RegulationDetails />} />
          <Route path="/all-lecturers" element={<CreateLecturer userType="Lecturer" />} />
          <Route path="/list-student-lecturer" element={<ListOfStudents />} />

          {/* Route for Room Schedule */}
          <Route path="/room-schedule/:roomId" element={<RoomSchedule />} />
          {/* Route for regulation */}
          <Route path="/regulation" element={<Regulations />} />
<Route path="/regulation/:regulationId" element={<RegulationDetails />} />

      
        </Routes>
      </div>
    </Router>
  );
}

export default App;
