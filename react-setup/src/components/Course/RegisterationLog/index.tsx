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

import CoursesNavlBar from '../courseNavbar';
import { useNavigate, useParams } from 'react-router-dom';



function CourseLevel({ level}) {
    const { id,bylawId } = useParams();
   
    const [course, setcourse] = useState<CourseType>();
    const [prerequisite, setPrerequisite] = useState<CourseType[]>([]);
    const [dependant, setDependant] = useState<CourseType[]>([]);
   

    const dispatch = useDispatch();

    useEffect(() => {
        const fetchCourses = async () => {
            const fetchedCoursePrereuesite = await dispatch(courseAction.getcoursePrerequisitieAction(id));
            const fetchedCourseDependant = await dispatch(courseAction.getcourseDependantAction(id));
            setcourse(fetchedCoursePrereuesite);
            setPrerequisite(fetchedCoursePrereuesite?.Prerequisite)
            setDependant (fetchedCourseDependant?.DependentCourse)
        };

        fetchCourses();
    }, [dispatch]);
    return (
        <div className="CreateLecturer">
            <RegisterationNavbar />
            <MainNavBar activeItem="Courses" />
            <CoursesNavBar activeItem={course?.level} />
            <div  className='container-table'>
                <div className="fixed-header">
                    <div style={{ marginLeft: "10px" }} >
                        <h3>{course?.code}</h3>
                        <CoursesNavlBar activeItem="Rules" id={id} bylawId={bylawId}/>
                        {/* <Button color='primary' className='download-button' >Download course List</Button> */}
                    </div>
                    <hr />
                </div>
                <TwoColumnTable headers = {['CoursePrereuesites','CourseDependant']  } 
                values={[prerequisite,dependant]} renderItem={(item) => (
                  <>
                    {item.code ? `${item.code} - ${item.name}` : item} 
                   
                  </>
                )}/>
            </div>

        </div>
    );
}

export default CourseLevel;