'use client'

import { useState, useEffect } from "react";
import OverviewChart from "./chart/OverviewChart";
import CommunityChart from "./chart/CommunityChart";
import CombinedChart from "./chart/ImageSubmissionChart";
import InceptionTimeline from "./chart/InceptionTimeline";
import { motion } from 'framer-motion';

import { DataProvider } from "@/context";
import { WindowDimensionsProvider } from "@/context";

import { useRouter } from "next/navigation";

const sectionIds = ['overview-section', 'community-section', 'impact-section','timeline-section'];

const ContestPage = () => {
  const [activeSection, setActiveSection] = useState(sectionIds[0]);

  const router = useRouter();

   const goToParticipantPage = async () => {
    router.push('/participants');
   }

   const goToMonumentPage = async () => {
    router.push('/monuments');
   }

   const goToGalleryPage = async () => {
    router.push('/gallery');
   }

  const handleScroll = () => {
    // Calculate the scroll position based on the middle of the screen.
    const scrollPosition = window.scrollY + window.innerHeight / 2;

    // Determine which section is currently active.
    const currentSectionId = sectionIds.find((sectionId) => {
      const sectionElement = document.getElementById(sectionId);
      if (sectionElement) {
        const sectionTop = sectionElement.offsetTop;
        const sectionBottom = sectionTop + sectionElement.offsetHeight;
        return scrollPosition >= sectionTop && scrollPosition <= sectionBottom;
      }
      return false;
    });

    setActiveSection(currentSectionId || sectionIds[0]);
  };

  useEffect(() => {
    handleScroll(); // Set initial state based on current scroll position
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <DataProvider>
      <WindowDimensionsProvider>

        {/* Reading Progress Dots on the right */}
        <div className="fixed top-1/2 right-4 transform -translate-y-1/2">
          {sectionIds.map((sectionId) => (
            <div
              key={sectionId}
              className={`w-3 h-3 rounded-full mb-2 last:mb-0 transition-colors ${
                activeSection == sectionId ? 'bg-white' : 'bg-gray-400'
              }`}
            />
          ))}
        </div>
            
        <motion.div id='intro'
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
            Story of the Competition 
          </motion.h1>
          <motion.p 
            className="text-white mb-8"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            Let's scroll down to explore the history, community and impact of the Competition 
          </motion.p>
          
          <div className="animate-bounce mt-4">
            {/* First Big down arrow */}
            <svg xmlns="http://www.w3.org/2000/svg" width="48" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" strokeLinejoin="round" className="text-white">
            <path d="M6 9l6 6 6-6"></path>
            </svg>
            {/* Second Big down arrow */}
            <svg xmlns="http://www.w3.org/2000/svg" width="48" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" strokeLinejoin="round" className="text-white">
            <path d="M6 9l6 6 6-6"></path>
            </svg>
            {/* Third Big down arrow */}
            <svg xmlns="http://www.w3.org/2000/svg" width="48" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" strokeLinejoin="round" className="text-white">
            <path d="M6 9l6 6 6-6"></path>
            </svg>
        </div>
        
        </motion.div>

        <div className="graph-container">
          <div 
            id="overview-section" 
            className="flex flex-col justify-between border-t-2 border-b-2 border-white"
          > 
            {/* 1. Title & description */}
            <div 
              id="title-description" 
              className="flex flex-col lg:flex-row justify-between items-center lg:items-start 
                         border-b-2 border-white px-20 py-16 "
            >
              <div id="title" className="lg:mb-0 w-3/4">
                <h1 className="text-4xl font-bold text-white">Documenting Heritage for the Global Stage</h1>
                <p className="text-lg text-gray-400 mt-2">
                  Wiki Loves Monuments UK represents the UK's participation in the broader, global contest. Taking place each September from 2013 to 2023, with the exception of 2015 and 2021, this initiative aims to enrich the world's visual archive of built heritage. It achieves this by increasing the quantity and quality of openly licensed images of monuments on Wikimedia Commons, Wikipedia's shared media repository. The contest inspires local enthusiasts to capture and share the historical monuments within their communities, encouraging a deeper engagement with the cultural, historical, or scientific significance of their surroundings.
                </p> 
              </div>
              <div id="highlight" className="text-right">
                <div className="text-lg text-gray-400">Running for</div>
                <h1 className="text-4xl font-bold text-white">9</h1>
                <div className="text-lg text-gray-400">years</div>
              </div>
            </div>
            {/* 2. Chart */}
            <div id="chart" className="my-20 px-16 h-full pb-8">
              <OverviewChart />
            </div>
          </div>

          <div 
            id="community-section" 
            className="flex flex-col justify-between border-b-2 border-white"
          >
            <div 
              id="title-description" 
              className="flex flex-col lg:flex-row justify-between items-center lg:items-start 
                         border-b-2 border-white px-20 py-16 "
            >
              <div id="title" className="lg:mb-0 w-3/4">
                <h1 className="text-4xl font-bold text-white">Our Community</h1>
                <p className="text-lg text-gray-400 mt-2">
                  So far we have 2928 participant. Discover who has contributed and the diversity of the community
                </p> 
              </div>
              <div id="highlight" className="text-right">
                <div className="text-lg text-gray-400">Contributed by</div>
                <h1 className="text-4xl font-bold text-white">2928</h1>
                <div className="text-lg text-gray-400">participant</div>
              </div>
            </div>
            <div className="px-16 my-8 ">
              <CommunityChart/>
            </div>
         
          </div>

          <div 
            id="impact-section" 
            className="flex flex-col justify-between border-b-2 border-white"
          >
             <div 
              id="title-description" 
              className="flex flex-col lg:flex-row justify-between items-center lg:items-start 
                         border-b-2 border-white px-20 py-16 "
            >
              <div id="title" className="lg:mb-0 w-3/4">
                <h1 className="text-4xl font-bold text-white">Our Impact</h1>
                <p className="text-lg text-gray-400 mt-2">
                  See the Images we have colleted and the monuments we have documented over the UK
                </p> 
              </div>

              <div id="highlights" className="w-full lg:w-1/2 flex flex-wrap justify-between">
                <div className="flex flex-col text-center lg:text-right w-full lg:w-1/2 p-2">
                    <div className="text-lg text-gray-400">Received</div>
                    <h1 className="text-4xl font-bold text-white">90666</h1>
                    <div className="text-lg text-gray-400">Images Submission</div>
                </div>
                
                <div className="flex flex-col text-center lg:text-right w-full lg:w-1/2 p-2">
                    <div className="text-lg text-gray-400">Monuments Documented</div>
                    <h1 className="text-4xl font-bold text-white">19283</h1>
                    <div className="text-lg text-gray-400">Unique Locations</div>
                </div>
                
                <div className="flex flex-col text-center lg:text-right w-full lg:w-1/2 p-2">
                    <div className="text-lg text-gray-400">Documented</div>
                    <h1 className="text-4xl font-bold text-white">1174</h1>
                    <div className="text-lg text-gray-400">Monument Instance Types</div>
                </div>
                
                <div className="flex flex-col text-center lg:text-right w-full lg:w-1/2 p-2">
                    <div className="text-lg text-gray-400">Representing</div>
                    <h1 className="text-4xl font-bold text-white">9</h1>
                    <div className="text-lg text-gray-400">UK Heritage Destinations</div>
                </div>
            </div>


            </div>

            <div id="area-map-chart" className="h-screen border-white py-8 px-16 mb-8">
                <CombinedChart/>
            </div >
          </div>
          

          <div id="timeline-section" className="border-b-2">
            <div 
              id="title-description" 
              className="flex flex-col lg:flex-row justify-between items-center lg:items-start 
                        border-b-2 border-white px-20 py-16 "
            >
              <div id="title" className="lg:mb-0 w-3/4">
                <h1 className="text-4xl font-bold text-white">Historical Timeline Coverage</h1>
                <p className="text-lg text-gray-400 mt-2">
                See the span of history covered by the monuments captured in the competition's submissions
                </p> 
              </div>
            </div>
            <div id="timeline" className="h-5/6 pt-16">
              <InceptionTimeline/>
            </div>
          </div>
 
        </div>

        <div id="button-group" className="flex flex-row justify-end py-8 px-8 h-1/2 gap-4 ">
            {/* 1. View Your Contribution Button */}
            <button
                onClick={goToParticipantPage}
                className="text-white font-semibold py-2 px-4 border border-2 rounded-full flex items-center transition-all duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-lg"
                >
                View Your Contribution<span className="ml-2">&#10142;</span>
            </button>
            {/* 2. View Your Contribution Button */}
            <button
                onClick={goToMonumentPage}
                className="text-white font-semibold py-2 px-4 border border-2 rounded-full flex items-center transition-all duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-lg"
                >
                Explore the Monuments<span className="ml-2">&#10142;</span>
            </button>
            {/* 3. View Your Contribution Button */}
            <button
                onClick={goToGalleryPage}
                className="text-white font-semibold py-2 px-4 border border-2 rounded-full flex items-center transition-all duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-lg"
                >
                Explore the Images<span className="ml-2">&#10142;</span>
            </button>
        </div>
      </WindowDimensionsProvider>
    </DataProvider>
  );
};

export default ContestPage;