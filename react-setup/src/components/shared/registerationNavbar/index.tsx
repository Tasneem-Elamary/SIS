import React from 'react';
import { Container, Row, Col, Form, FormGroup, Label, Input, Button, Nav, NavItem, NavLink, Navbar, NavbarBrand, NavbarToggler, Collapse, FormText } from 'reactstrap';
// import { FaSearch } from 'react-icons/fa';
import './style.scss'

function RegisterationNavbar() {
  return (
    <Navbar color="dark" dark expand="md" className="navbar-custom">
      <Nav className="w-100 d-flex justify-content-between align-items-center">
        {/* Left-aligned brand name */}
        <NavbarBrand className="navbar-brand-custom">
          Registration
        </NavbarBrand>

        {/* Centered search bar */}
        <Form inline className="form-custom">
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
        <div className="user-circle">
          M
        </div>
      </Nav>
    </Navbar>
  );
}

export default RegisterationNavbar;