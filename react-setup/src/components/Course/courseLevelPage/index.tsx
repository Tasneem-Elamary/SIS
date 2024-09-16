import RegisterationNavbar from '../../shared/registerationNavbar';
import MainNavBar from '../../shared/mainNavbar';
import CoursesNavBar from '../CoursesLevelNavbar';
import { Button } from 'reactstrap';
import ViewTable from '../../shared/viewTable/ViewTable';
import './style.scss'
import { useEffect,useState } from 'react';
import { CourseType, InstructorType,UserType } from '../../../interfaces/domain';
import { useDispatch, useSelector } from 'react-redux';
import { courseAction, instructorAction } from '../../../state/actions';
import { useNavigate } from 'react-router-dom';



function CourseLevel({ level}) {
    const [rowValues, setrowValues] = useState<CourseType[]>([]);

    const dispatch = useDispatch();

    useEffect(() => {
        const fetchCourses = async () => {
            const fetchedCourse = await dispatch(courseAction.getCourseByLevelAction(level));
            setrowValues(fetchedCourse);
        };

        fetchCourses();
    }, [dispatch]);
    return (
        <div className="CreateLecturer">
            <RegisterationNavbar />
            <MainNavBar activeItem="Courses" />
            <CoursesNavBar activeItem={level} />
            <div  className='container-table'>
                <div className="fixed-header">
                    <div style={{ marginLeft: "10px" }} className='header-content'>
                        <h3>Level {level} courses</h3>
                        <Button color='primary' className='download-button' >Download course List</Button>
                    </div>
                    <hr />
                </div>
                <ViewTable headers={["","Course Code", "Name","Level","Bylaw Id","Department Id"]} features={["code", "name","level","Bylaws","Departments"]} rowValues={rowValues}  pathKey="/Course/:id/bylaw/:bylawId" showSearchBars={true} />
            </div>

        </div>
    );
}

export default CourseLevel;