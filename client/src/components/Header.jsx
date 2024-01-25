import React from 'react'

function Header() {
  return (
    <div className="bg-blue-500 p-4">
    <nav className="flex items-center justify-between">
      {/* Logo */}
      <div className="text-white font-bold text-lg">Your Logo</div>

      {/* Navbar Links */}
      <div className="space-x-4">
        <a href="#" className="text-white hover:text-gray-300">Home</a>
        <a href="#" className="text-white hover:text-gray-300">About</a>
        <a href="#" className="text-white hover:text-gray-300">Services</a>
        <a href="#" className="text-white hover:text-gray-300">Contact</a>
      </div>
    </nav>
  </div>
  )
}

export default Header