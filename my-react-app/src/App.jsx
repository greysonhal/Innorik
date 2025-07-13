import { useState, useEffect } from 'react'
import './App.css'
import MainNavbar from './Components/Navbar'
import 'bootstrap/dist/css/bootstrap.min.css'
import Dashboard from './Components/Dashboard'
import BookFilter from './Components/BookFilter'
import BookCards from './Components/BookCards'

function App() {
  const [activeFilter, setActiveFilter] = useState('All Books')
  const [searchTerm, setSearchTerm] = useState('')
  const [allBooks, setAllBooks] = useState([]) // real book data from API
  const [loading, setLoading] = useState(true)

  useEffect(() => {
  const fetchBooks = async () => {
    const token = localStorage.getItem('token'); // Retrieve stored token

    try {
      const response = await fetch('https://localhost:7094/api/books', {
        headers: {
          Authorization: `Bearer ${token}` // Include token in header
        }
      });

      if (!response.ok) {
        if (response.status === 401) {
          throw new Error('Unauthorized. Please login.');
        }
        throw new Error('Failed to fetch books');
      }

      const data = await response.json();
      setAllBooks(data);
    } catch (error) {
      console.error('Error fetching books:', error.message);
    } finally {
      setLoading(false);
    }
  };

  fetchBooks();
}, []);

  // Filtering logic stays the same
  const filteredBooks = allBooks.filter((book) => {
    const matchesCategory =
      activeFilter === 'All Books' || book.category === activeFilter
    const matchesSearch = book.title.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesCategory && matchesSearch
  })

  return (
    <>
      <MainNavbar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <Dashboard />
      <BookFilter activeFilter={activeFilter} setActiveFilter={setActiveFilter} />
      {loading ? (
        <p className="text-center mt-5">Loading books...</p>
      ) : (
        <BookCards books={filteredBooks} />
      )}
    </>
  )
}

export default App
