import { useState, useEffect } from 'react'
import './App.css'
import authService from './appwrite/auth'
import { login, logout } from './store/authSlice'
import { Header } from './components'
import { useDispatch } from 'react-redux'
import { Outlet } from 'react-router-dom'  

function App() {
  const [loading, setLoading] = useState(true)
  const dispatch = useDispatch();

  useEffect(() => {
    authService.getCurrentUser()
      .then((userData) => {
        if (userData) {
          dispatch(login({ userData: userData }))
        } else {
          dispatch(logout());
        }
      })
      .catch((error) => {
        console.log("Error fetching user:", error);
        dispatch(logout());
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading....</div>

  return (
    <>
      <div>
        <Header />
        <main>
          <Outlet />  
        </main>
      </div>
    </>
  )
}

export default App
