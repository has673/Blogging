
import {  createBrowserRouter,  Route, createRoutesFromElements, RouterProvider} from 'react-router-dom';

import Registor from './Pages/Registor';
import Login from './Pages/Login';
import Layout from './components/Layout';
import Home from './Pages/Home';
import About from './Pages/About';
import Contact from './Pages/Contact';
import Dashboard from './Pages/Admin/Dashboard';
import Forgot from './Pages/Forgot';
import UpdateProfile from './Pages/User/UpdateProfile'
import Privateroute from './Pages/PrivateRoute';
import Singleblog from './Pages/Singleblog';
import { ToastContainer } from 'react-toastify';
import User from './Pages/User/User';
import Notfound from './Pages/Notfound';
import Write from './Pages/User/Write';
import EditBlog from './Pages/User/EditBlog'
import AdminRoute from './components/AdminRoute';
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
        <Route path='/Dashboard' element={<Dashboard/>}>
         </Route>
        <Route path="/blog/:id"  element={<Privateroute/>} > //protected routes  
        <Route path=""  element={<Singleblog/>} />  
        </Route>
        <Route path='/user/:id' element={<User/>} />
        <Route path='/updateprofile/:id' element={<UpdateProfile/>}/>
        <Route path='/writeblog' element={<Write/>}/>
        <Route path='/editblog/:id' element={<EditBlog/>}/>
        <Route path= "*" element={<Notfound/>}/>
        
      </Route> 
    </>
  )
)
function App() {
  
 

  
  return (
    <>
      <RouterProvider router={router} />
      <ToastContainer/>

    </>
  )
}

export default App
