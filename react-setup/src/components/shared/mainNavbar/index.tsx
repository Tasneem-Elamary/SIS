import React, { useState, useEffect } from 'react';
import {
  Navbar,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from 'reactstrap';
import './style.scss';
import { CourseType } from '../../../interfaces/domain';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import courseAction from '../../../state/actions/course.action';
import regulationAction from '../../../state/actions/regulation.action';

const MainNavBar = ({ activeItem }: any) => {
  const [courses, setCourses] = useState<CourseType[]>([]);
  const [regulations, setRegulations] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // const rolev = useSelector((state) => state.user.user.role);

  // console.log(rolev)

  const role = localStorage.getItem('role');
  const id = localStorage.getItem('id');
  const profileUrl =
  role === 'student' ? '/student-profile' : role === 'teaching assistant' ? `/${id}/list-of-students` : role === 'professor' ? `/${id}/list-of-courses` : '/AllLecturer';


  // Fetch Courses
  useEffect(() => {
    const fetchCourses = async () => {
      const fetchedCourses = await dispatch(courseAction.getCourseAction());
      setCourses(fetchedCourses);
     
    };

    fetchCourses();
  }, [dispatch]);

  // Fetch Regulations
  useEffect(() => {
    const fetchRegulations = async () => {
      try {
        const fetchedRegulations = await dispatch(
          regulationAction.viewAllRegulationsAction(),
        );
        setRegulations(fetchedRegulations);
       
      } catch (error) {
        console.error('Error fetching regulations:', error);
      }
    };

    fetchRegulations();
  }, [dispatch]);

  // Fetch Requests todo
  const Requests = [
    { id: 1, name: 'MappedCourse', code: 'Mapped Course' },
    { id: 2, name: 'CreateAnOverload', code: 'Create an overload' },
    { id: 3, name: 'CreateASelfStudy', code: 'Create a self-study' },
  ];

  // Handle Navigation to Regulation Details
  const handleNavigation = (regulationId: string) => {
    navigate(`/regulation/${regulationId}`);
  };

  return (
    <Navbar expand="md" className="Main-navbar">
      <Nav className="mr-auto" navbar>
        <NavItem>
          <NavLink
            href="#"
            className={
              activeItem === 'Dashboard' ? 'navlink-active' : 'navlink-custom'
            }
          >
            Dashboard
          </NavLink>
          </NavItem>

        <NavItem>
          <NavLink
            href={role === 'faculty admin' ? '/AllLecturer' : profileUrl}
            className={activeItem === 'Users' ? 'navlink-active' : 'navlink-custom'}
          >
            {role === 'faculty admin' ? 'Users' : 'Profile'}
          </NavLink>
        </NavItem>
    
        <NavItem>
          <NavLink
            href="#"
            className={
              activeItem === 'Schedule' ? 'navlink-active' : 'navlink-custom'
            }
          >
            Schedule
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink href="/results" className={activeItem === 'Result' ? 'navlink-active' : 'navlink-custom'}>
          Result
          </NavLink>
        </NavItem>

        {/* Queries Dropdown */}
        {role === 'faculty admin' && (
          <UncontrolledDropdown nav inNavbar>
            <DropdownToggle
              nav
              caret
              className={activeItem === 'Queries' ? 'navlink-active' : 'navlink-custom'}
            >
              Queries
            </DropdownToggle>
            <DropdownMenu end>
              <DropdownItem href="/Oueries/RankOfStudent">Rank of students</DropdownItem>
              <DropdownItem href="#">Student who failed</DropdownItem>
              <DropdownItem href="#">Number of students</DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
        )}

        <NavItem>
          <NavLink
            href="/logistics"
            className={
              activeItem === 'Logistics' ? 'navlink-active' : 'navlink-custom'
            }
          >
            Logistics
          </NavLink>
        </NavItem>

        {/* Courses Dropdown */}
        <UncontrolledDropdown nav inNavbar>
          <DropdownToggle
            nav
            caret
            className={
              activeItem === 'Courses' ? 'navlink-active' : 'navlink-custom'
            }
          >
            Courses
          </DropdownToggle>
          <DropdownMenu right>
            {/* {courses.length > 0 ? (
              courses.map(course => (
                <DropdownItem key={course.id} href="/Courses">
                  {course.code}
                </DropdownItem>
              ))
            ) : (
              <DropdownItem disabled>No Courses Available</DropdownItem>
            )} */}
            <DropdownItem href="/Courses/level/1">Level 1 Courses</DropdownItem>
            <DropdownItem href="/Courses/level/2">Level 2 Courses</DropdownItem>
            <DropdownItem href="/Courses/level/3">Level 3 Courses</DropdownItem>
            <DropdownItem href="/Courses/level/4">Level 4 Courses</DropdownItem>
          </DropdownMenu>
        </UncontrolledDropdown>

        {/* Regulations Dropdown */}
        <UncontrolledDropdown nav inNavbar>
          <DropdownToggle
            nav
            caret
            className={
              activeItem === 'Regulations' ? 'navlink-active' : 'navlink-custom'
            }
          >
            Regulations
          </DropdownToggle>
          <DropdownMenu end>
            {regulations.length > 0 ? (
              regulations.map((regulation: any) => (
                <DropdownItem
                  key={regulation.id}
                  onClick={() => handleNavigation(regulation.id)}
                >
                  {regulation.code}
                </DropdownItem>
              ))
            ) : (
              <DropdownItem disabled>No Regulations Available</DropdownItem>
            )}
          </DropdownMenu>
        </UncontrolledDropdown>

        {/* ٌRequests Dropdown */}
        <UncontrolledDropdown nav inNavbar>
          <DropdownToggle
            nav
            caret
            className={
              activeItem === 'Requests' ? 'navlink-active' : 'navlink-custom'
            }
          >
            Requests
          </DropdownToggle>
          <DropdownMenu end>
            {/* {Requests.length > 0 ? (
              Requests.map((regulation: any) => (
                <DropdownItem
                  key={regulation.id}
                  onClick={() => handleNavigation(regulation.id)}
                >
                  {regulation.code}
                </DropdownItem>
              ))
            ) : (
              <DropdownItem disabled>No Requests Available</DropdownItem>
            )} */}

            <DropdownItem href="/Requests/MappedCourse">
              Mapped course
            </DropdownItem>
            <DropdownItem href="/Requests/CreateAnOverload">
              Create an overload
            </DropdownItem>
            <DropdownItem href="/Requests/CreateASelfStudy">
              Create a self-study
            </DropdownItem>
          </DropdownMenu>
        </UncontrolledDropdown>
      </Nav>
    </Navbar>
  );
};

export default MainNavBar;
