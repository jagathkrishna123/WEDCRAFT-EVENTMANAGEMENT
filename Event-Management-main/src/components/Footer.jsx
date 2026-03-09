import React from 'react';
import { FaFacebook, FaInstagram, FaTwitter, FaPhone, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="w-full bg-white border-t border-gray-200 mt-20">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <h2 className="text-3xl mb-4 font-cursive bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent">
              Wedding Bliss
            </h2>
            <p className="text-gray-600 text-sm leading-relaxed mb-6 max-w-md">
              Make your weddings memorable with premium event management, 
              professional service providers, and seamless booking experience.
            </p>

            {/* Social Icons */}
            <div className="flex space-x-3">
              <a href="#" className="w-10 h-10 flex items-center justify-center rounded-full bg-gradient-to-r from-cyan-50 to-blue-50 text-cyan-600 hover:from-cyan-600 hover:to-blue-600 hover:text-white transition-all duration-300 shadow-sm hover:shadow-md">
                <FaFacebook className="text-lg" />
              </a>
              <a href="#" className="w-10 h-10 flex items-center justify-center rounded-full bg-gradient-to-r from-cyan-50 to-blue-50 text-cyan-600 hover:from-cyan-600 hover:to-blue-600 hover:text-white transition-all duration-300 shadow-sm hover:shadow-md">
                <FaInstagram className="text-lg" />
              </a>
              <a href="#" className="w-10 h-10 flex items-center justify-center rounded-full bg-gradient-to-r from-cyan-50 to-blue-50 text-cyan-600 hover:from-cyan-600 hover:to-blue-600 hover:text-white transition-all duration-300 shadow-sm hover:shadow-md">
                <FaTwitter className="text-lg" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-6 text-gray-800">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-gray-600 hover:text-cyan-600 text-sm transition-colors duration-200 flex items-center group">
                  <span className="w-0 h-0.5 bg-cyan-600 group-hover:w-4 transition-all duration-200 mr-0 group-hover:mr-2"></span>
                  Home
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-cyan-600 text-sm transition-colors duration-200 flex items-center group">
                  <span className="w-0 h-0.5 bg-cyan-600 group-hover:w-4 transition-all duration-200 mr-0 group-hover:mr-2"></span>
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-cyan-600 text-sm transition-colors duration-200 flex items-center group">
                  <span className="w-0 h-0.5 bg-cyan-600 group-hover:w-4 transition-all duration-200 mr-0 group-hover:mr-2"></span>
                  Services
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-cyan-600 text-sm transition-colors duration-200 flex items-center group">
                  <span className="w-0 h-0.5 bg-cyan-600 group-hover:w-4 transition-all duration-200 mr-0 group-hover:mr-2"></span>
                  Contact Us
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-6 text-gray-800">Get in Touch</h3>
            <div className="space-y-4">
              <div className="flex items-start space-x-3 group">
                <div className="w-8 h-8 flex items-center justify-center rounded-lg bg-cyan-50 text-cyan-600 flex-shrink-0 group-hover:bg-cyan-600 group-hover:text-white transition-all duration-200">
                  <FaPhone className="text-sm" />
                </div>
                <p className="text-sm text-gray-600 pt-1">+91 98765 43210</p>
              </div>
              <div className="flex items-start space-x-3 group">
                <div className="w-8 h-8 flex items-center justify-center rounded-lg bg-cyan-50 text-cyan-600 flex-shrink-0 group-hover:bg-cyan-600 group-hover:text-white transition-all duration-200">
                  <FaEnvelope className="text-sm" />
                </div>
                <p className="text-sm text-gray-600 pt-1">support@weddingbliss.com</p>
              </div>
              <div className="flex items-start space-x-3 group">
                <div className="w-8 h-8 flex items-center justify-center rounded-lg bg-cyan-50 text-cyan-600 flex-shrink-0 group-hover:bg-cyan-600 group-hover:text-white transition-all duration-200">
                  <FaMapMarkerAlt className="text-sm" />
                </div>
                <p className="text-sm text-gray-600 pt-1">Kochi, Kerala, India</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-200 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-600">
            <p>© 2026 WeddingBliss. All rights reserved.</p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="hover:text-cyan-600 transition-colors duration-200">Privacy Policy</a>
              <a href="#" className="hover:text-cyan-600 transition-colors duration-200">Terms of Service</a>
              <a href="#" className="hover:text-cyan-600 transition-colors duration-200">Cookie Policy</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;