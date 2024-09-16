import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Signup from './components/userOne/userOneSignupCom';
import RegisterationNavbar from './components/shared/registerationNavbar';
import Login from './components/shared/login/Login';
import AddStudent from './components/User/Student/addSrudentForm';
import ViewAllStudents from './components/User/Student/viewStudentsForm';
import CreateLecturer from './components/User/Instructor/createLecturerPage'
import AllLecturer from './components/User/Instructor/AllInstructorTable';
import ListOfStudents from './components/User/Instructor/TA/List of students';
import CourseLevel from './components/Course/courseLevelPage';
import CourseDetailsPage from './components/Course/courseDetailsPage';
import ListOfPendingStudents from './components/User/Instructor/TA/List of pending';
import ListOfSelfStudyOROverloadStudents from './components/User/Instructor/TA/List of self study or overload';


import 'bootstrap/dist/css/bootstrap.min.css';
import CourseRulesPage from './components/Course/courseRulePage';

function App() {
  return (
    <Router>
      <div className="app">
        <Routes>
          {/* Default Route */}
          {/* <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/register" element={<RegisterationNavbar />} />
          <Route path="/view-students" element={<ViewAllStudents />} />
          <Route path="/add-student" element={<AddStudent />} />
          <Route path="/All-lecturers" element={<CreateLecturer userType='Lecturer' />} />
          <Route path="/list-student-lecturer" element={<ListOfStudents />} /> */}
          <Route path="/" element={<AllLecturer  userType="Lecturer" path="/CreateLecturer"/>} />
          <Route path="/CreateLecturer" element={<CreateLecturer userType="Lecturer"/>} />
          <Route path="/:id/list-of-students" element={<ListOfStudents />} />
          <Route path="/:id/list-of-pendingStudents" element={<ListOfPendingStudents/>} />
          <Route path="/:id/list-of-selfstudy-students" element={<ListOfSelfStudyOROverloadStudents activeItem="List of self study"/>} />
          <Route path="/:id/list-of-overload-students" element={<ListOfSelfStudyOROverloadStudents activeItem="List of overload"/>} />
          <Route path="/CreateDoctor" element={<CreateLecturer userType="Doctor"/>} />
          <Route path="/Doctors" element={<AllLecturer  userType="Doctor" path="/CreateDoctor"/>} />
          <Route path="/Courses/level/1" element={<CourseLevel level={1} />} />
          <Route path="/Courses/level/2" element={<CourseLevel level={2} />} />
          <Route path="/Courses/level/3" element={<CourseLevel level={3} />} />
          <Route path="/Courses/level/4" element={<CourseLevel level={4} />} />
          

          <Route path="/Course/:id/bylaw/:bylawId" element={<CourseDetailsPage />} />
          <Route path="/Course/:id/PrerequesitiesAndDependants" element={<CourseRulesPage />} />

          <Route path="/view-students" element={<ViewAllStudents />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
