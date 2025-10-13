import React from 'react'
import {
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
  FaFacebookF,
  FaInstagram,
  FaWhatsapp,
} from "react-icons/fa";
const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 border-t border-gray-700 py-10">
            <div className="container mx-auto px-6 md:px-12">
              <div className="grid md:grid-cols-3 gap-8 text-center md:text-left">
                {/* Brand Section */}
                <div>
                  <h2 className="text-2xl font-semibold text-white">
                    Fresh Harvest Dubai
                  </h2>
                  <p className="mt-3 text-sm text-gray-400">
                    Delivering freshness across Dubai 🌱 <br />
                    Quality you can taste, trust you can feel.
                  </p>
    
                  {/* Social Icons */}
                  <div className="flex justify-center md:justify-start mt-4 space-x-4">
                    <a
                      href="https://www.facebook.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-green-400 transition-colors"
                    >
                      <FaFacebookF size={18} />
                    </a>
                    <a
                      href="https://www.instagram.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-green-400 transition-colors"
                    >
                      <FaInstagram size={18} />
                    </a>
                    <a
                      href="https://wa.me/971501234567"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-green-400 transition-colors"
                    >
                      <FaWhatsapp size={18} />
                    </a>
                  </div>
                </div>
    
                {/* Quick Links */}
                <div>
                  <h3 className="text-lg font-semibold text-white mb-3">
                    Quick Links
                  </h3>
                  <ul className="space-y-2 text-sm">
                    <li>
                      <a
                        href="/"
                        className="hover:text-green-400 transition-colors"
                      >
                        Home
                      </a>
                    </li>
                    <li>
                      <a
                        href="/about"
                        className="hover:text-green-400 transition-colors"
                      >
                        About Us
                      </a>
                    </li>
                    <li>
                      <a
                        href="/shop"
                        className="hover:text-green-400 transition-colors"
                      >
                        Shop
                      </a>
                    </li>
                    <li>
                      <a
                        href="/contact"
                        className="hover:text-green-400 transition-colors"
                      >
                        Contact
                      </a>
                    </li>
                  </ul>
                </div>
                {/* Contact Info */}
                <div>
                  <h3 className="text-lg font-semibold text-white mb-3">
                    Get in Touch
                  </h3>
                  <ul className="space-y-2 text-sm text-gray-400">
                    <li className="flex items-center justify-center md:justify-start gap-2">
                      <FaMapMarkerAlt className="text-green-400" />
                      <span>Dubai, United Arab Emirates</span>
                    </li>
                    <li className="flex items-center justify-center md:justify-start gap-2">
                      <FaPhoneAlt className="text-green-400" />
                      <span>+971 50 123 4567</span>
                    </li>
                    <li className="flex items-center justify-center md:justify-start gap-2">
                      <FaEnvelope className="text-green-400" />
                      <span>hello@freshharvestdubai.com</span>
                    </li>
                  </ul>
                </div>
              </div>
    
              {/* Divider */}
              <div className="border-t border-gray-700 my-6"></div>
    
              {/* Bottom Section */}
              <div className="text-center text-xs text-gray-500">
                <p>© 2025 Fresh Harvest Dubai. All rights reserved.</p>
                <p className="mt-1">Crafted with ❤️ by Fresh Harvest Team</p>
              </div>
            </div>
          </footer>
  )
}

export default Footer