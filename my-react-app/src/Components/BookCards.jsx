import React from 'react'
import { Container, Row, Col, Card, Badge } from 'react-bootstrap'

const BookCards = ({ books }) => {
  return (
    <Container className="my-4">
      <Row className="g-4">
        {books.map((book, index) => (
          <Col key={index} md={3} sm={6}>
            <Card className="h-100 shadow-sm border-0 rounded-4 card-hover-effect">
              <Card.Body className="d-flex flex-column justify-content-between">
                {/* Title */}
                <div>
                  <Card.Title className="fw-bold fs-5 mb-2 text-primary">
                    {book.title}
                  </Card.Title>

                  {/* Category Badge */}
                  <Badge bg="secondary" className="mb-3">
                    {book.category}
                  </Badge>

                  {/* Description */}
                  <Card.Text className="text-muted" style={{ fontSize: '0.9rem' }}>
                    {book.description}
                  </Card.Text>
                </div>

                {/* Price */}
                <div className="mt-3">
                  <Card.Text className="fw-semibold text-success fs-6">
                    ₵{book.price.toLocaleString()}
                  </Card.Text>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  )
}

export default BookCards
