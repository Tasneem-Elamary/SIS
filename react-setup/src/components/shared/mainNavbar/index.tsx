import React from 'react';
import { Navbar, Nav, NavItem, NavLink, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import './style.scss'
import { useEffect,useState } from 'react';
import { CourseType } from '../../../interfaces/domain';
import { useDispatch, useSelector } from 'react-redux';
import  courseAction from '../../../state/actions/course.action';

const MainNavBar = ({ activeItem}:any) => {
  const [courses, setCourses] = useState<CourseType[]>([]);
  const [regulations, setRegulations] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchCourses = async () => {
      const fetchedCourses = await dispatch(courseAction.getCourseAction());
      setCourses(fetchedCourses);
    };

    fetchCourses();
  }, [dispatch]);
  return (
    <Navbar   expand="md" className="Main-navbar">
      <Nav className="mr-auto" navbar>
        <NavItem>
          <NavLink href="#" className={activeItem === 'Dashboard' ? 'navlink-active' : "navlink-custom"}>
            Dashbord
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink href="#" className={activeItem === 'Users' ? 'navlink-active' : "navlink-custom"}>
            Users
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink href="#" className={activeItem === 'Schedule' ? 'navlink-active' : "navlink-custom"}>
            Schedule
          </NavLink>
        </NavItem>
        <UncontrolledDropdown nav inNavbar>
          <DropdownToggle nav caret className={activeItem === 'Queries' ? 'navlink-active' : "navlink-custom"}>
            Queries
          </DropdownToggle>
          <DropdownMenu right>
            <DropdownItem href="#">Query 1</DropdownItem>
            <DropdownItem href="#">Query 2</DropdownItem>
          </DropdownMenu>
        </UncontrolledDropdown>
        <NavItem>
          <NavLink href="#" className={activeItem === 'Logistics' ? 'navlink-active' : "navlink-custom"}>
            Logistics
          </NavLink>
        </NavItem>
        <UncontrolledDropdown nav inNavbar >
          <DropdownToggle nav caret className={activeItem === 'Courses' ? 'navlink-active' : "navlink-custom"}>
            Courses
          </DropdownToggle>
          <DropdownMenu right >
            {courses.length > 0 ? (
              courses.map(course => (
                <DropdownItem key={course.id} href="#">
                  {course.code}
                </DropdownItem>
              ))
            ) : (
              <DropdownItem disabled>No Courses Available</DropdownItem>
            )}
          </DropdownMenu>
        </UncontrolledDropdown>
        <UncontrolledDropdown nav inNavbar>
          <DropdownToggle nav caret className={activeItem === 'Requests' ? 'navlink-active' : "navlink-custom"}>
            Requests
          </DropdownToggle>
          <DropdownMenu right>
            <DropdownItem href="#">Request 1</DropdownItem>
            <DropdownItem href="#">Request 2</DropdownItem>
          </DropdownMenu>
        </UncontrolledDropdown>
        <UncontrolledDropdown nav inNavbar>
          <DropdownToggle nav caret className={activeItem === 'Regulations' ? 'navlink-active' : "navlink-custom"}>
            Regulations
          </DropdownToggle>
          <DropdownMenu right>
            <DropdownItem href="#">Regulation 1</DropdownItem>
            <DropdownItem href="#">Regulation 2</DropdownItem>
          </DropdownMenu>
        </UncontrolledDropdown>
      </Nav>
    </Navbar>
  );
};

export default MainNavBar;