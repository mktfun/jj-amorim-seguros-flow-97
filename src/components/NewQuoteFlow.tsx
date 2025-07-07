
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ArrowRight, Send } from 'lucide-react';
import ProgressIndicator from './ProgressIndicator';
import PersonalDataStep from './PersonalDataStep';
import VehicleDataStep from './VehicleDataStep';
import RiskQuestionnaireStep from './RiskQuestionnaireStep';
import { useFormValidation, validationPatterns } from '@/hooks/useFormValidation';
import { processAndSendData, UnifiedData } from '@/utils/dataProcessor';

interface NewQuoteFlowProps {
  onBack: () => void;
}

interface FormData {
  personalData: {
    fullName: string;
    cpf: string;
    birthDate: string;
    maritalStatus: string;
    email: string;
    phone: string;
  };
  vehicleData: {
    model: string;
    plate: string;
    chassis: string;
    year: string;
    isFinanced: string;
  };
  riskData: {
    cep: string;
    garageType: string;
    residenceType: string;
    usesForWork: string;
    workParking: string;
    youngResidents: string;
    rideshareWork: string;
  };
}

const NewQuoteFlow: React.FC<NewQuoteFlowProps> = ({ onBack }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    personalData: {
      fullName: '',
      cpf: '',
      birthDate: '',
      maritalStatus: '',
      email: '',
      phone: ''
    },
    vehicleData: {
      model: '',
      plate: '',
      chassis: '',
      year: '',
      isFinanced: ''
    },
    riskData: {
      cep: '',
      garageType: '',
      residenceType: '',
      usesForWork: '',
      workParking: '',
      youngResidents: '',
      rideshareWork: ''
    }
  });

  const stepTitles = [
    'Dados Pessoais do Principal Condutor',
    'Dados do Veículo',
    'Questionário de Risco'
  ];

  // Validation rules for each step
  const personalDataValidation = useFormValidation({
    fullName: { required: true, message: 'Nome completo é obrigatório' },
    cpf: { 
      required: true, 
      pattern: validationPatterns.cpf, 
      message: 'CPF deve estar no formato 000.000.000-00' 
    },
    birthDate: { required: true, message: 'Data de nascimento é obrigatória' },
    maritalStatus: { required: true, message: 'Estado civil é obrigatório' },
    email: { 
      required: true, 
      pattern: validationPatterns.email, 
      message: 'Email deve ter um formato válido' 
    },
    phone: { 
      required: true, 
      pattern: validationPatterns.phone, 
      message: 'Telefone deve estar no formato (00) 00000-0000' 
    }
  });

  const vehicleDataValidation = useFormValidation({
    model: { required: true, message: 'Modelo do veículo é obrigatório' },
    plate: { 
      required: true, 
      pattern: validationPatterns.plate, 
      message: 'Placa deve estar no formato ABC-1234 ou ABC1D23' 
    },
    chassis: { required: true, message: 'Chassis é obrigatório' },
    year: { required: true, message: 'Ano/modelo é obrigatório' },
    isFinanced: { required: true, message: 'Selecione se o veículo está financiado' }
  });

  const riskDataValidation = useFormValidation({
    cep: { 
      required: true, 
      pattern: validationPatterns.cep, 
      message: 'CEP deve estar no formato 00000-000' 
    },
    garageType: { required: true, message: 'Selecione o tipo de portão' },
    residenceType: { required: true, message: 'Selecione o tipo de residência' },
    usesForWork: { required: true, message: 'Selecione se usa o veículo para trabalho' },
    youngResidents: { required: true, message: 'Selecione se reside com jovens de 18-24 anos' },
    rideshareWork: { required: true, message: 'Selecione se trabalha com transporte por app' }
  });

  const updatePersonalData = (field: keyof FormData['personalData'], value: string) => {
    console.log('Atualizando dados pessoais:', field, value);
    setFormData(prev => ({
      ...prev,
      personalData: { ...prev.personalData, [field]: value }
    }));
  };

  const updateVehicleData = (field: keyof FormData['vehicleData'], value: string) => {
    console.log('Atualizando dados do veículo:', field, value);
    setFormData(prev => ({
      ...prev,
      vehicleData: { ...prev.vehicleData, [field]: value }
    }));
  };

  const updateRiskData = (field: keyof FormData['riskData'], value: string) => {
    console.log('Atualizando dados de risco:', field, value);
    setFormData(prev => ({
      ...prev,
      riskData: { ...prev.riskData, [field]: value }
    }));
    
    // Clear workParking if usesForWork is 'nao'
    if (field === 'usesForWork' && value === 'nao') {
      setFormData(prev => ({
        ...prev,
        riskData: { ...prev.riskData, workParking: '' }
      }));
    }
  };

  const validateCurrentStep = (): boolean => {
    switch (currentStep) {
      case 1:
        return personalDataValidation.validateAll(formData.personalData as { [key: string]: string });
      case 2:
        return vehicleDataValidation.validateAll(formData.vehicleData as { [key: string]: string });
      case 3:
        const riskValidationData = { ...formData.riskData };
        // Only validate workParking if usesForWork is 'sim'
        if (formData.riskData.usesForWork !== 'sim') {
          delete riskValidationData.workParking;
        }
        return riskDataValidation.validateAll(riskValidationData as { [key: string]: string });
      default:
        return true;
    }
  };

  const handleNext = async () => {
    if (validateCurrentStep()) {
      if (currentStep < 3) {
        setCurrentStep(currentStep + 1);
        console.log('Avançando para etapa:', currentStep + 1);
      } else {
        // Final step - processar e enviar dados
        try {
          console.log('Dados coletados completos:', formData);
          
          const unifiedData: UnifiedData = {
            contactData: {
              fullName: formData.personalData.fullName,
              cpf: formData.personalData.cpf,
              email: formData.personalData.email,
              phone: formData.personalData.phone
            },
            personalData: formData.personalData,
            vehicleData: formData.vehicleData,
            riskData: formData.riskData,
            flowType: 'Nova Cotacao de Seguro'
          };

          await processAndSendData(unifiedData);
          
        } catch (error) {
          console.error('Erro ao processar dados:', error);
          alert('Erro ao processar os dados. Por favor, tente novamente.');
        }
      }
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      console.log('Voltando para etapa:', currentStep - 1);
    } else {
      onBack();
    }
  };

  const getValidationForCurrentStep = () => {
    switch (currentStep) {
      case 1: return personalDataValidation;
      case 2: return vehicleDataValidation;
      case 3: return riskDataValidation;
      default: return personalDataValidation;
    }
  };

  const renderCurrentStep = () => {
    const validation = getValidationForCurrentStep();
    
    switch (currentStep) {
      case 1:
        return (
          <PersonalDataStep
            data={formData.personalData}
            onChange={updatePersonalData}
            errors={validation.errors}
            onFieldBlur={validation.validate}
          />
        );
      case 2:
        return (
          <VehicleDataStep
            data={formData.vehicleData}
            onChange={updateVehicleData}
            errors={validation.errors}
            onFieldBlur={validation.validate}
          />
        );
      case 3:
        return (
          <RiskQuestionnaireStep
            data={formData.riskData}
            onChange={updateRiskData}
            errors={validation.errors}
            onFieldBlur={validation.validate}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-12 px-4">
      <div className="w-full max-w-5xl mx-auto">
        <ProgressIndicator
          currentStep={currentStep}
          totalSteps={3}
          stepTitles={stepTitles}
        />

        {renderCurrentStep()}

        {/* Botões de Navegação Redesenhados */}
        <div className="flex justify-between items-center mt-10">
          <Button
            onClick={handleBack}
            variant="outline"
            className="h-14 px-8 text-base font-semibold border-2 border-blue-600 text-blue-600 hover:bg-blue-50 hover:border-blue-700 transition-all duration-200 rounded-xl flex items-center space-x-2"
            size="lg"
          >
            <ArrowLeft className="h-5 w-5" />
            <span>{currentStep === 1 ? 'Voltar à seleção' : 'Voltar'}</span>
          </Button>

          <Button
            onClick={handleNext}
            className="h-14 px-8 text-base font-semibold bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white transition-all duration-200 rounded-xl flex items-center space-x-2 shadow-lg hover:shadow-xl"
            size="lg"
          >
            <span>{currentStep === 3 ? 'Enviar Orçamento' : 'Próxima Etapa'}</span>
            {currentStep === 3 ? (
              <Send className="h-5 w-5" />
            ) : (
              <ArrowRight className="h-5 w-5" />
            )}
          </Button>
        </div>

        {/* Rodapé */}
        <div className="mt-12 pt-8 border-t border-gray-200 text-center">
          <div className="flex flex-wrap justify-center items-center gap-8 text-gray-600">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center">
                <span className="text-white text-sm">🔒</span>
              </div>
              <span className="text-sm font-medium">Seus dados estão protegidos</span>
            </div>
            
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
                <span className="text-white text-sm">⚡</span>
              </div>
              <span className="text-sm font-medium">Sistema rápido e intuitivo</span>
            </div>
            
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-purple-600 rounded-full flex items-center justify-center">
                <span className="text-white text-sm">📞</span>
              </div>
              <span className="text-sm font-medium">Suporte JJ & Amorim</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewQuoteFlow;
