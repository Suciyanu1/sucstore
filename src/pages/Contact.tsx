import React from 'react';
import { Mail, Phone, MapPin, Clock } from 'lucide-react';

export default function Contact() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-16">
      <div className="text-center mb-16">
        <h1 className="text-5xl font-bold tracking-tighter mb-4 uppercase">Contact Us</h1>
        <p className="text-gray-500 max-w-md mx-auto">
          Have a question or need assistance? Our team is here to help you.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        {/* Contact Form */}
        <div className="bg-gray-50 rounded-[40px] p-10">
          <h2 className="text-2xl font-bold mb-8 uppercase tracking-tight">Send us a message</h2>
          <form className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <input type="text" placeholder="Your Name" className="w-full bg-white border-none rounded-2xl px-6 py-4 focus:ring-2 focus:ring-black outline-none" />
              <input type="email" placeholder="Email Address" className="w-full bg-white border-none rounded-2xl px-6 py-4 focus:ring-2 focus:ring-black outline-none" />
            </div>
            <input type="text" placeholder="Subject" className="w-full bg-white border-none rounded-2xl px-6 py-4 focus:ring-2 focus:ring-black outline-none" />
            <textarea placeholder="Your Message" rows={6} className="w-full bg-white border-none rounded-2xl px-6 py-4 focus:ring-2 focus:ring-black outline-none resize-none"></textarea>
            <button className="w-full bg-black text-white rounded-full py-4 font-bold hover:bg-orange-600 transition-all">
              Send Message
            </button>
          </form>
        </div>

        {/* Contact Info */}
        <div className="flex flex-col justify-center space-y-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-12">
            <div className="space-y-4">
              <div className="w-12 h-12 bg-black text-white rounded-2xl flex items-center justify-center">
                <Mail size={24} />
              </div>
              <h4 className="font-bold uppercase tracking-widest text-sm">Email Us</h4>
              <p className="text-gray-500">hello@swiftshop.com<br />support@swiftshop.com</p>
            </div>
            <div className="space-y-4">
              <div className="w-12 h-12 bg-black text-white rounded-2xl flex items-center justify-center">
                <Phone size={24} />
              </div>
              <h4 className="font-bold uppercase tracking-widest text-sm">Call Us</h4>
              <p className="text-gray-500">+234 (800) 123-4567<br />+234 (800) 765-4321</p>
            </div>
            <div className="space-y-4">
              <div className="w-12 h-12 bg-black text-white rounded-2xl flex items-center justify-center">
                <MapPin size={24} />
              </div>
              <h4 className="font-bold uppercase tracking-widest text-sm">Visit Us</h4>
              <p className="text-gray-500">123 Commerce St, Suite 100<br />Victoria Island, Lagos</p>
            </div>
            <div className="space-y-4">
              <div className="w-12 h-12 bg-black text-white rounded-2xl flex items-center justify-center">
                <Clock size={24} />
              </div>
              <h4 className="font-bold uppercase tracking-widest text-sm">Working Hours</h4>
              <p className="text-gray-500">Mon - Fri: 9am - 6pm<br />Sat: 10am - 4pm</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
