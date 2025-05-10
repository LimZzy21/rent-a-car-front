import React from "react";
import {
  FaCar,
} from "react-icons/fa6";
import { social, contactIcons} from "@/common/constants/Footer/Footer";

const Footer: React.FC = () => {
  return (
    <footer className="bg-black text-white py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center mb-4 gap-4">
              <FaCar />
              <h1>LuxDrive</h1>
            </div>
            <p className="text-sm mb-4">
              Experience luxury and performance with our premium sports car
              rental service.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="hover:text-gray-300">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-300">
                  Our Fleet
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-300">
                  Pricing
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-300">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <ul className="space-y-3">
             {contactIcons.map((Icon,index) => (
              <li className="flex items-center gap-x-2" key={index}>
                <Icon />
                <span className="text-sm">+1 (555) 123-4567</span>
              </li>
             ))}
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
            <div className="flex space-x-4">
                {social.map((Icon,index) => (
              <a href="#" className="hover:text-gray-300" key={index}>
                <Icon className="size-[1.5rem]" />
              </a>
                ))} 
             
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-800 my-8"></div>

        {/* Copyright */}
        <div className="text-center text-sm pt-2">
          © 2025 LuxDrive. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
