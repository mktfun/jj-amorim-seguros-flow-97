import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ArrowRight, Send } from 'lucide-react';
import FlowHeader from './FlowHeader';
import InitialContactStep from './InitialContactStep';
import FiancaDataStep from './FiancaDataStep';
import { processAndSendData, UnifiedData } from '@/utils/dataProcessor';

interface FiancaInsuranceFlowProps {
  onBack: () => void;
}

interface ContactData {
  fullName: string;
  cpf: string;
  email: string;
  phone: string;
}

interface FiancaData {
  propertyType: string;
  propertyAddress: string;
  propertyValue: string;
  rentValue: string;
}

const FiancaInsuranceFlow: React.FC<FiancaInsuranceFlowProps> = ({ onBack }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [contactData, setContactData] = useState<ContactData>({
    fullName: '',
    cpf: '',
    email: '',
    phone: '',
  });
  const [fiancaData, setFiancaData] = useState<FiancaData>({
    propertyType: '',
    propertyAddress: '',
    propertyValue: '',
    rentValue: '',
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const updateContactData = (field: keyof ContactData, value: string) => {
    setContactData(prev => ({ ...prev, [field]: value }));
  };

  const updateFiancaData = (field: keyof FiancaData, value: string) => {
    setFiancaData(prev => ({ ...prev, [field]: value }));
  };

  const validateField = (field: string, value: string) => {
    // Implement validation logic here
    setErrors(prevErrors => ({ ...prevErrors, [field]: '' })); // Clear previous error
    if (!value) {
      setErrors(prevErrors => ({ ...prevErrors, [field]: 'Campo obrigatório' }));
      return false;
    }
    return true;
  };

  const handleSubmit = async () => {
    // Validate all fields before submitting
    const isContactValid = Object.keys(contactData).every(field =>
      validateField(field, contactData[field as keyof ContactData])
    );
    const isFiancaValid = Object.keys(fiancaData).every(field =>
      validateField(field, fiancaData[field as keyof FiancaData])
    );

    if (!isContactValid || !isFiancaValid) {
      alert('Por favor, preencha todos os campos obrigatórios.');
      return;
    }

    // Process and send data
    try {
      const unifiedData: UnifiedData = {
        contactData: contactData,
        personalData: {
          fullName: contactData.fullName,
          cpf: contactData.cpf,
          email: contactData.email,
          phone: contactData.phone,
        } as any, // Adjust as necessary
        vehicleData: {} as any, // Adjust as necessary
        riskData: {} as any, // Adjust as necessary
        fiancaData: fiancaData,
        flowType: 'Seguro Fiança',
      };
      await processAndSendData(unifiedData);
      alert('Solicitação enviada com sucesso!');
    } catch (error) {
      console.error('Erro ao enviar solicitação:', error);
      alert('Erro ao enviar a solicitação. Por favor, tente novamente.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <FlowHeader />
      <div className="w-full max-w-5xl mx-auto px-4 py-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-4">
              Seguro Fiança
            </h1>
            <p className="text-gray-600 text-lg">
              Facilite o aluguel com nosso seguro fiança
            </p>
          </div>

          {currentStep === 1 && (
            <InitialContactStep
              data={contactData}
              onChange={updateContactData}
              errors={errors}
              onFieldBlur={validateField}
            />
          )}

          {currentStep === 2 && (
            <FiancaDataStep
              data={fiancaData}
              onChange={updateFiancaData}
              errors={errors}
              onFieldBlur={validateField}
            />
          )}

          <div className="flex justify-between items-center mt-10">
            <Button
              onClick={currentStep === 1 ? onBack : () => setCurrentStep(1)}
              variant="outline"
              className="h-14 px-8 text-base font-semibold border-2 border-blue-600 text-blue-600 hover:bg-blue-50 hover:border-blue-700 transition-all duration-200 rounded-xl flex items-center space-x-2"
              size="lg"
            >
              <ArrowLeft className="h-5 w-5" />
              <span>{currentStep === 1 ? 'Voltar à seleção' : 'Voltar'}</span>
            </Button>

            <Button
              onClick={currentStep === 1 ? () => setCurrentStep(2) : handleSubmit}
              className="h-14 px-8 text-base font-semibold bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white transition-all duration-200 rounded-xl flex items-center space-x-2 shadow-lg hover:shadow-xl"
              size="lg"
            >
              <span>{currentStep === 1 ? 'Próxima Etapa' : 'Enviar Solicitação'}</span>
              {currentStep === 1 ? (
                <ArrowRight className="h-5 w-5" />
              ) : (
                <Send className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FiancaInsuranceFlow;
