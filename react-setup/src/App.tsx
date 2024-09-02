import React from 'react';
import CreateLecturer from './components/User/Instructor/createLecturerPage'
import AllLecturer from './components/User/Instructor/AllInstructorTable';
import ListOfStudents from './components/User/Instructor/List of students';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div className="app">
      {/* <AllLecturer/> */}
     {/* <CreateLecturer/> */}
     {/* <ListOfStudents/> */}
     <Router>
        {/* Define Routes */}
        <Routes>

          <Route path="/" element={<AllLecturer  userType="Lecturer" path="/CreateLecturer"/>} />
          <Route path="/CreateLecturer" element={<CreateLecturer userType="Lecturer"/>} />
          <Route path="/list-of-students" element={<ListOfStudents />} />
          <Route path="/CreateDoctor" element={<CreateLecturer userType="Doctor"/>} />
          <Route path="/Doctors" element={<AllLecturer  userType="Doctor" path="/CreateDoctor"/>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
