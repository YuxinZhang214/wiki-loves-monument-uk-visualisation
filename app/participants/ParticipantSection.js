'use client'

import React, { useContext, useState, useEffect } from 'react';

import { motion } from 'framer-motion';

import { apiUrl } from '@/context';

import { useRouter } from "next/navigation";

import { DataContext } from '@/context';
import LocationMap from './activity/d3map';
import BarChart from './activity/BarChart';
import InstanceType from './activity/InstanceTypes';

export default function ParticipantSection() {

  const router = useRouter();

  const { participants, yearly } = useContext(DataContext);
  
  const [username, setUsername] = useState('');

  const [data, setData] = useState(null)
  const [author_yearly, SetAuthorYearly] = useState({})

  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    if (username.length > 0) {
      const filteredSuggestions = participants
        .filter(participant => participant.toLowerCase().startsWith(username.toLowerCase()))
        .slice(0, 5);
      setSuggestions(filteredSuggestions);
    } else {
      setSuggestions([]);
    }
  }, [username, participants]); // Depend on username and participants

  const handleInputChange = (e) => {
    setUsername(e.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Searching data for username:', username);
    
    fetch(`${apiUrl}/participants/${username}`)
    .then(response => response.json())
    .then(data => {
      setData(data);
      setSuggestions([]);
    })

    fetch(`${apiUrl}/submissions/yearly/${username}`)
    .then(response => response.json())
    .then(data => {
      SetAuthorYearly(data);
    })

  };

   const goToMonumentPage = async () => {
    router.push('/monuments');
   }

   const goToGalleryPage = async () => {
    router.push('/gallery');
   }

   const svgVariants = {
    hover: {
      scale: 1.2, // Scale the icon to make it slightly larger
      transition: {
        type: 'spring', // Use a spring animation for some natural motion
        stiffness: 300, // How stiff the spring is
      },
    },
  };

  return (

        <div>

          {/* Search User Section */}
          <motion.div id='search-user'
            className="flex flex-col items-center justify-center p-16 h-3/4 bg-cover bg-center"
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
              View your contribution
            </motion.h1>
            <motion.p 
              className="text-white mb-8"
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8 }}
            >
              Thank you for being part of {participants.length} community. Let's delve into the your profiles to uncover the stories behind the camera: the adventures, the discoveries, and the unwavering commitment to preserving our collective memory.
            </motion.p>
            <form onSubmit={handleSubmit} className="w-full max-w-md">
              <div className="flex items-center border-2 border-white px-3 py-1 bg-opacity-20">
                <input
                  type="search"
                  className="flex-grow bg-transparent p-2 outline-none"
                  placeholder="Search username"
                  value={username}
                  onChange={handleInputChange}
                />
                <button type="submit" className="text-white p-2 focus:outline-none">
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
                      className="px-4 p-2 hover:underline cursor-pointer"
                      onClick={() => {
                        setUsername(suggestion);
                        setSuggestions([]);
                      }}
                    >
                      {suggestion}
                    </li>
                  ))}
                </ul>
              )}
            </form>
          </motion.div>

          {data && (
            <div id='user-detail'>
              <div className="graph-container">

                <div 
                  id="ImpactSection" 
                  className="flex flex-col justify-between border-t-2 border-b-2 border-white"
                >
                  <div 
                    id="title-description" 
                    className="flex flex-col lg:flex-row justify-between items-center lg:items-start 
                              border-b-2 border-white px-20 py-16 "
                  >
                    <div id="title" className="lg:mb-0 w-3/4">
                      <h1 className="text-4xl font-bold text-white">Your Contribution</h1>
                      <p className="text-lg text-gray-400 mt-2">
                        Let's see your activity and contribution made throughout the entire competition history
                      </p> 
                    </div>

                    <div id="highlights" className="w-full lg:w-1/2 flex flex-wrap justify-between">
                      <div className="flex flex-col text-center lg:text-right w-full lg:w-1/2 p-2">
                          <div className="text-lg text-gray-400">Total Submissions</div>
                          <h1 className="text-4xl font-bold text-white">{data.submissions.length}</h1>
                          <div className="text-lg text-gray-400">Images Received</div>
                      </div>
                      
                      <div className="flex flex-col text-center lg:text-right w-full lg:w-1/2 p-2">
                          <div className="text-lg text-gray-400">Monuments Documented</div>
                          <h1 className="text-4xl font-bold text-white">{data.monuments.length}</h1>
                          <div className="text-lg text-gray-400">Unique Locations</div>
                      </div>
                      
                      <div className="flex flex-col text-center lg:text-right w-full lg:w-1/2 p-2">
                          <div className="text-lg text-gray-400">Documented</div>
                          <h1 className="text-4xl font-bold text-white">{data.instance_types_counts.length}</h1>
                          <div className="text-lg text-gray-400">Monument Instance Types</div>
                      </div>
                      
                      <div className="flex flex-col text-center lg:text-right w-full lg:w-1/2 p-2">
                          <div className="text-lg text-gray-400">Contributing towards</div>
                          <h1 className="text-4xl font-bold text-white">{data.heritage_designations_counts.length}</h1>
                          <div className="text-lg text-gray-400">UK Heritage Destinations</div>
                      </div>
                  </div>

                  </div>

                  <div id="activity-graph" className="flex flex-row border-white px-20">
                    <div id='activity-bar' className='flex-1 flex flex-col gap-4  '>
                      <div id='activity-chart' className='flex-1 border-b-2'>
                        <div className=" px-12 text-xl font-bold my-4 p-4">
                            Instance Types
                          </div>
                          <InstanceType instance_types={data.instance_types_counts}/>
                        </div>
                        <div id='bar-chart' className='flex-1 p-4s'>
                          <BarChart author_yearly={author_yearly}/>
                        </div>
                      </div>

                    <div id='map' className='border-l-2 flex-1 py-8 '>
                      <LocationMap locations={data.monuments}/>
                    </div>
                  </div>
                  
                </div>
              </div>

              <div id="button-group" className="flex flex-row justify-end py-8 px-8 h-1/2 gap-4 ">
                  {/* 1. Explore Monuments */}
                  <button
                      onClick={goToMonumentPage}
                      className="text-white font-semibold py-2 px-4 border border-2 rounded-full flex items-center transition-all duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-lg"
                      >
                      Explore the Monuments<span className="ml-2">&#10142;</span>
                  </button>
                  {/* 2. Explore Images */}
                  <button
                      onClick={goToGalleryPage}
                      className="text-white font-semibold py-2 px-4 border border-2 rounded-full flex items-center transition-all duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-lg"
                      >
                      Explore the Images<span className="ml-2">&#10142;</span>
                  </button>
              </div>
            </div>
          )}
        </div> 
  );
}