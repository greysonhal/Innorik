import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Swal from 'sweetalert2';
import 'bootstrap/dist/css/bootstrap.min.css';

const BookDelete = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  // ✅ Fetch books from API with Authorization header
  useEffect(() => {
    const fetchBooks = async () => {
      const token = localStorage.getItem('token');

      try {
        const response = await fetch('https://localhost:7094/api/books', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        if (!response.ok) throw new Error('Failed to fetch books');
        const data = await response.json();
        setBooks(data);
      } catch (error) {
        console.error('Error fetching books:', error);
        Swal.fire({
          icon: 'error',
          title: 'Unauthorized',
          text: 'You must be logged in to access this data.'
        });
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  // ✅ Handle Delete with token
  const handleDelete = async (id, title) => {
    const confirm = await Swal.fire({
      title: `Delete "${title}"?`,
      text: 'This action cannot be undone.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel',
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6'
    });

    if (confirm.isConfirmed) {
      const token = localStorage.getItem('token');

      try {
        const response = await fetch(`https://localhost:7094/api/books/${id}`, {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        if (!response.ok) throw new Error('Failed to delete');

        setBooks((prevBooks) => prevBooks.filter((book) => book.id !== id));

        Swal.fire({
          icon: 'success',
          title: 'Deleted!',
          text: `"${title}" has been removed.`,
          confirmButtonColor: '#28a745'
        });
      } catch (error) {
        console.error('Error deleting book:', error);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Could not delete the book.',
          confirmButtonColor: '#dc3545'
        });
      }
    }
  };

  const columns = [
    { field: 'id', headerName: 'ID', flex: 1 },
    { field: 'title', headerName: 'Title', width: 200 },
    { field: 'category', headerName: 'Category', width: 130 },
    { field: 'description', headerName: 'Description', width: 250 },
    { field: 'price', headerName: 'Price (GHS)', type: 'number', width: 130 },
    {
      field: 'actions',
      headerName: 'Delete',
      width: 120,
      sortable: false,
      renderCell: (params) => (
        <button
          className="btn btn-sm btn-danger"
          onClick={() => handleDelete(params.row.id, params.row.title)}
        >
          Delete
        </button>
      )
    }
  ];

  return (
    <div className="container mt-5">
      <h3 className="text-center mb-4">Delete Books</h3>

      <div style={{ height: 400, width: '100%' }}>
        <DataGrid
          rows={books}
          columns={columns}
          getRowId={(row) => row.id}
          loading={loading}
          pageSizeOptions={[5, 10]}
          initialState={{
            pagination: { paginationModel: { page: 0, pageSize: 5 } }
          }}
        />
      </div>
    </div>
  );
};

export default BookDelete;
