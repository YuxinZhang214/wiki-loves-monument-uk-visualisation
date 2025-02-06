'use client'

import React, { createContext, useState, useEffect } from 'react';

export const DataContext = createContext(null);
export const WindowDimensionsContext = createContext(null);

export const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'https://wiki-loves-monument-uk.toolforge.org/api';

// 设定缓存过期时间 (单位: 毫秒)，这里设置为 120 分钟
const CACHE_EXPIRATION = 120 * 60 * 1000;

// 获取缓存数据的工具函数
const getCachedData = (key) => {
    if (typeof window === "undefined") return null;
    const cached = localStorage.getItem(key);
    if (!cached) return null;

    const { data, timestamp } = JSON.parse(cached);
    if (Date.now() - timestamp > CACHE_EXPIRATION) {
        localStorage.removeItem(key);
        return null;
    }
    return data;
};

// 设置缓存数据的工具函数
const setCachedData = (key, data) => {
    if (typeof window === "undefined") return;
    localStorage.setItem(key, JSON.stringify({ data, timestamp: Date.now() }));
};

export const DataProvider = ({ children }) => {
    const [stats, setStats] = useState(getCachedData('stats') || {});
    const [yearly, setYearly] = useState(getCachedData('yearly') || {});
    const [daily, setDaily] = useState(getCachedData('daily') || {});
    const [community, setCommunity] = useState(getCachedData('community') || {});
    const [cumulativeYearly, setCumulativeYearly] = useState(getCachedData('cumulativeYearly') || {});
    const [heritage_destinations, setHeritageDestinations] = useState(getCachedData('heritage_destinations') || {});
    const [locations, setLocations] = useState(getCachedData('locations') || []);
    const [inceptions, setInceptions] = useState(getCachedData('inceptions') || {});
    const [participants, setParticipants] = useState(getCachedData('participants') || []);
    const [monument_images, setMonumentImages] = useState(getCachedData('monument_images') || []);
    const [submission_images, setSubmissionImages] = useState(getCachedData('submission_images') || []);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [
                    statsRes,
                    yearlyRes,
                    dailyRes,
                    communityRes,
                    cumulativeYearlyRes,
                    locationsRes,
                    heritageDestinationsRes,
                    inceptionsRes,
                    participantsRes,
                    monumentImagesRes,
                    submissionImagesRes
                ] = await Promise.all([
                    fetch(`${apiUrl}/competition/statistics`).then(res => res.json()),
                    fetch(`${apiUrl}/submissions/yearly`).then(res => res.json()),
                    fetch(`${apiUrl}/submissions/daily`).then(res => res.json()),
                    fetch(`${apiUrl}/participants/submissions`).then(res => res.json()),
                    fetch(`${apiUrl}/submissions/yearly/total`).then(res => res.json()),
                    fetch(`${apiUrl}/monuments/locations`).then(res => res.json()),
                    fetch(`${apiUrl}/monuments/destinations`).then(res => res.json()),
                    fetch(`${apiUrl}/monuments/inceptions`).then(res => res.json()),
                    fetch(`${apiUrl}/participants`).then(res => res.json()),
                    fetch(`${apiUrl}/monuments/images`).then(res => res.json()),
                    fetch(`${apiUrl}/submissions/images`).then(res => res.json()),
                ]);

                setStats(statsRes);
                setYearly(yearlyRes);
                setDaily(dailyRes);
                setCommunity(communityRes);
                setCumulativeYearly(cumulativeYearlyRes);
                setLocations(locationsRes);
                setHeritageDestinations(heritageDestinationsRes);
                setInceptions(inceptionsRes);
                setParticipants(participantsRes);
                setMonumentImages(monumentImagesRes);
                setSubmissionImages(submissionImagesRes);

                // 存入缓存
                setCachedData('stats', statsRes);
                setCachedData('yearly', yearlyRes);
                setCachedData('daily', dailyRes);
                setCachedData('community', communityRes);
                setCachedData('cumulativeYearly', cumulativeYearlyRes);
                setCachedData('locations', locationsRes);
                setCachedData('heritage_destinations', heritageDestinationsRes);
                setCachedData('inceptions', inceptionsRes);
                setCachedData('participants', participantsRes);
                setCachedData('monument_images', monumentImagesRes);
                setCachedData('submission_images', submissionImagesRes);
            } catch (error) {
                console.error("Failed to fetch data:", error);
            }
        };

        // 如果缓存数据为空，才进行 API 请求
        if (!Object.keys(stats).length) fetchData();
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