import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Globe, MessageSquare, Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-100 pt-16 pb-8 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-brand-500 rounded-lg flex items-center justify-center shadow-sm">
                <span className="text-white font-black text-lg">M</span>
              </div>
              <span className="text-xl font-black text-gray-900 tracking-tighter">Minute<span className="text-brand-500">Mart</span></span>
            </Link>
            <p className="text-gray-500 text-sm leading-relaxed">
              India's fastest growing quick commerce application. Get groceries, fresh fruits, vegetables, and daily needs delivered in minutes.
            </p>
            <div className="flex items-center gap-4 pt-2">
              <a href="#" className="w-10 h-10 bg-gray-50 rounded-full flex items-center justify-center text-gray-500 hover:bg-brand-50 hover:text-brand-600 transition-colors"><Globe className="w-5 h-5" /></a>
              <a href="#" className="w-10 h-10 bg-gray-50 rounded-full flex items-center justify-center text-gray-500 hover:bg-brand-50 hover:text-brand-600 transition-colors"><MessageSquare className="w-5 h-5" /></a>
              <a href="#" className="w-10 h-10 bg-gray-50 rounded-full flex items-center justify-center text-gray-500 hover:bg-brand-50 hover:text-brand-600 transition-colors"><Heart className="w-5 h-5" /></a>
            </div>
          </div>
          
          <div>
            <h4 className="font-black text-gray-900 mb-6">Company</h4>
            <ul className="space-y-3 text-sm text-gray-500 font-medium">
              <li><Link to="#" className="hover:text-brand-600 transition-colors">About Us</Link></li>
              <li><Link to="#" className="hover:text-brand-600 transition-colors">Careers</Link></li>
              <li><Link to="#" className="hover:text-brand-600 transition-colors">Blog</Link></li>
              <li><Link to="#" className="hover:text-brand-600 transition-colors">Press</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-black text-gray-900 mb-6">Help & Support</h4>
            <ul className="space-y-3 text-sm text-gray-500 font-medium">
              <li><Link to="#" className="hover:text-brand-600 transition-colors">Partner with us</Link></li>
              <li><Link to="#" className="hover:text-brand-600 transition-colors">FAQs</Link></li>
              <li><Link to="#" className="hover:text-brand-600 transition-colors">Security</Link></li>
              <li><Link to="#" className="hover:text-brand-600 transition-colors">Terms of Service</Link></li>
              <li><Link to="#" className="hover:text-brand-600 transition-colors">Privacy Policy</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-black text-gray-900 mb-6">Contact Us</h4>
            <ul className="space-y-4 text-sm text-gray-500 font-medium">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-brand-500 flex-shrink-0" />
                <span>123 Quick Commerce Park, Tech City, IN 560001</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-brand-500 flex-shrink-0" />
                <span>+91 98765 43210</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-brand-500 flex-shrink-0" />
                <span>support@minutemart.com</span>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-100 pt-8 text-center text-sm text-gray-400 font-medium">
          © {new Date().getFullYear()} MinuteMart Express. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
