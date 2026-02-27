import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  auditoriumServices,
  cateringServices,
  decorationServices,
  photographyServices,
} from "../constants/data";
import {
  IoLocationOutline,
  IoPeopleOutline,
  IoSnowOutline,
  IoTimeOutline,
  IoCallOutline,
  IoMailOutline,
  IoRestaurantOutline,
  IoCameraOutline,
  IoFlowerOutline,
  IoStarOutline,
  IoChevronBack,
  IoCalendarOutline,
} from "react-icons/io5";

const EventDetailsPage = () => {
  const { category, id } = useParams();
  const navigate = useNavigate();
  const [service, setService] = useState(null);
  const [auditoriumPricing, setAuditoriumPricing] = useState(""); // 'daily' or 'hourly'
  // console.log(category, id, "cate");
  console.log(service, "service123");

  console.log(auditoriumPricing,"pricing");
  
  
  

  // Combine all services
  const allServices = [
    ...auditoriumServices,
    ...cateringServices,
    ...decorationServices,
    ...photographyServices,
  ];
  useEffect(() => {
    const fetchService = async () => {
      try {
        const token = localStorage.getItem("token");
        let url = "";

        if (category === "auditorium") {
          url = `/auditorium/${id}`;
        } else if (category === "catering") {
          url = `/catering/${id}`;
        } else if (category === "photography") {
          url = `/photography/${id}`;
        } else if (category === "stage-decoration") {
          url = `/stage-decoration/${id}`;
        } else {
          console.log("Invalid category");
          return;
        }

        const res = await axios.get(url, {
          headers: { Authorization: `Bearer ${token}` },
        });
        console.log(res, "resss");

        setService(res.data?.data);
      } catch (error) {
        console.error("Error fetching service:", error);
      }
    };

    if (id && category) {
      fetchService();
    }
  }, [category, id]);
  const API_BASE_URL = import.meta.env.VITE_API_URL;

  const handleBookNow = () => {
    const pricingType = category === "auditorium" ? auditoriumPricing : null;
    navigate(`/book/${category}/${id}`, {
      state: { pricingType },
    });
  };

  const getCategoryInfo = (category) => {
    switch (category) {
      case "auditorium":
        return {
          name: "Auditorium",
          icon: IoPeopleOutline,
          color: "from-blue-500 to-blue-600",
          bgColor: "bg-blue-50",
        };
      case "catering":
        return {
          name: "Catering",
          icon: IoRestaurantOutline,
          color: "from-green-500 to-green-600",
          bgColor: "bg-green-50",
        };
      case "photography":
        return {
          name: "Photography",
          icon: IoCameraOutline,
          color: "from-purple-500 to-purple-600",
          bgColor: "bg-purple-50",
        };
      case "stage-decoration":
        return {
          name: "Stage Decoration",
          icon: IoFlowerOutline,
          color: "from-pink-500 to-pink-600",
          bgColor: "bg-pink-50",
        };
      default:
        return {
          name: category.replace("-", " "),
          icon: IoStarOutline,
          color: "from-gray-500 to-gray-600",
          bgColor: "bg-gray-50",
        };
    }
  };

  const categoryInfo = getCategoryInfo(category);
  const CategoryIcon = categoryInfo.icon;

  if (!service) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading service details...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 pt-20 max-w-7xl w-full mx-auto">
      {/* Header */}
      <div className="bg-white shadow-sm w-fit rounded-full">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors"
          >
            <IoChevronBack className="w-5 h-5" />
            Back to Servicesx
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left Column - Images and Basic Info */}
          <div className="space-y-6">
            {/* Image Gallery */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <div className="aspect-video relative">
                 <img
                      src={`${API_BASE_URL}/${service.images[0]
                        .replace("public\\", "")
                        .replace(/\\/g, "/")}`}
                      alt={
                        service.auditoriumName ||
                        service.companyName ||
                        service.studioName
                      }
                      className="w-full h-full object-cover rounded-lg rounded-lg cursor-pointer hover:opacity-80 transition-opacity"
                    />
                <div
                  className={`absolute top-4 right-4 bg-gradient-to-r ${categoryInfo.color} text-white px-3 py-1 rounded-full text-sm font-semibold`}
                >
                  {categoryInfo.name}
                </div>
              </div>
              {service.images && service.images.length > 1 && (
                <div className="p-4">
                  <div className="grid grid-cols-1 gap-2">
                    <img  
                      src={`${API_BASE_URL}/${service.images[1]
                        .replace("public\\", "")
                        .replace(/\\/g, "/")}`}
                      alt={
                        service.auditoriumName || 
                        service.companyName ||
                        service.studioName
                      }
                      className="w-full h-40 object-cover rounded-lg rounded-lg cursor-pointer hover:opacity-80 transition-opacity"
                    />
                  </div>
                </div>
              )}  
            </div>

            {/* Basic Information */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h1 className="text-3xl font-bold text-gray-800 mb-4">
                {service.auditoriumName ||
                  service.companyName ||
                  service.studioName}
                  
              </h1>

              <div className="space-y-3 mb-6">
                <div className="flex items-center gap-3 text-gray-600">
                  <IoLocationOutline className="w-5 h-5 text-blue-500" />
                  <span>{service.location}</span>
                </div>

                {service.phone && (
                  <div className="flex items-center gap-3 text-gray-600">
                    <IoCallOutline className="w-5 h-5 text-green-500" />
                    <span>{service.phone}</span>
                  </div>
                )}

                {service.email && (
                  <div className="flex items-center gap-3 text-gray-600">
                    <IoMailOutline className="w-5 h-5 text-purple-500" />
                    <span>{service.email}</span>
                  </div>
                )}
              </div>

              {service.description && (
                <p className="text-gray-600 leading-relaxed">
                  {service.description}
                </p>
              )}
            </div>
          </div>

          {/* Right Column - Details and Booking */}
          <div className="space-y-6">
            {/* Service Details */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                <CategoryIcon className="w-6 h-6" />
                Service Details
              </h2>

              {/* Auditorium Details */}
              {category === "auditorium" && (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className={`p-4 rounded-lg ${categoryInfo.bgColor}`}>
                      <div className="flex items-center gap-2 mb-2">
                        <IoPeopleOutline className="w-5 h-5 text-blue-500" />
                        <span className="font-semibold">Capacity</span>
                      </div>
                      <p className="text-2xl font-bold text-gray-800">
                        {service.capacity} people
                      </p>
                    </div>
                    <div className={`p-4 rounded-lg ${categoryInfo.bgColor}`}>
                      <div className="flex items-center gap-2 mb-2">
                        <IoSnowOutline className="w-5 h-5 text-cyan-500" />
                        <span className="font-semibold">AC Type</span>
                      </div>
                      <p className="text-lg font-semibold text-gray-800">
                        {service.acType}
                      </p>
                    </div>
                  </div>

                  {/* Pricing Type Selection */}
                  <div className="mb-4">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Select Pricing Type
                    </label>
                    <div className="flex gap-2">
                      <button
                        onClick={() => setAuditoriumPricing("daily")}
                        className={`flex-1 py-2 px-4 rounded-lg font-semibold transition-all ${
                          auditoriumPricing === "daily"
                            ? "bg-green-500 text-white shadow-md"
                            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                        }`}
                      >
                        Daily
                      </button>
                      <button
                        onClick={() => setAuditoriumPricing("hourly")}
                        className={`flex-1 py-2 px-4 rounded-lg font-semibold transition-all ${
                          auditoriumPricing === "hourly"
                            ? "bg-blue-500 text-white shadow-md"
                            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                        }`}
                      >
                        Hourly
                      </button>
                    </div>
                  </div>

                  {/* Price Display */}
                  <div className="text-center p-4 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg border-2 border-dashed border-gray-300">
                    <p className="text-sm text-gray-600 mb-2">
                      {auditoriumPricing === "daily"
                        ? "Daily Rate"
                        : "Hourly Rate"}
                    </p>
                    <p className="text-3xl font-bold text-gray-800">
                      ₹
                      {auditoriumPricing === "daily"
                        ? service.price?.toLocaleString()
                        : service.pricePerHour}
                    </p>
                    <p className="text-sm text-gray-500 mt-1">
                      {auditoriumPricing === "daily" ? "per day" : "per hour"}
                    </p>
                  </div>

                  <div className="text-center p-3 bg-orange-50 rounded-lg">
                    <p className="text-sm text-gray-600">Overtime Rate</p>
                    <p className="text-xl font-bold text-orange-600">
                      ₹{service.overtimePrice}
                    </p>
                    <p className="text-xs text-gray-500">additional per hour</p>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <IoTimeOutline className="w-5 h-5 text-purple-500" />
                      <span className="font-semibold">Operating Hours:</span>
                    </div>
                    <p className="text-gray-600 ml-7">
                      {service.openingTime} - {service.closingTime}
                    </p>
                  </div>

                  {service.cancellationPolicy && (
                    <div className="mt-4 p-4 bg-yellow-50 rounded-lg">
                      <h4 className="font-semibold text-yellow-800 mb-2">
                        Cancellation Policy
                      </h4>
                      <p className="text-sm text-yellow-700">
                        {service.cancellationPolicy}
                      </p>
                    </div>
                  )}
                </div>
              )}

              {/* Catering Details */}
              {category === "catering" && (
                <div className="space-y-4">
                  <div className="space-y-4">
                    {service.packages?.map((pkg) => (
                      <div
                        key={pkg.id}
                        className="border border-gray-200 rounded-lg p-4 hover:border-green-300 transition-colors"
                      >
                        <div className="flex justify-between items-start mb-3">
                          <div>
                            <h3 className="font-bold text-lg text-gray-800">
                              {pkg.packageName}
                            </h3>
                            <p className="text-sm text-gray-600 mt-1">
                              {pkg.description}
                            </p>
                            <span
                              className={`inline-block mt-2 px-2 py-1 rounded-full text-xs font-semibold ${
                                pkg.foodType === "veg"
                                  ? "bg-green-100 text-green-700"
                                  : pkg.foodType === "non-veg"
                                    ? "bg-red-100 text-red-700"
                                    : "bg-blue-100 text-blue-700"
                              }`}
                            >
                              {pkg.foodType === "both"
                                ? "Veg & Non-Veg"
                                : pkg.foodType?.toUpperCase()}
                            </span>
                          </div>
                          <div className="text-right">
                            <p className="text-2xl font-bold text-green-600">
                              ₹{pkg.pricePerPerson}
                            </p>
                            <p className="text-sm text-gray-500">per person</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Photography Details */}
              {category === "photography" && (
                <div className="space-y-4">
                  <div className="flex flex-wrap gap-2 mb-4">
                    {service.serviceTypes?.map((serviceType, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-medium"
                      >
                        {serviceType}
                      </span>
                    ))}
                  </div>

                  <div className="space-y-4">
                    {service.packages?.map((pkg) => (
                      <div
                        key={pkg.id}
                        className="border border-gray-200 rounded-lg p-4 hover:border-purple-300 transition-colors"
                      >
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-bold text-lg text-gray-800">
                              {pkg.name}
                            </h3>
                            <p className="text-sm text-gray-600 mt-1">
                              {pkg.description}
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="text-2xl font-bold text-purple-600">
                              ₹{pkg.pricePerHour}
                            </p>
                            <p className="text-sm text-gray-500">per hour</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Stage Decoration Details */}
              {category === "stage-decoration" && (
                <div className="space-y-4">
                  <div className="space-y-4">
                    {service.packages?.map((pkg) => (
                      <div
                        key={pkg.id}
                        className={`border rounded-lg p-4 hover:border-pink-300 transition-colors ${
                          pkg.category === "Luxury"
                            ? "border-yellow-200 bg-yellow-50"
                            : pkg.category === "Premium"
                              ? "border-blue-200 bg-blue-50"
                              : "border-gray-200 bg-gray-50"
                        }`}
                      >
                        <div className="flex justify-between items-start mb-3">
                          <div>
                            <h3 className="font-bold text-lg text-gray-800">
                              {pkg.title}
                            </h3>
                            <p className="text-sm text-gray-600 mt-1">
                              {pkg.description}
                            </p>
                          </div>
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-semibold ${
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
                          <p className="text-2xl font-bold text-pink-600">
                            ₹{pkg.pricePerDay?.toLocaleString()}
                          </p>
                          <p className="text-sm text-gray-500">per day</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Booking Button */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <button
                onClick={handleBookNow}
                className={`w-full bg-gradient-to-r ${categoryInfo.color} text-white py-4 px-6 rounded-xl font-bold text-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] flex items-center justify-center gap-2`}
              >
                <IoCalendarOutline className="w-6 h-6" />
                Book This Service
              </button>
              <p className="text-center text-sm text-gray-500 mt-3">
                Instant booking • Secure payment • 24/7 support
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetailsPage;
