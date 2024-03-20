'use client'

import React, { useContext, useState } from 'react';
import dynamic from 'next/dynamic';

import ParticipantSection from './ParticipantSection';
import { DataProvider, WindowDimensionsProvider } from '@/context';

export default function ParticipantPage() {

  return (
   <DataProvider>
      <WindowDimensionsProvider>
        <ParticipantSection/>
      </WindowDimensionsProvider>
   </DataProvider>
        
  );
}