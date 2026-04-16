import React, { useState } from 'react';
import { Mail, Search, Trash2, Eye, Reply, CheckCircle2, Clock } from 'lucide-react';
import { cn } from '../utils/cn';

const mockMessages = [
  { 
    id: 1, 
    name: 'John Smith', 
    email: 'john@example.com', 
    subject: 'Inquiry about bulk order', 
    message: 'Hello, I would like to know if you offer discounts for bulk orders of over 50 items. Please let me know the pricing.',
    date: '2 hours ago',
    status: 'unread'
  },
  { 
    id: 2, 
    name: 'Sarah Wilson', 
    email: 'sarah@example.com', 
    subject: 'Shipping delay', 
    message: 'My order #SW-12345 has not arrived yet. It was supposed to be delivered yesterday. Can you check the status?',
    date: '5 hours ago',
    status: 'read'
  },
  { 
    id: 3, 
    name: 'Michael Brown', 
    email: 'michael@example.com', 
    subject: 'Product quality', 
    message: 'I received the headphones today and they are amazing! Just wanted to say thanks for the quick delivery.',
    date: '1 day ago',
    status: 'replied'
  },
];

export default function Messages() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMessage, setSelectedMessage] = useState<typeof mockMessages[0] | null>(null);

  const filteredMessages = mockMessages.filter(m => 
    m.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    m.subject.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-4xl font-bold tracking-tighter uppercase">Messages</h1>
          <p className="text-gray-500 mt-1">Manage customer inquiries and feedback.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Messages List */}
        <div className="lg:col-span-1 space-y-4">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
              <Search size={18} />
            </div>
            <input
              type="text"
              placeholder="Search messages..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-white border border-gray-100 rounded-2xl pl-12 pr-4 py-3 text-sm focus:ring-2 focus:ring-black outline-none transition-all shadow-sm"
            />
          </div>

          <div className="space-y-2 max-h-[calc(100vh-300px)] overflow-y-auto pr-2 custom-scrollbar">
            {filteredMessages.map((msg) => (
              <button
                key={msg.id}
                onClick={() => setSelectedMessage(msg)}
                className={cn(
                  "w-full text-left p-6 rounded-3xl border transition-all group relative",
                  selectedMessage?.id === msg.id 
                    ? "bg-black border-black text-white shadow-xl" 
                    : "bg-white border-gray-100 hover:border-gray-200 text-gray-900 shadow-sm"
                )}
              >
                {msg.status === 'unread' && (
                  <span className="absolute top-6 right-6 w-2 h-2 bg-orange-600 rounded-full" />
                )}
                <div className="flex justify-between items-start mb-2">
                  <span className={cn(
                    "text-[10px] font-bold uppercase tracking-widest",
                    selectedMessage?.id === msg.id ? "text-gray-400" : "text-gray-400"
                  )}>{msg.date}</span>
                </div>
                <h4 className="font-bold text-sm mb-1 line-clamp-1">{msg.subject}</h4>
                <p className={cn(
                  "text-xs line-clamp-2",
                  selectedMessage?.id === msg.id ? "text-gray-300" : "text-gray-500"
                )}>{msg.message}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Message Detail */}
        <div className="lg:col-span-2">
          {selectedMessage ? (
            <div className="bg-white rounded-[40px] border border-gray-100 shadow-sm overflow-hidden flex flex-col h-full min-h-[600px]">
              <div className="p-10 border-b border-gray-50 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-gray-50 flex items-center justify-center text-gray-400 font-bold text-xl">
                    {selectedMessage.name.charAt(0)}
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">{selectedMessage.name}</h3>
                    <p className="text-xs text-gray-400 font-medium">{selectedMessage.email}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button className="p-3 hover:bg-gray-50 rounded-2xl text-gray-400 hover:text-black transition-all">
                    <Reply size={20} />
                  </button>
                  <button className="p-3 hover:bg-red-50 rounded-2xl text-gray-400 hover:text-red-600 transition-all">
                    <Trash2 size={20} />
                  </button>
                </div>
              </div>

              <div className="p-10 flex-grow space-y-8">
                <div>
                  <h2 className="text-2xl font-bold tracking-tight mb-4">{selectedMessage.subject}</h2>
                  <div className="flex items-center gap-2 text-xs text-gray-400 uppercase tracking-widest font-bold mb-8">
                    <Clock size={14} />
                    Sent on {selectedMessage.date}
                  </div>
                  <div className="prose prose-sm max-w-none text-gray-600 leading-relaxed">
                    {selectedMessage.message}
                  </div>
                </div>

                {selectedMessage.status === 'replied' && (
                  <div className="bg-green-50 rounded-3xl p-6 border border-green-100 flex items-start gap-4">
                    <CheckCircle2 className="text-green-600 shrink-0" size={20} />
                    <div>
                      <h4 className="font-bold text-sm text-green-900">Replied</h4>
                      <p className="text-xs text-green-700 mt-1">A response was sent to this customer on April 14, 2024.</p>
                    </div>
                  </div>
                )}
              </div>

              <div className="p-10 bg-gray-50 border-t border-gray-100">
                <div className="relative">
                  <textarea 
                    rows={4}
                    className="w-full bg-white border border-gray-100 rounded-3xl px-6 py-4 focus:ring-2 focus:ring-black outline-none transition-all resize-none text-sm"
                    placeholder="Type your reply here..."
                  />
                  <button className="absolute bottom-4 right-4 bg-black text-white px-6 py-2 rounded-full font-bold text-xs hover:bg-orange-600 transition-all">
                    Send Reply
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-[40px] border border-gray-100 shadow-sm flex flex-col items-center justify-center p-20 text-center h-full min-h-[600px]">
              <div className="w-20 h-20 rounded-3xl bg-gray-50 flex items-center justify-center text-gray-300 mb-6">
                <Mail size={40} />
              </div>
              <h3 className="text-xl font-bold mb-2 uppercase tracking-tight">No Message Selected</h3>
              <p className="text-gray-500 max-w-xs mx-auto text-sm">Select a message from the list to view its content and reply to the customer.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
