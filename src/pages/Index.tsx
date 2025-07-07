
import React, { useState } from 'react';
import Header from '@/components/Header';
import FlowSelector from '@/components/FlowSelector';
import ComingSoon from '@/components/ComingSoon';
import NewQuoteFlow from '@/components/NewQuoteFlow';
import RenewalFlow from '@/components/RenewalFlow';

type FlowType = 'new-quote' | 'renewal' | null;

const Index = () => {
  const [selectedFlow, setSelectedFlow] = useState<FlowType>(null);

  const handleFlowSelect = (flow: 'new-quote' | 'renewal') => {
    console.log('Fluxo selecionado:', flow);
    setSelectedFlow(flow);
  };

  const handleBackToSelection = () => {
    console.log('Voltando para seleção de fluxo');
    setSelectedFlow(null);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {selectedFlow === null ? (
        <FlowSelector onFlowSelect={handleFlowSelect} />
      ) : selectedFlow === 'new-quote' ? (
        <NewQuoteFlow onBack={handleBackToSelection} />
      ) : (
        <RenewalFlow onBack={handleBackToSelection} />
      )}
    </div>
  );
};

export default Index;
