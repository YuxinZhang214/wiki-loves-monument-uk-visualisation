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
                    className="text-white pb-8"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.7 }}
                >
                    "Wiki Loves Monuments UK" is part of the world's largest photo contest dedicated to preserving and celebrating our cultural heritage through photography. Founded in 2010, our mission is to document and share the UK's rich historical sites and monuments with the world. Our community-driven initiative encourages participants to explore and capture the beauty of lesser-known heritage sites, fostering a deeper appreciation and understanding of our collective history.
                </motion.p>
                
                <motion.p
                        className="text-white pb-8"
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.7 }}
                    >
                we focus on amplifying participant recognition by developing a data visualisation platform that not only highlights the historical significance encapsulated within each image submission but also brings to the forefront the individual efforts of contributors.
                </motion.p>
                <motion.p
                        className="text-white"
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.7 }}
                    >
                    This project is my dissertation at the University of St Andrews, titled "Visualising Community Contribution to UK Heritage Through Wiki Loves Monuments Competition". If you have any queries about the project, please contact my supervisor at <a href="mailto:ksrh1@st-andrews.ac.uk" className="underline">ksrh1@st-andrews.ac.uk</a>.
                </motion.p>
            </motion.div>
        </div>
    )
}

export default AboutPage;
