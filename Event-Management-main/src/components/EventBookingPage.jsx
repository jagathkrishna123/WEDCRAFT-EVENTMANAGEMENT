import React, { useState, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { useAppContext } from "../context/AppContext";
// removed legacy dummy data imports
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
  IoPersonOutline,
  IoCheckmarkCircleOutline,
  IoAdd,
  IoRemove,
  IoTime,
} from "react-icons/io5";

const EventBookingPage = () => {
  const { category, serviceId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { user, isAdmin } = useAppContext();
  const [service, setService] = useState(null);
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [auditoriumPricing, setAuditoriumPricing] = useState(""); // 'daily' or 'hourly'
  const [bookingData, setBookingData] = useState({
    name: "",
    email: "",
    phone: "",
    eventDate: "",
    eventTime: "",
    guests: 50,
    hours: 4,
    specialRequests: "",
  });
  const [totalPrice, setTotalPrice] = useState(0);
  const [isDateAvailable, setIsDateAvailable] = useState(true);
  const [availabilityMessage, setAvailabilityMessage] = useState("");
  const [checkingAvailability, setCheckingAvailability] = useState(false);
  console.log(category, serviceId, "booking params");
  const { pricingType } = location.state || {};
  console.log(selectedPackage, "sle");


  // if (pricingType) {
  //   setAuditoriumPricing(pricingType);
  // }

  console.log(pricingType, "ppp", auditoriumPricing, "auid");

  // Combine all services - legacy dummy data removed

  useEffect(() => {
    if (pricingType) {
      setAuditoriumPricing(pricingType);
    }
    const fetchService = async () => {
      const id = serviceId; // Assuming serviceId is the unique identifier for all services
      try {
        const token = localStorage.getItem("token");
        let url = "";

        if (category === "auditorium") {
          url = `/fetchAuditoriumById/${id}`;
        } else if (category === "catering") {
          url = `/fetchCateringById/${id}`;
        } else if (category === "photography") {
          url = `/fetchPhotographyById/${id}`;
        } else if (category === "stage-decoration") {
          url = `/fetchDecerationById/${id}`;
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

    if (serviceId && category) {
      fetchService();
    }
  }, [category, serviceId]);

  // Check date availability
  useEffect(() => {
    const checkDateAvailability = async () => {
      if (!bookingData.eventDate || !serviceId) return;

      setCheckingAvailability(true);
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(`/checkAvailability/${serviceId}/${bookingData.eventDate}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        setIsDateAvailable(res.data.available);
        setAvailabilityMessage(res.data.message);
      } catch (error) {
        console.error("Error checking availability:", error);
        // Default to available if check fails, or handle error
        setIsDateAvailable(true);
        setAvailabilityMessage("");
      } finally {
        setCheckingAvailability(false);
      }
    };

    const timeoutId = setTimeout(() => {
      checkDateAvailability();
    }, 500); // Debounce if needed, though date picker usually triggers once

    return () => clearTimeout(timeoutId);
  }, [bookingData.eventDate, serviceId]);

  console.log(service, "ser");


  // Calculate total price based on selected package and inputs
  useEffect(() => {
    let price = 0;

    if (category === "catering" && selectedPackage) {
      // Per person pricing
      price = selectedPackage.pricePerPerson * bookingData.guests;
    } else if (category === "photography" && selectedPackage) {
      // Per hour pricing
      price = selectedPackage.pricePerHour * bookingData.hours;
    } else if (category === "stage-decoration" && selectedPackage) {
      // Per day pricing (fixed)
      price = selectedPackage.pricePerDay || 0;
    } else if (category === "auditorium" && service) {
      // For auditorium, use selected pricing type
      if (auditoriumPricing === "daily") {
        price = service.price;
      } else if (auditoriumPricing === "hourly") {
        price = service.pricePerHour * bookingData.hours;
      }
    }

    setTotalPrice(price);
  }, [
    selectedPackage,
    bookingData.guests,
    bookingData.hours,
    category,
    service,
    auditoriumPricing,
  ]);

  const handlePackageSelect = (pkg) => {
    setSelectedPackage(pkg);
  };

  const handleBookingSubmit = (e) => {
    e.preventDefault();
    // Prepare booking details to pass to payment page
    const bookingDetails = {
      serviceId,
      providerId: service.providerId,
      serviceName: service.auditoriumName || service.companyName || service.studioName,
      selectedPackage,
      bookingData,
      totalPrice,
      category,
      auditoriumPricing: category === "auditorium" ? auditoriumPricing : null,
    };

    console.log("Proceeding to payment:", bookingDetails);
    // Navigate to payment page with booking details
    navigate("/payment", { state: { bookingDetails } });
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
          <p className="text-gray-600">Loading booking details...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 pt-20 p-6">
      {/* Header */}
      <div className="bg-white shadow-sm w-fit rounded-full">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors"
          >
            <IoChevronBack className="w-5 h-5" />
            Back to Service
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Service Info & Packages */}
          <div className="lg:col-span-2 space-y-6">
            {/* Service Header */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="flex items-center gap-3 mb-4">
                <div
                  className={`p-3 bg-gradient-to-r ${categoryInfo.color} text-white rounded-xl`}
                >
                  <CategoryIcon className="w-8 h-8" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-gray-800">
                    Book{" "}
                    {service.auditoriumName ||
                      service.companyName ||
                      service.studioName}
                  </h1>
                  <p className="text-gray-600 flex items-center gap-2">
                    <IoLocationOutline className="w-4 h-4" />
                    {service.location}
                  </p>
                </div>
              </div>

              {service.description && (
                <p className="text-gray-600">{service.description}</p>
              )}
            </div>

            {/* Auditorium Pricing Type Selection */}
            {category === "auditorium" && (
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h2 className="text-xl font-bold text-gray-800 mb-4">
                  Select Pricing Type
                </h2>

                <div className="grid grid-cols-2 gap-4 mb-4">
                  <button
                    onClick={() => setAuditoriumPricing("daily")}
                    className={`p-4 border-2 rounded-xl transition-all duration-200 ${auditoriumPricing === "daily"
                      ? "border-green-500 bg-green-50 text-green-700"
                      : "border-gray-200 hover:border-gray-300 text-gray-700"
                      }`}
                  >
                    <div className="text-center">
                      <h3 className="font-bold text-lg">Daily</h3>
                      <p className="text-sm opacity-75">Full day booking</p>
                      <p className="text-2xl font-bold mt-2">
                        ₹{service.price?.toLocaleString()}
                      </p>
                    </div>
                  </button>

                  <button
                    onClick={() => setAuditoriumPricing("hourly")}
                    className={`p-4 border-2 rounded-xl transition-all duration-200 ${auditoriumPricing === "hourly"
                      ? "border-blue-500 bg-blue-50 text-blue-700"
                      : "border-gray-200 hover:border-gray-300 text-gray-700"
                      }`}
                  >
                    <div className="text-center">
                      <h3 className="font-bold text-lg">Hourly</h3>
                      <p className="text-sm opacity-75">Flexible hours</p>
                      <p className="text-2xl font-bold mt-2">
                        ₹{service.pricePerHour}
                      </p>
                      <p className="text-xs opacity-75">per hour</p>
                    </div>
                  </button>
                </div>

                {auditoriumPricing === "hourly" && (
                  <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Number of Hours
                    </label>
                    <input
                      type="number"
                      min="1"
                      max="24"
                      value={bookingData.hours}
                      onChange={(e) =>
                        setBookingData({
                          ...bookingData,
                          hours: parseInt(e.target.value) || 1,
                        })
                      }
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <p className="text-xs text-gray-600 mt-1">
                      Minimum 1 hour. Overtime charges: ₹{service.overtimePrice}
                      /hour
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* Package Selection */}
            {(category === "catering" ||
              category === "photography" ||
              category === "stage-decoration") &&
              (service.packages || service.decorations) && (
                <div className="bg-white rounded-2xl shadow-lg p-6">
                  <h2 className="text-xl font-bold text-gray-800 mb-4">
                    Select Package
                  </h2>
                  <div className="space-y-3">
                    {(service.packages || service.decorations).map((pkg) => (
                      <div
                        key={pkg._id}
                        onClick={() => handlePackageSelect(pkg)}
                        className={`border-2 rounded-xl p-4 cursor-pointer transition-all duration-200 ${selectedPackage?._id === pkg._id
                          ? `border-blue-500 bg-blue-50`
                          : "border-gray-200 hover:border-gray-300"
                          }`}
                      >
                        <div className="flex justify-between items-start">
                          <div className="flex-1">
                            <h3 className="font-bold text-lg text-gray-800">
                              {pkg.packageName || pkg.name || pkg.title}
                            </h3>
                            <p className="text-gray-600 text-sm mt-1">
                              {pkg.description}
                            </p>

                            {/* Package tags */}
                            <div className="flex flex-wrap gap-2 mt-3">
                              {category === "catering" && (
                                <span
                                  className={`px-2 py-1 rounded-full text-xs font-semibold ${pkg.foodType === "veg"
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
                              )}
                              {category === "stage-decoration" && (
                                <span
                                  className={`px-2 py-1 rounded-full text-xs font-semibold ${pkg.category === "Luxury"
                                    ? "bg-yellow-100 text-yellow-700"
                                    : pkg.category === "Premium"
                                      ? "bg-blue-100 text-blue-700"
                                      : "bg-gray-100 text-gray-700"
                                    }`}
                                >
                                  {pkg.category}
                                </span>
                              )}
                            </div>
                          </div>

                          <div className="text-right ml-4">
                            {category === "catering" && (
                              <div>
                                <p className="text-2xl font-bold text-green-600">
                                  ₹{pkg.pricePerPerson}
                                </p>
                                <p className="text-sm text-gray-500">
                                  per person
                                </p>
                              </div>
                            )}
                            {category === "photography" && (
                              <div>
                                <p className="text-2xl font-bold text-purple-600">
                                  ₹{pkg.pricePerHour}
                                </p>
                                <p className="text-sm text-gray-500">
                                  per hour
                                </p>
                              </div>
                            )}
                            {category === "stage-decoration" && (
                              <div>
                                <p className="text-2xl font-bold text-pink-600">
                                  ₹{pkg.pricePerDay?.toLocaleString()}
                                </p>
                                <p className="text-sm text-gray-500">per day</p>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

            {/* Quantity Selection */}
            {(category === "catering" || category === "photography") &&
              selectedPackage && (
                <div className="bg-white rounded-2xl shadow-lg p-6">
                  <h2 className="text-xl font-bold text-gray-800 mb-4">
                    {category === "catering" ? "Number of Guests" : "Duration"}
                  </h2>

                  {category === "catering" && (
                    <div className="max-w-md mx-auto">
                      <div className="relative group">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                          <IoPeopleOutline className="w-5 h-5 text-blue-500 group-focus-within:text-blue-600 transition-colors" />
                        </div>
                        <input
                          type="number"
                          id="guestInput"
                          min="1"
                          value={bookingData.guests || ""}
                          onChange={(e) => {
                            const val = parseInt(e.target.value);
                            setBookingData({
                              ...bookingData,
                              guests: isNaN(val) ? 0 : Math.max(0, val),
                            });
                          }}
                          className="w-full pl-12 pr-4 py-4 bg-gray-50 border-2 border-gray-100 rounded-2xl text-xl font-bold focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all outline-none"
                          placeholder="Enter number of guests"
                        />
                        <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
                          <span className="text-gray-400 font-medium">guests</span>
                        </div>
                      </div>
                      <p className="text-sm text-gray-500 mt-2 text-center">
                        Tip: You can type the exact number of guests directly
                      </p>
                    </div>
                  )}

                  {category === "photography" && (
                    <div className="max-w-md mx-auto">
                      <div className="relative group">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                          <IoTime className="w-5 h-5 text-purple-500 group-focus-within:text-purple-600 transition-colors" />
                        </div>
                        <input
                          type="number"
                          id="durationInput"
                          min="1"
                          value={bookingData.hours || ""}
                          onChange={(e) => {
                            const val = parseInt(e.target.value);
                            setBookingData({
                              ...bookingData,
                              hours: isNaN(val) ? 0 : Math.max(0, val),
                            });
                          }}
                          className="w-full pl-12 pr-4 py-4 bg-gray-50 border-2 border-gray-100 rounded-2xl text-xl font-bold focus:bg-white focus:border-purple-500 focus:ring-4 focus:ring-purple-100 transition-all outline-none"
                          placeholder="Enter duration"
                        />
                        <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
                          <span className="text-gray-400 font-medium">hours</span>
                        </div>
                      </div>
                      <p className="text-sm text-gray-500 mt-2 text-center">
                        Tip: Enter the total estimated duration in hours
                      </p>
                    </div>
                  )}
                </div>
              )}
          </div>

          {/* Right Column - Booking Form & Summary */}
          <div className="space-y-6">
            {/* Price Summary */}
            <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">
                Booking Summary
              </h2>

              <div className="space-y-3 mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-600">Service:</span>
                  <span className="font-semibold">
                    {service.auditoriumName ||
                      service.companyName ||
                      service.studioName}
                  </span>
                </div>

                {selectedPackage && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Package:</span>
                    <span className="font-semibold">
                      {selectedPackage.packageName ||
                        selectedPackage.name ||
                        selectedPackage.title}
                    </span>
                  </div>
                )}

                {category === "catering" && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Guests:</span>
                    <span className="font-semibold">{bookingData.guests}</span>
                  </div>
                )}

                {category === "photography" && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Duration:</span>
                    <span className="font-semibold">
                      {bookingData.hours} hours
                    </span>
                  </div>
                )}

                {category === "auditorium" && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Pricing Type:</span>
                    <span className="font-semibold capitalize">
                      {auditoriumPricing}
                    </span>
                  </div>
                )}

                {category === "auditorium" &&
                  auditoriumPricing === "hourly" && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Duration:</span>
                      <span className="font-semibold">
                        {bookingData.hours} hours
                      </span>
                    </div>
                  )}

                <hr className="my-3" />

                <div className="flex justify-between text-xl font-bold">
                  <span>Total Amount:</span>
                  <span className="text-green-600">
                    ₹{totalPrice.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>

            {/* Booking Form */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-6">
                Your Details
              </h2>

              <form onSubmit={handleBookingSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    required
                    value={bookingData.name}
                    onChange={(e) =>
                      setBookingData({ ...bookingData, name: e.target.value })
                    }
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter your full name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    required
                    value={bookingData.email}
                    onChange={(e) =>
                      setBookingData({ ...bookingData, email: e.target.value })
                    }
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter your email"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    required
                    value={bookingData.phone}
                    onChange={(e) =>
                      setBookingData({ ...bookingData, phone: e.target.value })
                    }
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter your phone number"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Event Date
                    </label>
                    <input
                      type="date"
                      required
                      value={bookingData.eventDate}
                      onChange={(e) =>
                        setBookingData({
                          ...bookingData,
                          eventDate: e.target.value,
                        })
                      }
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    {bookingData.eventDate && (
                      <div className="mt-1">
                        {checkingAvailability ? (
                          <p className="text-xs text-blue-500 animate-pulse">Checking availability...</p>
                        ) : !isDateAvailable ? (
                          <p className="text-xs text-red-500 font-semibold">{availabilityMessage}</p>
                        ) : (
                          <p className="text-xs text-green-500 font-semibold">{availabilityMessage}</p>
                        )}
                      </div>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Event Time
                    </label>
                    <input
                      type="time"
                      value={bookingData.eventTime}
                      onChange={(e) =>
                        setBookingData({
                          ...bookingData,
                          eventTime: e.target.value,
                        })
                      }
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Special Requests
                  </label>
                  <textarea
                    value={bookingData.specialRequests}
                    onChange={(e) =>
                      setBookingData({
                        ...bookingData,
                        specialRequests: e.target.value,
                      })
                    }
                    rows={3}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Any special requirements or requests..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={
                    (category === "auditorium" ? false : !selectedPackage) || !isDateAvailable || checkingAvailability || isAdmin || user?.role === "provider"
                  }
                  className={`w-full py-4 px-6 bg-gradient-to-r ${isAdmin || user?.role === "provider" ? "from-gray-400 to-gray-500" : categoryInfo.color} text-white rounded-xl font-bold text-lg hover:shadow-xl transition-all duration-300 transform ${!(isAdmin || user?.role === "provider") && "hover:scale-[1.02]"} flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none`}
                >
                  {checkingAvailability ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                      Checking...
                    </>
                  ) : !isDateAvailable ? (
                    "Date Unavailable"
                  ) : isAdmin || user?.role === "provider" ? (
                    "Booking Restricted"
                  ) : (
                    <>
                      <IoCheckmarkCircleOutline className="w-6 h-6" />
                      Confirm Booking - ₹{totalPrice.toLocaleString()}
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventBookingPage;
