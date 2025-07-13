import React from 'react'
import { Container, Card, Row, Col } from 'react-bootstrap'
import { FaPlusCircle, FaEdit, FaTrashAlt } from 'react-icons/fa'
import { Link } from 'react-router-dom'

const Dashboard = () => {
  return (
     <div className="pt-5 mt-4 bg-light">
      <Container className="py-4">
        <h2 className="text-center mb-4">Dashboard</h2>
        <Row className="text-center g-4 justify-content-center">
          <Col md={4} sm={6}>
            <Card className="shadow border-0 h-100">
              <Card.Body>
                <FaPlusCircle className="display-4 text-primary mb-3" />
                <Card.Title className="fs-4 fw-semibold">Add Book</Card.Title>
                <Card.Text className="text-muted">Create a new book record in the store.</Card.Text>
                <Link to="/addBook" className="stretched-link text-decoration-none text-primary fw-bold">
                  Go to page
                </Link>
              </Card.Body>
            </Card>
          </Col>

          <Col md={4} sm={6}>
            <Card className="shadow border-0 h-100">
              <Card.Body>
                <FaEdit className="display-4 text-warning mb-3" />
                <Card.Title className="fs-4 fw-semibold">Edit Book</Card.Title>
                <Card.Text className="text-muted">Modify existing book information.</Card.Text>
                <Link to="/editBook" className="stretched-link text-decoration-none text-warning fw-bold ">
                  Go to page
                </Link>
              </Card.Body>
            </Card>
          </Col>

          <Col md={4} sm={6}>
            <Card className="shadow border-0 h-100">
              <Card.Body>
                <FaTrashAlt className="display-4 text-danger mb-3" />
                <Card.Title className="fs-4 fw-semibold">Delete Book</Card.Title>
                <Card.Text className="text-muted">Remove a book permanently from the store.</Card.Text>
                <Link to="/deleteBook" className="stretched-link text-decoration-none text-danger fw-bold">
                  Go to page
                </Link>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default Dashboard
