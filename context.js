'use client';

import React, { createContext, useMemo, useState, useEffect } from 'react';
import useSWR from 'swr';

export const DataContext = createContext(null);
export const WindowDimensionsContext = createContext(null);

export const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'https://wiki-loves-monument-uk.toolforge.org/api';

const fetcher = (url) => fetch(url).then(res => res.json());

export const DataProvider = ({ children }) => {
  // 通过 useSWR 获取数据
  const { data: stats } = useSWR(`${apiUrl}/competition/statistics`, fetcher);
  const { data: yearly } = useSWR(`${apiUrl}/submissions/yearly`, fetcher);
  const { data: daily } = useSWR(`${apiUrl}/submissions/daily`, fetcher);
  const { data: community } = useSWR(`${apiUrl}/participants/submissions`, fetcher);
  const { data: cumulativeYearly } = useSWR(`${apiUrl}/submissions/yearly/total`, fetcher);
  const { data: locations } = useSWR(`${apiUrl}/monuments/locations`, fetcher);
  const { data: heritage_destinations } = useSWR(`${apiUrl}/monuments/destinations`, fetcher);
  const { data: inceptions } = useSWR(`${apiUrl}/monuments/inceptions`, fetcher);
  const { data: participants } = useSWR(`${apiUrl}/participants`, fetcher);
  const { data: monument_images } = useSWR(`${apiUrl}/monuments/images`, fetcher);
  const { data: submission_images } = useSWR(`${apiUrl}/submissions/images`, fetcher);

  // 避免不必要的渲染
  const contextValue = useMemo(() => ({
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
  }), [stats, yearly, daily, community, cumulativeYearly, locations, heritage_destinations, inceptions, participants, monument_images, submission_images]);

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