
import React from 'react';

const Header = () => {
  return (
    <header className="bg-white shadow-sm border-b border-jj-cyan-border">
      <div className="container mx-auto px-4 py-6">
        <div className="flex justify-center">
          <div className="flex items-center space-x-3">
            <img 
              src="/lovable-uploads/563b889c-fc42-4e1c-bb40-3e7333ba4c19.png" 
              alt="JJ & Amorim Logo" 
              className="h-12 w-auto object-contain"
            />
            <div className="text-left">
              <h1 className="text-xl font-bold jj-blue-dark leading-tight">
                JJ & AMORIM
              </h1>
              <p className="text-sm jj-blue-medium font-medium">
                corretora de seguros
              </p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
