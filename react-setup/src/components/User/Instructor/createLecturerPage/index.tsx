import RegisterationNavbar from '../../../shared/registerationNavbar';
import MainNavBar from '../../../shared/mainNavbar';
import UsersNavBar from '../../UsersNavbar';
import CreateLecturerForm from '../createLecturerForm';



function CreateLecturer() {
    return (
      <div className="CreateLecturer">
        <RegisterationNavbar/>
        <MainNavBar activeItem="Users"/>
        <UsersNavBar  activeItem="Lecturer"/>
        <CreateLecturerForm userType='Lecturer'/>
        
      </div>
    );
  }
  
  export default CreateLecturer;