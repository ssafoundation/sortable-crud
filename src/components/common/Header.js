import React from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { NavLink } from "react-router-dom";

const Header = () => {
  return (
    <div>
      <Navbar bg="primary" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand>
            <NavLink className="nav-link" to="/">
              CRUD APP
            </NavLink>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <NavLink className="nav-link" to="/">
                Home
              </NavLink>
              <NavLink className="nav-link" to="/faq">
                FAQ
              </NavLink>
              <NavLink className="nav-link" to="/contact">
                Contact
              </NavLink>
            </Nav>
          </Navbar.Collapse>
          <NavLink className="nav-link" to="/user/add">
            Add User
          </NavLink>
        </Container>
      </Navbar>
    </div>
  );
};

export default Header;
