import React from "react";
import { Navbar, Nav, NavDropdown, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const NavigationBar = ({ isAuthenticated, handleLogout }) => {
  return (
    <Navbar bg="transparent" variant="dark" expand="lg">
      <Navbar.Brand as={Link} to="/" className="d-flex align-items-center">
        <div className="mb-1 mx-1">🔮</div>
        <div>ExcelLent</div>
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" className="btn-primary mx-1" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ml-auto d-flex align-items-center">
          <Nav.Link as={Link} to="/" className="mx-2">
            Home
          </Nav.Link>
          {isAuthenticated ? (
            <>
              <Nav.Link as={Link} to="/wallets">
                Wallets
              </Nav.Link>
              <NavDropdown title="Account" id="basic-nav-dropdown">
                <NavDropdown.Item as={Link} to="/account">
                  Riepilogo Account
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item as={Link} to="/" onClick={handleLogout}>
                  Disconnetti
                </NavDropdown.Item>
              </NavDropdown>
            </>
          ) : (
            <Nav.Link as={Link} to="/auth" className="mx-2">
              <Button variant="primary">Accedi</Button>
            </Nav.Link>
          )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavigationBar;
