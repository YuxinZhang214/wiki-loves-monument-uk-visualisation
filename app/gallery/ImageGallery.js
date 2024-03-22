'use client'

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { FiChevronUp, FiChevronDown } from "react-icons/fi";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';

const ImageGallery = ({submission_images}) => {
    
    const router = useRouter();

    const [currentPage, setCurrentPage] = useState(1);
    const [selectedYear, setSelectedYear] = useState('All');
    const [selectedDate, setSelectedDate] = useState('All');
    const [loading, setLoading] = useState(true);
    const [showYearDropdown, setShowYearDropdown] = useState(false);
    const [showDateDropdown, setShowDateDropdown] = useState(false);
    const [showImages, setShowImages] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setShowImages(true);
            setLoading(false)
        }, 1000);

        return () => clearTimeout(timer);
    }, []);


    const filteredImages = submission_images.filter((image) => {
        return (selectedYear === 'All' || image.year == selectedYear) &&
               (selectedDate === 'All' || image.date == selectedDate);
    });

    const calculateAvailableOptions = (items, key) => {
        const options = items.map(item => item[key]);
        const uniqueOptions = Array.from(new Set(options));
        return ["All", ...uniqueOptions.sort()];
    };

    const availableYears = calculateAvailableOptions(submission_images, 'year');
    const availableDates = calculateAvailableOptions(submission_images, 'date');

    const imagesPerPage = 20;
    const pageCount = Math.ceil(filteredImages.length / imagesPerPage);

    const indexOfLastImage = currentPage * imagesPerPage;
    const indexOfFirstImage = indexOfLastImage - imagesPerPage;
    const currentImages = filteredImages.slice(indexOfFirstImage, indexOfLastImage);

    const paginate = (pageNumber) => {
        startLoading();
        setCurrentPage(pageNumber);
    };
    const nextPage = () => {
        startLoading();
        setCurrentPage((prev) => (prev < pageCount ? prev + 1 : prev));
    };
    const prevPage = () => {
        startLoading();
        setCurrentPage((prev) => (prev > 1 ? prev - 1 : prev));
    };
    const firstPage = () => {
        startLoading();
        setCurrentPage(1);
    };
    const lastPage = () => {
        startLoading();
        setCurrentPage(pageCount);
    };

    const getPaginationGroup = () => {
        let start = Math.max(currentPage - 2, 1);
        let end = Math.min(start + 4, pageCount);

        if (end === pageCount) start = Math.max(end - 4, 1);

        const range = [];
        for (let i = start; i <= end; i++) {
            range.push(i);
        }
        return range;
    };

    const handleImageLoad = () => setLoading(false);

    const goToImageDetail = (label) => {
        const url = `/gallery/${encodeURIComponent(label)}`;
        router.push(url);
    };

    // Toggle dropdowns
    const toggleYearDropdown = () => setShowYearDropdown(prev => !prev);
    const toggleDateDropdown = () => setShowDateDropdown(prev => !prev);

    const handleYearSelect = (year) => {
        setCurrentPage(1)
        startLoading();
        setSelectedYear(year);
        setShowYearDropdown(false);
    };
    
    const handleDateSelect = (date) => {
        setCurrentPage(1)
        startLoading();
        setSelectedDate(date);
        setShowDateDropdown(false);
    };

    const goToMonumentPage = async () => {
        router.push('/monuments');
    }
    
    const goToAboutPage = async () => {
        router.push('/about');
    }

    const startLoading = () => {
        setShowImages(false);
        setTimeout(() => {
            setShowImages(true);
        }, 1000);
    };
    
    const renderDropdown = (isOpen, options, onSelect, toggleDropdown, title, selected) => (
        <div className="relative">
            <button
                onClick={toggleDropdown}
                className="flex justify-between items-center px-4 py-2 text-white border border-2 rounded-full focus:outline-none w-48"
            >
                <span>{title}</span>
                <span className="flex items-center">
                    {selected ? `: ${selected}` : ': All'}
                    {isOpen ? <FiChevronUp /> : <FiChevronDown />} 
                </span>
            </button>
            {isOpen && (
                <div className="absolute w-full mt-1 bg-indigo-950 shadow-lg rounded-md z-10 border-2 max-h-60 overflow-y-auto scrollbar-hide">
                    {options.map(option => (
                        <div
                            key={option}
                            className="px-4 py-2 text-white hover:bg-gray-700 cursor-pointer"
                            onClick={() => onSelect(option)}
                        >
                            {option}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );

    const image_author_count = new Set(filteredImages.map(image => image.image_author)).size;
    const image_count = filteredImages.length
    
    // Filter Section
    const renderFilterSection = () => (
        <div id="filter-container" className="flex justify-between px-16 py-8 border-b-2">
            <div>
                <h2 className="text-4xl font-bold text-white">{image_count}</h2>
                <p className="text-lg text-gray-400 mt-2">Image Submissions from {image_author_count} Image Authors</p>
            </div>
            <div className="flex space-x-4">
                {renderDropdown(
                    showYearDropdown,
                    availableYears,
                    handleYearSelect,
                    toggleYearDropdown,
                    'Year',
                    selectedYear
                )}
                {renderDropdown(
                    showDateDropdown,
                    availableDates,
                    handleDateSelect,
                    toggleDateDropdown,
                    'Day',
                    selectedDate
                )}
            </div>
        </div>
    );

    return (
        <div id="gallery-container" className="border-t-2 border-white">
            {loading ? (
                <div className="flex justify-center items-center my-16">
                    <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2"></div>
                </div>
            ) : (
                <>
                    {renderFilterSection()}
                    <div id="images-gallery-container" className="">
                        {showImages ? (
                            <div 
                                id="images-container"
                                className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 px-8 py-8 my-4"
                            >
                                {currentImages.map((submission, index) => (
                                    <div id="image-card" key={index} className="overflow-hidden">
                                        <div id="image-container" className="m-4" style={{ height: '250px' }} >   
                                            <img className="w-full object-cover" 
                                                style={{ height: '250px' }} 
                                                src={submission.image_url} 
                                                alt={submission.label} onLoad={handleImageLoad}
                                                loading="lazy"
                                            />
                                        </div>
                                        <div id="image-description" className="px-6 py-4">
                                            <div className="font-bold text-xl mb-2">{submission.label}</div>
                                            <div className="mb-2"> - {submission.image_author}</div>
                                            <button 
                                                onClick={() => goToImageDetail(submission.label)}
                                                className="hover:scale-105 active:scale-95 underline text-white font-bold py-2 rounded-full transition duration-300"
                                            >
                                                View Details <span>&#10142;</span>
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="flex justify-center items-center my-16">
                                <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2"></div>
                            </div>
                        )}
                    </div>
                    
                    {/* Pagination and navigation buttons displayed regardless of loading or showImages state */}
                    <div>
                        <div className="flex flex-col items-center justify-center py-8 border-t-2">
                            <div className="flex gap-2">
                                <button 
                                    onClick={firstPage} 
                                    className="text-white font-semibold py-2 px-4 border border-2 rounded-full flex items-center transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg"
                                >
                                    First
                                </button>

                                <button 
                                    onClick={prevPage} 
                                    className="text-white font-semibold py-2 px-4 border border-2 rounded-full flex items-center transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg"
                                >
                                    Prev
                                </button>
                                {currentPage > 3 && <span className="text-white font-bold py-2 px-4">...</span>}
                                {getPaginationGroup().map((item) => (
                                    <button 
                                        key={item} 
                                        onClick={() => paginate(item)} 
                                        className={`hover:underline text-white font-bold py-2 px-4 rounded ${currentPage === item ? 'border border-2 rounded-full' : ''}`}
                                    >
                                        {item}
                                    </button>
                                ))}
                                {currentPage < (pageCount - 2) && <span className="text-white font-bold py-2 px-4">...</span>}
                                <button 
                                    onClick={nextPage} 
                                    className="text-white font-semibold py-2 px-4 border border-2 rounded-full flex items-center transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg"
                                >
                                    Next
                                </button>
                                <button 
                                    onClick={lastPage} 
                                    className="text-white font-semibold py-2 px-4 border border-2 rounded-full flex items-center transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg"
                                >
                                    Last
                                </button>
                            </div>
                            <div className="text-white mt-4">
                                Page {currentPage} of {pageCount}
                            </div>
                        </div>
                    </div>

                    <div id="navigate-btn-group" className="border-t-2 flex flex-row justify-between py-8 px-8 h-1/2 gap-4">
                        {/* 1. Explore Monuments */}
                        <button
                            onClick={goToMonumentPage}
                            className="text-white font-semibold py-2 px-4 border border-2 rounded-full flex items-center transition-all duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-lg"
                            >
                            <FontAwesomeIcon icon={faArrowLeft} className='mr-2'/> Explore the Monuments
                        </button>
                        {/* 2. Explore Images */}
                        <button
                            onClick={goToAboutPage}
                            className="text-white font-semibold py-2 px-4 border border-2 rounded-full flex items-center transition-all duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-lg"
                            >
                            Read more about the project <FontAwesomeIcon icon={faArrowRight} className='ml-2'/>
                        </button>
                    </div>
                </>
            )}
        </div>
    );
    
}

export default ImageGallery;