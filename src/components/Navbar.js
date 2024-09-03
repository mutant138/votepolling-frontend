// src/components/Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold">PollApp</Link>
        <div>
          <Link to="/" className="mr-4 hover:underline">Create Poll</Link>
          <Link to="/polls" className="mr-4 hover:underline">Polls</Link>
          <Link to="/results" className="hover:underline">Results</Link>
          
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
