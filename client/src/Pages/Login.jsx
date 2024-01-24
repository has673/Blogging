import React , {useState} from 'react'
import axios from 'axios'

function Login() {
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
        const res = await axios.post('http://localhost:3000/auth/signup', {
         
          email: userdata.email,
          password: userdata.password,
        });
  
        // Handle the response here, like showing a success message or redirecting
        console.log('Response from server:', res.data);
        // toast.success(res.data.message)
        // navigate('/login')
      } catch (error) {
        // Handle errors here, like showing an error message
        console.error('Error:', error.message);
      }
  
    }
  return (
    <div>
        <h1>Login</h1>
        <form>
            <div>
                <input placeholder='Email' type='text'  name='email' value={userdata.email} onChange={onchangetext}>
                </input>
            </div>
            <div>
                <input placeholder='Password' type='password'>
                </input>
            </div>
            <input type='submit' onClick={HandleSubmit}>Registor</input>
        </form>
    </div>
  )
}

export default Login