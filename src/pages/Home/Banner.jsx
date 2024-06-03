import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const banners = [
  {
    image: "https://www.sloneek.com/wp-content/uploads/2024/04/hero-image-1500x1445-1.webp",
    headline: 'Shape the Future of Our Workforce',
    subheadline: 'Become an HR Manager and Lead the Way',
    bodyText: 'Join our dynamic team as an HR Manager and play a crucial role in fostering a positive work environment. Help us attract, develop, and retain top talent.',
    buttonText: 'Join as HR Manager',
    buttonLink: '/join-as-HR'
  },
  {
    image: "https://www.sloneek.com/wp-content/uploads/2024/04/hero-image-1500x1445-1.webp",
    headline: 'Kickstart Your Career with Us',
    subheadline: 'Join Our Team as an Employee',
    bodyText: 'We offer exciting opportunities for growth and development. Join us and be part of a team that values innovation, collaboration, and professional growth.',
    buttonText: 'Join as Employee',
    buttonLink: '/join-as-employee'
  }
];

const Banner = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex(prevIndex => (prevIndex + 1) % banners.length);
    }, 5000); // Change slide every 5 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full h-[600px] overflow-hidden">
      {banners.map((banner, index) => (
        <div
          key={index}
          className={`absolute w-full h-full transition-opacity duration-1000 ease-in-out ${index === currentIndex ? 'opacity-100' : 'opacity-0'} flex lg:flex-row flex-col items-center`}
         
        >
          <div className="lg:w-1/2 flex flex-col items-center justify-center text-center p-4">
            <h2 className="text-4xl md:text-5xl font-bold  mb-4">{banner.headline}</h2>
            <p className="text-xl md:text-2xl  mb-6">{banner.subheadline}</p>
            <p className="text-base md:text-lg text-black/70 mb-8 max-w-xl">{banner.bodyText}</p>
            <button
              onClick={() => navigate(banner.buttonLink)}
              className="px-6 py-3 bg-gradient-to-r from-purple-500 to-indigo-500  rounded-full text-white shadow-lg hover:from-indigo-500 hover:to-purple-500 transition-transform transform hover:scale-105 font-semibold"
            >
              {banner.buttonText}
            </button>
          </div>
          <div className='lg:w-1/2 h-full flex justify-center items-center'>
            <img className='w-full h-full object-cover' src={banner.image} alt={banner.headline} />
          </div>
        </div>
      ))}
    </div>
  );
}

export default Banner;
