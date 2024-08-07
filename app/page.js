'use client'

import React, { useEffect, useState, useContext } from 'react';


import { DataProvider } from '@/context';
import { DataContext } from '@/context';
import { WindowDimensionsProvider } from '@/context';

import IntroductionSection from './home/IntroductionSection';

export default function App() {

  return (
    <DataProvider> 
      <WindowDimensionsProvider>
        <Home />
      </WindowDimensionsProvider>
    </DataProvider>
  );
}

const Home = () => {
  const [isLoading, setIsLoading] = useState(true);
  const { stats, yearly, daily, community, cumulativeYearly, locations, inceptions } = useContext(DataContext);

  useEffect(() => {
    if (stats && yearly && daily && community && cumulativeYearly && locations && inceptions) {
      setIsLoading(false);
    }
  }, [stats, yearly, daily, community, cumulativeYearly, locations, inceptions]);

  if (isLoading) {
    // return <div>Loading...</div>;
  }

  return (
    <div className="scrollbar-hide  bg-indigo-950 text-white">

      <div className=''>
        <IntroductionSection />
      </div>
    </div>
  );
}