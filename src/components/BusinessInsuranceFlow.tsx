
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Send } from 'lucide-react';
import FlowHeader from './FlowHeader';
import InitialContactStep from './InitialContactStep';
import { processAndSendData, UnifiedData } from '@/utils/dataProcessor';
import { useFormValidation } from '@/hooks/useFormValidation';

interface BusinessInsuranceFlowProps {
  onBack: () => void;
}

interface ContactData {
  fullName: string;
  email: string;
  phone: string;
  cpf: string;
  [key: string]: string;
}

const BusinessInsuranceFlow: React.FC<BusinessInsuranceFlowProps> = ({ onBack }) => {
  const [contactData, setContactData] = useState<ContactData>({
    fullName: '',
    email: '',
    phone: '',
    cpf: '',
  });

  const validation = useFormValidation({
    fullName: { required: true, message: 'Nome completo é obrigatório' },
    email: { required: true, message: 'Email é obrigatório' },
    phone: { required: true, message: 'Telefone é obrigatório' },
  });

  const updateContactData = (field: keyof ContactData, value: string) => {
    setContactData(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const validateField = (field: string, value: string) => {
    validation.validate(field, value);
  };

  const handleSubmit = async () => {
    if (validation.validateAll(contactData)) {
      try {
        const unifiedData: UnifiedData = {
          contactData: {
            ...contactData,
            cpf: contactData.cpf || '', // Ensure cpf is always a string
          },
          flowType: 'Seguro Empresarial',
        };
        await processAndSendData(unifiedData);
      } catch (error) {
        console.error('Erro ao enviar dados:', error);
        alert('Erro ao enviar os dados. Por favor, tente novamente.');
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <FlowHeader />
      <div className="w-full max-w-5xl mx-auto px-4 py-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-4">
              Seguro Empresarial
            </h1>
            <p className="text-gray-600 text-lg">
              Proteja seu negócio com nosso seguro empresarial completo
            </p>
          </div>

          <InitialContactStep
            data={contactData}
            onChange={updateContactData}
            errors={validation.errors}
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

export default BusinessInsuranceFlow;
