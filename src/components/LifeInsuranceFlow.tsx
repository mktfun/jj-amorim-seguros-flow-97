import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Send } from 'lucide-react';
import FlowHeader from './FlowHeader';
import InitialContactStep from './InitialContactStep';
import { processAndSendData, UnifiedData } from '@/utils/dataProcessor';

interface LifeInsuranceFlowProps {
  onBack: () => void;
}

interface ContactData {
  fullName: string;
  cpf: string;
  email: string;
  phone: string;
}

const LifeInsuranceFlow: React.FC<LifeInsuranceFlowProps> = ({ onBack }) => {
  const [contactData, setContactData] = useState<ContactData>({
    fullName: '',
    cpf: '',
    email: '',
    phone: '',
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const updateContactData = (field: keyof ContactData, value: string) => {
    setContactData(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const validateField = (field: string, value: string) => {
    // Basic validation example
    if (!value) {
      setErrors(prev => ({ ...prev, [field]: 'Este campo é obrigatório' }));
      return false;
    } else {
      setErrors(prev => {
        const { [field]: omit, ...rest } = prev;
        return rest;
      });
      return true;
    }
  };

  const handleSubmit = async () => {
    const isFullNameValid = validateField('fullName', contactData.fullName);
    const isCpfValid = validateField('cpf', contactData.cpf);
    const isEmailValid = validateField('email', contactData.email);
    const isPhoneValid = validateField('phone', contactData.phone);

    if (isFullNameValid && isCpfValid && isEmailValid && isPhoneValid) {
      try {
        const unifiedData: UnifiedData = {
          contactData: contactData,
          personalData: {},
          vehicleData: {},
          riskData: {},
          mainDriverData: {},
          flowType: 'Seguro de Vida Individual'
        };

        await processAndSendData(unifiedData);
        alert('Solicitação enviada com sucesso!');
      } catch (error) {
        console.error('Erro ao enviar solicitação:', error);
        alert('Erro ao enviar a solicitação. Por favor, tente novamente.');
      }
    } else {
      alert('Por favor, preencha todos os campos obrigatórios.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <FlowHeader />
      <div className="w-full max-w-5xl mx-auto px-4 py-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-4">
              Seguro de Vida Individual
            </h1>
            <p className="text-gray-600 text-lg">
              Proteja sua família com nosso seguro de vida completo
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

export default LifeInsuranceFlow;
