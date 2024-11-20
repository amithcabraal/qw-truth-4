import React, { useState } from 'react';
import { Menu, Share2, Shield, HelpCircle, X } from 'lucide-react';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const menuItems = [
    { icon: <Share2 className="w-5 h-5" />, label: 'Share', action: () => {} },
    { icon: <Shield className="w-5 h-5" />, label: 'Privacy', action: () => {} },
    { icon: <HelpCircle className="w-5 h-5" />, label: 'How to Play', action: () => {} },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 bg-indigo-600 text-white shadow-lg z-50">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <h1 className="text-2xl font-bold">QuizWordz Truth</h1>
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="p-2 hover:bg-indigo-700 rounded-full transition-colors"
        >
          {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {isMenuOpen && (
        <div className="absolute top-full right-0 w-64 bg-white shadow-xl rounded-bl-lg overflow-hidden">
          {menuItems.map((item, index) => (
            <button
              key={index}
              onClick={() => {
                item.action();
                setIsMenuOpen(false);
              }}
              className="w-full px-4 py-3 flex items-center gap-3 text-gray-700 hover:bg-gray-50 transition-colors"
            >
              {item.icon}
              <span>{item.label}</span>
            </button>
          ))}
        </div>
      )}
    </header>
  );
}