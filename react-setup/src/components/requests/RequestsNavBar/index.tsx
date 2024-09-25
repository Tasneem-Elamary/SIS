import React from 'react';
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
import { NavLink as RouterNavLink } from 'react-router-dom';

const SubNavBar = ({ activeItem }) => {
  return (
    <Navbar expand="md" className="sub-navbar">
      <Nav className="me-auto" navbar>
        <NavItem>
          <NavLink
            href="/Requests/MappedCourse"
            className={
              activeItem === 'MappedCourse'
                ? 'nav-link-active'
                : 'nav-link-custom '
            }
          >
            Mapped Course
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            href="/Requests/CreateAnOverload"
            className={
              activeItem === 'CreateAnOverload'
                ? 'nav-link-active'
                : 'nav-link-custom '
            }
          >
            Create an overload
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            href="/Requests/CreateASelfStudy"
            className={
              activeItem === 'CreateASelfStudy'
                ? 'nav-link-active'
                : 'nav-link-custom '
            }
          >
            Create a self-study
          </NavLink>
        </NavItem>
      </Nav>
    </Navbar>
  );
};

export default SubNavBar;
