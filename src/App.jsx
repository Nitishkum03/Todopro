import React, { useEffect, useState } from 'react'
import Todo from './components/Todo'
import Auth from "./components/Auth";
import { ToastContainer } from 'react-toastify';


const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(null)
  useEffect(()=>{
    const user =localStorage.getItem("loggedInUser");
    if (user) setIsAuthenticated(true);
  },[])
  return (
    <>
    <ToastContainer position='Top-right' autoClose={2000}/>
    {
      isAuthenticated ? (
      <div>
        <Todo />
      </div>
         
      ): (
        <div className='h-screen flex items-center justify-center bg-gray-100'>
          <Auth setIsAuthenticated={setIsAuthenticated} />
        </div>
      )
    }
    </>
  )
}

export default App