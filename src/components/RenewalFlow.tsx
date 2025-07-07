
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import ProgressIndicator from './ProgressIndicator';
import InitialContactStep from './InitialContactStep';
import DataChangeQuestion from './DataChangeQuestion';
import QuickConfirmation from './QuickConfirmation';
import ConditionalEditStep from './ConditionalEditStep';
import { useFormValidation, validationPatterns } from '@/hooks/useFormValidation';
import { processAndSendData, UnifiedData } from '@/utils/dataProcessor';

interface RenewalFlowProps {
  onBack: () => void;
}

interface ContactData {
  fullName: string;
  cpf: string;
  email: string;
  phone: string;
}

interface PersonalData {
  fullName: string;
  cpf: string;
  birthDate: string;
  maritalStatus: string;
  email: string;
  phone: string;
}

interface VehicleData {
  model: string;
  plate: string;
  chassis: string;
  year: string;
  isFinanced: string;
}

interface RiskData {
  cep: string;
  logradouro: string;
  bairro: string;
  localidade: string;
  uf: string;
  garageType: string;
  residenceType: string;
  usesForWork: string;
  workParking: string;
  youngResidents: string;
  rideshareWork: string;
}

const RenewalFlow: React.FC<RenewalFlowProps> = ({ onBack }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [hasChanges, setHasChanges] = useState('');
  const [contactData, setContactData] = useState<ContactData>({
    fullName: '',
    cpf: '',
    email: '',
    phone: ''
  });

  const [personalData, setPersonalData] = useState<PersonalData>({
    fullName: '',
    cpf: '',
    birthDate: '',
    maritalStatus: '',
    email: '',
    phone: ''
  });

  const [vehicleData, setVehicleData] = useState<VehicleData>({
    model: '',
    plate: '',
    chassis: '',
    year: '',
    isFinanced: ''
  });

  const [riskData, setRiskData] = useState<RiskData>({
    cep: '',
    logradouro: '',
    bairro: '',
    localidade: '',
    uf: '',
    garageType: '',
    residenceType: '',
    usesForWork: '',
    workParking: '',
    youngResidents: '',
    rideshareWork: ''
  });

  const stepTitles = [
    'Dados de Contato',
    'Verificação de Alterações',
    hasChanges === 'nao' ? 'Confirmação Final' : 'Edição de Dados'
  ];

  // Validation for contact data
  const contactValidation = useFormValidation({
    fullName: { required: true, message: 'Nome completo é obrigatório' },
    cpf: { 
      required: true, 
      pattern: validationPatterns.cpf,
      customValidator: validateCPF,
      message: 'CPF inválido. Por favor, verifique o número.' 
    },
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

  const updateContactData = (field: keyof ContactData, value: string) => {
    console.log('Atualizando dados de contato:', field, value);
    setContactData(prev => ({ ...prev, [field]: value }));
  };

  const updatePersonalData = (field: keyof PersonalData, value: string) => {
    console.log('Atualizando dados pessoais:', field, value);
    setPersonalData(prev => ({ ...prev, [field]: value }));
  };

  const updateVehicleData = (field: keyof VehicleData, value: string) => {
    console.log('Atualizando dados do veículo:', field, value);
    setVehicleData(prev => ({ ...prev, [field]: value }));
  };

  const updateRiskData = (field: keyof RiskData, value: string) => {
    console.log('Atualizando dados de risco:', field, value);
    setRiskData(prev => ({ ...prev, [field]: value }));
    
    // Clear workParking if usesForWork is 'nao'
    if (field === 'usesForWork' && value === 'nao') {
      setRiskData(prev => ({ ...prev, workParking: '' }));
    }
  };

  const validateCurrentStep = (): boolean => {
    switch (currentStep) {
      case 1:
        return contactValidation.validateAll(contactData as unknown as { [key: string]: string });
      case 2:
        if (!hasChanges) {
          alert('Por favor, selecione uma opção.');
          return false;
        }
        return true;
      default:
        return true;
    }
  };

  const handleNext = async () => {
    console.log('Tentando avançar da etapa:', currentStep);
    
    if (validateCurrentStep()) {
      if (currentStep === 1) {
        setCurrentStep(2);
        console.log('Avançando para verificação de alterações');
      } else if (currentStep === 2) {
        if (hasChanges === 'nao') {
          setCurrentStep(3); // Vai para confirmação rápida
          console.log('Nenhuma alteração - indo para confirmação');
        } else {
          setCurrentStep(3); // Vai para edição condicional
          console.log('Há alterações - indo para edição');
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

  const handleQuickConfirmation = async () => {
    try {
      console.log('Confirmação rápida - sem alterações');
      
      const unifiedData: UnifiedData = {
        contactData: {
          fullName: contactData.fullName,
          cpf: contactData.cpf,
          email: contactData.email,
          phone: contactData.phone
        },
        personalData: {
          fullName: contactData.fullName,
          cpf: contactData.cpf,
          birthDate: '',
          maritalStatus: '',
          email: contactData.email,
          phone: contactData.phone
        },
        vehicleData: vehicleData,
        riskData: riskData,
        flowType: 'Renovacao Seguro Auto'
      };

      await processAndSendData(unifiedData);
      
    } catch (error) {
      console.error('Erro ao processar confirmação rápida:', error);
      alert('Erro ao processar os dados. Por favor, tente novamente.');
    }
  };

  const handleConditionalEdit = async () => {
    try {
      console.log('Enviando alterações condicionais');
      
      const unifiedData: UnifiedData = {
        contactData: {
          fullName: contactData.fullName,
          cpf: contactData.cpf,
          email: contactData.email,
          phone: contactData.phone
        },
        personalData: personalData,
        vehicleData: vehicleData,
        riskData: riskData,
        flowType: 'Renovacao Seguro Auto'
      };

      await processAndSendData(unifiedData);
      
    } catch (error) {
      console.error('Erro ao processar alterações:', error);
      alert('Erro ao processar os dados. Por favor, tente novamente.');
    }
  };

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <InitialContactStep
            data={contactData}
            onChange={updateContactData}
            errors={contactValidation.errors}
            onFieldBlur={contactValidation.validate}
          />
        );
      case 2:
        return (
          <DataChangeQuestion
            hasChanges={hasChanges}
            onChange={setHasChanges}
            error={!hasChanges && currentStep === 2 ? 'Por favor, selecione uma opção' : undefined}
          />
        );
      case 3:
        if (hasChanges === 'nao') {
          return <QuickConfirmation onConfirm={handleQuickConfirmation} />;
        } else {
          return (
            <ConditionalEditStep
              personalData={personalData}
              vehicleData={vehicleData}
              riskData={riskData}
              onPersonalDataChange={updatePersonalData}
              onVehicleDataChange={updateVehicleData}
              onRiskDataChange={updateRiskData}
              errors={{}}
              onFieldBlur={() => {}}
              onSubmit={handleConditionalEdit}
            />
          );
        }
      default:
        return null;
    }
  };

  const shouldShowNavigation = currentStep < 3 || (currentStep === 3 && hasChanges === 'sim');

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-12 px-4">
      <div className="w-full max-w-5xl mx-auto">
        <ProgressIndicator
          currentStep={currentStep}
          totalSteps={3}
          stepTitles={stepTitles}
        />

        {renderCurrentStep()}

        {/* Botões de Navegação */}
        {shouldShowNavigation && (
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
              <span>Continuar</span>
              <ArrowRight className="h-5 w-5" />
            </Button>
          </div>
        )}

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
              <span className="text-sm font-medium">Processo rápido e seguro</span>
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

export default RenewalFlow;
