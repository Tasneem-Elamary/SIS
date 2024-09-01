import React from 'react';
import { Navbar, Nav, NavItem, NavLink, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import './style.scss'

const SubNavBar = ({ activeItem }) => {
    return (
      <Navbar  expand="md" className="sub-navbar">
        <Nav className="me-auto" navbar>
          <NavItem>
            <NavLink href="#" className={activeItem === 'Doctor' ? "nav-link-active" : "nav-link-custom "}>
              Doctor
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="#" className={activeItem === 'Lecturer' ? "nav-link-active" : "nav-link-custom "}>
              Lecturer
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="#" className={activeItem === 'Student' ? "nav-link-active" : "nav-link-custom "}>
              Student
            </NavLink>
          </NavItem>
        </Nav>
      </Navbar>
    );
  };
  
  export default SubNavBar;