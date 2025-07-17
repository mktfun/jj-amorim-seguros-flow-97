
import React from 'react';

const FlowHeader = () => {
  return (
    <div className="bg-white border-b border-gray-100 py-4 mb-6">
      <div className="container mx-auto px-4">
        <div className="flex justify-center">
          <div className="flex items-center space-x-3">
            <img 
              src="/lovable-uploads/563b889c-fc42-4e1c-bb40-3e7333ba4c19.png" 
              alt="JJ & Amorim Logo" 
              className="h-12 w-auto object-contain"
            />
            <div className="text-left">
              <h1 className="text-lg font-bold jj-blue-dark leading-tight">
                JJ & AMORIM
              </h1>
              <p className="text-xs jj-blue-medium font-medium">
                corretora de seguros
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlowHeader;
