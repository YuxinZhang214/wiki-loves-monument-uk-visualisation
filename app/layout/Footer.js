import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

const Footer = () => {
    return (
        <footer className="bg-red-800 text-white">
            <div className="container mx-auto flex flex-wrap justify-between items-start">
                {/* Project Info/Description Section */}
                <div className="w-full lg:w-1/2 mb-6 lg:mb-0 ">
                    <h2 className="text-lg font-semibold mb-2">About the Project</h2>
                    <p className=''>Wiki Loves Monuments UK is local edition of the world's largest photo contest, with a spotlight on cultural heritage sites across the UK. This web application serves as a platform to explore the rich history, vibrant community, and far-reaching impact of the competition. Users can delve into their own contributions, examine a comprehensive dataset of documented monuments, and view a diverse collection of image submissions over the entire competition history.</p>
                    <div className="flex items-center space-x-4 mt-4 ">
                        <div className="wikidata-logo">
                            <Image src="/wikidata-logo-dark.svg" alt="Wikidata Logo" width={150} height={150} />
                        </div>
                        <div className="wikimedia-logo">
                            <Image src="/wikimedia-logo.svg" alt="Wikimedia Commons Logo" width={100} height={100} />
                        </div>
                    </div>
                </div>

                {/* Navigation Links */}
                <div className="w-2/5 flex justify-end">
                    <div className="flex space-x-16 mx-16">
                        <div className="px-4">
                            <h3 className="font-bold mb-4">Discover</h3> 
                            <ul>
                                <li className="mb-2"><Link href="/competition" className="hover:underline opacity-50">Competition</Link></li>
                                <li className="mb-2"><Link href="/participants" className="hover:underline opacity-50">Participants</Link></li>
                            </ul>
                        </div>
                        <div className="px-4">
                            <h3 className="font-bold mb-4">Explore</h3>
                            <ul>
                                <li className="mb-2"><Link href="/monuments" className="hover:underline opacity-50">Monuments</Link></li>
                                <li className="mb-2"><Link href="/gallery" className="hover:underline opacity-50">Gallery</Link></li>
                            </ul>
                        </div>
                        <div className="px-4">
                            <h3 className="font-bold mb-4">More</h3>
                            <ul>
                                <li className="mb-2"><Link href="/about" className="hover:underline opacity-50">About</Link></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;