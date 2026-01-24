import { NavLink } from "react-router-dom";


import Bannerimg from "../assets/bannerimg2.jpg";

import Title from "./Title";
import { categories } from "../constants/data";

const CategorySection = () => {



  return (
    <div className="py-10 px-4 max-w-[1440px] mx-auto">
      
      {/* <h2 className="text-2xl font-bold text-gray-800 mb-6">Our Services</h2> */}
      <Title
          title="Our Featured Services" 
          subTitle="Explore the best services we have to offer, tailored just for you." 
        />

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
        {categories.map((cat, i) => (
          <NavLink
            key={i}
            to={`/services/${cat.slug}`}
            className="relative w-full rounded-xl overflow-hidden bg-white 
              text-gray-700 shadow-md hover:shadow-xl cursor-pointer transition-all duration-300 group"
          >
            {/* IMAGE */}
            <img
              src={cat.image}
              alt={cat.name}
              className="w-full h-32 object-cover group-hover:scale-110 transition-transform duration-500"
            />

            {/* BADGE */}
            <p className="absolute top-3 left-3 bg-white text-gray-900 text-xs px-3 py-1 rounded-full shadow">
              {cat.name}
            </p>

            {/* CONTENT */}
            <div className="p-4 flex items-center justify-between">
              <p className="text-lg font-semibold text-gray-900">{cat.name}</p>
              <div className="p-2 bg-gray-200 rounded-full text-gray-600">
  <cat.icon size={22} />
</div>
            </div>
          </NavLink>
        ))}
      </div>
    </div>
  );
};

export default CategorySection;
