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
                    Every one viewing my project, the first question they always have is what is "Wiki Loves Monument"? So, I'll begin with a short introduction to the background. "Wiki Loves Monuments UK" is part of the world's largest photo contest dedicated to preserving and celebrating our cultural heritage through photography. Founded in 2010, our mission is to document and share the UK's rich historical sites and monuments with the world. Our community-driven initiative encourages participants to explore and capture the beauty of lesser-known heritage sites, fostering a deeper appreciation and understanding of our collective history.
                </motion.p>
                
                <motion.p
                        className="text-white pb-8"
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.7 }}
                    >
                    The objective of building this website is focused on amplifying participant recognition by developing a data visualization platform that not only highlights the historical significance encapsulated within each image submission but also brings to the forefront the individual efforts of contributors. When I was navigating through the dataset related to the Wiki Loves Monuments UK competition, I found it very challenging to explore the data in an intuitive and user-friendly manner. 
                    First, I needed to understand how to use SPARQL Query for Wikidata and then understand how the images are stored under Wikimedia Commons. 
                    It is hard for a computer science student, and I believe it is even harder for non-technical participants wanting to see their contribution. 
                    So, I have also provided a Monument Gallery and Image Gallery Page for providing this functionality. I hope you find this tool very useful because I do 🙂
                </motion.p>

                <motion.p
                        className="text-white pb-8"
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.7 }}
                    >
                    For explaining why I am choosing to highlight the value of monuments I will introduce my background and the City I came from. I'm from Xi'An, China. Xi An is a city of 3,000 years of city-building history with 13 
                    dynasties have established their capitals. While I was growing up I have been surrounded by stories etched in stone and landscapes. 
                    At the heart of the city, we have the Bell Tower, with a history of 600 years, is at the core of the city. The urban layout around it, spreading out in all four directions, reflects the ancient pursuit of symmetry. 
                    The Xi'an City Wall, one of the most complete ancient city walls existing in China, reminds one of the York City Walls in England, but on a much larger scale, showcasing ancient Chinese urban defense engineering. 
                </motion.p>

                <img 
                    src="/images/chengqiang.jpg" 
                    alt="Bell Tower and City Wall" 
                    style={{ maxWidth: '50%', height: '60%' }} 
                />
               <p className="image-credit bt-2">Image credit: <a href="https://www.xiaohongshu.com/explore/65db4b8600000000010281c5" target="_blank" rel="noopener noreferrer">XiaoHongShu</a></p>

                <motion.p
                        className="text-white py-8"
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.7 }}
                    >
                    To the north of the city, the Daming Palace Site displays the splendor and luxury of the Tang dynasty's royal family; while to the south, the Tang Paradise and the Big Wild Goose Pagoda reenact the cultural prosperity of the Tang era. 
                    Finaly the Terracotta Army, a wonder in the history of archaeology, akin to the lion sculptures of Trafalgar Square, impresses even more with its scale and historical significance. 
                    These awe-inspiring sites not only showcase the wisdom and artistic achievements of ancient Chinese civilization but also make Xi'an a cultural bridge between the past and the present, 
                    offering every visitor a journey through time.
                </motion.p>

                <img 
                    src="/images/datang.jpeg" 
                    alt="Tang Paradise" 
                    style={{ maxWidth: '50%', height: 'auto' }} 
                />
                <p className="image-credit bt-2">Image credit: <a href="https://www.ourchinastory.com/zh/2393/%E8%87%B3%E6%BD%AE%E7%8E%A9%E6%A8%82%EF%BD%9C%E8%A5%BF%E5%AE%89%E5%A4%A7%E5%94%90%E4%B8%8D%E5%A4%9C%E5%9F%8E%20%E6%8E%A2%E7%B4%A2%E5%8B%95%E9%9D%9C%E7%9A%86%E5%AE%9C%E7%9A%84%E6%96%87%E5%8C%96%E4%B9%8B%E6%97%85" target="_blank" rel="noopener noreferrer">Our China Story</a></p>


                <motion.p
                    className="text-white pt-8"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.7 }}
                >
                    By showcasing the monuments of our city on this page, I present this project not merely as an academic exercise, but as a bridge between my heritage and the present, aiming to share that deep-rooted passion with all of you. My goal extends beyond merely illuminating the cultural heritage that shapes our communal identity—especially considering my focus on the cultural heritage in the UK. It's about emphasizing the crucial role of collective participation in preserving these cultural treasures. This effort, deeply anchored in my background and the rich history of Xi'an, China, serves as a conduit connecting the past with the present, inviting everyone to engage in the appreciation and protection of our shared legacy. As the centerpiece of my dissertation at the University of St Andrews, titled "Visualising Community Contribution to UK Heritage Through Wiki Loves Monuments Competition," this project stands as a testament to the combined power of community and technology in elevating our heritage to the forefront of global consciousness. Should you have any inquiries or a desire to explore this initiative further, please do not hesitate to reach out to my supervisor at <a href="mailto:ksrh1@st-andrews.ac.uk" className="underline">ksrh1@st-andrews.ac.uk</a>.
                </motion.p>

            </motion.div>
        </div>
    )
}

export default AboutPage;