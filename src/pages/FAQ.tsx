import React from 'react';

export default function FAQ() {
  const faqs = [
    {
      question: "How do I track my order?",
      answer: "You can track your order by visiting the 'Track Order' page and entering your Order ID and email address."
    },
    {
      question: "What payment methods do you accept?",
      answer: "We accept all major credit cards, debit cards, and bank transfers through our secure payment gateway."
    },
    {
      question: "Do you offer international shipping?",
      answer: "Currently, we only offer shipping within Nigeria. We are working on expanding our services to other countries soon."
    },
    {
      question: "How can I change or cancel my order?",
      answer: "Please contact our customer support team as soon as possible if you need to change or cancel your order. Once an order has been shipped, it cannot be changed or cancelled."
    },
    {
      question: "What is your return policy?",
      answer: "We offer a 30-day return policy for unused items in their original packaging. Please see our Returns & Exchanges page for more details."
    }
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold tracking-tighter mb-12 uppercase text-center">Frequently Asked Questions</h1>
      <div className="space-y-8">
        {faqs.map((faq, index) => (
          <div key={index} className="bg-gray-50 rounded-3xl p-8">
            <h3 className="text-xl font-bold mb-4 text-black">{faq.question}</h3>
            <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
