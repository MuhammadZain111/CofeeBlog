import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Provider } from "react-redux"
import store from './store/store.js'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'


import Home from './components/pages/Home.jsx'
import Login from './components/pages/LoginPage.jsx'
import Signup from './components/pages/Signup.jsx'
import AllPosts from './components/pages/AllPost.jsx'
import Post from './components/pages/Post.jsx'
import AddPost from './components/pages/AddPost.jsx'    // ✅ added
import EditPost from './components/pages/EditPost.jsx'  // ✅ added
import AuthLayout from './components/AuthLayout.jsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/login",
        element: (
          <AuthLayout authentication={false}>
            <Login />
          </AuthLayout>
        ),
      },
      {
        path: "/signup",
        element: (
          <AuthLayout authentication={false}>
            <Signup />
          </AuthLayout>
        ),
      },
      {
        path: "/all-posts",
        element: (
          <AuthLayout authentication>
            <AllPosts />
          </AuthLayout>
        ),
      },
      {
        path: "/create-post",
        element: (
          <AuthLayout authentication>
            <AddPost />    // ✅ fixed
          </AuthLayout>
        ),
      },
      {
        path: "/edit-post/:slug",   // ✅ added edit route
        element: (
          <AuthLayout authentication>
            <EditPost />
          </AuthLayout>
        ),
      },
      {
        path: "/post/:slug",
        element: <Post />,
      }
    ],
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>,
)