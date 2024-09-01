import React from 'react';
import CreateLecturer from './components/User/Instructor/createLecturerPage'
import AllLecturer from './components/User/Instructor/AllInstructorTable';
import ListOfStudents from './components/User/Instructor/List of students';

import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div className="app">
      {/* <AllLecturer/> */}
     {/* <CreateLecturer/> */}
     <ListOfStudents/>
    </div>
  );
}

export default App;
