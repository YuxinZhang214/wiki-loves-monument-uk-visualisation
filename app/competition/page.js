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
            Unfolding the Legacy
          </motion.h1>
          <motion.p 
            className="text-white mb-8"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            Let's scroll down to dive into the rich history, vibrant community, and lasting impact of the Wiki Loves Monuments UK Competition.
          </motion.p>
          
          <div className="animate-bounce mt-4">
            {/* First Big down arrow */}
            <svg xmlns="http://www.w3.org/2000/svg" width="48" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
            <path d="M6 9l6 6 6-6"></path>
            </svg>
            {/* Second Big down arrow */}
            <svg xmlns="http://www.w3.org/2000/svg" width="48" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
            <path d="M6 9l6 6 6-6"></path>
            </svg>
            {/* Third Big down arrow */}
            <svg xmlns="http://www.w3.org/2000/svg" width="48" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
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
                  Wiki Loves Monuments UK forms an integral part of a global endeavor that transcends borders, aiming to document and preserve the tapestry of our world's cultural heritage. Every September, from 2013 to 2023 — except for the years 2015 and 2021 - the UK has proudly taken its place on this global stage. The initiative is not just about capturing images; it's a call to arms for local enthusiasts and photographers to explore and celebrate the historical narratives embedded within the stones and structures of their local monuments. Through their lenses, participants have not only contributed to the world's largest visual archive of built heritage on Wikimedia Commons but have also played a pivotal role in enhancing public access to the stories and significance of these cultural landmarks. This contest embodies the spirit of community and shared heritage, illustrating how individual contributions can collectively contribute to the global tapestry of human history.
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
                <h1 className="text-4xl font-bold text-white">Our Contributors as The Heart of Our Mission </h1>
                <p className="text-lg text-gray-400 mt-2">
                At the core of Wiki Loves Monuments UK lies our vibrant community of 2,928 participants who have journeyed with us through this exploration of heritage. Each contributor, with their unique perspective and lens, has added a distinct hue to the mosaic of images that now grace Wikimedia Commons. From seasoned photographers to curious locals, our community is a testament to diversity and shared passion. By showcasing the diversity and dedication of our participants, we aim to inspire more individuals to join this movement, weaving their own threads into the ever-expanding narrative of cultural heritage preservation.
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
                <h1 className="text-4xl font-bold text-white">The Legacy of Our Collection on Preserving History</h1>
                <p className="text-lg text-gray-400 mt-2">
                The essence of Wiki Loves Monuments UK extends beyond the act of documentation — it's about creating a lasting impact on how we perceive and engage with our cultural heritage. Through the collective effort of our participants, we've amassed an expansive collection of images that not only visualizes but also immortalizes the architectural marvels across the UK. Each photograph serves as a digital preservation of history, ensuring that future generations have the opportunity to witness and appreciate these monuments in their full glory.
                </p> 
              </div>

                <div id="highlights" className="w-full lg:w-1/2 flex flex-wrap justify-between ">

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
              <div id="title" className="lg:mb-0">
                <h1 className="text-4xl font-bold text-white">The Millennial Historical Timeline of UK's Monuments</h1>
                <p className="text-lg text-gray-400 mt-2">
                The historical timeline represented in the Wiki Loves Monuments UK competition is not merely a chronicle of dates; it's a vivid canvas showcasing the evolution of a nation's identity etched in stone. From ancient ruins whispering tales of yore to edifices that stood witness to the turning tides of history, each submission in the competition represents a temporal landmark in the UK's vast historical landscape
                </p> 
                <p className="text-lg text-gray-400 mt-2">
                Every documented monument contributes to a collective narrative, spanning eras of conquest, periods of enlightenment, and ages of innovation. The timeline does not just measure time; it measures the pulse of heritage through the enduring legacy of structures that have withstood the test of time. As you journey through the chronicles of our historical timeline, you are tracing the footsteps of ancestors, the genius of architects, and the resilience of societies that have contributed to the rich mosaic of British history
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