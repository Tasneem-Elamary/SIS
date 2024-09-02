import React from 'react';
import { Container, Row, Col, Form, FormGroup, Label, Input, Button, Nav, NavItem, NavLink, Navbar, NavbarBrand, NavbarToggler, Collapse, FormText } from 'reactstrap';
// import { FaSearch } from 'react-icons/fa';
import './style.scss'
import { useState } from 'react';

function RegisterationNavbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <Navbar color="dark" dark expand="md" className="navbar-custom">
      {/* Left-aligned brand name */}
      <NavbarBrand className="navbar-brand-custom">
        Registration
      </NavbarBrand>

      {/* Navbar Toggler for small screens */}
      <NavbarToggler onClick={toggle} />

      <Collapse isOpen={isOpen} navbar >
        <Nav className="w-100 d-flex justify-content-between align-items-center " navbar>
          {/* Centered search bar */}
          <Form inline className="form-custom mx-auto">
            <FormGroup>
              <Input
                type="search"
                name="search"
                id="searchBar"
                placeholder="Search for Container"
                className="input-custom"
              />
              {/* <FaSearch className="search-icon" /> Uncomment if you want to use the search icon */}
            </FormGroup>
          </Form>


          {/* Right-aligned user circle */}
          <div className="user-circle ml-auto">
            M
          </div>
        </Nav>
      </Collapse>
    </Navbar>
  );
}

export default RegisterationNavbar;