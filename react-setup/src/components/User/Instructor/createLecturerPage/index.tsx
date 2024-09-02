import RegisterationNavbar from '../../../shared/registerationNavbar';
import MainNavBar from '../../../shared/mainNavbar';
import UsersNavBar from '../../UsersNavbar';
import CreateLecturerForm from '../createLecturerForm';



function CreateLecturer({userType}) {
    return (
      <div className="CreateLecturer">
        <RegisterationNavbar/>
        <MainNavBar activeItem="Users"/>
        <UsersNavBar  activeItem={userType}/>
        <CreateLecturerForm userType={userType}/>
        
      </div>
    );
  }
  
  export default CreateLecturer;