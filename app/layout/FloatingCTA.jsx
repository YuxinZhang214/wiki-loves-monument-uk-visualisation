'use client'

import React, { useState } from 'react';

const FloatingCTA = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  // Adjusted duration for a smoother and quicker transition
  const baseStyle = "fixed bottom-10 right-10 bg-red-800 text-white font-bold py-2 rounded-full z-50 transition-all duration-2000 ease-in-out flex items-center border-2 border-white";
  const expandedStyle = isExpanded ? "px-4 w-auto" : "w-12 px-2";

  return (
    <button
      className={`${baseStyle} ${expandedStyle}`}
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(false)}
      onClick={() => window.location.href = 'https://wikilovesmonuments.org.uk'}
    >
      {/* Updated icon rendering for clarity */}
      <span className="material-icons">&#10142;</span> {/* Assuming this is your intended icon representation */}
      {/* Conditionally render text based on expansion */}
      <span className={`${isExpanded ? 'inline-block' : 'hidden'} pl-2`}>Wiki Loves Monuments UK</span>
    </button>
  );
};

export default FloatingCTA;