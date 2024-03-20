import React from 'react';

import { useRouter } from "next/navigation";
import { motion } from 'framer-motion';

import ImageCarousel from './ImageCarousal';

const IntroductionSection = () => {
  const router = useRouter();

  const goToContestPage = async () => {
    router.push('/competition');
   }

   const goToParticipantPage = async () => {
    router.push('/participants');
   }

  const titleVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className=''>
      {/* 1. Container for the image carousel and title */}
      <div id='title-container' className="h-5/6">
        <div className="items-center justify-center inset-0 my-16">
          <ImageCarousel/>
        </div>

        {/* Title at the bottom center of the page */}
        <div className="absolute bottom-32 left-1/2 transform -translate-x-1/2 z-1 ">
          <motion.h2
            className="text-center text-3xl lg:text-6xl font-bold mb-6"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            Wiki Loves Monuments UK
          </motion.h2>
          <div className="w-full bg-white h-1"></div>
        </div>
      </div>

     {/* Button Container */}
     <div className="absolute bottom-16 left-1/2 transform -translate-x-1/2 flex justify-center space-x-4 z-10">
        {/* 1. Discover the Story Button */}
        <button
          onClick={goToContestPage}
          className="bg-indigo-950 text-white font-semibold py-2 px-4 border border-2 rounded-full flex items-center transition-all duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-lg"
        >
          Discover the Story<span className="ml-2">&#10142;</span>
        </button>

        {/* 2. View Your Contribution Button */}
        <button
          onClick={goToParticipantPage}
          className="bg-white text-indigo-950 font-bold py-2 px-4 rounded-full border-2 border-white transition-all duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-lg"
        >
          View Your Contribution<span className="ml-2">&#10142;</span>
        </button>
      </div>
      
    </div>
  );
};

export default IntroductionSection;