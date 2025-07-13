import React, { useState } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import 'bootstrap/dist/css/bootstrap.min.css';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); // for redirection

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('https://localhost:7094/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(errorMessage || 'Login failed');
      }

      const data = await response.json();

      // Save token to localStorage
      localStorage.setItem('token', data.token);

      Swal.fire({
        icon: 'success',
        title: 'Login Successful',
        text: 'Welcome back!',
        timer: 1500,
        showConfirmButton: false
      });

      navigate('/books'); // redirect to books
    } catch (error) {
      console.error('Login error:', error);
      Swal.fire({
        icon: 'error',
        title: 'Login Failed',
        text: error.message
      });
    }
  };

  return (
    <div className="min-vh-100 d-flex flex-column justify-content-center align-items-center mt-4">
      <Container>
        <Row className="justify-content-center">
          <Col lg={11} className="mx-auto">
            <div className="bg-white p-4 p-lg-5 shadow rounded w-100">
              <h2 className="text-center text-uppercase text-dark mb-4">Login To Your Account</h2>


              <div className="position-relative text-center my-4">
                <hr className="w-100" />
                <span
                  className="position-absolute top-50 start-50 translate-middle bg-white px-3 text-muted text-uppercase small"
                  style={{ lineHeight: '1', whiteSpace: 'nowrap' }}
                >
                  Or Login With Email
                </span>
              </div>

              <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formEmail" className="mb-3">
                  <Form.Label className="small fw-bold">E-Mail Address:</Form.Label>
                  <div className="input-group">
                    <span className="input-group-text bg-white border-end-0">
                      <svg className="bi bi-person" width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                      </svg>
                    </span>
                    <Form.Control
                      type="email"
                      placeholder="E-Mail Address"
                      className="border-start-0"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                </Form.Group>

                <Form.Group controlId="formPassword" className="mb-3">
                  <Form.Label className="small fw-bold">Password:</Form.Label>
                  <div className="input-group">
                    <span className="input-group-text bg-white border-end-0">
                      <svg className="bi bi-lock" width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                      </svg>
                    </span>
                    <Form.Control
                      type="password"
                      placeholder="Password"
                      className="border-start-0"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>
                </Form.Group>

                <div className="d-flex justify-content-end mb-3">
                  <Link to="#" className="small text-decoration-none text-primary">Forgot Your Password?</Link>
                </div>

                <Button type="submit" variant="primary" className="w-100 d-flex justify-content-center align-items-center">
                  <span className="me-2 text-uppercase">Login</span>
                  <svg className="bi bi-arrow-right" width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M13 9l3 3m0 0l-3 3m3-3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </Button>
              </Form>

              <div className="text-center mt-4">
                <Link to="#" className="small text-primary d-flex justify-content-center align-items-center">
                  <svg className="bi bi-user-plus" width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                  </svg>
                  <span className="ms-2">Don't have an account?</span>
                </Link>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default LoginPage;
