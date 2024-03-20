'use client'

import React from 'react';
import { motion } from "framer-motion";

const AboutPage = () => {
    return (
        <div>
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
                    About This Project
                </motion.h1>
                <motion.p 
                    className="text-white mb-8"
                    initial={{ y: 30, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.8 }}
                >
                    "Wiki Loves Monuments UK" is part of the world's largest photo contest dedicated to preserving and celebrating our cultural heritage through photography. Founded in [Year], our mission is to document and share the UK's rich historical sites and monuments with the world. Our community-driven initiative encourages participants to explore and capture the beauty of lesser-known heritage sites, fostering a deeper appreciation and understanding of our collective history.
                </motion.p>
                {/* Dissertation Project Section */}
                <motion.div
                    className="mt-8 p-4 backdrop-filter backdrop-blur-lg rounded-lg"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                >
                    {/* <motion.h2
                        className="text-4xl font-semibold text-white text-center mb-2"
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.7 }}
                    >
                        Dissertation Project
                    </motion.h2> */}
                    <motion.p
                        className="text-white text-center"
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.7 }}
                    >
                        This project is my dissertation at the University of St Andrews, titled "Visualising the Community Contribution to the UK Heritage through Wiki Loves Monuments". If you have any queries about the project, please contact my supervisor at <a href="mailto:supervisorEmail@st-andrews.ac.uk" className="underline">supervisorEmail@st-andrews.ac.uk</a>.
                    </motion.p>
                </motion.div>
            </motion.div>
        </div>
    )
}

export default AboutPage;
