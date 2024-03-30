
import { BrowserRouter, createBrowserRouter, Link, Route, NavLink, createRoutesFromElements, RouterProvider, Routes } from 'react-router-dom';

import Registor from './Pages/Registor';
import Login from './Pages/Login';
import Layout from './components/Layout';
import Home from './Pages/Home';
import About from './Pages/About';
import Contact from './Pages/Contact';
import Dashboard from './Pages/Admin/Dashboard';
import Forgot from './Pages/Forgot';
import UpdateProfile from './Pages/User/UpdateProfile'
import Profile from './Pages/User/Profile';
import Privateroute from './components/Privateroute';
import Singleblog from './Pages/Singleblog';

import User from './Pages/User/User';
import Notfound from './Pages/Notfound';
const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path='/signup' element={<Registor />} />
      <Route path='/login' element={<Login />} />
      <Route path='forgot' element={<Forgot/>}/>
      <Route path='/' element={<Layout />}>
        <Route path='/Home' element={<Home />} />
        <Route path='/About' element={<About />} />
        <Route path='/Contact' element={<Contact />} />
        <Route path='/Dashboard' element={<Dashboard />} />
        <Route path='/blog/:id' element={<Singleblog/>} />
        <Route path='/user/:id' element={<User/>} />
        <Route path='/updateprofile/:id' element={<UpdateProfile/>}/>
        <Route path= "*" element={<Notfound/>}/>
        {/* <Route path='/' element={<Privateroute />}>
        <Route path='/Profile' element={<Profile />} />

        </Route> */}
      </Route> 
    </>
  )
)
function App() {


  return (
    <>
      <RouterProvider router={router} />

    </>
  )
}

export default App
