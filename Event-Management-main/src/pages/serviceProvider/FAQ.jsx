import React, { useState } from "react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { HiQuestionMarkCircle, HiOutlineSupport } from "react-icons/hi";
import { BiSearchAlt } from "react-icons/bi";
import { FiHelpCircle } from "react-icons/fi";

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: "How do I add a new service to my profile?",
      answer: "To add a new service, navigate to 'Add Service' in the sidebar, then select the type of service you want to add (Auditorium, Catering, Stage Decoration, or Photography). Fill in all the required details including service name, description, pricing, images, and availability. Once submitted, your service will be reviewed and then made available to customers."
    },
    {
      question: "How can I manage my bookings?",
      answer: "You can view and manage all your bookings from the 'Booking Details' section in the sidebar. Here you'll see all incoming booking requests, their status (pending, confirmed, completed), customer details, event dates, and payment information. You can accept, reject, or update booking statuses as needed."
    },
    {
      question: "How do I update my service information?",
      answer: "Go to 'My Services' in the sidebar to see all your listed services. Click on the service you want to edit, and you'll be able to update details like pricing, description, images, availability, and other service-specific information. Make sure to save your changes after editing."
    },
    {
      question: "What should I do if a customer cancels a booking?",
      answer: "If a customer cancels a booking, you'll be notified in the 'Booking Details' section. The booking status will automatically update to 'Cancelled'. Depending on your cancellation policy, you may need to process refunds. Make sure to review your service terms and conditions regarding cancellations."
    },
    {
      question: "How do I receive payments for my services?",
      answer: "Payments are processed through the platform's payment system. Once a booking is confirmed and the service is completed, payments are typically transferred to your account according to the platform's payment schedule. You can track your earnings and payment history in your dashboard."
    },
    {
      question: "Can I set different prices for different time slots or dates?",
      answer: "Yes, you can set dynamic pricing based on dates, time slots, or seasons. When creating or editing a service, you'll find options to set different pricing for peak seasons, weekends, holidays, or specific time slots. This helps you maximize your revenue during high-demand periods."
    },
    {
      question: "How do I handle customer reviews and ratings?",
      answer: "Customer reviews and ratings appear in the 'Review' section of your dashboard. You can view all feedback from customers who have used your services. Positive reviews help build your reputation, while constructive feedback can help you improve your services. You can respond to reviews to engage with customers."
    },
    {
      question: "What information should I include in my service description?",
      answer: "Your service description should be clear and comprehensive. Include details about what's included in your service, capacity (for venues), menu options (for catering), package details, any special features, equipment provided, setup time required, and any terms or conditions. High-quality images are also essential to attract customers."
    },
    {
      question: "How can I improve my service visibility?",
      answer: "To improve visibility, ensure your service listings are complete with all details filled in, use high-quality images, maintain competitive pricing, respond promptly to booking inquiries, collect positive reviews, and keep your availability calendar updated. Active providers with good ratings tend to appear higher in search results."
    },
    {
      question: "What happens if I need to decline a booking request?",
      answer: "You can decline booking requests from the 'Booking Details' section. When you decline, the customer will be notified, and the booking status will be updated. It's recommended to provide a brief reason for declining if possible. Make sure your availability calendar is accurate to minimize unnecessary booking requests."
    },
    {
      question: "Can I offer discounts or promotional packages?",
      answer: "Yes, you can create promotional packages or offer discounts. When editing your service, you can set special pricing for packages, early bird discounts, bulk bookings, or seasonal offers. These promotional rates can help attract more customers and increase bookings during slower periods."
    },
    {
      question: "How do I update my availability calendar?",
      answer: "You can update your availability when creating or editing a service. Set your available dates, time slots, and any blackout dates when you're not available. Keep your calendar updated regularly to ensure customers only see accurate availability, which helps prevent booking conflicts."
    }
  ];

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-gray-50 to-emerald-50/30">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header Section */}
        <div className="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-2xl p-8 mb-8 border border-emerald-100 shadow-sm">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center shadow-md">
              <HiQuestionMarkCircle className="text-4xl text-emerald-600" />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
                Frequently Asked Questions
              </h1>
              <p className="text-gray-600 mt-2 text-base md:text-lg">
                Find answers to common questions about managing your services and bookings
              </p>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <div className="bg-white rounded-xl p-5 border border-gray-200 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Total FAQs</p>
                <p className="text-2xl font-bold text-gray-800">{faqs.length}</p>
              </div>
              <div className="w-12 h-12 bg-emerald-50 rounded-lg flex items-center justify-center">
                <FiHelpCircle className="text-xl text-emerald-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-5 border border-gray-200 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Categories</p>
                <p className="text-2xl font-bold text-gray-800">6</p>
              </div>
              <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center">
                <BiSearchAlt className="text-xl text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-5 border border-gray-200 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">24/7 Support</p>
                <p className="text-2xl font-bold text-gray-800">✓</p>
              </div>
              <div className="w-12 h-12 bg-teal-50 rounded-lg flex items-center justify-center">
                <HiOutlineSupport className="text-xl text-teal-600" />
              </div>
            </div>
          </div>
        </div>

        {/* FAQ List */}
        <div className="space-y-3 mb-8">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className={`bg-white rounded-xl border-2 overflow-hidden transition-all duration-300 ${
                openIndex === index
                  ? "border-emerald-300 shadow-lg shadow-emerald-100"
                  : "border-gray-200 shadow-sm hover:shadow-md hover:border-gray-300"
              }`}
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full px-6 py-5 flex items-center justify-between text-left focus:outline-none group"
              >
                <div className="flex items-start gap-4 flex-1 pr-4">
                  <div
                    className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 transition-all duration-300 ${
                      openIndex === index
                        ? "bg-emerald-100 text-emerald-700"
                        : "bg-gray-100 text-gray-500 group-hover:bg-emerald-50 group-hover:text-emerald-600"
                    }`}
                  >
                    <span className="font-bold text-sm">{index + 1}</span>
                  </div>
                  <span
                    className={`text-base md:text-lg font-semibold transition-colors duration-200 ${
                      openIndex === index
                        ? "text-emerald-700"
                        : "text-gray-800 group-hover:text-emerald-600"
                    }`}
                  >
                    {faq.question}
                  </span>
                </div>
                <div
                  className={`flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-300 ${
                    openIndex === index
                      ? "bg-emerald-100 rotate-180"
                      : "bg-gray-100 group-hover:bg-emerald-50"
                  }`}
                >
                  <IoIosArrowDown
                    className={`text-xl transition-colors duration-300 ${
                      openIndex === index ? "text-emerald-600" : "text-gray-500"
                    }`}
                  />
                </div>
              </button>
              {openIndex === index && (
                <div className="px-6 pb-6 pt-2 bg-gradient-to-br from-emerald-50/50 to-teal-50/30 border-t border-emerald-100">
                  <div className="pl-14">
                    <p className="text-gray-700 leading-relaxed text-base">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Support Section */}
        <div className="bg-gradient-to-r from-emerald-500 to-teal-600 rounded-2xl p-8 shadow-xl">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-white/20 backdrop-blur rounded-2xl flex items-center justify-center">
                <HiOutlineSupport className="text-4xl text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white mb-2">
                  Still have questions?
                </h2>
                <p className="text-emerald-50 text-base">
                  Our support team is here to help you 24/7
                </p>
              </div>
            </div>
            <button className="px-8 py-3 bg-white text-emerald-700 rounded-xl hover:bg-emerald-50 transition-all duration-200 font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 whitespace-nowrap">
              Contact Support
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQ;