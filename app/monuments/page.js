'use client' 

import React, { useEffect, useRef } from 'react';

import { DataProvider } from '@/context';
import MonumentContainer from './MonumentContainer';

export default function Monuments() {
  return (
    <DataProvider>
      <MonumentContainer/>
    </DataProvider>
  );
}