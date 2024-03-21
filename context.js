'use client'

import React, { createContext, useState, useEffect } from 'react';

export const DataContext = createContext(null);
export const WindowDimensionsContext = createContext(null);

export const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';

export const DataProvider = ({ children }) => {

    console.log(process.env.NEXT_PUBLIC_API_URL)
    // 1. Intro section
    const [stats, setStats] = useState({});
    // 2. Contribution Section
    const [yearly, setYearly] = useState({});
    const [daily, setDaily] = useState({});
    const [community, setCommunity] = useState({});
    // 3. Impact Section
    const [cumulativeYearly, setCumulativeYearly] = useState({});
    const [heritage_destinations, setHeritageDestinations] = useState({});
    const [locations, setLocations] = useState([]);
    const [inceptions, setInceptions] = useState({});
    // 4. Participant section
    const [participants, setParticipants] = useState([]);
    // 5. monuments
    const [monument_images, setMonumentImages] = useState([]);
    // 6. image submissions
    const [submission_images, setSubmissionImages] = useState([]);

  useEffect(() => {
   
    // 1. Fetch competition statistics
    fetch(`${apiUrl}/competition/statistics`)
      .then(response => response.json())
      .then(data => setStats(data));

    // 2.1 Fetch yearly submissions
    fetch(`${apiUrl}/submissions/yearly`)
      .then(response => response.json())
      .then(data => setYearly(data));
    
    // 2.2 Fetch daily submissions
    fetch(`${apiUrl}/submissions/daily`)
    .then(response => response.json())
    .then(data => setDaily(data));

    // 2.3 Fetch community data
    fetch(`${apiUrl}/participants/submissions`)
      .then(response => response.json())
      .then(data => setCommunity(data));

    // 3.1 Fetch submission cumulative yearly data
    fetch(`${apiUrl}/submissions/yearly/total`)
      .then(response => response.json())
      .then(data => setCumulativeYearly(data));

    // 3.2 Fetch monument locations & heritage destination data
    fetch(`${apiUrl}/monuments/locations`)
       .then(response => response.json())
       .then(data => setLocations(data));

    // 3.2 Fetch heritage destination data
    fetch(`${apiUrl}/monuments/destinations`)
       .then(response => response.json())
       .then(data => setHeritageDestinations(data));

    // 3.4 Fetch monument inceptions date
    fetch(`${apiUrl}/monuments/inceptions`)
      .then(response => response.json())
      .then(data => setInceptions(data));

    // 4.1 Fetch all the participants
    fetch(`${apiUrl}/participants`)
      .then(response => response.json())
      .then(data => setParticipants(data));

    // 5.1 Fetch all the monuments
    fetch(`${apiUrl}/monuments/images`)
      .then(response => response.json())
      .then(data => setMonumentImages(data));

    // 6.1 Fetch all image submissions
    fetch(`${apiUrl}/submissions/images`)
      .then(response => response.json())
      .then(data => setSubmissionImages(data));

    
  }, []);

  const contextValue = {
    stats,
    yearly,
    daily,
    community,
    cumulativeYearly,
    locations,
    heritage_destinations,
    inceptions,
    participants,
    monument_images,
    submission_images
  };

  return (
    <DataContext.Provider value={contextValue}>
      {children}
    </DataContext.Provider>
  );
};

export const WindowDimensionsProvider = ({ children }) => {
  const [dimensions, setDimensions] = useState({
    width: undefined,
    height: undefined,
  });

  useEffect(() => {
    const handleResize = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <WindowDimensionsContext.Provider value={dimensions}>
      {children}
    </WindowDimensionsContext.Provider>
  );
};