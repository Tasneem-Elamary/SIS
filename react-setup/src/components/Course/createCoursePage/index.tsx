import RegisterationNavbar from '../../shared/registerationNavbar';
import MainNavBar from '../../shared/mainNavbar';
import CourseNavBar from '../CoursesLevelNavbar';
import CreateCourseForm from '../createCourseForm';



function CreateCourse() {
    return (
      <div className="CreateLecturer">
        <RegisterationNavbar/>
        <MainNavBar activeItem="Courses"/>
        < CourseNavBar  activeItem="create new course"/>
        <CreateCourseForm />
        
      </div>
    );
  }
  
  export default CreateCourse;