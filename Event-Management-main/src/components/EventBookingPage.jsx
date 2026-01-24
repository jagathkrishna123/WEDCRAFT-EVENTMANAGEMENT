import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { auditoriumServices, cateringServices, decorationServices, photographyServices } from '../constants/data';
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
  IoTime
} from 'react-icons/io5';

const EventBookingPage = () => {
  const { category, serviceId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [service, setService] = useState(null);
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [auditoriumPricing, setAuditoriumPricing] = useState('daily'); // 'daily' or 'hourly'
  const [bookingData, setBookingData] = useState({
    name: '',
    email: '',
    phone: '',
    eventDate: '',
    eventTime: '',
    guests: 50,
    hours: 4,
    specialRequests: ''
  });
  const [totalPrice, setTotalPrice] = useState(0);

  // Combine all services
  const allServices = [
    ...auditoriumServices,
    ...cateringServices,
    ...decorationServices,
    ...photographyServices,
  ];

  useEffect(() => {
    // Find the service by ID
    const foundService = allServices.find(s => s.id === serviceId);
    if (foundService) {
      setService(foundService);
      // Set default package for services that have packages
      if (foundService.packages && foundService.packages.length > 0) {
        setSelectedPackage(foundService.packages[0]);
      }
    }

    // Set auditorium pricing type from location state
    if (location.state?.pricingType) {
      setAuditoriumPricing(location.state.pricingType);
    }
  }, [serviceId, location.state]);

  // Calculate total price based on selected package and inputs
  useEffect(() => {
    let price = 0;

    if (category === 'catering' && selectedPackage) {
      // Per person pricing
      price = selectedPackage.pricePerPerson * bookingData.guests;
    } else if (category === 'photography' && selectedPackage) {
      // Per hour pricing
      price = selectedPackage.pricePerHour * bookingData.hours;
    } else if (category === 'stage-decoration' && selectedPackage) {
      // Per day pricing (fixed)
      price = selectedPackage.pricePerDay;
    } else if (category === 'auditorium' && service) {
      // For auditorium, use selected pricing type
      if (auditoriumPricing === 'daily') {
        price = service.pricePerDay;
      } else if (auditoriumPricing === 'hourly') {
        price = service.pricePerHour * bookingData.hours;
      }
    }

    setTotalPrice(price);
  }, [selectedPackage, bookingData.guests, bookingData.hours, category, service, auditoriumPricing]);

  const handlePackageSelect = (pkg) => {
    setSelectedPackage(pkg);
  };

  const handleBookingSubmit = (e) => {
    e.preventDefault();
    // Prepare booking details to pass to payment page
    const bookingDetails = {
      serviceId,
      serviceName: service.auditoriumName || service.companyName || service.studioName,
      selectedPackage,
      bookingData,
      totalPrice,
      category,
      auditoriumPricing: category === 'auditorium' ? auditoriumPricing : null
    };

    console.log('Proceeding to payment:', bookingDetails);
    // Navigate to payment page with booking details
    navigate('/payment', { state: { bookingDetails } });
  };

  const getCategoryInfo = (category) => {
    switch(category) {
      case 'auditorium':
        return { name: 'Auditorium', icon: IoPeopleOutline, color: 'from-blue-500 to-blue-600', bgColor: 'bg-blue-50' };
      case 'catering':
        return { name: 'Catering', icon: IoRestaurantOutline, color: 'from-green-500 to-green-600', bgColor: 'bg-green-50' };
      case 'photography':
        return { name: 'Photography', icon: IoCameraOutline, color: 'from-purple-500 to-purple-600', bgColor: 'bg-purple-50' };
      case 'stage-decoration':
        return { name: 'Stage Decoration', icon: IoFlowerOutline, color: 'from-pink-500 to-pink-600', bgColor: 'bg-pink-50' };
      default:
        return { name: category.replace('-', ' '), icon: IoStarOutline, color: 'from-gray-500 to-gray-600', bgColor: 'bg-gray-50' };
    }
  };

  const categoryInfo = getCategoryInfo(category);
  const CategoryIcon = categoryInfo.icon;

  const adjustGuests = (increment) => {
    const newGuests = Math.max(1, bookingData.guests + (increment ? 1 : -1));
    setBookingData({...bookingData, guests: newGuests});
  };

  const adjustHours = (increment) => {
    const newHours = Math.max(1, bookingData.hours + (increment ? 1 : -1));
    setBookingData({...bookingData, hours: newHours});
  };

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
            Back to Service   hhh Detailsx
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
                <div className={`p-3 bg-gradient-to-r ${categoryInfo.color} text-white rounded-xl`}>
                  <CategoryIcon className="w-8 h-8" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-gray-800">
                    Book {service.auditoriumName || service.companyName || service.studioName}
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
            {category === 'auditorium' && (
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h2 className="text-xl font-bold text-gray-800 mb-4">Select Pricing Type</h2>

                <div className="grid grid-cols-2 gap-4 mb-4">
                  <button
                    onClick={() => setAuditoriumPricing('daily')}
                    className={`p-4 border-2 rounded-xl transition-all duration-200 ${
                      auditoriumPricing === 'daily'
                        ? 'border-green-500 bg-green-50 text-green-700'
                        : 'border-gray-200 hover:border-gray-300 text-gray-700'
                    }`}
                  >
                    <div className="text-center">
                      <h3 className="font-bold text-lg">Daily</h3>
                      <p className="text-sm opacity-75">Full day booking</p>
                      <p className="text-2xl font-bold mt-2">₹{service.pricePerDay?.toLocaleString()}</p>
                    </div>
                  </button>

                  <button
                    onClick={() => setAuditoriumPricing('hourly')}
                    className={`p-4 border-2 rounded-xl transition-all duration-200 ${
                      auditoriumPricing === 'hourly'
                        ? 'border-blue-500 bg-blue-50 text-blue-700'
                        : 'border-gray-200 hover:border-gray-300 text-gray-700'
                    }`}
                  >
                    <div className="text-center">
                      <h3 className="font-bold text-lg">Hourly</h3>
                      <p className="text-sm opacity-75">Flexible hours</p>
                      <p className="text-2xl font-bold mt-2">₹{service.pricePerHour}</p>
                      <p className="text-xs opacity-75">per hour</p>
                    </div>
                  </button>
                </div>

                {auditoriumPricing === 'hourly' && (
                  <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Number of Hours</label>
                    <input
                      type="number"
                      min="1"
                      max="24"
                      value={bookingData.hours}
                      onChange={(e) => setBookingData({...bookingData, hours: parseInt(e.target.value) || 1})}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <p className="text-xs text-gray-600 mt-1">
                      Minimum 1 hour. Overtime charges: ₹{service.overtimePrice}/hour
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* Package Selection */}
            {(category === 'catering' || category === 'photography' || category === 'stage-decoration') && service.packages && (
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h2 className="text-xl font-bold text-gray-800 mb-4">Select Package</h2>
                <div className="space-y-3">
                  {service.packages.map((pkg) => (
                    <div
                      key={pkg.id}
                      onClick={() => handlePackageSelect(pkg)}
                      className={`border-2 rounded-xl p-4 cursor-pointer transition-all duration-200 ${
                        selectedPackage?.id === pkg.id
                          ? `border-blue-500 bg-blue-50`
                          : 'border-gray-200 hover:border-gray-300'
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
                            {category === 'catering' && (
                              <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                                pkg.foodType === 'veg' ? 'bg-green-100 text-green-700' :
                                pkg.foodType === 'non-veg' ? 'bg-red-100 text-red-700' :
                                'bg-blue-100 text-blue-700'
                              }`}>
                                {pkg.foodType === 'both' ? 'Veg & Non-Veg' : pkg.foodType?.toUpperCase()}
                              </span>
                            )}
                            {category === 'stage-decoration' && (
                              <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                                pkg.category === 'Luxury' ? 'bg-yellow-100 text-yellow-700' :
                                pkg.category === 'Premium' ? 'bg-blue-100 text-blue-700' :
                                'bg-gray-100 text-gray-700'
                              }`}>
                                {pkg.category}
                              </span>
                            )}
                          </div>
                        </div>

                        <div className="text-right ml-4">
                          {category === 'catering' && (
                            <div>
                              <p className="text-2xl font-bold text-green-600">₹{pkg.pricePerPerson}</p>
                              <p className="text-sm text-gray-500">per person</p>
                            </div>
                          )}
                          {category === 'photography' && (
                            <div>
                              <p className="text-2xl font-bold text-purple-600">₹{pkg.pricePerHour}</p>
                              <p className="text-sm text-gray-500">per hour</p>
                            </div>
                          )}
                          {category === 'stage-decoration' && (
                            <div>
                              <p className="text-2xl font-bold text-pink-600">₹{pkg.pricePerDay?.toLocaleString()}</p>
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
            {(category === 'catering' || category === 'photography') && selectedPackage && (
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h2 className="text-xl font-bold text-gray-800 mb-4">
                  {category === 'catering' ? 'Number of Guests' : 'Duration'}
                </h2>

                {category === 'catering' && (
                  <div className="flex items-center justify-center gap-4">
                    <button
                      onClick={() => adjustGuests(false)}
                      className="p-3 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors"
                    >
                      <IoRemove className="w-6 h-6" />
                    </button>
                    <div className="text-center">
                      <div className="flex items-center gap-2 mb-2">
                        <IoPeopleOutline className="w-5 h-5 text-blue-500" />
                        <span className="text-2xl font-bold">{bookingData.guests}</span>
                      </div>
                      <p className="text-gray-600">guests</p>
                    </div>
                    <button
                      onClick={() => adjustGuests(true)}
                      className="p-3 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors"
                    >
                      <IoAdd className="w-6 h-6" />
                    </button>
                  </div>
                )}

                {category === 'photography' && (
                  <div className="flex items-center justify-center gap-4">
                    <button
                      onClick={() => adjustHours(false)}
                      className="p-3 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors"
                    >
                      <IoRemove className="w-6 h-6" />
                    </button>
                    <div className="text-center">
                      <div className="flex items-center gap-2 mb-2">
                        <IoTime className="w-5 h-5 text-purple-500" />
                        <span className="text-2xl font-bold">{bookingData.hours}</span>
                      </div>
                      <p className="text-gray-600">hours</p>
                    </div>
                    <button
                      onClick={() => adjustHours(true)}
                      className="p-3 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors"
                    >
                      <IoAdd className="w-6 h-6" />
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Right Column - Booking Form & Summary */}
          <div className="space-y-6">
            {/* Price Summary */}
            <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Booking Summary</h2>

              <div className="space-y-3 mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-600">Service:</span>
                  <span className="font-semibold">{service.auditoriumName || service.companyName || service.studioName}</span>
                </div>

                {selectedPackage && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Package:</span>
                    <span className="font-semibold">{selectedPackage.packageName || selectedPackage.name || selectedPackage.title}</span>
                  </div>
                )}

                {category === 'catering' && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Guests:</span>
                    <span className="font-semibold">{bookingData.guests}</span>
                  </div>
                )}

                {category === 'photography' && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Duration:</span>
                    <span className="font-semibold">{bookingData.hours} hours</span>
                  </div>
                )}

                {category === 'auditorium' && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Pricing Type:</span>
                    <span className="font-semibold capitalize">{auditoriumPricing}</span>
                  </div>
                )}

                {category === 'auditorium' && auditoriumPricing === 'hourly' && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Duration:</span>
                    <span className="font-semibold">{bookingData.hours} hours</span>
                  </div>
                )}

                <hr className="my-3" />

                <div className="flex justify-between text-xl font-bold">
                  <span>Total Amount:</span>
                  <span className="text-green-600">₹{totalPrice.toLocaleString()}</span>
                </div>
              </div>
            </div>

            {/* Booking Form */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-6">Your Details</h2>

              <form onSubmit={handleBookingSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name</label>
                  <input
                    type="text"
                    required
                    value={bookingData.name}
                    onChange={(e) => setBookingData({...bookingData, name: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter your full name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Email</label>
                  <input
                    type="email"
                    required
                    value={bookingData.email}
                    onChange={(e) => setBookingData({...bookingData, email: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter your email"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Phone Number</label>
                  <input
                    type="tel"
                    required
                    value={bookingData.phone}
                    onChange={(e) => setBookingData({...bookingData, phone: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter your phone number"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Event Date</label>
                    <input
                      type="date"
                      required
                      value={bookingData.eventDate}
                      onChange={(e) => setBookingData({...bookingData, eventDate: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Event Time</label>
                    <input
                      type="time"
                      value={bookingData.eventTime}
                      onChange={(e) => setBookingData({...bookingData, eventTime: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Special Requests</label>
                  <textarea
                    value={bookingData.specialRequests}
                    onChange={(e) => setBookingData({...bookingData, specialRequests: e.target.value})}
                    rows={3}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Any special requirements or requests..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={category === 'auditorium' ? false : !selectedPackage}
                  className={`w-full py-4 px-6 bg-gradient-to-r ${categoryInfo.color} text-white rounded-xl font-bold text-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none`}
                >
                  <IoCheckmarkCircleOutline className="w-6 h-6" />
                  Confirm Booking - ₹{totalPrice.toLocaleString()}
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