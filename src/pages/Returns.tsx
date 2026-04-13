import React from 'react';

export default function Returns() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold tracking-tighter mb-8 uppercase">Returns & Exchanges</h1>
      <div className="prose prose-lg max-w-none text-gray-600 space-y-6">
        <p>
          We want you to be completely satisfied with your purchase. If you are not happy with your order, we are here to help.
        </p>
        
        <h2 className="text-2xl font-bold text-black uppercase tracking-tight mt-12">Returns</h2>
        <p>
          You have 30 calendar days to return an item from the date you received it. To be eligible for a return, your item must be unused and in the same condition that you received it. Your item must be in the original packaging.
        </p>

        <h2 className="text-2xl font-bold text-black uppercase tracking-tight mt-12">Exchanges</h2>
        <p>
          We only replace items if they are defective or damaged. If you need to exchange it for the same item, send us an email at hello@swiftshop.com.
        </p>

        <h2 className="text-2xl font-bold text-black uppercase tracking-tight mt-12">Refunds</h2>
        <p>
          Once we receive your item, we will inspect it and notify you that we have received your returned item. We will immediately notify you on the status of your refund after inspecting the item.
        </p>
        <p>
          If your return is approved, we will initiate a refund to your original method of payment. You will receive the credit within a certain amount of days, depending on your card issuer's policies.
        </p>

        <h2 className="text-2xl font-bold text-black uppercase tracking-tight mt-12">Shipping</h2>
        <p>
          You will be responsible for paying for your own shipping costs for returning your item. Shipping costs are non-refundable. If you receive a refund, the cost of return shipping will be deducted from your refund.
        </p>
      </div>
    </div>
  );
}
