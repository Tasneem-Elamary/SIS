import React from 'react';
import { Navbar, Nav, NavItem, NavLink, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import './style.scss'
import { NavLink as RouterNavLink } from 'react-router-dom';


const CoursesLevelBar = ({ activeItem }) => {
  const role = localStorage.getItem('role');
  return (
    <Navbar expand="md" className="sub-navbar">
      <Nav className="me-auto" navbar>
        <NavItem>
          <NavLink href={`/Courses/level/1`} className={activeItem === 1 ? "nav-link-active" : "nav-link-custom "}>
            Level 1 courses
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink href={`/Courses/level/2`} className={activeItem === 2 ? "nav-link-active" : "nav-link-custom "}>
            Level 2 courses
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink href={`/Courses/level/3`} className={activeItem === 3 ? "nav-link-active" : "nav-link-custom "}>
            Level 3 courses
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink href={`/Courses/level/4`} className={activeItem === 4 ? "nav-link-active" : "nav-link-custom "}>
            Level 4 courses
          </NavLink>
        </NavItem>
        
        {role === "faculty admin" && (
          <NavItem>
            <NavLink
              href={`/Courses/createNewCourse`}
              className={activeItem === "create new course" ? "nav-link-active" : "nav-link-custom"}
            >
              Create New Course
            </NavLink>
          </NavItem>
        )}
      </Nav>
    </Navbar>
  );
};

export default CoursesLevelBar;