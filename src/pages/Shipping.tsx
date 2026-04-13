import React from 'react';

export default function Shipping() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold tracking-tighter mb-8 uppercase">Shipping Policy</h1>
      <div className="prose prose-lg max-w-none text-gray-600 space-y-6">
        <p>
          At SWIFTSHOP, we strive to deliver your orders as quickly and efficiently as possible. We offer nationwide shipping across Nigeria.
        </p>
        
        <h2 className="text-2xl font-bold text-black uppercase tracking-tight mt-12">Shipping Rates & Delivery Estimates</h2>
        <p>
          Shipping charges for your order will be calculated and displayed at checkout.
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li><strong>Lagos:</strong> 1-2 business days (₦2,500)</li>
          <li><strong>Other States:</strong> 3-5 business days (₦5,000)</li>
          <li><strong>Free Shipping:</strong> On orders over ₦500,000</li>
        </ul>

        <h2 className="text-2xl font-bold text-black uppercase tracking-tight mt-12">Shipment Confirmation & Order Tracking</h2>
        <p>
          You will receive a Shipment Confirmation email once your order has shipped containing your tracking number(s). The tracking number will be active within 24 hours.
        </p>

        <h2 className="text-2xl font-bold text-black uppercase tracking-tight mt-12">Customs, Duties, and Taxes</h2>
        <p>
          SWIFTSHOP is not responsible for any customs and taxes applied to your order. All fees imposed during or after shipping are the responsibility of the customer (tariffs, taxes, etc.).
        </p>

        <h2 className="text-2xl font-bold text-black uppercase tracking-tight mt-12">Damages</h2>
        <p>
          SWIFTSHOP is not liable for any products damaged or lost during shipping. If you received your order damaged, please contact the shipment carrier to file a claim. Please save all packaging materials and damaged goods before filing a claim.
        </p>
      </div>
    </div>
  );
}
