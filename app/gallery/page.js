'use client' 

import React, { useEffect, useRef } from 'react';

import { DataProvider } from '@/context';
import GalleryContainer from './GalleryContainer';

export default function Gallery() {
  return (
    <DataProvider>
      <GalleryContainer/>
    </DataProvider>
  );
}