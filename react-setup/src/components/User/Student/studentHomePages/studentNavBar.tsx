import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from 'reactstrap';

interface StudentNavBarProps {
  activeItem: string;
}

const StudentNavlBar = ({ activeItem }:{activeItem:string}) => {
  const [isOpen, setIsOpen] = useState(false);
  const navigateTo = useNavigate();

  const toggle = () => setIsOpen(!isOpen);

  return (
    <Navbar expand="md" className="navbar">
      <NavbarToggler onClick={toggle} />
      <Collapse isOpen={isOpen} navbar>
        <Nav className="mr-auto" navbar>
          <NavItem>
            <UncontrolledDropdown nav inNavbar>
              <DropdownToggle
                nav
                caret
                className={activeItem === 'Schedule' ? "active" : "custom"}
              >
                Schedule
              </DropdownToggle>
              <DropdownMenu end>
                <DropdownItem href="/register-schedule">Register Schedule</DropdownItem>
                <DropdownItem href="/pending-schedule">Pending Schedule</DropdownItem>
                <DropdownItem href="/student-schedule">My Schedule</DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </NavItem>
          <NavItem>
            <UncontrolledDropdown nav inNavbar>
              <DropdownToggle
                nav
                caret
                className={activeItem === 'Request' ? "navlink-active" : "navlink-custom"}
              >
                Request
              </DropdownToggle>
              <DropdownMenu end>
                <DropdownItem href="/Requests/MappedCourse">Self-study</DropdownItem>
                <DropdownItem href="/Requests/CreateSelfstudy">Overload</DropdownItem>
                <DropdownItem href="/Requests/CreateOverload">Mapped Courses</DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </NavItem>
        </Nav>
      </Collapse>
    </Navbar>
  );
};

export default StudentNavlBar;
