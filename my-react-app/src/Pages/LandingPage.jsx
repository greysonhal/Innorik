import React from 'react';
import { Container, Row, Col, Button, Navbar, Nav, Image } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import placeholder from '../assets/Book.png';
import { Link } from 'react-router-dom';

const LandingPage = () => {
  return (
    <div className="d-flex flex-column" style={{ minHeight: '100vh' }}>
      {/* === FIXED NAVBAR === */}
      <Navbar bg="light" expand="lg" fixed="top" className="shadow-sm py-3">
        <Container fluid>
          <Navbar.Brand className="fw-bold fs-3 text-primary ps-3">BookVerse</Navbar.Brand>
          <Navbar.Toggle aria-controls="navbar-nav" className="me-3" />
          <Navbar.Collapse id="navbar-nav" className="justify-content-end pe-3">
            <Nav className="gap-2">
              <Button as={Link} variant="outline-primary" to="/register" size="lg">
                Register
              </Button>
              <Button as={Link} variant="primary" to="/login" size="lg">
                Login
              </Button>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* === MAIN PAGE CONTENT === */}
      <main className="flex-grow-1" style={{ paddingTop: '90px' }}>
        {/* === HERO SECTION === */}
        <section className="bg-white py-5">
          <Container>
            <Row className="align-items-center text-center text-md-start">
              <Col md={6} className="mb-4 mb-md-0">
                <h1 className="fw-bold display-4">
                  Discover Your Next Favorite Book at{' '}
                  <span className="text-primary">BookVerse</span>
                </h1>
                <p className="lead text-muted mt-3 fs-5">
                  A curated collection of stories, knowledge, and imagination. Explore genres from mystery to memoir, right here.
                </p>
                <Button variant="primary" size="lg" href="/books" className="mt-3">
                  Browse Books
                </Button>
              </Col>
              <Col md={6} className="text-center">
                <Image
                  src={placeholder}
                  alt="Book cover placeholder"
                  fluid
                  rounded
                  style={{ maxHeight: '400px', objectFit: 'cover' }}
                />
              </Col>
            </Row>
          </Container>
        </section>

        {/* === FEATURES SECTION === */}
        <section className="py-5 bg-light">
          <Container>
            <Row className="text-center">
              <Col md={4} className="mb-4">
                <h5 className="fw-bold">Wide Selection</h5>
                <p className="text-muted">
                  Fiction, non-fiction, textbooks & more—something special for every reader.
                </p>
              </Col>
              <Col md={4} className="mb-4">
                <h5 className="fw-bold">Secure Checkout</h5>
                <p className="text-muted">
                  Fast, reliable, and protected – your purchases are safe with us.
                </p>
              </Col>
              <Col md={4} className="mb-4">
                <h5 className="fw-bold">Exclusive Deals</h5>
                <p className="text-muted">
                  Weekly discounts and promotions just for our community.
                </p>
              </Col>
            </Row>
          </Container>
        </section>
      </main>

      {/* === FOOTER WRAPPED IN NAVBAR === */}
      <Navbar bg="dark" className="text-white justify-content-center py-3 mt-auto" expand="lg" fixed='bottom'>
        <Container fluid>
          <small className="text-white text-center w-100">
            &copy; {new Date().getFullYear()} BookVerse. All rights reserved.
          </small>
        </Container>
      </Navbar>
    </div>
  );
};

export default LandingPage;
