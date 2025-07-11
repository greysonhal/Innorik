import React, { useState, useEffect, useRef } from 'react'
import { DataGrid } from '@mui/x-data-grid'
import { Button } from '@mui/material'
import Swal from 'sweetalert2'
import 'bootstrap/dist/css/bootstrap.min.css'

const columns = [
  { field: 'id', headerName: 'ID', flex: 1 },
  { field: 'title', headerName: 'Title', width: 200 },
  { field: 'category', headerName: 'Category', width: 130 },
  { field: 'description', headerName: 'Description', width: 250 },
  { field: 'price', headerName: 'Price (GHS)', type: 'number', width: 130 }
]

const BookAdd = () => {
  const [allBooks, setAllBooks] = useState([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const formRef = useRef(null)

  const [formData, setFormData] = useState({
    title: '',
    category: '',
    price: '',
    description: ''
  })

  // ✅ Fetch books with Authorization header
  useEffect(() => {
    const fetchBooks = async () => {
      const token = localStorage.getItem('token') // Get JWT token

      try {
        const response = await fetch('http://localhost:5142/api/books', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })

        if (!response.ok) throw new Error('Failed to fetch books')
        const data = await response.json()
        setAllBooks(data)
      } catch (error) {
        console.error('Error fetching books:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchBooks()
  }, [])

  const handleToggleForm = () => {
    setShowForm((prev) => {
      const newState = !prev
      if (!prev) {
        setTimeout(() => {
          formRef.current?.scrollIntoView({ behavior: 'smooth' })
        }, 100)
      }
      return newState
    })
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const token = localStorage.getItem('token')

    try {
      const response = await fetch('http://localhost:5142/api/books', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      })

      if (!response.ok) throw new Error('Failed to add book')

      const newBook = await response.json()
      setAllBooks((prevBooks) => [...prevBooks, newBook])

      setFormData({
        title: '',
        category: '',
        price: '',
        description: ''
      })
      setShowForm(false)

      Swal.fire({
        icon: 'success',
        title: 'Book added successfully!',
        text: `"${newBook.title}" was added to your collection.`,
        confirmButtonColor: '#28a745'
      })
    } catch (error) {
      console.error('Error submitting book:', error)

      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Failed to add the book. Please try again later.',
        confirmButtonColor: '#dc3545'
      })
    }
  }

  return (
    <div className="container mt-5">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h3 className="text-center flex-grow-1">Available Books</h3>
        <Button variant="contained" color="primary" onClick={handleToggleForm}>
          {showForm ? 'Hide Form' : 'Add a Book'}
        </Button>
      </div>

      <div className="mb-5" style={{ height: 400, width: '100%' }}>
        <DataGrid
          rows={allBooks}
          columns={columns}
          getRowId={(row) => row.id}
          loading={loading}
          pageSizeOptions={[5, 10]}
          initialState={{
            pagination: { paginationModel: { page: 0, pageSize: 5 } }
          }}
        />
      </div>

      {showForm && (
        <div ref={formRef} className="card p-4 shadow-sm mx-auto" style={{ maxWidth: '700px' }}>
          <h5 className="mb-4 text-center">Add New Book</h5>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Book Name</label>
              <input
                type="text"
                name="title"
                className="form-control"
                value={formData.title}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Category</label>
              <input
                type="text"
                name="category"
                className="form-control"
                value={formData.category}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Price (GHS)</label>
              <input
                type="number"
                name="price"
                className="form-control"
                value={formData.price}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Description</label>
              <textarea
                name="description"
                className="form-control"
                rows="3"
                value={formData.description}
                onChange={handleChange}
                required
              />
            </div>
            <button type="submit" className="btn btn-success w-100">
              Submit Book
            </button>
          </form>
        </div>
      )}
    </div>
  )
}

export default BookAdd
