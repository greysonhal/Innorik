import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import '@fortawesome/fontawesome-free/css/all.min.css'
import {createBrowserRouter,RouterProvider} from 'react-router-dom'
import LoginPage from './Pages/LoginPage.jsx'
import BookAdd from './Pages/BookAdd.jsx'
import BookDelete from './Pages/BookDelete.jsx'
import BookEdit from './Pages/BookEdit.jsx'
import LandingPage from './Pages/LandingPage.jsx'
import RegisterPage from './Pages/RegisterPage.jsx'

const router= createBrowserRouter([
  {
    path:'/',
    element: <LandingPage/>
  },
  {
    path: '/books',
    element:<App/>
  },
  {
    path:'/login',
    element:<LoginPage/>
  },
  {
    path:'/register',
    element:<RegisterPage/>
  },
  {
    path:'/addBook',
    element: <BookAdd/>
  },
  {
    path:'/editBook',
    element:<BookEdit/>
  },
  {
    path:'/deleteBook',
    element:<BookDelete/>
  },
  

])

createRoot(document.getElementById('root')).render(
  <StrictMode>
   <RouterProvider router={router}/>
  </StrictMode>,
)
