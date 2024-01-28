import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';


function Registor() {
  const navigate = useNavigate()
  const [err , setErr] = useState('')
    const initialState = {
       
        email:'',
        password:'',
       
      };
    const [userdata , setUserdata]= useState(initialState)
    function onchangetext ( e){
        const{name , value} = e.target
        setUserdata(prevUserdata =>{
            return{
                ...prevUserdata,
                [name]: value
                
            }
    
        })
     
    }
   async   function HandleSubmit(e){
    e.preventDefault();
    try {
        const res = await axios.post('http://localhost:3000/auth/Signup', {
         
          email: userdata.email,
          password: userdata.password,
        });
        if(res.data.success){
          console.log(res.data.message)

          navigate('/login')
        }
        else{
          console.log('henry')
          console.log(res.data.message)
          setErr(res.data.message)
        }
  
      } catch (error) {
        // Handle errors here, like showing an error message
        console.log('Error:', error.message);
        setErr(error.message)
        // setErr(error)
      }
  
    }
  return (
    <div className="flex flex-col items-center justify-center h-screen">
    <h1 className="text-3xl font-bold mb-6">Signup</h1>
    <form className="flex flex-col items-center border-green-300 rounded-2xl p-8">
        <div className="mb-4">
            <input
                placeholder='Email'
                type='text'
                name='email'
                value={userdata.email}
                onChange={onchangetext}
                className="p-2 m-2 border border-gray-300 rounded-2xl"
            />
        </div>
        <div className="mb-4">
            <input
                placeholder='Password'
                type='password'
                name='password'
                value={userdata.password}
                onChange={onchangetext}
                className="p-2 border border-gray-300 rounded-2xl"
            />
        </div>
        <p className='text-red-500 mb-8'>{err.message}</p>
        <button
            type='button'
            onClick={HandleSubmit}
            className="p-3 bg-green-500 text-white rounded-xl cursor-pointer hover:bg-green-600"
        >
            Register
        </button>
    </form>
</div>

  )
}

export default Registor