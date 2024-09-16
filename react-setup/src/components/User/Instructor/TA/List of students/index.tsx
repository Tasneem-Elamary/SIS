import RegisterationNavbar from '../../../shared/registerationNavbar';
import MainNavBar from '../../../shared/mainNavbar';
import UsersNavBar from '../../UsersNavbar';
import CreateLecturerForm from '../createLecturerForm';
import { Button } from 'reactstrap';
import ViewTable from '../../../shared/viewTable/ViewTable';
import InstructorNavbar from '../InstructorNavbar'
import './style.scss'
import { useEffect, useState } from 'react';
import { InstructorType, UserType } from '../../../../interfaces/domain';
import { useDispatch, useSelector } from 'react-redux';
import { instructorAction } from '../../../../state/actions';



function ListOfStudents() {
    //     const [rowValues, setrowValues] = useState<InstructorType & { User: UserType }[]>([]);

    //   const dispatch = useDispatch();

    //   useEffect(() => {
    //     const fetchCourses = async () => {
    //       const fetchedInstructors = await dispatch(instructorAction.getInstructorAction());
    //       setrowValues(fetchedInstructors);
    //     };

    //     fetchCourses();
    //   }, [dispatch]);
    return (
        <div className="student-list-page">
            <RegisterationNavbar />
            <MainNavBar activeItem="Users" />
            <UsersNavBar activeItem="Lecturer" />
            <div className="content-section">

                <div className="user-header">
                    <h3>Eng. Fatma Mohamed</h3>
                    <InstructorNavbar activeItem="List of students" />

                </div>

                {/* Search Bar */}
                <div className="search-section">
                    <h4>Student</h4>
                    <input type="text" placeholder="Search..." />
                </div>

                {/* Table Section */}
                <div className="table-section">
                    <ViewTable
                        headers={["ID", "Name", "Confirmation", "Notes"]}
                        rowValues={[]} // Replace with actual data
                        features={["ID", "Name", "Confirmation", "Notes"]}                  />
                </div>
            </div>
        </div>
    );
};

export default ListOfStudents;