import { Inter } from 'next/font/google'
import './globals.css'

import { Providers } from "./providers";
import Head from 'next/head';
import Header from './layout/Header';
import Footer from './layout/Footer';
import FloatingCTA from './layout/FloatingCTA';

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Wiki Loves Monuments UK',
  description: 'Interactive data visualisation for the Wiki Loves Monuments UK competition.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className='light bg-red-800'>
      <Head>
        <title>Wiki Loves Monuments UK</title>
        <meta name="Wiki Loves Monuments UK" content="Data visualisation for the Wiki Loves Monuments UK competition." />
        <meta property="og:title" content="Wiki Loves Monuments UK - Visualisation" />
        <meta property="og:description" content="Interactive data visualisation for the Wiki Loves Monuments UK competition." />
        <meta property="og:url" content="https://wiki-loves-monument-uk-visalisation.vercel.app/" />
        <meta property="og:type" content="website" />
      </Head>
      <body className={inter.className}>
        <Providers>
          <div className='flex flex-col min-h-screen text-white'> {/* Ensure the container is at least as tall as the viewport */}

            <div id='header-container' className='px-16 p-6 bg-red-800 border-b-2 border-white'>
              <Header />                          
            </div>

            <div id='layout-container' className="flex flex-1"> {/* Make layout container flexible but allow it to grow */}

              {/* <div id='sidebar-container' className='w-64'>
                <Sidebar />                 
              </div> */}

              <div id='content-container'className='flex-1 w-full bg-indigo-950 border-b-2 border-white'> {/* Ensure content container can grow */}
                <main className="main-content">
                  {children} 
                </main>
              </div>

            </div>

            <div id='footer-container' className='px-16 p-6 bg-red-800'> {/* Push the footer to the bottom */}
              <Footer />                          
            </div>

              <FloatingCTA/>

          </div>
        </Providers>
      </body>
    </html>
  )
}