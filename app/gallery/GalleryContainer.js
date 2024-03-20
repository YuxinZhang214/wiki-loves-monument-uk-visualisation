import React, { useContext, useState, useEffect } from "react";
import { motion } from "framer-motion"; 
import { DataContext } from "@/context";
import ImageGallery from "./ImageGallery";

const GalleryContainer = () => {
    const { submission_images } = useContext(DataContext);

    const [searchTerm, setSearchTerm] = useState(""); 
    const [suggestions, setSuggestions] = useState([]);

    useEffect(() => {
        if (searchTerm.length > 0) {
            const authors = submission_images
                .filter(image => 
                    image.image_author.toLowerCase().startsWith(searchTerm.toLowerCase()) 
                );
    
            const distinctAuthors = [...new Set(authors.map(image => image.image_author))].map(author => ({ type: 'author', value: author }));

            const labels = submission_images
            .filter(image => 
                image.label.toLowerCase().startsWith(searchTerm.toLowerCase())
            );

            const distinctLabels = [...new Set(labels.map(image => image.label))].map(label => ({ type: 'label', value: label }));
            const combinedSuggestions = [...distinctAuthors, ...distinctLabels].slice(0, 5);
            
            setSuggestions(combinedSuggestions);
        } else {
            setSuggestions([]);
        }
    }, [searchTerm, submission_images]);
    

    const handleSubmit = (e) => {
        e.preventDefault(); 
        console.log("Searching for:", searchTerm);
    };

    const svgVariants = {
        hover: {
          scale: 1.2, // Scale the icon to make it slightly larger
          transition: {
            type: 'spring', // Use a spring animation for some natural motion
            stiffness: 300, // How stiff the spring is
          },
        }
    }

    return (
        <div>
            {/* Search Bar Section */}
            <motion.div id='search-user'
                className="flex flex-col items-center justify-center p-16 h-3/4 bg-cover bg-center"
                style={{ backgroundImage: 'url(/path-to-your-background-image.jpg)' }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
            >
                <motion.h1 
                    className="text-5xl font-bold text-white text-center mb-4"
                    initial={{ y: 30, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.8 }}
                >
                    Explore the Images
                </motion.h1>
                <motion.p 
                    className="text-white mb-8"
                    initial={{ y: 30, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.8 }}
                >
                    See the images submission for the competition. Enter in your user name or image label to view your submissions
                </motion.p>
                <form onSubmit={handleSubmit} className="w-full max-w-md">
                    <div className="flex items-center border-2 border-white px-3 py-1 bg-white bg-opacity-20">
                        <input
                            type="search"
                            className="flex-grow bg-transparent p-2 focus:outline-none"
                            placeholder="Search keyword"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <button
                            type="submit"
                            className="text-white p-2 focus:outline-none"
                        >
                            <motion.svg 
                                xmlns="http://www.w3.org/2000/svg" 
                                className="w-6 h-6 fill-current" 
                                viewBox="0 0 24 24" 
                                whileHover="hover"      // Apply the hover variant on hover
                                variants={svgVariants}  // Pass the animation variants
                            >
                                <path d="M23.707 22.293l-6.364-6.364A9.953 9.953 0 0 0 20 10c0-5.523-4.477-10-10-10S0 4.477 0 10s4.477 10 10 10a9.953 9.953 0 0 0 6.929-2.657l6.364 6.364a.999.999 0 1 0 1.414-1.414zM10 18a8 8 0 1 1 0-16 8 8 0 0 1 0 16z"/>
                            </motion.svg>
                        </button>
                    </div>
                    {suggestions.length > 0 && (
                        <ul className="absolute w-full max-w-md mt-1 bg-indigo-950 shadow-lg rounded-md z-10 border-2">
                            {suggestions.map((suggestion, index) => (
                                <li
                                    key={index}
                                    className="px-4 p-2 text-white hover:underline cursor-pointer"
                                    onClick={() => {
                                        setSearchTerm(suggestion.value);
                                        setSuggestions([]);
                                    }}
                                >
                                     {suggestion.type === 'author' ? `Author: ${suggestion.value}` : `Label: ${suggestion.value}`}
                                </li>
                            ))}
                        </ul>
                    )}
                </form>
            </motion.div>

            {/* Image Gallery Section */}
            <div id="image-gallery">
                <ImageGallery submission_images={submission_images.filter(image => 
                    image.image_author.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    image.label.toLowerCase().includes(searchTerm.toLowerCase())
                )} />
            </div>
        </div>
    );
}

export default GalleryContainer;