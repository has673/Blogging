import React from 'react'
import { Link } from 'react-router-dom'

function Header() {
  return (
    <div className="bg-blue-500 p-4">
    <nav className="flex items-center justify-between">
      {/* Logo */}
      <div className="text-white font-bold text-lg">Your Logo</div>

      {/* Navbar Links */}
      <div className="space-x-4">
  
        <Link href="/About" className="text-white hover:text-gray-300">About</Link>
        <Link href="/Contact" className="text-white hover:text-gray-300">About</Link>
       
      </div>
    </nav>
  </div>
  )
}

export default Header