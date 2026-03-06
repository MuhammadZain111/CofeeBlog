import { useState,useEffect } from 'react'
import './App.css'
import  authService from './appwrite/auth'
import {login,logout} from './store/authSlice'
import {Footer, Header} from './components'
import { useDispatch } from 'react-redux'



function App() {
  
const [loading, setLoading] = useState(0)


 const dispatch  = useDispatch();

   useEffect(() => {
      authService.getCurrentUser()
      .then((userData) => {
       if (userData) {
         dispatch(login(userData));
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



  return (
    <>
    <div className="" >
    <Header />
    <Footer />
    </div>

      <h1>Vite + React</h1>
    </>
  )
}

export default App
