import  { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import review1 from "../../assets/G2-5.svg";
import review2 from "../../assets/Capterra-1-1.svg";

import banner1 from '../../assets/banner-1.webp'
import banner2 from '../../assets/banner-2.png'

const banners = [
  {
    image: banner1,
    headline: "Shape the Future of Our Workforce",
    subheadline: "Become an HR Manager and Lead the Way",
    bodyText:
      "Join our dynamic team as an HR Manager and play a crucial role in fostering a positive work environment. Help us attract, develop, and retain top talent.",
    buttonText: "Join as HR Manager",
    buttonLink: "/join-as-HR",
  },
  {
    image: banner2,
    headline: "Kickstart Your Career with Us",
    subheadline: "Join Our Team as an Employee",
    bodyText:
      "We offer exciting opportunities for growth and development. Join us and be part of a team that values innovation, collaboration, and professional growth.",
    buttonText: "Join as Employee",
    buttonLink: "/join-as-employee",
  },
];

const Banner = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % banners.length);
    }, 5000); // Change slide every 5 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full h-[900px] lg:h-[600px] overflow-hidden mt-6">
      {banners.map((banner, index) => (
        <div
          key={index}
          className={`absolute w-full h-full transition-opacity duration-1000 ease-in-out ${
            index === currentIndex ? "opacity-100" : "opacity-0"
          } flex lg:flex-row flex-col items-center`}
        >
          <div className="lg:w-1/2 flex flex-col items-left justify-center p-4 lg:pr-32">
            <h1 className="pb-5 pt-2 text-left lg:text-lg font-semibold text-indigo-600">
              #1 Asset Management System
            </h1>
            <h2 className="text-4xl md:text-5xl font-bold  mb-4">
              {banner.headline}
            </h2>
            <p className="text-xl md:text-2xl  mb-6">{banner.subheadline}</p>
            <p className="text-base md:text-lg text-black/70 mb-8 max-w-xl">
              {banner.bodyText}
            </p>
            <button
              onClick={() => navigate(banner.buttonLink)}
              className="w-60 px-6 py-3 bg-gradient-to-r from-purple-500 to-indigo-500  rounded-full text-white shadow-lg hover:from-indigo-500 hover:to-purple-500 transition-transform transform hover:scale-105 font-semibold"
            >
              {banner.buttonText}
            </button>

            <div className="pt-4 flex items-center gap-4">
              <img src={review1} alt="" />
              <img src={review2} alt="" />
            </div>
          </div>
          <div className="lg:w-1/2 h-full flex justify-center items-center">
            <img
              className="w-full h-full object-cover"
              src={banner.image}
              alt={banner.headline}
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default Banner;
