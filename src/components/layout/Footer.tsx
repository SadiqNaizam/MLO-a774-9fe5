import React from 'react';
import { Link } from 'react-router-dom';
import { Github, Linkedin, Twitter } from 'lucide-react';

const Footer: React.FC = () => {
  console.log("Rendering Footer");
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-50 border-t border-gray-200 mt-12">
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">Company</h3>
            <ul className="space-y-2">
              <li><Link to="/about" className="text-sm text-gray-600 hover:text-orange-600">About Us</Link></li>
              <li><Link to="/careers" className="text-sm text-gray-600 hover:text-orange-600">Careers</Link></li>
              <li><Link to="/press" className="text-sm text-gray-600 hover:text-orange-600">Press</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">Support</h3>
            <ul className="space-y-2">
              <li><Link to="/contact" className="text-sm text-gray-600 hover:text-orange-600">Contact Us</Link></li>
              <li><Link to="/faq" className="text-sm text-gray-600 hover:text-orange-600">FAQ</Link></li>
              <li><Link to="/terms" className="text-sm text-gray-600 hover:text-orange-600">Terms of Service</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">Legal</h3>
            <ul className="space-y-2">
              <li><Link to="/privacy" className="text-sm text-gray-600 hover:text-orange-600">Privacy Policy</Link></li>
              <li><Link to="/cookies" className="text-sm text-gray-600 hover:text-orange-600">Cookie Policy</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-orange-500"><span className="sr-only">Twitter</span><Twitter className="h-6 w-6" /></a>
              <a href="#" className="text-gray-400 hover:text-orange-500"><span className="sr-only">LinkedIn</span><Linkedin className="h-6 w-6" /></a>
              <a href="#" className="text-gray-400 hover:text-orange-500"><span className="sr-only">GitHub</span><Github className="h-6 w-6" /></a>
            </div>
          </div>
        </div>
        <div className="mt-8 border-t border-gray-200 pt-8 text-center">
          <p className="text-sm text-gray-500">&copy; {currentYear} FoodDash. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;