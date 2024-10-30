import React from 'react';
import { Navbar, Nav, NavItem, NavLink, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import './style.scss'
import { NavLink as RouterNavLink } from 'react-router-dom';


const CoursesNavlBar = ({ activeItem ,id, bylawId}) => {
  return (
    <Navbar expand="md" className="sub-navbar">
      <Nav className="me-auto" navbar>
        <NavItem>
          <NavLink href={`/Course/${id}/bylaw/${bylawId}`} className={activeItem === 'General' ? "nav-link-active" : "nav-link-custom "}>
            General
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink href={`/Courses/level/2`} className={activeItem === 'Section List' ? "nav-link-active" : "nav-link-custom "}>
           Section List
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink href={`/Course/${id}/instructors`} className={activeItem === 'Instructors' ? "nav-link-active" : "nav-link-custom "}>
           Instructors
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink href={`/Courses/level/4`} className={activeItem === 'Offer state' ? "nav-link-active" : "nav-link-custom "}>
           Offer state
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink href={`/Course/${id}/PrerequesitiesAndDependants`} className={activeItem ===  'Rules' ? "nav-link-active" : "nav-link-custom "}>
         Rules
          </NavLink>
        </NavItem>

        {/* <NavItem>
          <NavLink href={`/Course/${id}/PrerequesitiesAndDependants`} className={activeItem ===  'Registeration log' ? "nav-link-active" : "nav-link-custom "}>
        Registeration log
          </NavLink>
        </NavItem> */}
      </Nav>
    </Navbar>
  );
};

export default CoursesNavlBar;