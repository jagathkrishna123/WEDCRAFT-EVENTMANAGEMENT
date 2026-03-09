import React, { useRef, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  IoCheckmarkCircleOutline,
  IoDownloadOutline,
  IoHomeOutline,
  IoCalendarOutline,
  IoTimeOutline,
  IoPersonOutline,
  IoCallOutline,
  IoMailOutline,
  IoLocationOutline,
  IoCardOutline,
  IoPrintOutline
} from 'react-icons/io5';

const BookingSuccess = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const invoiceRef = useRef();

  const bookingDetails = location.state?.bookingDetails;

  // Save booking to localStorage when component mounts
  useEffect(() => {
    if (bookingDetails) {
      const bookingId = `WC${Date.now().toString().slice(-8).toUpperCase()}`;
      const bookingToSave = {
        ...bookingDetails,
        bookingId,
        bookingDate: new Date().toISOString(),
        status: 'confirmed'
      };

      // Get existing bookings from localStorage
      const existingBookings = localStorage.getItem('userBookings');
      const bookings = existingBookings ? JSON.parse(existingBookings) : [];
      
      // Add new booking
      bookings.push(bookingToSave);
      
      // Save back to localStorage
      localStorage.setItem('userBookings', JSON.stringify(bookings));
    }
  }, [bookingDetails]);

  const handleDownloadInvoice = () => {
    // Create a printable invoice
    const invoiceContent = generateInvoiceHTML();

    // Create a new window for printing
    const printWindow = window.open('', '_blank');
    printWindow.document.write(invoiceContent);
    printWindow.document.close();
    printWindow.print();
  };

  const generateInvoiceHTML = () => {
    const currentDate = new Date().toLocaleDateString();
    const currentTime = new Date().toLocaleTimeString();

    return `
      <!DOCTYPE html>
      <html>
        <head>
          <title>Booking Invoice - ${bookingDetails.serviceName}</title>
          <style>
            body {
              font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
              margin: 0;
              padding: 20px;
              background: #f8fafc;
            }
            .invoice-container {
              max-width: 800px;
              margin: 0 auto;
              background: white;
              padding: 40px;
              border-radius: 12px;
              box-shadow: 0 10px 25px rgba(0,0,0,0.1);
            }
            .header {
              text-align: center;
              border-bottom: 3px solid #3b82f6;
              padding-bottom: 30px;
              margin-bottom: 30px;
            }
            .logo {
              font-size: 32px;
              font-weight: bold;
              background: linear-gradient(135deg, #3b82f6, #06b6d4);
              -webkit-background-clip: text;
              -webkit-text-fill-color: transparent;
              margin-bottom: 10px;
            }
            .success-icon {
              width: 80px;
              height: 80px;
              background: #10b981;
              border-radius: 50%;
              display: flex;
              align-items: center;
              justify-content: center;
              margin: 0 auto 20px;
              color: white;
            }
            .invoice-title {
              font-size: 24px;
              color: #1f2937;
              margin-bottom: 20px;
            }
            .invoice-details {
              display: grid;
              grid-template-columns: 1fr 1fr;
              gap: 30px;
              margin-bottom: 30px;
            }
            .detail-section {
              background: #f8fafc;
              padding: 20px;
              border-radius: 8px;
              border: 1px solid #e5e7eb;
            }
            .detail-title {
              font-weight: bold;
              color: #374151;
              margin-bottom: 15px;
              font-size: 16px;
            }
            .detail-item {
              display: flex;
              justify-content: space-between;
              margin-bottom: 8px;
              font-size: 14px;
            }
            .total-section {
              background: linear-gradient(135deg, #10b981, #059669);
              color: white;
              padding: 25px;
              border-radius: 8px;
              text-align: center;
              margin-top: 30px;
            }
            .total-amount {
              font-size: 36px;
              font-weight: bold;
              margin: 10px 0;
            }
            .footer {
              text-align: center;
              margin-top: 40px;
              padding-top: 20px;
              border-top: 1px solid #e5e7eb;
              color: #6b7280;
              font-size: 12px;
            }
            .booking-id {
              background: #eff6ff;
              padding: 10px;
              border-radius: 6px;
              font-family: monospace;
              font-weight: bold;
              color: #1e40af;
              margin-top: 15px;
            }
          </style>
        </head>
        <body>
          <div class="invoice-container">
            <div class="header">
              <div class="success-icon">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                </svg>
              </div>
              <div class="logo">WedCraft</div>
              <h1 class="invoice-title">Booking Confirmed!</h1>
              <p>Thank you for choosing our services. Your booking has been successfully confirmed.</p>
            </div>

            <div class="invoice-details">
              <div class="detail-section">
                <div class="detail-title">Service Details</div>
                <div class="detail-item">
                  <span>Service:</span>
                  <span>${bookingDetails.serviceName}</span>
                </div>
                <div class="detail-item">
                  <span>Category:</span>
                  <span>${bookingDetails.category}</span>
                </div>
                ${bookingDetails.selectedPackage ? `
                  <div class="detail-item">
                    <span>Package:</span>
                    <span>${bookingDetails.selectedPackage.packageName || bookingDetails.selectedPackage.name || bookingDetails.selectedPackage.title}</span>
                  </div>
                ` : ''}
                ${bookingDetails.auditoriumPricing ? `
                  <div class="detail-item">
                    <span>Pricing:</span>
                    <span>${bookingDetails.auditoriumPricing}</span>
                  </div>
                ` : ''}
              </div>

              <div class="detail-section">
                <div class="detail-title">Booking Details</div>
                <div class="detail-item">
                  <span>Date:</span>
                  <span>${bookingDetails.bookingData.eventDate}</span>
                </div>
                <div class="detail-item">
                  <span>Time:</span>
                  <span>${bookingDetails.bookingData.eventTime || 'TBD'}</span>
                </div>
                ${bookingDetails.bookingData.guests > 0 && bookingDetails.category !== 'auditorium' ? `
                  <div class="detail-item">
                    <span>Guests:</span>
                    <span>${bookingDetails.bookingData.guests}</span>
                  </div>
                ` : ''}
                ${bookingDetails.category === 'auditorium' && bookingDetails.auditoriumPricing === 'hourly' ? `
                  <div class="detail-item">
                    <span>Duration:</span>
                    <span>${bookingDetails.bookingData.hours} hours</span>
                  </div>
                ` : ''}
              </div>

              <div class="detail-section">
                <div class="detail-title">Customer Information</div>
                <div class="detail-item">
                  <span>Name:</span>
                  <span>${bookingDetails.bookingData.name}</span>
                </div>
                <div class="detail-item">
                  <span>Email:</span>
                  <span>${bookingDetails.bookingData.email}</span>
                </div>
                <div class="detail-item">
                  <span>Phone:</span>
                  <span>${bookingDetails.bookingData.phone}</span>
                </div>
              </div>

              <div class="detail-section">
                <div class="detail-title">Payment Details</div>
                <div class="detail-item">
                  <span>Booking Date:</span>
                  <span>${currentDate}</span>
                </div>
                <div class="detail-item">
                  <span>Booking Time:</span>
                  <span>${currentTime}</span>
                </div>
                <div class="detail-item">
                  <span>Status:</span>
                  <span style="color: #10b981; font-weight: bold;">Confirmed</span>
                </div>
              </div>
            </div>

            <div class="total-section">
              <div>Total Amount Paid</div>
              <div class="total-amount">₹${bookingDetails.totalPrice.toLocaleString()}</div>
              <div>Payment Successful</div>
            </div>

            <div class="booking-id">
              Booking ID: WC${Date.now().toString().slice(-8).toUpperCase()}
            </div>

            <div class="footer">
              <p>This is a computer-generated invoice and does not require a signature.</p>
              <p>For any queries, please contact us at support@wedcraft.com</p>
              <p>Generated on ${currentDate} at ${currentTime}</p>
            </div>
          </div>
        </body>
      </html>
    `;
  };

  if (!bookingDetails) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading booking confirmation...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100">
      <div className="max-w-4xl mx-auto px-4 py-12 pt-20">
        {/* Success Message */}
        <div className="text-center mb-12">
          <div className="md:w-24 md:h-24 w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
            <IoCheckmarkCircleOutline className="md:w-12 md:h-12 w-8 h-8 text-white" />
          </div>
          <h1 className="md:text-4xl text-2xl font-bold text-gray-800 mb-4">Booking Successful!</h1>
          <p className="md:text-xl text-lg text-gray-600 mb-2">Your booking has been confirmed</p>
          <p className="text-gray-500">A confirmation email has been sent to {bookingDetails.bookingData.email}</p>
        </div>

        {/* Booking Summary Card */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Booking Summary</h2>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Service Details */}
            <div className="space-y-4">
              <div className="flex items-center gap-3 p-4 bg-blue-50 rounded-lg">
                <IoCardOutline className="w-8 h-8 text-blue-600" />
                <div>
                  <h3 className="font-bold text-lg text-gray-800">{bookingDetails.serviceName}</h3>
                  <p className="text-gray-600 capitalize">{bookingDetails.category.replace('-', ' ')}</p>
                </div>
              </div>

              {bookingDetails.selectedPackage && (
                <div className="ml-11">
                  <p className="text-sm text-gray-600">
                    <span className="font-semibold">Package:</span> {bookingDetails.selectedPackage.packageName || bookingDetails.selectedPackage.name || bookingDetails.selectedPackage.title}
                  </p>
                </div>
              )}

              {bookingDetails.auditoriumPricing && (
                <div className="ml-11">
                  <p className="text-sm text-gray-600">
                    <span className="font-semibold">Pricing:</span> {bookingDetails.auditoriumPricing}
                  </p>
                </div>
              )}
            </div>

            {/* Customer & Event Details */}
            <div className="space-y-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold text-gray-800 mb-3">Customer Details</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <IoPersonOutline className="w-4 h-4 text-gray-500" />
                    <span>{bookingDetails.bookingData.name}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <IoMailOutline className="w-4 h-4 text-gray-500" />
                    <span>{bookingDetails.bookingData.email}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <IoCallOutline className="w-4 h-4 text-gray-500" />
                    <span>{bookingDetails.bookingData.phone}</span>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold text-gray-800 mb-3">Event Details</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <IoCalendarOutline className="w-4 h-4 text-gray-500" />
                    <span>{bookingDetails.bookingData.eventDate}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <IoTimeOutline className="w-4 h-4 text-gray-500" />
                    <span>{bookingDetails.bookingData.eventTime || 'TBD'}</span>
                  </div>
                  {bookingDetails.bookingData.guests > 0 && bookingDetails.category !== 'auditorium' && (
                    <div className="flex items-center gap-2">
                      <IoPersonOutline className="w-4 h-4 text-gray-500" />
                      <span>{bookingDetails.bookingData.guests} guests</span>
                    </div>
                  )}
                  {bookingDetails.category === 'auditorium' && bookingDetails.auditoriumPricing === 'hourly' && (
                    <div className="flex items-center gap-2">
                      <IoTimeOutline className="w-4 h-4 text-gray-500" />
                      <span>{bookingDetails.bookingData.hours} hours</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Total Amount */}
          <div className="mt-8 p-6 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl text-center">
            <p className="text-green-100 mb-2">Total Amount Paid</p>
            <p className="text-4xl font-bold">₹{bookingDetails.totalPrice.toLocaleString()}</p>
            <p className="text-green-100 text-sm mt-2">Payment completed successfully</p>
          </div>

          {/* Booking ID */}
          <div className="mt-6 text-center">
            <div className="inline-block bg-gray-100 px-4 py-2 rounded-lg">
              <p className="text-sm text-gray-600">Booking ID</p>
              <p className="font-mono font-bold text-gray-800">WC{Date.now().toString().slice(-8).toUpperCase()}</p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={handleDownloadInvoice}
            className="flex items-center justify-center gap-2 bg-blue-500 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-blue-600 transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            <IoDownloadOutline className="w-6 h-6" />
            Download Invoice
          </button>

          <button
            onClick={() => window.print()}
            className="flex items-center justify-center gap-2 bg-gray-500 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-gray-600 transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            <IoPrintOutline className="w-6 h-6" />
            Print Invoice
          </button>

          <button
            onClick={() => navigate('/')}
            className="flex items-center justify-center gap-2 bg-green-500 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-green-600 transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            <IoHomeOutline className="w-6 h-6" />
            Back to Home
          </button>
        </div>

        {/* Additional Information */}
        <div className="mt-12 bg-white rounded-2xl shadow-lg p-6">
          <h3 className="text-xl font-bold text-gray-800 mb-4">What's Next?</h3>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <IoMailOutline className="w-6 h-6 text-blue-600" />
              </div>
              <h4 className="font-semibold text-gray-800 mb-2">Confirmation Email</h4>
              <p className="text-sm text-gray-600">Check your email for booking confirmation and details</p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <IoCallOutline className="w-6 h-6 text-green-600" />
              </div>
              <h4 className="font-semibold text-gray-800 mb-2">Contact Service Provider</h4>
              <p className="text-sm text-gray-600">Service provider will contact you within 24 hours</p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <IoCalendarOutline className="w-6 h-6 text-purple-600" />
              </div>
              <h4 className="font-semibold text-gray-800 mb-2">Event Day</h4>
              <p className="text-sm text-gray-600">Enjoy your event! We're here if you need any assistance</p>
            </div>
          </div>
        </div>

        {/* Hidden invoice for printing */}
        <div ref={invoiceRef} className="hidden">
          {/* This will be populated by the download function */}
        </div>
      </div>
    </div>
  );
};

export default BookingSuccess;