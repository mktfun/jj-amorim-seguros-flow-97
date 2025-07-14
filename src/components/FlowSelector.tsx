
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, Car, Check, Shield, Clock, Lock, FileText, AlertTriangle } from 'lucide-react';

interface FlowSelectorProps {
  onFlowSelect: (flow: 'new-quote' | 'renewal' | 'second-invoice' | 'claim') => void;
}

const FlowSelector: React.FC<FlowSelectorProps> = ({ onFlowSelect }) => {
  const [selectedFlow, setSelectedFlow] = useState<string>('');

  const handleContinue = () => {
    if (selectedFlow) {
      onFlowSelect(selectedFlow as 'new-quote' | 'renewal' | 'second-invoice' | 'claim');
    }
  };

  const handleCardSelect = (flow: string) => {
    setSelectedFlow(flow);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-16 px-4">
      <div className="w-full max-w-4xl mx-auto">
        {/* Container Principal */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
          
          {/* Seção do Título */}
          <div className="px-8 md:px-12 pt-12 pb-8 text-center bg-gradient-to-b from-white to-gray-50/30">
            <h1 className="text-4xl md:text-5xl font-bold text-jj-blue-dark mb-6 leading-tight">
              Bem-vindo ao Questionário
              <span className="block text-jj-blue-medium">JJ & Amorim!</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-600 leading-relaxed max-w-2xl mx-auto">
              Para iniciarmos, por favor, selecione qual o seu objetivo com este questionário:
            </p>
          </div>

          {/* Cards de Seleção */}
          <div className="px-8 md:px-12 py-8">
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              
              {/* Card Nova Cotação */}
              <Card 
                className={`relative p-8 cursor-pointer transition-all duration-300 border-2 hover:shadow-xl group ${
                  selectedFlow === 'new-quote' 
                    ? 'border-jj-blue-medium bg-jj-cyan-light shadow-md scale-[1.02]' 
                    : 'border-gray-200 hover:border-jj-blue-medium hover:scale-[1.01]'
                }`}
                onClick={() => handleCardSelect('new-quote')}
              >
                <div className="text-center">
                  {/* Ícone */}
                  <div className={`w-16 h-16 mx-auto mb-6 rounded-full flex items-center justify-center transition-all duration-300 ${
                    selectedFlow === 'new-quote' 
                      ? 'bg-jj-blue-medium' 
                      : 'bg-jj-cyan-light group-hover:bg-jj-blue-medium'
                  }`}>
                    <Car className={`w-8 h-8 transition-colors duration-300 ${
                      selectedFlow === 'new-quote' 
                        ? 'text-white' 
                        : 'text-jj-blue-medium group-hover:text-white'
                    }`} />
                  </div>
                  
                  {/* Título */}
                  <h3 className="text-xl font-bold text-jj-blue-dark mb-4">
                    Quero uma nova cotação de seguro
                  </h3>
                  
                  {/* Descrição */}
                  <p className="text-gray-600 leading-relaxed">
                    Vou fazer algumas perguntas sobre você e seu veículo para encontrar a melhor opção de seguro.
                  </p>
                </div>

                {/* Indicador de Seleção */}
                {selectedFlow === 'new-quote' && (
                  <div className="absolute top-4 right-4 w-6 h-6 bg-jj-blue-medium rounded-full flex items-center justify-center">
                    <Check className="w-4 h-4 text-white" />
                  </div>
                )}
              </Card>

              {/* Card Renovação */}
              <Card 
                className={`relative p-8 cursor-pointer transition-all duration-300 border-2 hover:shadow-xl group ${
                  selectedFlow === 'renewal' 
                    ? 'border-jj-blue-medium bg-jj-cyan-light shadow-md scale-[1.02]' 
                    : 'border-gray-200 hover:border-jj-blue-medium hover:scale-[1.01]'
                }`}
                onClick={() => handleCardSelect('renewal')}
              >
                <div className="text-center">
                  {/* Ícone */}
                  <div className={`w-16 h-16 mx-auto mb-6 rounded-full flex items-center justify-center transition-all duration-300 ${
                    selectedFlow === 'renewal' 
                      ? 'bg-jj-blue-medium' 
                      : 'bg-jj-cyan-light group-hover:bg-jj-blue-medium'
                  }`}>
                    <Shield className={`w-8 h-8 transition-colors duration-300 ${
                      selectedFlow === 'renewal' 
                        ? 'text-white' 
                        : 'text-jj-blue-medium group-hover:text-white'
                    }`} />
                  </div>
                  
                  {/* Título */}
                  <h3 className="text-xl font-bold text-jj-blue-dark mb-4">
                    Quero renovar meu seguro e confirmar meus dados
                  </h3>
                  
                  {/* Descrição */}
                  <p className="text-gray-600 leading-relaxed">
                    Vou verificar seus dados atuais e fazer as atualizações necessárias para sua renovação.
                  </p>
                </div>

                {/* Indicador de Seleção */}
                {selectedFlow === 'renewal' && (
                  <div className="absolute top-4 right-4 w-6 h-6 bg-jj-blue-medium rounded-full flex items-center justify-center">
                    <Check className="w-4 h-4 text-white" />
                  </div>
                )}
              </Card>

              {/* Card Segunda Via de Boleto */}
              <Card 
                className={`relative p-8 cursor-pointer transition-all duration-300 border-2 hover:shadow-xl group ${
                  selectedFlow === 'second-invoice' 
                    ? 'border-jj-blue-medium bg-jj-cyan-light shadow-md scale-[1.02]' 
                    : 'border-gray-200 hover:border-jj-blue-medium hover:scale-[1.01]'
                }`}
                onClick={() => handleCardSelect('second-invoice')}
              >
                <div className="text-center">
                  {/* Ícone */}
                  <div className={`w-16 h-16 mx-auto mb-6 rounded-full flex items-center justify-center transition-all duration-300 ${
                    selectedFlow === 'second-invoice' 
                      ? 'bg-jj-blue-medium' 
                      : 'bg-jj-cyan-light group-hover:bg-jj-blue-medium'
                  }`}>
                    <FileText className={`w-8 h-8 transition-colors duration-300 ${
                      selectedFlow === 'second-invoice' 
                        ? 'text-white' 
                        : 'text-jj-blue-medium group-hover:text-white'
                    }`} />
                  </div>
                  
                  {/* Título */}
                  <h3 className="text-xl font-bold text-jj-blue-dark mb-4">
                    Segunda Via de Boleto
                  </h3>
                  
                  {/* Descrição */}
                  <p className="text-gray-600 leading-relaxed">
                    Acesse rapidamente o boleto da sua apólice.
                  </p>
                </div>

                {/* Indicador de Seleção */}
                {selectedFlow === 'second-invoice' && (
                  <div className="absolute top-4 right-4 w-6 h-6 bg-jj-blue-medium rounded-full flex items-center justify-center">
                    <Check className="w-4 h-4 text-white" />
                  </div>
                )}
              </Card>

              {/* Card Sinistro Segurado */}
              <Card 
                className={`relative p-8 cursor-pointer transition-all duration-300 border-2 hover:shadow-xl group ${
                  selectedFlow === 'claim' 
                    ? 'border-jj-blue-medium bg-jj-cyan-light shadow-md scale-[1.02]' 
                    : 'border-gray-200 hover:border-jj-blue-medium hover:scale-[1.01]'
                }`}
                onClick={() => handleCardSelect('claim')}
              >
                <div className="text-center">
                  {/* Ícone */}
                  <div className={`w-16 h-16 mx-auto mb-6 rounded-full flex items-center justify-center transition-all duration-300 ${
                    selectedFlow === 'claim' 
                      ? 'bg-jj-blue-medium' 
                      : 'bg-jj-cyan-light group-hover:bg-jj-blue-medium'
                  }`}>
                    <AlertTriangle className={`w-8 h-8 transition-colors duration-300 ${
                      selectedFlow === 'claim' 
                        ? 'text-white' 
                        : 'text-jj-blue-medium group-hover:text-white'
                    }`} />
                  </div>
                  
                  {/* Título */}
                  <h3 className="text-xl font-bold text-jj-blue-dark mb-4">
                    Sinistro Segurado JJ&Amorim
                  </h3>
                  
                  {/* Descrição */}
                  <p className="text-gray-600 leading-relaxed">
                    Comunique um sinistro envolvendo você ou um terceiro, de forma rápida.
                  </p>
                </div>

                {/* Indicador de Seleção */}
                {selectedFlow === 'claim' && (
                  <div className="absolute top-4 right-4 w-6 h-6 bg-jj-blue-medium rounded-full flex items-center justify-center">
                    <Check className="w-4 h-4 text-white" />
                  </div>
                )}
              </Card>
            </div>

            {/* Botão Continuar */}
            <div className="text-center mb-8">
              <Button
                onClick={handleContinue}
                disabled={!selectedFlow}
                className={`px-12 py-4 text-lg font-semibold rounded-xl transition-all duration-300 ${
                  selectedFlow 
                    ? 'bg-jj-blue-dark hover:bg-jj-blue-dark/90 text-white shadow-lg hover:shadow-xl transform hover:scale-[1.02]' 
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
                size="lg"
              >
                Continuar
                <ArrowRight className="ml-3 h-5 w-5" />
              </Button>
            </div>
          </div>

          {/* Rodapé com Benefícios */}
          <div className="px-8 md:px-12 py-8 bg-gray-50/50 border-t border-gray-100">
            <div className="flex flex-wrap justify-center items-center gap-8 text-center">
              <div className="flex items-center space-x-2 text-gray-600">
                <div className="w-8 h-8 bg-jj-cyan-light rounded-full flex items-center justify-center">
                  <Clock className="w-4 h-4 text-jj-blue-medium" />
                </div>
                <span className="text-sm font-medium">Processo rápido e seguro</span>
              </div>
              
              <div className="flex items-center space-x-2 text-gray-600">
                <div className="w-8 h-8 bg-jj-cyan-light rounded-full flex items-center justify-center">
                  <Shield className="w-4 h-4 text-jj-blue-medium" />
                </div>
                <span className="text-sm font-medium">100% online</span>
              </div>
              
              <div className="flex items-center space-x-2 text-gray-600">
                <div className="w-8 h-8 bg-jj-cyan-light rounded-full flex items-center justify-center">
                  <Lock className="w-4 h-4 text-jj-blue-medium" />
                </div>
                <span className="text-sm font-medium">Seus dados protegidos</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlowSelector;
