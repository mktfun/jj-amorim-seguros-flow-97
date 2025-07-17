
import React from 'react';
import FlowHeader from './FlowHeader';
import RenewalFlow from './renewal/RenewalFlow';

interface RenewalFlowProps {
  onBack: () => void;
}

const RenewalFlowWrapper: React.FC<RenewalFlowProps> = ({ onBack }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <FlowHeader />
      <RenewalFlow onBack={onBack} />
    </div>
  );
};

export default RenewalFlowWrapper;
