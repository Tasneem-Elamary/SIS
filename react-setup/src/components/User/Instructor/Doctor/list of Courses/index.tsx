import RegisterationNavbar from '../../../../shared/registerationNavbar';
import MainNavBar from '../../../../shared/mainNavbar';
import UsersNavBar from '../../../UsersNavbar';
import CreateLecturerForm from '../../createLecturerForm';
import { Button } from 'reactstrap';
import ViewTable from '../../../../shared/viewTable/ViewTable';
import InstructorNavbar from '../DoctorNavbar'
import './style.scss'
import { useEffect, useState } from 'react';
import { InstructorType, StudentType, UserType } from '../../../../../interfaces/domain';
import { useDispatch, useSelector } from 'react-redux';
import { instructorAction } from '../../../../../state/actions';
import { useParams } from 'react-router-dom';



function ListOfCourse() {
    const { id } = useParams();
    const [rowValues, setrowValues] = useState<StudentType[]>([]);
    const [instructor, setInstructor] = useState<InstructorType>();

    const role = localStorage.getItem('role');

    const dispatch = useDispatch();

    useEffect(() => {
        const fetchStudents = async () => {
            const fetchedInstructor = await dispatch(instructorAction.getDoctorCourses(id));
            console.log(fetchedInstructor)
            setInstructor(fetchedInstructor)
            setrowValues(fetchedInstructor.Schedules);
        };

        fetchStudents();
    }, [dispatch]);
    return (
        <div className="student-list-page">
            <RegisterationNavbar />
            <MainNavBar activeItem="Users" />
            {role === 'faculty admin' && (<UsersNavBar activeItem="Doctor" />)}
            <div className="content-section">

                <div className="user-header">
                    <h3>Eng {`${instructor?.firstName} ${instructor?.lastName}`}</h3>
                    <InstructorNavbar activeItem="List of courses" id={id} />

                </div>

                {/* Search Bar */}
                <div className="search-section">
                    <h4>Course</h4>
                    <input type="text" placeholder="Search..." />
                </div>

                {/* Table Section */}
                <div className="table-section">
                    <ViewTable
                        headers={["", "CourseCode", "Name","Level"]}
                        features={["code" ,"name","level"]}
                        rowValues={rowValues}
                        showSearchBars={false}// Replace with actual data
                    />
                </div>
            </div>
        </div>
    );
};

export default ListOfCourse;