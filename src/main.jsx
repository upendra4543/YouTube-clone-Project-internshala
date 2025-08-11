import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {  createBrowserRouter,RouterProvider } from 'react-router-dom'
import SignIn, { Login } from './Components/SignIn.jsx'  
import VideoPlayerPage from './Components/VideoPlayerPage.jsx'
import HomePage from './Components/HomePage.jsx'
import CretaeChannelFrom from './Components/CretaeChannelFrom.jsx'
import ChannelPage from './Components/ChannnelPage.jsx'
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
        path: "home", 
        element: <HomePage/>
         },
        {
            path: "/video/:videoId",
            element: <VideoPlayerPage />
        },
        {
          path:"/channelpage",
          element:<ChannelPage/>
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
    },
    {
          path:"/create",
          element:<CretaeChannelFrom/>
        }
])
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={appRout}/>
  </StrictMode>,
)
