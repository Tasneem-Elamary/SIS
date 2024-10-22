import React from 'react';
import { Navbar, Nav, NavItem, NavLink, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import './style.scss'
import { NavLink as RouterNavLink } from 'react-router-dom';


const OueriesNavBar = ({ activeItem }) => {
    return (
      <Navbar  expand="md" className="sub-navbar">
        <Nav className="me-auto" navbar>
          <NavItem>
            <NavLink href="/Queries/Rank of students" className={activeItem === 'Rank of students' ? "nav-link-active" : "nav-link-custom "}>
              Doctor
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="/" className={activeItem === 'Lecturer' ? "nav-link-active" : "nav-link-custom "}>
              TA
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="/view-students" className={activeItem === 'Student' ? "nav-link-active" : "nav-link-custom "}>
              Student
            </NavLink>
          </NavItem>
        </Nav>
      </Navbar>
    );
  };
  
  export default OueriesNavBar;