import RegisterationNavbar from '../../shared/registerationNavbar';
import MainNavBar from '../../shared/mainNavbar';
import CoursesLevelNavBar from '../CoursesLevelNavbar';
import { Button } from 'reactstrap';
import ViewTable from '../../shared/viewTable/ViewTable';
import './style.scss'
import { useEffect,useState } from 'react';
import { CourseType, InstructorType,UserType } from '../../../interfaces/domain';
import { useDispatch, useSelector } from 'react-redux';
import { courseAction, instructorAction } from '../../../state/actions';
import { useNavigate, useParams } from 'react-router-dom';
import TwoColumnTable from '../../shared/twoCoumnTable';
import CoursesNavlBar from '../courseNavbar';



function CourseDetailsPage() {
    const { id ,bylawId} = useParams();
   
    const [course, setcourse] = useState<CourseType>();
   

    const dispatch = useDispatch();

    useEffect(() => {
        const fetchCourses = async () => {
            const fetchedCourse = await dispatch(courseAction.getcourseDetailsAction(id,bylawId));
            setcourse(fetchedCourse);
        };

        fetchCourses();
    }, [dispatch]);
    return (
        <div className="CreateLecturer">
            <RegisterationNavbar />
            <MainNavBar activeItem="Courses" />
            <CoursesLevelNavBar activeItem={course?.level} />
            <div  className='container-table'>
                <div className="fixed-header">
                    <div style={{ marginLeft: "10px" }} >
                        <h3>{course?.code}</h3>
                        <CoursesNavlBar activeItem="General"  id={id} bylawId={bylawId}/>
                        {/* <Button color='primary' className='download-button' >Download course List</Button> */}
                    </div>
                    <hr />
                </div>
                <TwoColumnTable headers={['Course Name', 'Regulations', 'Credit hours', 'Min. CGPA to enroll', 'Min. earned ch to enroll', 'Regular Registered', 'Pending Registered']}
                values={[course?.name, bylawId, course?.creditHours, course?.min_GPA, course?.minEarnedHours, course?.approvedRegularCount, course?.pendingRegularCount]} renderItem={undefined}/>
            </div>

        </div>
    );
}

export default CourseDetailsPage;