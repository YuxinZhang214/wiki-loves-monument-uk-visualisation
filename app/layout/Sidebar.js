import React from 'react';
import Link from 'next/link';

const Sidebar = () => {
    return(
        <aside className="h-full px-6">
            <div className="flex flex-col justify-center h-20">
                <Link className='text-xl font-bold cursor-pointer' href="/"> Wiki Loves Monument UK </Link>
            </div>
            <nav className="flex flex-col space-y-4">
                <Link href="/contest">          Contest             </Link>
                <Link href="/participation">    Participation       </Link>
                <Link href="/author">           Author              </Link>
                <Link href="/heritage">         Heritage            </Link>
                <Link href="/gallery">          Gallery             </Link>
                <Link href="/about">            About               </Link>
            </nav>
        </aside>
    )
}

export default Sidebar;