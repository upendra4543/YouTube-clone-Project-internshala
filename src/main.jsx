import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {  createBrowserRouter,RouterProvider } from 'react-router-dom'
import SignIn, { Login } from './Components/SignIn.jsx'  
import VideoPlayerPage from './Components/VideoPlayerPage.jsx'
import HomePage from './Components/HomePage.jsx'
const appRout = createBrowserRouter([
    {
      path:"/",
      element:<App/>,
      children:[
        {
        index: true, // <-- this means path: "/" as the default child route
        element: <HomePage />  
        },
        {
        path: "home", // now matches "/home"
        element: <HomePage/>
         },
        {
            path: "/video/:videoId",
            element: <VideoPlayerPage />
        }
      ]
    },
    {
      path:"/signin",
      element:<SignIn/>
    } ,
    {
      path:"/login",
      element:<Login/>
    }
])
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={appRout}/>
  </StrictMode>,
)
