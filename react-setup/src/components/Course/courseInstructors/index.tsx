import RegisterationNavbar from '../../shared/registerationNavbar';
import MainNavBar from '../../shared/mainNavbar';
import CoursesNavBar from '../CoursesLevelNavbar';
import { Button } from 'reactstrap';
import ViewTable from '../../shared/viewTable/ViewTable';
import './style.scss'
import { useEffect, useState } from 'react';
import { CourseType, InstructorType, UserType } from '../../../interfaces/domain';
import { useDispatch, useSelector } from 'react-redux';
import { courseAction, instructorAction } from '../../../state/actions';
import { useNavigate, useParams } from 'react-router-dom';
import CoursesNavlBar from '../courseNavbar';
import CoursesLevelNavBar from '../CoursesLevelNavbar';




function CourseInstructor() {
    const [rowValues, setRowValues] = useState<CourseType[]>([]);
    const { id, bylawId } = useParams();


    const dispatch = useDispatch();
    const [course, setcourse] = useState<CourseType>();




    useEffect(() => {
        const fetchCourses = async () => {
            const fetchedCourse = await dispatch(courseAction.getcourseInstrucrors(id));
            setcourse(fetchedCourse);
            setRowValues(fetchedCourse.Schedules);
        };

        fetchCourses();
    }, [dispatch]);


    return (
        <div className="CreateLecturer">
            <RegisterationNavbar />
            <MainNavBar activeItem="Courses" />
            <CoursesLevelNavBar activeItem={course?.level} />
            <div className='container-table'>
            <div className="fixed-header">
                    <div style={{ marginLeft: "10px" }} >
                        <h3>{course?.code}</h3>
                        <CoursesNavlBar activeItem="Instructors" id={id} bylawId={bylawId} />
                        {/* <Button color='primary' className='download-button' >Download course List</Button> */}
                    </div>
                    <hr />
                </div>



                <ViewTable
                    headers={["", "Instructor Code", "Name"]}
                    features={["code", "firstName"]}
                    rowValues={rowValues}
                    pathKey=":doctorId/list-of-courses"
                    showSearchBars={false}


                />
            </div>
        </div>
    );
}

export default CourseInstructor;