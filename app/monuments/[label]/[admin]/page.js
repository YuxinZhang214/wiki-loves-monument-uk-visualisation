'use client'

import { useRouter } from 'next/navigation'; 
import React, { useEffect, useState } from 'react';

import {Image} from "@nextui-org/react";

import { apiUrl } from '@/context';
import Map from '../../../ui/imageDetail/map';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

const ImageDetail = ({ params }) => {
    const router = useRouter();

    const { label, admin } = params;
    const [imageDetails, setImageDetails] = useState(null);

    useEffect(() => {
        // const encodedLabel = encodeURIComponent(label);
        if (label) {
            fetch(`${apiUrl}/monuments/${label}`)
                .then(response => response.json())
                .then(data => {
                    const filteredData = admin && admin !== 'All'
                        ? data.filter(img => encodeURIComponent(img.admin_entity_label) == admin)
                        : data;
                    setImageDetails(filteredData[0]); 
                    console.log(data)
                    console.log(data[0].admin_entity_label)
                    console.log(admin)
                })
                .catch(error => console.error('Error fetching image details:', error));
        }
    }, [label, admin]);

    if (!imageDetails) {
        return (
            <div className="flex justify-center items-center my-16">
                <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2"></div>
            </div>
        );
    }

    const goBackToGallery = () => {
        router.push('/monuments'); 
    };

    const imageLocations = [{
        id: imageDetails.id,
        latitude: imageDetails.latitude,
        longitude: imageDetails.longitude,
    }];

    return (
        <div id='page-container' className="">
            <div className="flex flex-col lg:flex-col">
                <div className="px-16 py-4 lg:py-8 border-b-2">
                    <button 
                        onClick={goBackToGallery} 
                        className="text-white font-semibold py-2 px-4 border border-2 rounded-full flex items-center transition-all duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-lg"
                    >
                        <FontAwesomeIcon icon={faArrowLeft} className='mr-2'/>
                        <span> Go back</span>
                    
                    </button>

                </div>

                <div 
                    id="image-description" 
                    className="flex flex-col lg:flex-row justify-between items-center lg:items-start 
                              border-b-2 border-white px-20 py-16 "
                  >
                    <div id="title" className="lg:mb-0 w-3/4">
                      <h1 className="text-4xl font-bold text-white">{imageDetails.label}</h1>
                      <p className="text-lg text-gray-400 mt-2">
                        Submitted by {imageDetails.image_author} on {imageDetails.year}-9-{imageDetails.date}. {imageDetails.inception? (<span className="text-lg text-gray-400 mt-2">
                            This monument was build on {imageDetails.inception}
                        </span> ) : null}
                      </p> 
                    </div>

                    <div id="highlights" className="w-full lg:w-1/2 flex flex-wrap justify-between">
                                
                        <div className="flex flex-col text-center lg:text-right w-full lg:w-1/2 p-2">
                            <div className="text-lg text-gray-400">Heritage Destination</div>
                            <div className="text-xl text-white">{imageDetails.heritage_designation}</div>
                        </div>

                        <div className="flex flex-col text-center lg:text-right w-full lg:w-1/2 p-2">
                            <div className="text-lg text-gray-400">Instance Type</div>
                            <div className="text-xl text-white">{imageDetails.instance_of_type_label}</div>
                        </div>
                        
                        <div className="flex flex-col text-center lg:text-right w-full lg:w-1/2 p-2">
                            <div className="text-lg text-gray-400">Admin Entity</div>
                            <div className="text-xl text-white">{imageDetails.admin_entity_label}</div>
                        </div>
                        
                        <div className="flex flex-col text-center lg:text-right w-full lg:w-1/2 p-2">
                            <div className="text-lg text-gray-400">Historic County</div>
                            <div className="text-xl text-white">{imageDetails.historic_county_label}</div>
                        </div>
                    </div>
                </div>


                <div className='flex flex-col lg:flex-row items-start gap-4'>
                    <div id='image-section' className="pl-8 mx-8 flex flex-col pb-16 w-full lg:w-1/2 ">
                        <div id='image-title' className="mb-44 mt-16 ">
                            <h1 className="text-xl font-bold text-white">Image</h1>
                        </div>
                        <div className="flex pl-4 justify-start items-center">
                            <Image 
                                src={imageDetails.image_url} 
                                alt={imageDetails.label}
                                width={600}
                                height={700}
                            />
                        </div>
                    </div>
                    <div id='map-section' className="pl-16 flex flex-col  border-white pb-16 w-full lg:w-1/2 lg:border-l-2">
                        <div id='map-title' className="mb-0 mt-16">
                            <h1 className="text-xl font-bold text-white">Location</h1>
                        </div>
                        <Map imageLocations={imageLocations}/>
                    </div>
                </div>


            </div>
        </div>
    );
}

export default ImageDetail;