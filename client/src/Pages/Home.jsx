import axios from 'axios'
import React , {useEffect, useState} from 'react'

function Home() {
  const[blogs , setBlogs] = useState([])
  useEffect(()=>{
   getblogs()
  } , [])
async  function getblogs(){
    try{
      const response = await axios.get('http://localhost:3000/blog/getblogs')
      setBlogs(response?.data)
      console.log(blogs)


    }
    catch(err){
      console.log(err)
    }
  }
  return (
    <div><h1>Home</h1>
     <ul>
        {blogs.map((blog) => (
          <li key={blog.id}>{blog.title}</li>
          // Adjust this based on your actual blog data structure
        ))}
      </ul>
    </div>
  )
}

export default Home