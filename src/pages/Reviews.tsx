import React from 'react';
import { Star, Trash2, MessageSquare } from 'lucide-react';

const mockReviews = [
  { id: 1, product: 'Wireless Headphones', customer: 'John Doe', rating: 5, comment: 'Amazing sound quality and battery life!', date: '2 days ago' },
  { id: 2, product: 'Smart Watch', customer: 'Sarah Smith', rating: 4, comment: 'Great features, but the strap is a bit stiff.', date: '1 week ago' },
  { id: 3, product: 'Leather Wallet', customer: 'Mike Johnson', rating: 5, comment: 'Premium feel and very durable.', date: '2 weeks ago' },
];

export default function Reviews() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold tracking-tighter uppercase">Reviews</h1>
        <p className="text-gray-500 mt-1">Manage customer feedback and ratings.</p>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {mockReviews.map((review) => (
          <div key={review.id} className="bg-white p-8 rounded-[40px] border border-gray-100 shadow-sm hover:shadow-xl hover:shadow-gray-100 transition-all group">
            <div className="flex items-start justify-between mb-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-gray-50 flex items-center justify-center text-gray-400">
                  <MessageSquare size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-sm">{review.customer}</h4>
                  <p className="text-xs text-gray-400 uppercase tracking-widest font-bold">{review.product}</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-xs text-gray-400 font-bold uppercase tracking-widest">{review.date}</span>
                <button className="p-2 hover:bg-red-50 rounded-xl text-gray-400 hover:text-red-600 transition-all opacity-0 group-hover:opacity-100">
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
            
            <div className="flex items-center gap-1 mb-4">
              {[...Array(5)].map((_, i) => (
                <Star 
                  key={i} 
                  size={16} 
                  className={cn(
                    "transition-colors",
                    i < review.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-200"
                  )} 
                />
              ))}
            </div>
            
            <p className="text-gray-600 leading-relaxed italic">"{review.comment}"</p>
          </div>
        ))}
      </div>
    </div>
  );
}

import { cn } from '../utils/cn';
