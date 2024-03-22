import React, { useContext, useState, useEffect } from "react";
import { motion } from "framer-motion"; 
import { DataContext } from "@/context";
import MonumentGallery from "./MonumentGallery";

const MonumentContainer = () => {
    const { monument_images } = useContext(DataContext);

    const [filteredImages, setFilteredImages] = useState(monument_images);
    const [searchTerm, setSearchTerm] = useState(""); 
    const [suggestions, setSuggestions] = useState([]);

    const [selectedImageAuthor, setSelectedImageAuthor] = useState('All');
    const [selectedInstance, setSelectedInstance] = useState('All');
    const [selectedHeritage, setSelectedHeritage] = useState('All');
    const [selectedAdmin, setSelectedAdmin] = useState('All');
    const [selectedInception, setSelectedInception] = useState('All');

    useEffect(()=>{
        setFilteredImages(monument_images);
    },[monument_images])

    useEffect(()=>{
        const filteredImages = monument_images.filter((image) => {
            return (selectedInstance === 'All' || image.instance_of_type_label === selectedInstance) &&
                   (selectedHeritage === 'All' || image.heritage_designation === selectedHeritage) &&
                   (selectedAdmin === 'All' || image.admin_entity_label === selectedAdmin) &&
                   (selectedInception === 'All' || image.inception === selectedInception) && 
                   (selectedImageAuthor === 'All' || image.image_author === selectedImageAuthor);
        });
        setFilteredImages(filteredImages);
    },[selectedInstance,selectedHeritage,selectedAdmin,selectedInception,selectedImageAuthor])
    

    useEffect(() => {
       
        if (searchTerm.length > 0) {
            const searchResults = monument_images.filter(image =>
                image.image_author?.toLowerCase().startsWith(searchTerm.toLowerCase()) ||
                image.label?.toLowerCase().startsWith(searchTerm.toLowerCase()) ||
                image.instance_of_type_label?.toLowerCase().startsWith(searchTerm.toLowerCase()) ||
                image.inception?.toLowerCase().startsWith(searchTerm.toLowerCase()) ||
                image.admin_entity_label?.toLowerCase().startsWith(searchTerm.toLowerCase()) ||
                image.historic_county_label?.toLowerCase().startsWith(searchTerm.toLowerCase()) ||
                image.heritage_designation?.toLowerCase().startsWith(searchTerm.toLowerCase())
            );
    
            const suggestionSet = new Set();
            searchResults.forEach(image => {
                if (image.image_author) suggestionSet.add(`Author: ${image.image_author}`);
                if (image.label) suggestionSet.add(`Label: ${image.label}`);
                if (image.instance_of_type_label) suggestionSet.add(`Instance Type: ${image.instance_of_type_label}`);
                if (image.inception) suggestionSet.add(`Inception: ${image.inception}`);
                if (image.admin_entity_label) suggestionSet.add(`Admin Entity: ${image.admin_entity_label}`);
                if (image.historic_county_label) suggestionSet.add(`Historic County: ${image.historic_county_label}`);
                if (image.heritage_designation) suggestionSet.add(`Heritage Designation: ${image.heritage_designation}`);
            });
    
            setSuggestions(Array.from(suggestionSet).slice(0, 10)); 
        } else {
            setSuggestions([]);
        }
    }, [searchTerm,monument_images]);
    

    const handleSubmit = (e) => {
        e.preventDefault(); // Prevents the default form submission
    
        // Filter images based on the searchTerm
        const searchResults = monument_images.filter(image =>
            image.image_author?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            image.label?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            image.instance_of_type_label?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            image.inception?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            image.admin_entity_label?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            image.historic_county_label?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            image.heritage_designation?.toLowerCase().includes(searchTerm.toLowerCase())
        );
    
        setFilteredImages(searchResults); // Update the state to render filtered images
        setSuggestions([]);
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
   
    const handleSuggestionClick = suggestion => {
        // Extract the type and value from the suggestion string
        const [type, value] = suggestion.split(': ');

        let newFilteredImages;
        switch (type) {
            case 'Author':
                newFilteredImages = monument_images.filter(image => 
                    image.image_author === value
                );
                setSelectedImageAuthor(value)
                break;
            case 'Label':
                newFilteredImages = monument_images.filter(image => 
                    image.label === value
                );
                break;
            // Add cases for each type of suggestion
            case 'Instance Type':
                newFilteredImages = monument_images.filter(image => 
                    image.instance_of_type_label === value
                );
                break;
            case 'Inception':
                newFilteredImages = monument_images.filter(image => 
                    image.inception === value
                );
                break;
            case 'Admin Entity':
                newFilteredImages = monument_images.filter(image => 
                    image.admin_entity_label === value
                );
                break;
            case 'Historic County':
                newFilteredImages = monument_images.filter(image => 
                    image.historic_county_label === value
                );
                break;
            case 'Heritage Designation':
                newFilteredImages = monument_images.filter(image => 
                    image.heritage_designation === value
                );
                break;
            default:
                newFilteredImages = monument_images;
        }
    
        setFilteredImages(newFilteredImages);
        setSearchTerm(value);
        setSuggestions([]);
    };

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
                    Explore the Monuments
                </motion.h1>
                <motion.p 
                    className="text-white mb-8"
                    initial={{ y: 30, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.8 }}
                >
                    See the {monument_images.length} monuments that our community has brought to light
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
                                onClick={() => handleSuggestionClick(suggestion)}
                            >
                                {suggestion}
                            </li>
                        ))}
                        </ul>
                    )}
                </form>
            </motion.div>

            {/* Image Gallery Section */}
            <div id="image-gallery">
            <MonumentGallery
                monument_images={filteredImages}
                selectedInstance={selectedInstance}
                setSelectedInstance={setSelectedInstance}
                selectedHeritage={selectedHeritage}
                setSelectedHeritage={setSelectedHeritage}
                selectedAdmin={selectedAdmin}
                setSelectedAdmin={setSelectedAdmin}
                selectedInception={selectedInception}
                setSelectedInception={setSelectedInception}
            />
            </div>
        </div>
    );
}

export default MonumentContainer;