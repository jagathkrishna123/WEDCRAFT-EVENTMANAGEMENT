import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  IoCardOutline,
  IoCashOutline,
  IoCheckmarkCircleOutline,
  IoChevronBack,
  IoShieldCheckmarkOutline,
  IoTimeOutline,
  IoLocationOutline,
  IoPersonOutline,
  IoCalendarOutline,
  IoCallOutline,
  IoMailOutline,
  IoLockClosedOutline,
  IoWalletOutline,
  IoBusinessOutline,
  IoPhonePortraitOutline,
} from "react-icons/io5";

const Payment = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [cardDetails, setCardDetails] = useState({
    number: "",
    expiry: "",
    cvv: "",
    name: "",
  });
  const [upiId, setUpiId] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  // Get booking details from location state
  const bookingDetails = location.state?.bookingDetails;

  useEffect(() => {
    if (!bookingDetails) {
      navigate("/");
      return;
    }
  }, [bookingDetails, navigate]);

  const handleCardPayment = async (e) => {
    e.preventDefault();
    setIsProcessing(true);

    try {
      const token = localStorage.getItem("token");

      const response = await axios.post(
        "/createBooking", // change if needed
        {
          ...bookingDetails, // your booking data
          paymentMethod: "card",
          cardDetails: cardDetails, // from your state
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      console.log(response.data);

      setIsProcessing(false);
      setPaymentSuccess(true);

      // Redirect after success
      setTimeout(() => {
        navigate("/booking-success", {
          state: { booking: response.data.booking },
        });
      }, 1500);
    } catch (error) {
      console.error("Payment failed:", error.response?.data || error.message);
      setIsProcessing(false);
      alert(error.response?.data?.message || "Payment Failed");
    }
  };

  const handleUPIPayment = async () => {
    try {
      setIsProcessing(true);

      const token = localStorage.getItem("token");

      const response = await axios.post(
        "/createBooking", // change if needed
        {
          ...bookingDetails,
          paymentMethod: "upi",
          upiId: upiId, // from your state
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      setIsProcessing(false);
      setPaymentSuccess(true);

      // Redirect after success
      setTimeout(() => {
        navigate("/booking-success", {
          state: { booking: response.data.booking },
        });
      }, 1500);
    } catch (error) {
      console.error(
        "UPI Payment failed:",
        error.response?.data || error.message,
      );
      setIsProcessing(false);
      alert(error.response?.data?.message || "UPI Payment Failed");
    }
  };

  const paymentMethods = [
    { id: "card", name: "Credit/Debit Card", icon: IoCardOutline },
    { id: "upi", name: "UPI", icon: IoWalletOutline },
    { id: "netbanking", name: "Net Banking", icon: IoBusinessOutline },
    { id: "wallet", name: "Digital Wallet", icon: IoPhonePortraitOutline },
    { id: "cod", name: "Cash on Booking", icon: IoCashOutline },
  ];

  if (!bookingDetails) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading payment details...</p>
        </div>
      </div>
    );
  }

  if (paymentSuccess) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full text-center">
          <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <IoCheckmarkCircleOutline className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Payment Successful!
          </h2>
          <p className="text-gray-600 mb-6">
            Your booking has been confirmed. Redirecting to confirmation page...
          </p>
          <div className="animate-pulse bg-gray-200 h-2 rounded-full">
            <div className="bg-green-500 h-2 rounded-full animate-pulse"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 pt-20">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors"
          >
            <IoChevronBack className="w-5 h-5" />
            Back to Booking
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Payment Methods */}
          <div className="lg:col-span-2 space-y-6">
            {/* Payment Methods */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">
                Choose Payment Method
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                {paymentMethods.map((method) => {
                  const IconComponent = method.icon;
                  return (
                    <button
                      key={method.id}
                      onClick={() => setPaymentMethod(method.id)}
                      className={`p-4 border-2 rounded-xl transition-all duration-200 flex items-center gap-3 ${
                        paymentMethod === method.id
                          ? "border-blue-500 bg-blue-50 text-blue-700"
                          : "border-gray-200 hover:border-gray-300 text-gray-700"
                      }`}
                    >
                      <IconComponent className="w-6 h-6" />
                      <span className="font-medium">{method.name}</span>
                    </button>
                  );
                })}
              </div>

              {/* Payment Forms */}
              {paymentMethod === "card" && (
                <form onSubmit={handleCardPayment} className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Card Number
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="1234 5678 9012 3456"
                      value={cardDetails.number}
                      onChange={(e) =>
                        setCardDetails({
                          ...cardDetails,
                          number: e.target.value,
                        })
                      }
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      maxLength="19"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Expiry Date
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="MM/YY"
                        value={cardDetails.expiry}
                        onChange={(e) =>
                          setCardDetails({
                            ...cardDetails,
                            expiry: e.target.value,
                          })
                        }
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        maxLength="5"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        CVV
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="123"
                        value={cardDetails.cvv}
                        onChange={(e) =>
                          setCardDetails({
                            ...cardDetails,
                            cvv: e.target.value,
                          })
                        }
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        maxLength="4"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Cardholder Name
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="John Doe"
                      value={cardDetails.name}
                      onChange={(e) =>
                        setCardDetails({ ...cardDetails, name: e.target.value })
                      }
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isProcessing}
                    className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white py-4 px-6 rounded-xl font-bold text-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isProcessing ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                        Processing Payment...
                      </>
                    ) : (
                      <>
                        <IoLockClosedOutline className="w-5 h-5" />
                        Pay ₹{bookingDetails.totalPrice.toLocaleString()}
                      </>
                    )}
                  </button>
                </form>
              )}

              {paymentMethod === "upi" && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      UPI ID
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="yourname@upi"
                      value={upiId}
                      onChange={(e) => setUpiId(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-600 mb-2">
                      Popular UPI Apps:
                    </p>
                    <div className="flex gap-2">
                      <button className="px-3 py-2 bg-white border border-gray-300 rounded-lg text-sm hover:bg-gray-50 transition-colors">
                        GPay
                      </button>
                      <button className="px-3 py-2 bg-white border border-gray-300 rounded-lg text-sm hover:bg-gray-50 transition-colors">
                        PhonePe
                      </button>
                      <button className="px-3 py-2 bg-white border border-gray-300 rounded-lg text-sm hover:bg-gray-50 transition-colors">
                        Paytm
                      </button>
                      <button className="px-3 py-2 bg-white border border-gray-300 rounded-lg text-sm hover:bg-gray-50 transition-colors">
                        BHIM
                      </button>
                    </div>
                  </div>

                  <button
                    onClick={handleUPIPayment}
                    disabled={isProcessing || !upiId}
                    className="w-full bg-gradient-to-r from-purple-500 to-purple-600 text-white py-4 px-6 rounded-xl font-bold text-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isProcessing ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                        Processing Payment...
                      </>
                    ) : (
                      <>
                        <IoWalletOutline className="w-5 h-5" />
                        Pay ₹{bookingDetails.totalPrice.toLocaleString()}
                      </>
                    )}
                  </button>
                </div>
              )}

              {paymentMethod === "netbanking" && (
                <div className="space-y-4">
                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <IoTimeOutline className="w-5 h-5 text-yellow-600" />
                      <span className="font-semibold text-yellow-800">
                        Net Banking
                      </span>
                    </div>
                    <p className="text-sm text-yellow-700">
                      You will be redirected to your bank's website to complete
                      the payment securely.
                    </p>
                  </div>

                  <button
                    onClick={() => setIsProcessing(true)}
                    disabled={isProcessing}
                    className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white py-4 px-6 rounded-xl font-bold text-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isProcessing ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                        Redirecting to Bank...
                      </>
                    ) : (
                      <>
                        <IoBusinessOutline className="w-5 h-5" />
                        Continue with Net Banking
                      </>
                    )}
                  </button>
                </div>
              )}

              {paymentMethod === "wallet" && (
                <div className="space-y-4">
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <IoPhonePortraitOutline className="w-5 h-5 text-blue-600" />
                      <span className="font-semibold text-blue-800">
                        Digital Wallets
                      </span>
                    </div>
                    <p className="text-sm text-blue-700">
                      Choose from popular digital wallet options to pay
                      securely.
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    {["Paytm", "Mobikwik", "Airtel Money", "JioMoney"].map(
                      (wallet) => (
                        <button
                          key={wallet}
                          onClick={() => setIsProcessing(true)}
                          disabled={isProcessing}
                          className="p-3 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium"
                        >
                          {wallet}
                        </button>
                      ),
                    )}
                  </div>
                </div>
              )}

              {paymentMethod === "cod" && (
                <div className="space-y-4">
                  <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <IoCashOutline className="w-5 h-5 text-orange-600" />
                      <span className="font-semibold text-orange-800">
                        Cash on Booking
                      </span>
                    </div>
                    <p className="text-sm text-orange-700">
                      Pay in cash when the service provider arrives. Additional
                      ₹500 convenience fee applies.
                    </p>
                  </div>

                  <button
                    onClick={() => {
                      setIsProcessing(true);
                      setTimeout(() => {
                        setIsProcessing(false);
                        setPaymentSuccess(true);
                        setTimeout(() => {
                          navigate("/booking-success", {
                            state: { bookingDetails },
                          });
                        }, 2000);
                      }, 2000);
                    }}
                    disabled={isProcessing}
                    className="w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white py-4 px-6 rounded-xl font-bold text-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isProcessing ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                        Processing...
                      </>
                    ) : (
                      <>
                        <IoCashOutline className="w-5 h-5" />
                        Confirm Cash Payment - ₹
                        {(bookingDetails.totalPrice + 500).toLocaleString()}
                      </>
                    )}
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Right Column - Order Summary */}
          <div className="space-y-6">
            {/* Order Summary */}
            <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">
                Order Summary
              </h2>

              <div className="space-y-4">
                {/* Service Details */}
                <div className="pb-4 border-b border-gray-200">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                      <IoCardOutline className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-800">
                        {bookingDetails.serviceName}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {bookingDetails.category}
                      </p>
                    </div>
                  </div>

                  {bookingDetails.selectedPackage && (
                    <div className="ml-15">
                      <p className="text-sm text-gray-600">
                        Package:{" "}
                        <span className="font-semibold">
                          {bookingDetails.selectedPackage.packageName ||
                            bookingDetails.selectedPackage.name ||
                            bookingDetails.selectedPackage.title}
                        </span>
                      </p>
                    </div>
                  )}

                  {bookingDetails.auditoriumPricing && (
                    <div className="ml-15">
                      <p className="text-sm text-gray-600">
                        Pricing:{" "}
                        <span className="font-semibold capitalize">
                          {bookingDetails.auditoriumPricing}
                        </span>
                      </p>
                    </div>
                  )}
                </div>

                {/* Customer Details */}
                <div className="pb-4 border-b border-gray-200">
                  <h4 className="font-semibold text-gray-800 mb-3">
                    Customer Details
                  </h4>
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

                {/* Event Details */}
                <div className="pb-4 border-b border-gray-200">
                  <h4 className="font-semibold text-gray-800 mb-3">
                    Event Details
                  </h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <IoCalendarOutline className="w-4 h-4 text-gray-500" />
                      <span>{bookingDetails.bookingData.eventDate}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <IoTimeOutline className="w-4 h-4 text-gray-500" />
                      <span>
                        {bookingDetails.bookingData.eventTime || "TBD"}
                      </span>
                    </div>
                    {bookingDetails.bookingData.guests > 0 &&
                      bookingDetails.category !== "auditorium" && (
                        <div className="flex items-center gap-2">
                          <IoPersonOutline className="w-4 h-4 text-gray-500" />
                          <span>
                            {bookingDetails.bookingData.guests} guests
                          </span>
                        </div>
                      )}

                    {bookingDetails.category === "auditorium" &&
                      bookingDetails.auditoriumPricing === "hourly" && (
                        <div className="flex items-center gap-2">
                          <IoTimeOutline className="w-4 h-4 text-gray-500" />
                          <span>{bookingDetails.bookingData.hours} hours</span>
                        </div>
                      )}
                  </div>
                </div>

                {/* Pricing */}
                <div className="space-y-2">
                  <div className="flex justify-between text-lg">
                    <span className="font-semibold">Total Amount:</span>
                    <span className="font-bold text-green-600">
                      ₹{bookingDetails.totalPrice.toLocaleString()}
                    </span>
                  </div>
                  {paymentMethod === "cod" && (
                    <div className="flex justify-between text-sm text-orange-600">
                      <span>Convenience Fee:</span>
                      <span>+₹500</span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Security Info */}
            <div className="bg-green-50 border border-green-200 rounded-2xl p-4">
              <div className="flex items-center gap-2 mb-2">
                <IoShieldCheckmarkOutline className="w-5 h-5 text-green-600" />
                <span className="font-semibold text-green-800">
                  Secure Payment
                </span>
              </div>
              <p className="text-sm text-green-700">
                Your payment information is encrypted and secure. We use
                industry-standard security measures to protect your data.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
