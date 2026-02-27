import { useState, useMemo, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

import {
  IoLocationOutline,
  IoPeopleOutline,
  IoSnowOutline,
  IoTimeOutline,
  IoRestaurantOutline,
  IoCameraOutline,
  IoFlowerOutline,
  IoStarOutline,
  IoSearchOutline,
  IoFilterOutline,
} from "react-icons/io5";
import axios from "axios";

const EventShowcasebyCategory = () => {
  const API_BASE_URL = import.meta.env.VITE_API_URL;

  const { category } = useParams();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("default");
  const [items, setItems] = useState([]);

  const categoryApiMap = {
    auditorium: "/fecthAuditorium",
    catering: "/fetchCatering",
    photography: "/fetchPhotography",
    "stage-decoration": "/fetchDeceration",
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!category) return;

        const endpoint = categoryApiMap[category];
        if (!endpoint) return;

        const token = localStorage.getItem("token"); // or from context

        const res = await axios.get(endpoint, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setItems(res.data.data); // adjust based on your response
      } catch (error) {
        console.error("Fetch error:", error);
      }
    };

    fetchData();
  }, [category]);

  // combine all services
  const allServices = items;

  // filter and sort services
  const filteredServices = useMemo(() => {
    let services = allServices.filter(
      (service) => service.category === category,
    );

    // Apply search filter
    if (searchTerm) {
      services = services.filter((service) =>
        service.location.toLowerCase().includes(searchTerm.toLowerCase()),
      );
    }

    // Apply sorting
    if (sortBy === "price-low") {
      services.sort((a, b) => {
        let priceA, priceB;

        if (category === "auditorium") {
          priceA = a.pricePerDay || 0;
          priceB = b.pricePerDay || 0;
        } else if (category === "catering") {
          priceA = Math.min(
            ...(a.packages?.map((p) => p.pricePerPerson) || [0]),
          );
          priceB = Math.min(
            ...(b.packages?.map((p) => p.pricePerPerson) || [0]),
          );
        } else if (category === "photography") {
          priceA = Math.min(...(a.packages?.map((p) => p.pricePerHour) || [0]));
          priceB = Math.min(...(b.packages?.map((p) => p.pricePerHour) || [0]));
        } else if (category === "stage-decoration") {
          priceA = Math.min(...(a.packages?.map((p) => p.pricePerDay) || [0]));
          priceB = Math.min(...(b.packages?.map((p) => p.pricePerDay) || [0]));
        }

        return priceA - priceB;
      });
    } else if (sortBy === "price-high") {
      services.sort((a, b) => {
        let priceA, priceB;

        if (category === "auditorium") {
          priceA = a.pricePerDay || 0;
          priceB = b.pricePerDay || 0;
        } else if (category === "catering") {
          priceA = Math.min(
            ...(a.packages?.map((p) => p.pricePerPerson) || [0]),
          );
          priceB = Math.min(
            ...(b.packages?.map((p) => p.pricePerPerson) || [0]),
          );
        } else if (category === "photography") {
          priceA = Math.min(...(a.packages?.map((p) => p.pricePerHour) || [0]));
          priceB = Math.min(...(b.packages?.map((p) => p.pricePerHour) || [0]));
        } else if (category === "stage-decoration") {
          priceA = Math.min(...(a.packages?.map((p) => p.pricePerDay) || [0]));
          priceB = Math.min(...(b.packages?.map((p) => p.pricePerDay) || [0]));
        }

        return priceB - priceA;
      });
    }

    return services;
  }, [category, searchTerm, sortBy]);

  // Get category display name and icon
  const getCategoryInfo = (category) => {
    switch (category) {
      case "auditorium":
        return {
          name: "Auditorium",
          icon: IoPeopleOutline,
          color: "from-blue-500 to-blue-600",
        };
      case "catering":
        return {
          name: "Catering",
          icon: IoRestaurantOutline,
          color: "from-green-500 to-green-600",
        };
      case "photography":
        return {
          name: "Photography",
          icon: IoCameraOutline,
          color: "from-purple-500 to-purple-600",
        };
      case "stage-decoration":
        return {
          name: "Stage Decoration",
          icon: IoFlowerOutline,
          color: "from-pink-500 to-pink-600",
        };
      default:
        return {
          name: category.replace("-", " "),
          icon: IoStarOutline,
          color: "from-gray-500 to-gray-600",
        };
    }
  };

  const categoryInfo = getCategoryInfo(category);
  const CategoryIcon = categoryInfo.icon;

  // Render service card based on type
  const renderServiceCard = (item) => {
    console.log(item, "item");

    if (category === "auditorium") {
      return (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm">
              <IoPeopleOutline className="text-blue-500 " />
              <span>Capacity: {item.capacity} </span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <IoSnowOutline className="text-cyan-500" />
              <span>{item.acType}</span>
            </div>
          </div>
          <div className="flex items-center gap-2 text-sm text-green-600 font-semibold">
            <span>₹{item.price?.toLocaleString()}/day</span>
          </div>
        </div>
      );
    }

    if (category === "catering") {
      return (
        <div className="space-y-3">
          {item.packages?.slice(0, 2).map((pkg, index) => (
            <div key={pkg.id} className="bg-green-50 p-3 rounded-lg">
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-medium text-sm">{pkg.packageName}</h4>
                  <p className="text-xs text-gray-600 mt-1">
                    {pkg.description}
                  </p>
                </div>
                <div className="text-right">
                  <span className="text-green-600 font-bold">
                    ₹{pkg.pricePerPerson}
                  </span>
                  <span className="text-xs text-gray-500">/person</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      );
    }

    if (category === "photography") {
      return (
        <div className="space-y-3">
          {item.packages?.slice(0, 2).map((pkg, index) => (
            <div key={pkg.id} className="bg-purple-50 p-3 rounded-lg">
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-medium text-sm">{pkg.name}</h4>
                  <p className="text-xs text-gray-600 mt-1">
                    {pkg.description}
                  </p>
                </div>
                <div className="text-right">
                  <span className="text-purple-600 font-bold">
                    ₹{pkg.pricePerHour}
                  </span>
                  <span className="text-xs text-gray-500">/hour</span>
                </div>
              </div>
            </div>
          ))}
          <div className="flex flex-wrap gap-1">
            {item.serviceTypes?.slice(0, 3).map((service, index) => (
              <span
                key={index}
                className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded-full"
              >
                {service}
              </span>
            ))}
          </div>
        </div>
      );
    }

    if (category === "stage-decoration") {
      return (
        <div className="space-y-3">
          {item.packages?.slice(0, 2).map((pkg, index) => (
            <div
              key={pkg.id}
              className={`p-3 rounded-lg ${
                pkg.category === "Luxury"
                  ? "bg-yellow-50"
                  : pkg.category === "Premium"
                    ? "bg-blue-50"
                    : "bg-gray-50"
              }`}
            >
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-medium text-sm">{pkg.title}</h4>
                  <p className="text-xs text-gray-600 mt-1">
                    {pkg.description}
                  </p>
                  <span
                    className={`text-xs px-2 py-1 rounded-full mt-2 inline-block ${
                      pkg.category === "Luxury"
                        ? "bg-yellow-100 text-yellow-700"
                        : pkg.category === "Premium"
                          ? "bg-blue-100 text-blue-700"
                          : "bg-gray-100 text-gray-700"
                    }`}
                  >
                    {pkg.category}
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-green-600 font-bold">
                    ₹{pkg.pricePerDay?.toLocaleString()}
                  </span>
                  <span className="text-xs text-gray-500">/day</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      );
    }

    return null;
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 to-gray-100 py-10 pt-20">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header Section */}
        <div className="text-center mb-12">
          <div
            className={`inline-flex items-center gap-3 bg-linear-to-r ${categoryInfo.color} text-white px-6 py-3 rounded-full mb-4`}
          >
            <CategoryIcon className="w-6 h-6" />
            <h2 className="text-2xl font-bold capitalize">
              {categoryInfo.name} Services
            </h2>
          </div>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover the best {categoryInfo.name.toLowerCase()} services in your
            area. Compare prices, features, and book instantly.
          </p>
        </div>

        {/* Search and Sort Controls */}
        <div className="max-w-4xl mx-auto mb-8">
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex flex-col md:flex-row gap-4">
              {/* Search by Location */}
              <div className="flex-1">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Search by Location
                </label>
                <div className="relative">
                  <IoSearchOutline className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Enter location (e.g., Kochi, Calicut)"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg  outline-none text-gray-700"
                  />
                </div>
              </div>

              {/* Sort by Price */}
              <div className="md:w-64">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Sort by Price
                </label>
                <div className="relative">
                  <IoFilterOutline className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 rounded-lg  border border-gray-300 appearance-none bg-white outline-none text-gray-700"
                  >
                    <option value="default">Default Order</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                  </select>
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                    <svg
                      className="w-5 h-5 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            {/* Results count */}
            <div className="mt-4 text-sm text-gray-600">
              Showing {filteredServices.length} service
              {filteredServices.length !== 1 ? "s" : ""}
              {searchTerm && ` in "${searchTerm}"`}
            </div>
          </div>
        </div>

        {items.length === 0 ? (
          <div className="text-center py-12">
            <div className="bg-white rounded-2xl shadow-lg p-8 max-w-md mx-auto">
              <CategoryIcon className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500 text-lg">
                {searchTerm
                  ? `No ${categoryInfo.name.toLowerCase()} services found in "${searchTerm}".`
                  : `No services found in this category.`}
              </p>
              <p className="text-gray-400 text-sm mt-2">
                {searchTerm
                  ? "Try searching for a different location or clear the search."
                  : "Try exploring other categories or check back later."}
              </p>
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm("")}
                  className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
                >
                  Clear Search  
                </button>
              )}
            </div>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {items.map((item) => (
              <div
                key={item._id}
                className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group hover:-translate-y-1"
              >
                {/* Image Section */}
                <div className="relative overflow-hidden">
                  <img
                    src={
                      item.images?.[0]
                        ? `${API_BASE_URL}/${item.images[0]
                            .replace(/\\/g, "/")
                            .replace("public/", "")}`
                        : "/placeholder.jpg"
                    }
                    alt={
                      item.auditoriumName || item.companyName || item.studioName
                    }
                    className="h-48 w-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div
                    className={`absolute top-4 right-4 bg-gradient-to-r ${categoryInfo.color} text-white px-3 py-1 rounded-full text-xs font-semibold`}
                  >
                    {categoryInfo.name}
                  </div>
                </div>

                {/* Content Section */}
                <div className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h3 className="font-bold text-xl text-gray-800 mb-1">
                        {item.auditoriumName ||
                          item.companyName ||
                          item.studioName}
                      </h3>
                      <div className="flex items-center gap-2 text-gray-600 text-sm">
                        <IoLocationOutline className="w-4 h-4" />
                        <span>{item.location}</span>
                      </div>
                    </div>
                  </div>

                  {/* Description */}
                  {item.description && (
                    <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                      {item.description}
                    </p>
                  )}

                  {/* Service-specific information */}
                  {renderServiceCard(item)}

                  {/* Contact/Action Button */}
                  <button
                    onClick={() => {
                      if (item?._id) {
                        navigate(`/service/${category}/${item._id}`);
                      }
                    }}
                    className={`w-full mt-4 bg-gradient-to-r ${categoryInfo.color} text-white py-3 px-4 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 transform hover:scale-[1.02]`}
                  >
                    View Details & Books
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default EventShowcasebyCategory;
