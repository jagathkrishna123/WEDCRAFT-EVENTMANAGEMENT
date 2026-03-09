import React from "react";
import { IoClose, IoPersonOutline, IoMailOutline, IoCallOutline, IoCalendarOutline, IoTimeOutline, IoPeopleOutline, IoHourglassOutline, IoPricetagOutline, IoChatbubbleEllipsesOutline } from "react-icons/io5";

const BookingDetailsModal = ({ booking, onClose }) => {
  if (!booking) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center p-4 z-50 transition-opacity duration-300">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl overflow-hidden animate-in fade-in zoom-in duration-300">
        {/* Header */}
        <div className="bg-gradient-to-r from-cyan-600 to-blue-600 p-6 flex justify-between items-center text-white">
          <div>
            <h2 className="text-2xl font-bold">Booking Details</h2>
            <p className="text-cyan-100 text-sm mt-1">ID: #{booking._id.toUpperCase()}</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/20 rounded-full transition-colors text-white"
          >
            <IoClose className="w-6 h-6" />
          </button>
        </div>

        <div className="p-8 max-h-[80vh] overflow-y-auto custom-scrollbar">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Customer Section */}
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2 border-b pb-2">
                <IoPersonOutline className="text-cyan-600" />
                Customer Information
              </h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center text-gray-500">
                    <IoPersonOutline className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 font-medium uppercase tracking-wider">Full Name</p>
                    <p className="text-gray-700 font-semibold">{booking.customerName}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center text-gray-500">
                    <IoMailOutline className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 font-medium uppercase tracking-wider">Email Address</p>
                    <p className="text-gray-700 font-semibold">{booking.email}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center text-gray-500">
                    <IoCallOutline className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 font-medium uppercase tracking-wider">Phone Number</p>
                    <p className="text-gray-700 font-semibold">{booking.phone}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Event Section */}
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2 border-b pb-2">
                <IoCalendarOutline className="text-cyan-600" />
                Event Details
              </h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center text-gray-500">
                    <IoCalendarOutline className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 font-medium uppercase tracking-wider">Event Date</p>
                    <p className="text-gray-700 font-semibold">{new Date(booking.eventDate).toLocaleDateString()}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center text-gray-500">
                    <IoTimeOutline className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 font-medium uppercase tracking-wider">Event Time</p>
                    <p className="text-gray-700 font-semibold">{booking.eventTime}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center text-gray-500">
                    <IoHourglassOutline className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 font-medium uppercase tracking-wider">Duration</p>
                    <p className="text-gray-700 font-semibold">{booking.hours} Hours</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Service Section */}
            <div className="space-y-4 col-span-full">
              <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2 border-b pb-2">
                <IoPricetagOutline className="text-cyan-600" />
                Service & Package
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-gray-50 p-4 rounded-2xl">
                <div>
                  <p className="text-xs text-gray-400 font-medium uppercase tracking-wider mb-1">Service Name</p>
                  <p className="text-gray-800 font-bold">{booking.serviceName}</p>
                  <span className="inline-block mt-1 px-2 py-1 bg-cyan-100 text-cyan-700 rounded text-[10px] font-bold uppercase tracking-widest">{booking.category}</span>
                </div>
                {booking.selectedPackage && (
                  <div>
                    <p className="text-xs text-gray-400 font-medium uppercase tracking-wider mb-1">Package Selected</p>
                    <p className="text-gray-800 font-bold">{booking.selectedPackage.packageName}</p>
                    <p className="text-xs text-gray-500 mt-1">{booking.selectedPackage.description}</p>
                  </div>
                )}
              </div>
            </div>

            {/* Other Details */}
            <div className="space-y-4 col-span-full">
              <div className="flex flex-wrap gap-8">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-600">
                    <IoPeopleOutline className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 font-medium">Guest Count</p>
                    <p className="text-lg font-bold text-gray-800">{booking.guests}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-green-50 flex items-center justify-center text-green-600">
                    <span className="text-xl font-bold">₹</span>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 font-medium">Total Amount</p>
                    <p className="text-lg font-bold text-gray-800">₹{booking.totalPrice?.toLocaleString()}</p>
                  </div>
                </div>
              </div>

              {booking.specialRequests && (
                <div className="mt-4 p-4 border border-dashed border-gray-200 rounded-2xl bg-orange-50/30">
                  <p className="text-xs text-gray-400 font-medium uppercase tracking-wider flex items-center gap-2 mb-2">
                    <IoChatbubbleEllipsesOutline />
                    Special Requests
                  </p>
                  <p className="text-gray-700 italic text-sm">{booking.specialRequests}</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 bg-gray-50 flex justify-end gap-3 border-t">
          <button
            onClick={onClose}
            className="px-8 py-2.5 bg-gray-200 text-gray-700 rounded-xl font-bold hover:bg-gray-300 transition-all active:scale-95 shadow-sm"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookingDetailsModal;
