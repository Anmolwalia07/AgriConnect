import { useState, useEffect } from 'react';
import { 
  FaLeaf, 
  FaComments, 
  FaTruck, 
  FaChartLine, 
  FaShieldAlt, 
  FaSeedling,
  FaBars,
  FaTimes,
  FaSearch,
  FaBell
} from 'react-icons/fa';
import Footer from '../Components/Footer';
import Feedback from '../Components/Feedback';
import Market from '../Components/Market';
import Features from '../Components/Features';
import StatsOverview from '../Components/StatsOverveiw';
import Header from '../Components/Header';

const LandingPage = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFarmer, setIsFarmer] = useState(true);
 

  // Image carousel data
  const images = [
    'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
    'https://images.unsplash.com/photo-1560493676-04071c5f467b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YWdyaWN1bHR1cmV8ZW58MHx8MHx8fDA%3D',
    'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?ixlib=rb-4.0.3&auto=format&fit=crop&w=2074&q=80'
  ];

  // Auto-rotate images every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  // Feature cards data
 

  // Testimonials data
  const testimonials = [
    { name: "Farmer Rajesh", location: "Haryana", text: "AgriConnect doubled my profits by removing middlemen!" },
    { name: "Buyer Priya", location: "Delhi", text: "Fresh produce directly from farms - amazing quality!" },
  ];

  // Market price data


  return (
        <div  className="font-sans">
          <Header/>
          <div className='w-full h-5 '></div>
      {/* Hero Section */}
      <section className="pt-24 pb-12 bg-gradient-to-b from-green-50 to-white">
        <div className="container items-center gap-12 px-6 mx-auto md:flex">
          <div className="mb-12 md:w-1/2 md:mb-0">
            <h1 className="mb-6 text-4xl font-bold text-gray-800 md:text-5xl">
              Empowering Farmers, Connecting Buyers – Directly!
            </h1>
            <p className="mb-8 text-lg text-gray-600">
              AgriConnect bridges the gap between farmers and buyers, ensuring fair prices and transparency.
            </p>
            
            {/* Registration Toggle */}
            <div className="flex gap-4 mb-8">
              <button 
                className={`px-6 py-2 rounded-full ${isFarmer ? 'bg-green-600 text-white' : 'bg-gray-100'}`}
                onClick={() => setIsFarmer(true)}
              >
                I'm a Farmer
              </button>
              <button 
                className={`px-6 py-2 rounded-full ${!isFarmer ? 'bg-green-600 text-white' : 'bg-gray-100'}`}
                onClick={() => setIsFarmer(false)}
              >
                I'm a Buyer
              </button>
            </div>

            <button className="px-8 py-3 text-lg text-white bg-green-600 rounded-full hover:bg-green-700">
              Join AgriConnect Today!
            </button>
          </div>
          
          {/* Image Carousel */}
          <div className="relative overflow-hidden rounded-lg shadow-xl md:w-1/2 h-96 z-[0]">
            {images.map((img, index) => (
              <img
                key={img}
                src={img}
                alt="Agriculture"
                className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
                  index === currentIndex ? 'opacity-100' : 'opacity-0'
                }`}
              />
            ))}
            
            {/* Carousel Dots */}
            <div className="absolute flex gap-2 transform -translate-x-1/2 bottom-4 left-1/2">
              {images.map((_, index) => (
                <button
                  key={index}
                  className={`w-3 h-3 rounded-full ${
                    index === currentIndex ? 'bg-green-600' : 'bg-white'
                  }`}
                  onClick={() => setCurrentIndex(index)}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Market Prices Section */}
      <Market/>

      
      {/* Features Section */}
      <Features />

      <StatsOverview farmers={5000} buyers={3000} countries={20} />
      
      {/* Testimonials Section */}
      <Feedback testimonials={testimonials}/>

      {/* Footer */}
      <Footer/>

      {/* Live Chat */}
      <div
      className="fixed p-4 bg-green-600 rounded-full shadow-lg cursor-pointer bottom-8 right-8">
        <FaComments className="text-2xl text-white" />
      </div>
    </div>
  );
};

export default LandingPage;