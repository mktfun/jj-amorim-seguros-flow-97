
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Send } from 'lucide-react';
import FlowHeader from './FlowHeader';
import InitialContactStep from './InitialContactStep';
import { processAndSendData, UnifiedData } from '@/utils/dataProcessor';

interface TravelInsuranceFlowProps {
  onBack: () => void;
}

interface ContactData {
  fullName: string;
  email: string;
  phone: string;
}

const TravelInsuranceFlow: React.FC<TravelInsuranceFlowProps> = ({ onBack }) => {
  const [contactData, setContactData] = useState<ContactData>({
    fullName: '',
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
    let newErrors = { ...errors };

    switch (field) {
      case 'fullName':
        if (!value) {
          newErrors[field] = 'Nome completo é obrigatório';
        } else {
          delete newErrors[field];
        }
        break;
      case 'email':
        if (!value) {
          newErrors[field] = 'Email é obrigatório';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          newErrors[field] = 'Email deve ter um formato válido';
        } else {
          delete newErrors[field];
        }
        break;
      case 'phone':
        if (!value) {
          newErrors[field] = 'Telefone é obrigatório';
        } else if (!/^\(\d{2}\) \d{5}-\d{4}$/.test(value)) {
          newErrors[field] = 'Telefone deve estar no formato (00) 00000-0000';
        } else {
          delete newErrors[field];
        }
        break;
      default:
        break;
    }

    setErrors(newErrors);
  };

  const handleSubmit = async () => {
    const requiredFields = ['fullName', 'email', 'phone'];
    let newErrors: { [key: string]: string } = {};

    requiredFields.forEach(field => {
      if (!contactData[field as keyof ContactData]) {
        newErrors[field] = `${field.charAt(0).toUpperCase() + field.slice(1)} é obrigatório`;
      }
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Validate email and phone format
    validateField('email', contactData.email);
    validateField('phone', contactData.phone);

    if (Object.keys(errors).length > 0) {
      return;
    }

    try {
      const unifiedData: UnifiedData = {
        contactData: {
          ...contactData,
          cpf: '', // CPF not required for travel insurance
        },
        flowType: 'Seguro Viagem',
      };

      await processAndSendData(unifiedData);
    } catch (error) {
      console.error('Erro ao enviar dados:', error);
      alert('Ocorreu um erro ao enviar sua solicitação. Por favor, tente novamente.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <FlowHeader />
      <div className="w-full max-w-5xl mx-auto px-4 py-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-4">
              Seguro Viagem
            </h1>
            <p className="text-gray-600 text-lg">
              Viaje com tranquilidade com nosso seguro viagem completo
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

export default TravelInsuranceFlow;
