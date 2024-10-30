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
            Rank of students
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="#" className={activeItem === 'student who failed' ? "nav-link-active" : "nav-link-custom "}>
            student who failed
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="#" className={activeItem === 'number of Students' ? "nav-link-active" : "nav-link-custom "}>
            number of Students
            </NavLink>
          </NavItem>
        </Nav>
      </Navbar>
    );
  };
  
  export default OueriesNavBar;