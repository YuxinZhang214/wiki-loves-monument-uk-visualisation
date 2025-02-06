'use client'

import { DataProvider, WindowDimensionsProvider } from '@/context';

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

  return (
    <div className="scrollbar-hide  bg-indigo-950 text-white">

      <div className=''>
        <IntroductionSection />
      </div>
    </div>
  );
}