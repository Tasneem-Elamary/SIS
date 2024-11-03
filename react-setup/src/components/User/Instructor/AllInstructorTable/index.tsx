import RegisterationNavbar from '../../../shared/registerationNavbar';
import MainNavBar from '../../../shared/mainNavbar';
import UsersNavBar from '../../UsersNavbar';
import CreateLecturerForm from '../createLecturerForm';
import { Button } from 'reactstrap';
import ViewTable from '../../../shared/viewTable/ViewTable';
import './style.scss'
import { useEffect,useState } from 'react';
import { InstructorType,UserType } from '../../../../interfaces/domain';
import { useDispatch, useSelector } from 'react-redux';
import { instructorAction } from '../../../../state/actions';
import { useNavigate } from 'react-router-dom';



function AllLecturer({ userType, path }) {
    const [rowValues, setrowValues] = useState<InstructorType &  UserType []>([]);
  
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      // Fetching logic based on userType
      let fetchedUsers;
      if (userType === 'Lecturer') {
        fetchedUsers = await dispatch(instructorAction.getTAAction()); // Adjust this if fetching is different
      } else if (userType === 'Doctor') {
        // Assuming a different fetch action for doctors, replace this with the actual action if different
        fetchedUsers = await dispatch(instructorAction.getDoctorAction());
      }

      // Ensure we only set values that are not undefined
      if (fetchedUsers) {
        setrowValues(fetchedUsers);
        
      }
    };

    fetchUsers();
  }, [dispatch, userType]);

  const handleAddLecturerClick = () => {
    navigate(path); 
  };
    return (
        <div className="CreateLecturer">
            <RegisterationNavbar />
            <MainNavBar activeItem="Users" />
            <UsersNavBar activeItem={userType} />
            <div  className='container-table'>
                <div className="fixed-header">
                    <div style={{ marginLeft: "10px" }} className='header-content'>
                        <h3>{userType === 'Lecturer' ? 'TAs' : 'Doctors'}</h3>
                        <Button color='primary' className='add-button' onClick={handleAddLecturerClick}>Add {userType}</Button>
                    </div>
                    <hr />
                </div>
                <ViewTable headers={["","Code", "Name", "Email"]} features={["code", "name", "email"]} rowValues={rowValues}  pathKey={userType === "Lecturer" ? "/:taId/list-of-students" : "/:doctorId/list-of-courses"} showSearchBars={false} />
            </div>

        </div>
    );
}

export default AllLecturer;