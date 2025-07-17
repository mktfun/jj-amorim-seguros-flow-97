
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Send } from 'lucide-react';
import FlowHeader from './FlowHeader';
import InitialContactStep from './InitialContactStep';
import { processAndSendData, UnifiedData } from '@/utils/dataProcessor';
import { useFormValidation, validationPatterns } from '@/hooks/useFormValidation';

interface ResidentialInsuranceFlowProps {
  onBack: () => void;
}

interface ContactData {
  fullName: string;
  email: string;
  phone: string;
}

const ResidentialInsuranceFlow: React.FC<ResidentialInsuranceFlowProps> = ({ onBack }) => {
  const [contactData, setContactData] = useState<ContactData>({
    fullName: '',
    email: '',
    phone: ''
  });

  const validation = useFormValidation({
    fullName: { required: true, message: 'Nome completo é obrigatório' },
    email: { required: true, pattern: validationPatterns.email, message: 'Email deve ter um formato válido' },
    phone: { required: true, pattern: validationPatterns.phone, message: 'Telefone deve estar no formato (00) 00000-0000' }
  });

  const updateContactData = (field: keyof ContactData, value: string) => {
    setContactData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const validateField = (field: string, value: string) => {
    validation.validate(field, value);
  };

  const handleSubmit = async () => {
    if (validation.validateAll(contactData as { [key: string]: string })) {
      try {
        const unifiedData: UnifiedData = {
          contactData: {
            ...contactData,
            cpf: '', // CPF not required for residential insurance
          },
          flowType: 'Seguro Residencial'
        };

        await processAndSendData(unifiedData);
      } catch (error) {
        console.error('Erro ao enviar dados:', error);
        alert('Erro ao enviar os dados. Por favor, tente novamente.');
      }
    }
  };

  const errors = validation.errors;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <FlowHeader />
      <div className="w-full max-w-5xl mx-auto px-4 py-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-4">
              Seguro Residencial
            </h1>
            <p className="text-gray-600 text-lg">
              Proteja seu lar com nosso seguro residencial completo
            </p>
          </div>

          <InitialContactStep
            data={contactData}
            onChange={updateContactData}
            errors={errors}
            onFieldBlur={validateField}
          />

          <div className="flex justify-between items-center mt-10">
            <Button
              onClick={onBack}
              variant="outline"
              className="h-14 px-8 text-base font-semibold border-2 border-blue-600 text-blue-600 hover:bg-blue-50 hover:border-blue-700 transition-all duration-200 rounded-xl flex items-center space-x-2"
              size="lg"
            >
              <ArrowLeft className="h-5 w-5" />
              <span>Voltar à seleção</span>
            </Button>

            <Button
              onClick={handleSubmit}
              className="h-14 px-8 text-base font-semibold bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white transition-all duration-200 rounded-xl flex items-center space-x-2 shadow-lg hover:shadow-xl"
              size="lg"
            >
              <span>Enviar Solicitação</span>
              <Send className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResidentialInsuranceFlow;
