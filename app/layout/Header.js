import React from "react";
import Link from 'next/link';

const Header = () => {
  return (
    <header className="flex justify-between items-center">
      <div className="flex flex-col justify-start">
        <Link href="/" className="text-white text-xl font-bold cursor-pointer hover:underline">
            WIKI LOVES MONUMENTS UK
        </Link>
        <p className="text-xl text-white opacity-50">The UK home of the world's largest photo competition</p>
      </div>
      <div className="flex gap-4 flex-wrap">
        <Link href="/competition"      className="text-white hover:underline opacity-50"> Competition     </Link>
        <Link href="/participants" className="text-white hover:underline opacity-50"> Participants</Link>
        <Link href="/monuments"    className="text-white hover:underline opacity-50"> Monuments   </Link>
        <Link href="/gallery"      className="text-white hover:underline opacity-50"> Gallery</Link>
        <Link href="/about"        className="text-white hover:underline opacity-50"> About</Link>
      </div>
    </header>
  );
}

export default Header;