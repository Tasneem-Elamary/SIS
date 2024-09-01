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



function AllLecturer() {
    const [rowValues, setrowValues] = useState<InstructorType & { User: UserType }[]>([]);
  
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchCourses = async () => {
      const fetchedInstructors = await dispatch(instructorAction.getInstructorAction());
      setrowValues(fetchedInstructors);
    };

    fetchCourses();
  }, [dispatch]);
    return (
        <div className="CreateLecturer">
            <RegisterationNavbar />
            <MainNavBar activeItem="Users" />
            <UsersNavBar activeItem="Lecturer" />
            <div  className='container-table'>
                <div className="fixed-header">
                    <div style={{ marginLeft: "10px" }} className='header-content'>
                        <h3>Lecturers</h3>
                        <Button color='primary' className='add-button'>Add Lecturer</Button>
                    </div>
                    <hr />
                </div>
                <ViewTable headers={["","id", "firstName", "employmentType"]} rowValues={rowValues} />
            </div>

        </div>
    );
}

export default AllLecturer;