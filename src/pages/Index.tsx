
import React, { useState } from 'react';
import Header from '@/components/Header';
import FlowSelector from '@/components/FlowSelector';
import ComingSoon from '@/components/ComingSoon';
import NewQuoteFlow from '@/components/NewQuoteFlow';
import RenewalFlow from '@/components/RenewalFlow';

type FlowType = 'new-quote' | 'renewal' | 'second-invoice' | 'claim' | null;

const Index = () => {
  const [selectedFlow, setSelectedFlow] = useState<FlowType>(null);

  const handleFlowSelect = (flow: 'new-quote' | 'renewal' | 'second-invoice' | 'claim') => {
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
      ) : selectedFlow === 'renewal' ? (
        <RenewalFlow onBack={handleBackToSelection} />
      ) : selectedFlow === 'second-invoice' ? (
        <ComingSoon 
          title="Segunda Via de Boleto" 
          description="Esta funcionalidade estará disponível em breve."
          onBack={handleBackToSelection}
        />
      ) : (
        <ComingSoon 
          title="Sinistro Segurado JJ&Amorim" 
          description="Esta funcionalidade estará disponível em breve."
          onBack={handleBackToSelection}
        />
      )}
    </div>
  );
};

export default Index;
