
import { BrowserRouter, createBrowserRouter, Link, Route, NavLink, createRoutesFromElements, RouterProvider, Routes } from 'react-router-dom';

import Registor from './Pages/Registor';
import Login from './Pages/Login';
import Layout from './components/Layout';
const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route>
        {/* <Route path='addrecipe' element={<Add />}></Route>
        <Route path='getrecipe' element={<Get />}></Route> */}
        <Route path='signup' element={<Registor />}/> 
        <Route path='Login' element={<Login/>} />
        <Route path='/' element={<Layout/>}>

        </Route>
       

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
