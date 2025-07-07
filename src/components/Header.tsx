
import React from 'react';

const Header = () => {
  return (
    <header className="bg-white shadow-sm border-b border-jj-cyan-border">
      <div className="container mx-auto px-4 py-6">
        <div className="flex justify-center">
          {/* Logo placeholder - será substituído pelo logo real da JJ & Amorim */}
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">JJ</span>
            </div>
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
