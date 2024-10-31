import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from 'react-router-dom';
import Signup from './components/userOne/userOneSignupCom';
import RegisterationNavbar from './components/shared/registerationNavbar';
import Login from './components/shared/login/Login';

import Logistics from './components/logistics/logistics';
import RoomSchedule from './components/logistics/roomSchedule';
 
import AddStudent from './components/User/Student/addSrudentForm';
import ViewAllStudents from './components/User/Student/viewStudentsForm';
import CreateLecturer from './components/User/Instructor/createLecturerPage';
import AllLecturer from './components/User/Instructor/AllInstructorTable';
import ListOfStudents from './components/User/Instructor/TA/List of students';
import ListOfCourse from './components/User/Instructor/Doctor/list of Courses';
import CourseLevel from './components/Course/courseLevelPage';
import CourseDetailsPage from './components/Course/courseDetailsPage';
import ListOfPendingStudents from './components/User/Instructor/TA/List of pending';
import ListOfSelfStudyOROverloadStudents from './components/User/Instructor/TA/List of self study or overload';
import AddRegualtion from './components/regulation/addRegulation';

import 'bootstrap/dist/css/bootstrap.min.css';
import CourseRulesPage from './components/Course/courseRulePage';
import RegulationDetails from './components/regulation/regulationDetails';
import AllResults from './components/Result/AllResults';
import RankStudentForm from './components/Queries/Rank of student form';
import StudentToEnrollInCourse from './components/Queries/StudentFailedOrNotEnrolled';
import RankOfStudentPage from './components/Queries/Rank of student page';

import MappedCourse from './components/requests/mappedCourse';
import CreateAnOverload from './components/requests/CreateAnOverload';
import CreateASelfStudy from './components/requests/CreateASelfStudy';

 
import AllSchedules from './components/schedules/schedule';
import UpdateSchedules from './components/schedules/updateSchedules';
import InstructorSchedule from './components/schedules/instructorSchedule';
import CourseSchedule from './components/schedules/courseSchedule';
import PrivateRoute from './components/helpers/privateRoute';
import Unauthorized from './components/helpers/unAuthorized';
import RegisterSchedule from '../src/components/User/Student/studentHomePages/studentRegisterSchedule'
import PendingSchedule from '../src/components/User/Student/studentHomePages/studentPendningSchedule'
import StudentSchedule from './components/User/Student/studentHomePages/studentSchedule';
function App() {
  return (
    <Router>
      <div className="app">
        <Routes>
        <Route path="/unauthorized" element={<Unauthorized />} />s
          {/* Default Route */}

          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<Login />} />
          <Route path="/logistics" element={<Logistics />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/register" element={<RegisterationNavbar />} />
          <Route path="/view-students" element={<ViewAllStudents />} />
          <Route path="/add-student" element={<AddStudent />} />
          <Route path="/regulation-details" element={<RegulationDetails />} />
          <Route path="/all-lecturers" element={ 
            <PrivateRoute allowedRoles={['faculty admin', 'professor', 'teaching assistant']}>
            <CreateLecturer userType="Lecturer" />
            </PrivateRoute>} />
          <Route path="/all-schedules" element={<AllSchedules/>} />
          <Route path="/update-schedules" element={<UpdateSchedules/>} />
          <Route path='/instructor-schedule/:instructorId' element={<InstructorSchedule/>}/>
          <Route path="/list-student-lecturer" element={<ListOfStudents />} />
          <Route path="/room-schedule/:roomId" element={<RoomSchedule />} />
          {/* Route for regulation */}
          {/* {/*  <Route path="/regulation" element={<Regulations />} />} */}
          <Route
            path="/regulation/:regulationId"
            element={<RegulationDetails />}
          />


          <Route path="/All-lecturers" element={<CreateLecturer userType='Lecturer' />} />
          {/* <Route path="/list-student-lecturer" element={<ListOfStudents />} />  */}
{/* {          <Route path="/course-schedule/:courseId" element={<CourseSchedule />} />} */}
          <Route path="/regulation/:regulationId" element={<RegulationDetails />} />
          <Route path="/add-regulation" element={<AddRegualtion />} />
          <Route path="/All-lecturers" element={<PrivateRoute allowedRoles={['faculty admin', 'professor', 'teaching assistant']}><CreateLecturer userType="Lecturer" /></PrivateRoute>} />
          <Route path="/list-student-lecturer" element={<ListOfStudents />} /> 
          <Route path="/" element={<AllLecturer userType="Lecturer" path="/CreateLecturer" />} />
          <Route path="/CreateLecturer" element={<CreateLecturer userType="Lecturer" />} />
          <Route path="/:id/list-of-students" element={<ListOfStudents />} />
          <Route path="/:id/list-of-pendingStudents" element={<ListOfPendingStudents />} />
          <Route path="/:id/list-of-selfstudy-students" element={<ListOfSelfStudyOROverloadStudents activeItem="selfstudy" />} />
          <Route path="/:id/list-of-overload-students" element={<ListOfSelfStudyOROverloadStudents activeItem="overload" />} />
          <Route path="/CreateDoctor" element={<CreateLecturer userType="Doctor" />} />
          <Route path="/Doctors" element={<AllLecturer userType="Doctor" path="/CreateDoctor" />} />
          <Route path="/:id/list-of-courses" element={<ListOfCourse />} />
          <Route path="/Courses/level/1" element={<CourseLevel level={1} />} />
          <Route path="/Courses/level/2" element={<CourseLevel level={2} />} />
          <Route path="/Courses/level/3" element={<CourseLevel level={3} />} />
          <Route path="/Courses/level/4" element={<CourseLevel level={4} />} />

          <Route
            path="/Course/:id/bylaw/:bylawId"
            element={<CourseDetailsPage />}
          />
          <Route
            path="/Course/:id/PrerequesitiesAndDependants"
            element={<CourseRulesPage />}
          />

          <Route path="/view-students" element={<ViewAllStudents />} />

          <Route path="/results" element={<AllResults/>} />

          <Route path="/Oueries/Rank of Student" element={<RankOfStudentPage activeItem="Rank of student"/>} />
          <Route path="/Queries/Students who failed" element={<StudentToEnrollInCourse activeItem="Students failed not enrolled"/>} />
          <Route path="/Requests/MappedCourse" element={<MappedCourse />} />
          <Route
            path="/Requests/CreateAnOverload"
            element={<CreateAnOverload />}
          />
          <Route
            path="/Requests/CreateASelfStudy"
            element={<CreateASelfStudy />}
          />

          <Route path="/Course/:id/bylaw/:bylawId" element={<CourseDetailsPage />} />
          <Route path="/Course/:courseId/schedule" element={<CourseSchedule />} />
          <Route path="/Course/:id/PrerequesitiesAndDependants" element={<CourseRulesPage />} />

          <Route path="/view-students" element={<ViewAllStudents />} />
          <Route path="/register-schedule" element={<RegisterSchedule />} />
          <Route path="/pending-schedule" element={<PendingSchedule />} />
      
          <Route path="/student-schedule" element={<StudentSchedule />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
