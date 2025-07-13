import React, { useState, useEffect, useRef } from 'react'
import { DataGrid } from '@mui/x-data-grid'
import { Button } from '@mui/material'
import Swal from 'sweetalert2'
import 'bootstrap/dist/css/bootstrap.min.css'

const columnsBase = [
  { field: 'id', headerName: 'ID', flex: 1 },
  { field: 'title', headerName: 'Title', width: 200 },
  { field: 'category', headerName: 'Category', width: 130 },
  { field: 'description', headerName: 'Description', width: 250 },
  { field: 'price', headerName: 'Price (GHS)', type: 'number', width: 130 }
]

const BookEdit = () => {
  const [books, setBooks] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedBook, setSelectedBook] = useState(null)
  const formRef = useRef(null)

  useEffect(() => {
    const fetchBooks = async () => {
      const token = localStorage.getItem('token')

      try {
        const response = await fetch('https://localhost:7094/api/books', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })

        if (!response.ok) throw new Error('Failed to fetch books')

        const data = await response.json()
        setBooks(data)
      } catch (error) {
        console.error('Error fetching books:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchBooks()
  }, [])

  // Scroll to form when a book is selected
  useEffect(() => {
    if (selectedBook && formRef.current) {
      formRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }, [selectedBook])

  const handleEditClick = (row) => {
    setSelectedBook({ ...row })
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setSelectedBook((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const token = localStorage.getItem('token')

    try {
      const response = await fetch(`https://localhost:7094/api/books/${selectedBook.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(selectedBook)
      })

      if (!response.ok) throw new Error('Failed to update book')

      setBooks((prev) =>
        prev.map((book) => (book.id === selectedBook.id ? selectedBook : book))
      )

      Swal.fire({
        icon: 'success',
        title: 'Book updated successfully!',
        text: `"${selectedBook.title}" has been updated.`,
        confirmButtonColor: '#28a745'
      })

      setSelectedBook(null)
    } catch (error) {
      console.error('Error updating book:', error)

      Swal.fire({
        icon: 'error',
        title: 'Update failed',
        text: 'Could not update book. Try again.',
        confirmButtonColor: '#dc3545'
      })
    }
  }

  const columns = [
    ...columnsBase,
    {
      field: 'actions',
      headerName: 'Edit',
      width: 120,
      sortable: false,
      renderCell: (params) => (
        <Button
          variant="contained"
          size="small"
          color="primary"
          onClick={() => handleEditClick(params.row)}
        >
          Edit
        </Button>
      )
    }
  ]

  return (
    <div className="container mt-5">
      <h3 className="text-center mb-4">Edit Books</h3>

      <div style={{ height: 400, width: '100%' }} className="mb-4">
        <DataGrid
          rows={books}
          columns={columns}
          getRowId={(row) => row.id}
          loading={loading}
          pageSizeOptions={[5, 10]}
          initialState={{ pagination: { paginationModel: { page: 0, pageSize: 5 } } }}
        />
      </div>

      {selectedBook && (
        <div ref={formRef} className="card p-4 shadow-sm mx-auto" style={{ maxWidth: '700px' }}>
          <h5 className="mb-4 text-center">Edit Book</h5>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Book Name</label>
              <input
                type="text"
                name="title"
                className="form-control"
                value={selectedBook.title}
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
                value={selectedBook.category}
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
                value={selectedBook.price}
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
                value={selectedBook.description}
                onChange={handleChange}
                required
              />
            </div>
            <button type="submit" className="btn btn-success w-100">
              Update Book
            </button>
          </form>
        </div>
      )}
    </div>
  )
}

export default BookEdit
