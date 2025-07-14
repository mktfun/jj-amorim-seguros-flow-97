
import React, { useState } from 'react';
import Header from '@/components/Header';
import FlowSelector from '@/components/FlowSelector';
import NewQuoteFlow from '@/components/NewQuoteFlow';
import RenewalFlow from '@/components/renewal/RenewalFlow';
import ResidentialInsuranceFlow from '@/components/ResidentialInsuranceFlow';
import ComingSoon from '@/components/ComingSoon';
import BusinessInsuranceFlow from '@/components/BusinessInsuranceFlow';
import LifeInsuranceFlow from '@/components/LifeInsuranceFlow';
import TravelInsuranceFlow from '@/components/TravelInsuranceFlow';

type FlowType = 'new-quote' | 'renewal' | 'second-invoice' | 'claim' | 'fianca' | 'residencial' | 'empresarial' | 'vida' | 'viagem' | null;

const Index = () => {
  const [selectedFlow, setSelectedFlow] = useState<FlowType>(null);

  const handleFlowSelect = (flow: FlowType) => {
    setSelectedFlow(flow);
  };

  const handleBack = () => {
    setSelectedFlow(null);
  };

  // Render the appropriate flow component
  const renderFlow = () => {
    switch (selectedFlow) {
      case 'new-quote':
        return <NewQuoteFlow onBack={handleBack} />;
      case 'renewal':
        return <RenewalFlow onBack={handleBack} />;
      case 'residencial':
        return <ResidentialInsuranceFlow onBack={handleBack} />;
      case 'empresarial':
        return <BusinessInsuranceFlow onBack={handleBack} />;
      case 'vida':
        return <LifeInsuranceFlow onBack={handleBack} />;
      case 'viagem':
        return <TravelInsuranceFlow onBack={handleBack} />;
      case 'fianca':
        return (
          <ComingSoon
            title="Seguro Fiança"
            description="Garanta seu aluguel de forma segura e sem burocracia."
            onBack={handleBack}
          />
        );
      case 'second-invoice':
        return (
          <ComingSoon
            title="Segunda Via de Boleto"
            description="Acesse rapidamente o boleto da sua apólice."
            onBack={handleBack}
          />
        );
      case 'claim':
        return (
          <ComingSoon
            title="Sinistro Segurado JJ&Amorim"
            description="Comunique um sinistro envolvendo você ou um terceiro, de forma rápida."
            onBack={handleBack}
          />
        );
      default:
        return (
          <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
            <Header />
            <main className="container mx-auto px-4 py-12">
              <FlowSelector onFlowSelect={handleFlowSelect} />
            </main>
          </div>
        );
    }
  };

  return renderFlow();
};

export default Index;
