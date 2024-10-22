import React from 'react';
import { Navbar, Nav, NavItem, NavLink, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import './style.scss'

const TANavBar = ({ activeItem ,id}) => {
    return (
      <Navbar  expand="md" className="instructor-navbar">
        <Nav className="me-auto" navbar>
          <NavItem>
            <NavLink href={`/${id}/list-of-courses`} className={activeItem === 'List of courses' ? "nav-link-active" : "nav-link-custom "}>
            List of courses
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="#" className={activeItem === 'My Schedule' ? "nav-link-active" : "nav-link-custom "}>
            My Schedule
            </NavLink>
          </NavItem>
          
        </Nav>
      </Navbar>
    );
  };
  
  export default TANavBar;