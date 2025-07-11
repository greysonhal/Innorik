import React from 'react'
import { ButtonGroup, Button } from 'react-bootstrap'
import { useState } from 'react'

const categories = ['All Books', 'Fiction', 'Mystery', 'Adventure', 'Romance']

const BookFilter = ({activeFilter,setActiveFilter}) => {
  return (
    <div className="d-flex justify-content-center flex-wrap gap-3 my-4">
      <ButtonGroup className=' w-100'>
        {categories.map((cat) => (
          <Button className='d-flex justify-content-center gap-3 '
            key={cat}
            variant={activeFilter === cat ? 'primary' : 'outline-primary'}
             onClick={() => setActiveFilter(cat)}
             
          >
            {cat}
          </Button>
        ))}
      </ButtonGroup>
    </div>
  )
}

export default BookFilter
