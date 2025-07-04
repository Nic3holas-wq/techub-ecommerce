// src/pages/Home.js
import React from 'react';
import camon40 from '../assets/camon.jpg'
import redmi from '../assets/redmi.jpg'
import galaxyA16 from '../assets/sumsungA16.jpg'
import galaxyA05 from '../assets/samsungA05.jpg'
import infinixhot50i from '../assets/infinixhot50i.jpg'
import nokiac32 from '../assets/NokiaC32.jpg'
import huaweiNova12i from '../assets/huaweinova12i.jpg'
import { motion } from 'framer-motion';
import Carousel from '../components/Carousel';
import PhoneList from '../components/PhoneList';
import LaptopList from '../components/LaptopList';
import TabletList from '../components/TabletList';
import TopRated from '../components/TopRated';
import TopPicks from '../components/TopPicks';
import RecentlyViewed from '../components/RecentlyViewed';

const Home:React.FC = () => {
  const data = [
    {
      image: galaxyA05,
      title: "Samsung Galaxy A05",
    
    },
    {
      image: nokiac32,
      title: "Nokia C32",
      
    },
    {
      image: camon40,
      title: "Tecno Camon 40",
      
    },
    {
      image: huaweiNova12i,
      title: "Huawei Nova 12i",
      
    },
    {
      image: galaxyA16,
      title: "Samsung Galaxy A16",
      
    },
    {
      image: infinixhot50i,
      title: "Infinix Hot 50i",
      
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="bg-white text-gray-800 min-h-screen mt-10"
    >
      {/* Hero Section */}
      <div className=" max-w-7xl mx-auto px-2 py-16 grid md:grid-cols-2 gap-10 items-center">
        
        <motion.div
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
        >

        <div className="relative w-full shadow-md rounded-lg">
          
            <img src={redmi} alt="Tech devices" className="w-full h-auto rounded-lg" />
    
           
           
        </div>

        </motion.div>

      </div>
      <div className="">
  <p className="text-lg font-bold text-indigo-600 pb-6 text-left">New Arrivals</p>

  <Carousel items={data} interval={3000}/>
  
</div>

<div className='mt-10'>
      <h2 className="text-xl font-bold px-4 py-2 text-indigo-600">Top Rated</h2>
      <TopRated />
    </div>

      <div className='pt-5'>
        <p className='text-lg font-bold text-indigo-600 pb-4 text-left'>Top Picks This Month</p>
      <TopPicks/>
      </div>

      <div className='mt-10'>
      <h2 className="text-xl font-bold px-4 py-2 text-indigo-600">Latest Smartphones</h2>
      <PhoneList />
    </div>

    <div className='mt-10'>
      <h2 className="text-xl font-bold px-4 py-2 text-indigo-600">Latest Laptops</h2>
      <LaptopList />
    </div>

    <div className='mt-10'>
      <h2 className="text-xl font-bold px-4 py-2 text-indigo-600">Latest Tablets</h2>
      <TabletList />
    </div>

    <div className='mt-10'>
      <h2 className="text-xl font-bold px-4 py-2 text-indigo-600">Recently viewed</h2>
      <RecentlyViewed/>
    </div>

    </motion.div>
  );
};

export default Home;
