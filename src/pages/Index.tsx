
import React, { useState } from 'react';
import Header from '@/components/Header';
import FlowSelector from '@/components/FlowSelector';
import NewQuoteFlow from '@/components/NewQuoteFlow';
import RenewalFlow from '@/components/renewal/RenewalFlow';
import ResidentialInsuranceFlow from '@/components/ResidentialInsuranceFlow';
import ComingSoon from '@/components/ComingSoon';

type FlowType = 'new' | 'renewal' | 'seguro-fianca' | 'seguro-residencial' | 'seguro-empresarial' | 'seguro-vida-individual' | 'seguro-viagem' | null;

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
      case 'new':
        return <NewQuoteFlow onBack={handleBack} />;
      case 'renewal':
        return <RenewalFlow onBack={handleBack} />;
      case 'seguro-residencial':
        return <ResidentialInsuranceFlow onBack={handleBack} />;
      case 'seguro-fianca':
        return (
          <ComingSoon
            title="Seguro Fiança"
            description="Garanta seu aluguel de forma segura e sem burocracia."
            onBack={handleBack}
          />
        );
      case 'seguro-empresarial':
        return (
          <ComingSoon
            title="Seguro Empresarial"
            description="Proteja seu negócio e seus colaboradores."
            onBack={handleBack}
          />
        );
      case 'seguro-vida-individual':
        return (
          <ComingSoon
            title="Seguro de Vida Individual"
            description="Garanta a segurança financeira de quem você ama."
            onBack={handleBack}
          />
        );
      case 'seguro-viagem':
        return (
          <ComingSoon
            title="Seguro Viagem"
            description="Viaje tranquilo com cobertura para imprevistos."
            onBack={handleBack}
          />
        );
      default:
        return (
          <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
            <Header />
            <main className="container mx-auto px-4 py-12">
              <div className="text-center mb-12">
                <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
                  Bem-vindo à JJ & Amorim
                </h1>
                <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                  Escolha o tipo de atendimento que você precisa para começar
                </p>
              </div>
              
              <FlowSelector onFlowSelect={handleFlowSelect} />
            </main>
          </div>
        );
    }
  };

  return renderFlow();
};

export default Index;
