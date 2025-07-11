import React from 'react';
import { Navbar, Nav, Container, Form, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';

const MainNavbar = ({ searchTerm, setSearchTerm }) => {
  const navigate = useNavigate();

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleLogout = () => {
    //  Clear JWT token
    localStorage.removeItem('token');

    // Optional: clear other sensitive data or global states here

    // Redirect to landing page
    navigate('/');
  };

  return (
    <Navbar expand="lg" fixed="top" bg="dark" variant="dark">
      <Container>
        <Navbar.Brand as={Link} to="/books" className="fw-bold fs-3 text-primary ps-3">
          BookVerse
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbar-content" />
        <Navbar.Collapse id="navbar-content">
          <Form className="d-flex mx-auto w-50">
            <Form.Control
              type="search"
              placeholder="Search books..."
              className="me-2"
              aria-label="Search"
              value={searchTerm}
              onChange={handleSearchChange}
            />
            <Button variant="outline-light">Search</Button>
          </Form>

          <Nav>
            <Button variant="outline-light" onClick={handleLogout}>
              Logout
            </Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default MainNavbar;
