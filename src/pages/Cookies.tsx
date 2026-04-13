import React from 'react';

export default function Cookies() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold tracking-tighter mb-8 uppercase">Cookie Settings</h1>
      <div className="prose prose-lg max-w-none text-gray-600 space-y-6">
        <p>
          This is the Cookie Policy for SWIFTSHOP, accessible from our website.
        </p>
        
        <h2 className="text-2xl font-bold text-black uppercase tracking-tight mt-12">What Are Cookies</h2>
        <p>
          As is common practice with almost all professional websites this site uses cookies, which are tiny files that are downloaded to your computer, to improve your experience. This page describes what information they gather, how we use it and why we sometimes need to store these cookies.
        </p>

        <h2 className="text-2xl font-bold text-black uppercase tracking-tight mt-12">How We Use Cookies</h2>
        <p>
          We use cookies for a variety of reasons detailed below. Unfortunately in most cases there are no industry standard options for disabling cookies without completely disabling the functionality and features they add to this site.
        </p>

        <h2 className="text-2xl font-bold text-black uppercase tracking-tight mt-12">Disabling Cookies</h2>
        <p>
          You can prevent the setting of cookies by adjusting the settings on your browser (see your browser Help for how to do this). Be aware that disabling cookies will affect the functionality of this and many other websites that you visit.
        </p>

        <h2 className="text-2xl font-bold text-black uppercase tracking-tight mt-12">The Cookies We Set</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li><strong>Account related cookies:</strong> If you create an account with us then we will use cookies for the management of the signup process and general administration.</li>
          <li><strong>Login related cookies:</strong> We use cookies when you are logged in so that we can remember this fact. This prevents you from having to log in every single time you visit a new page.</li>
          <li><strong>Orders processing related cookies:</strong> This site offers e-commerce or payment facilities and some cookies are essential to ensure that your order is remembered between pages so that we can process it properly.</li>
        </ul>
      </div>
    </div>
  );
}
