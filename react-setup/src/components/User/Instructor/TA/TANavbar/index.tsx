import React from 'react';
import { Navbar, Nav, NavItem, NavLink, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import './style.scss'

const TANavBar = ({ activeItem ,id}) => {
    return (
      <Navbar  expand="md" className="instructor-navbar">
        <Nav className="me-auto" navbar>
          <NavItem>
            <NavLink href={`/${id}/list-of-students`} className={activeItem === 'List of students' ? "nav-link-active" : "nav-link-custom "}>
            List of students
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="#" className={activeItem === 'My Schedule' ? "nav-link-active" : "nav-link-custom "}>
            My Schedule
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink href={`/${id}/list-of-pendingStudents`} className={activeItem === 'List of pending' ? "nav-link-active" : "nav-link-custom "}>
            List of pending
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="#" className={activeItem === 'System log' ? "nav-link-active" : "nav-link-custom "}>
            System log
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink href={`/${id}/list-of-selfstudy-students`} className={activeItem === 'selfstudy' ? "nav-link-active" : "nav-link-custom "}>
            List of self study
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="#" className={activeItem === 'List of mapped courses' ? "nav-link-active" : "nav-link-custom "}>
            List of mapped courses
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink href={`/${id}/list-of-overload-students`} className={activeItem === 'overload' ? "nav-link-active" : "nav-link-custom "}>
            List of overload
            </NavLink>
          </NavItem>
        </Nav>
      </Navbar>
    );
  };
  
  export default TANavBar;