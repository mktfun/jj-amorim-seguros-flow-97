
import React from 'react';
import RenewalFlow from './renewal/RenewalFlow';

interface RenewalFlowProps {
  onBack: () => void;
}

const RenewalFlowWrapper: React.FC<RenewalFlowProps> = ({ onBack }) => {
  return <RenewalFlow onBack={onBack} />;
};

export default RenewalFlowWrapper;
