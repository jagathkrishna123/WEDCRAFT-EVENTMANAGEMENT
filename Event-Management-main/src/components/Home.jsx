import React, { useEffect, useState } from "react";
import Bannerimg from "../assets/bannerimg2.jpg";
import Mainbg from "../assets/mainbg2.jpg";
import Mainbg2 from "../assets/mainbg3.jpg";
import Mainbg3 from "../assets/mainbg4.jpg";
import { IoMdArrowRoundForward } from "react-icons/io";
import RotatingText from "./RotatingText";
import CategorySection from "./CategorySection";
import Testimonials from "./Testimonials";
import NewsLetter from "./NewsLetter";
import Navbar from "./Navbar";

const Home = () => {
  const backgrounds = [Mainbg, Mainbg2, Mainbg3]; // background images array
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % backgrounds.length);
    }, 3000); // 2 seconds

    return () => clearInterval(interval);
  }, []);
  return (
    // ------------ OUTER WRAPPER (Centers Everything) ------------
    <>

      <div
        className="w-full min-h-screen bg-cover bg-center py-2 md:py-12 flex flex-col relative overflow-hidden transition-all duration-700"
        style={{
          backgroundImage: `url(${backgrounds[currentIndex]})`,
        }}
      >
        <div className="absolute inset-0 bg-black/40 z-10"></div>

        {/* ------------ MAIN CONTAINER ------------ */}
<div className="flex flex-col md:flex-row items-center md:items-start  px-6 md:px-10 lg:px-20 py-12 md:py-20 min-h-screen relative z-20">          {/* -------- Left Section -------- */}
          <div className="w-full md:w-1/2 flex flex-col items-center md:items-start justify-center gap-6 md:gap-8 text-left mt-20 md:mt-5">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-white font-extrabold leading-tight tracking-tight">
              Making Your Events <br className="hidden sm:block" />
              <span className="text-blue-400">Memorable</span>
            </h1>

            <div className="text-gray-200 text-lg md:text-xl font-medium max-w-lg">
              <p>
                Creating unforgettable events with flawless planning and
                execution. Schedule your event now.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-4 w-full md:w-auto">
              <RotatingText
                texts={["Wedding", "Auditorium", "Catering", "Photography"]}
                mainClassName="px-4 py-2 bg-blue-600/90 backdrop-blur-sm text-white font-bold text-xl md:text-2xl rounded-xl shadow-lg border border-white/10 min-w-[200px]"
                staggerFrom={"last"}
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                exit={{ y: "-120%" }}
                staggerDuration={0.025}
                splitLevelClassName="overflow-hidden pb-1"
                transition={{ type: "spring", damping: 30, stiffness: 400 }}
                rotationInterval={2500}
              />
            </div>

           <a
  className="flex items-center justify-center gap-2 sm:gap-3 
  bg-white/10 backdrop-blur-md border border-white/20 
  px-5 py-2.5 sm:px-7 sm:py-3 md:px-9 md:py-4
  rounded-full text-white font-semibold 
  text-sm sm:text-base md:text-lg
  hover:bg-white hover:text-blue-600 
  transition-all duration-300 shadow-xl group"
  href="#sepeciality"
>
  Book Now
  <IoMdArrowRoundForward className="group-hover:translate-x-1 transition-transform" />
</a>
          </div>         
        </div>
      </div>
      <CategorySection />
      <Testimonials />
      <NewsLetter />
    </>
  );
};

export default Home;
