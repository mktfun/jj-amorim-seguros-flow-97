import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import ContactDataStep from './ContactDataStep';
import RenewalOriginQuestion from './RenewalOriginQuestion';
import PreviousPolicyData from './PreviousPolicyData';
import PersonalDataConfirmation from './PersonalDataConfirmation';
import VehicleDataConfirmation from './VehicleDataConfirmation';
import RiskDataConfirmation from './RiskDataConfirmation';
import FinalConfirmation from './FinalConfirmation';
import ProgressIndicator from '../ProgressIndicator';
import { useFormValidation, validationPatterns, validateCPF } from '@/hooks/useFormValidation';
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

interface PreviousPolicyDataType {
  seguradoraAnterior: string;
  novoBonusPG: string;
  codigoIdentificacao: string;
  numeroApoliceAnterior: string;
  vigFinalAnterior: string;
  qtdSinistros: string;
}

interface PersonalData {
  fullName: string;
  cpf: string;
  birthDate: string;
  maritalStatus: string;
  email: string;
  phone: string;
  profession: string;
}

interface VehicleData {
  model: string;
  plate: string;
  year: string;
  isFinanced: string;
}

interface RiskData {
  cep: string;
  logradouro: string;
  bairro: string;
  localidade: string;
  uf: string;
  numero: string;
  complemento: string;
  garageType: string;
  residenceType: string;
  usesForWork: string;
  workParking: string;
  youngResidents: string;
  youngDriversUseVehicle: string;
  youngDriverAge: string;
  youngDriverGender: string;
  rideshareWork: string;
}

const RenewalFlow: React.FC<RenewalFlowProps> = ({ onBack }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [origin, setOrigin] = useState('');
  
  const [contactData, setContactData] = useState<ContactData>({
    fullName: '',
    cpf: '',
    email: '',
    phone: ''
  });

  const [previousPolicyData, setPreviousPolicyData] = useState<PreviousPolicyDataType>({
    seguradoraAnterior: '',
    novoBonusPG: '',
    codigoIdentificacao: '',
    numeroApoliceAnterior: '',
    vigFinalAnterior: '',
    qtdSinistros: ''
  });

  const [personalData, setPersonalData] = useState<PersonalData>({
    fullName: '',
    cpf: '',
    birthDate: '',
    maritalStatus: '',
    email: '',
    phone: '',
    profession: ''
  });

  const [vehicleData, setVehicleData] = useState<VehicleData>({
    model: '',
    plate: '',
    year: '',
    isFinanced: ''
  });

  const [riskData, setRiskData] = useState<RiskData>({
    cep: '',
    logradouro: '',
    bairro: '',
    localidade: '',
    uf: '',
    numero: '',
    complemento: '',
    garageType: '',
    residenceType: '',
    usesForWork: '',
    workParking: '',
    youngResidents: '',
    youngDriversUseVehicle: '',
    youngDriverAge: '',
    youngDriverGender: '',
    rideshareWork: ''
  });

  const getStepTitles = () => {
    const titles = ['Dados de Contato', 'Origem da Renovação'];
    
    if (origin === 'outra_corretora') {
      titles.push('Dados da Apólice Anterior');
    }
    
    titles.push('Confirme seus Dados Pessoais', 'Confirme os Dados do Veículo', 'Confirme o Questionário de Risco', 'Confirmação Final');
    
    return titles;
  };

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

  const previousPolicyValidation = useFormValidation({
    seguradoraAnterior: { required: true, message: 'Nome da seguradora é obrigatório' },
    novoBonusPG: { required: true, message: 'Novo bônus é obrigatório' },
    numeroApoliceAnterior: { required: true, message: 'Número da apólice anterior é obrigatório' },
    vigFinalAnterior: { 
      required: true, 
      pattern: /^\d{2}\/\d{2}\/\d{4}$/,
      message: 'Data deve estar no formato dd/mm/aaaa' 
    },
    qtdSinistros: { required: true, message: 'Quantidade de sinistros é obrigatória' }
  });

  const personalDataValidation = useFormValidation({
    fullName: { required: true, message: 'Nome completo é obrigatório' },
    cpf: { 
      required: true, 
      pattern: validationPatterns.cpf,
      customValidator: validateCPF,
      message: 'CPF inválido' 
    },
    birthDate: { 
      required: true, 
      pattern: /^\d{2}\/\d{2}\/\d{4}$/,
      message: 'Data deve estar no formato dd/mm/aaaa' 
    },
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
      pattern: /^[A-Z]{3}-\d{4}$/,
      message: 'Placa deve estar no formato ABC-1234' 
    },
    year: { required: true, message: 'Ano/modelo é obrigatório' },
    isFinanced: { required: true, message: 'Informe se o veículo está financiado' }
  });

  const riskDataValidation = useFormValidation({
    cep: { 
      required: true, 
      pattern: /^\d{5}-\d{3}$/,
      message: 'CEP deve estar no formato 00000-000' 
    },
    logradouro: { required: true, message: 'Logradouro é obrigatório' },
    bairro: { required: true, message: 'Bairro é obrigatório' },
    localidade: { required: true, message: 'Cidade é obrigatória' },
    uf: { required: true, message: 'Estado é obrigatório' },
    numero: { required: true, message: 'Número é obrigatório' },
    garageType: { required: true, message: 'Tipo de garagem é obrigatório' },
    residenceType: { required: true, message: 'Tipo de residência é obrigatório' },
    usesForWork: { required: true, message: 'Uso para trabalho é obrigatório' },
    workParking: { required: true, message: 'Estacionamento no trabalho é obrigatório' },
    youngResidents: { required: true, message: 'Informação sobre jovens residentes é obrigatória' },
    youngDriversUseVehicle: { required: true, message: 'Informação sobre jovens condutores é obrigatória' },
    rideshareWork: { required: true, message: 'Informação sobre app de transporte é obrigatória' }
  });

  const updateContactData = (field: keyof ContactData, value: string) => {
    setContactData(prev => ({ ...prev, [field]: value }));
  };

  const updatePreviousPolicyData = (field: keyof PreviousPolicyDataType, value: string) => {
    setPreviousPolicyData(prev => ({ ...prev, [field]: value }));
  };

  const updatePersonalData = (field: keyof PersonalData, value: string) => {
    setPersonalData(prev => ({ ...prev, [field]: value }));
  };

  const updateVehicleData = (field: keyof VehicleData, value: string) => {
    setVehicleData(prev => ({ ...prev, [field]: value }));
  };

  const updateRiskData = (field: keyof RiskData, value: string) => {
    setRiskData(prev => ({ ...prev, [field]: value }));
  };

  const getCurrentStepIndex = () => {
    if (currentStep <= 2) return currentStep;
    if (origin === 'outra_corretora') {
      return currentStep;
    } else {
      return currentStep - 1; // Skip the previous policy step
    }
  };

  const getTotalSteps = () => {
    return origin === 'outra_corretora' ? 7 : 6;
  };

  const validateCurrentStep = (): boolean => {
    switch (currentStep) {
      case 1:
        return contactValidation.validateAll(contactData as unknown as { [key: string]: string });
      case 2:
        if (!origin) {
          alert('Por favor, selecione uma opção.');
          return false;
        }
        return true;
      case 3:
        if (origin === 'outra_corretora') {
          return previousPolicyValidation.validateAll(previousPolicyData as unknown as { [key: string]: string });
        } else {
          return personalDataValidation.validateAll(personalData as unknown as { [key: string]: string });
        }
      case 4:
        if (origin === 'outra_corretora') {
          return personalDataValidation.validateAll(personalData as unknown as { [key: string]: string });
        } else {
          return vehicleDataValidation.validateAll(vehicleData as unknown as { [key: string]: string });
        }
      case 5:
        if (origin === 'outra_corretora') {
          return vehicleDataValidation.validateAll(vehicleData as unknown as { [key: string]: string });
        } else {
          return riskDataValidation.validateAll(riskData as unknown as { [key: string]: string });
        }
      case 6:
        if (origin === 'outra_corretora') {
          return riskDataValidation.validateAll(riskData as unknown as { [key: string]: string });
        } else {
          return true; // Final confirmation
        }
      case 7:
        return true; // Final confirmation for outra_corretora flow
      default:
        return true;
    }
  };

  const handleNext = () => {
    if (validateCurrentStep()) {
      if (currentStep === 2 && origin === 'jj_amorim') {
        // Skip step 3 (previous policy data) for JJ & Amorim
        setCurrentStep(4);
      } else {
        setCurrentStep(currentStep + 1);
      }
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      if (currentStep === 4 && origin === 'jj_amorim') {
        // Skip step 3 when going back for JJ & Amorim
        setCurrentStep(2);
      } else {
        setCurrentStep(currentStep - 1);
      }
    } else {
      onBack();
    }
  };

  const handleFinalSubmit = async () => {
    try {
      const unifiedData: UnifiedData = {
        contactData: contactData,
        personalData: personalData,
        vehicleData: vehicleData,
        riskData: riskData,
        hasChanges: true,
        flowType: 'Renovacao Seguro Auto',
        origem_renovacao: origin,
        dados_apolice_anterior: origin === 'outra_corretora' ? previousPolicyData : undefined
      };

      await processAndSendData(unifiedData);
    } catch (error) {
      console.error('Erro ao processar dados da renovação:', error);
      alert('Erro ao processar os dados. Por favor, tente novamente.');
    }
  };

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <ContactDataStep
            data={contactData}
            onChange={updateContactData}
            errors={contactValidation.errors}
            onFieldBlur={contactValidation.validate}
          />
        );
      case 2:
        return (
          <RenewalOriginQuestion
            origin={origin}
            onChange={setOrigin}
            error={!origin ? 'Por favor, selecione uma opção' : undefined}
          />
        );
      case 3:
        if (origin === 'outra_corretora') {
          return (
            <PreviousPolicyData
              data={previousPolicyData}
              onChange={updatePreviousPolicyData}
              errors={previousPolicyValidation.errors}
              onFieldBlur={previousPolicyValidation.validate}
            />
          );
        } else {
          return (
            <PersonalDataConfirmation
              data={personalData}
              onChange={updatePersonalData}
              errors={personalDataValidation.errors}
              onFieldBlur={personalDataValidation.validate}
            />
          );
        }
      case 4:
        if (origin === 'outra_corretora') {
          return (
            <PersonalDataConfirmation
              data={personalData}
              onChange={updatePersonalData}
              errors={personalDataValidation.errors}
              onFieldBlur={personalDataValidation.validate}
            />
          );
        } else {
          return (
            <VehicleDataConfirmation
              data={vehicleData}
              onChange={updateVehicleData}
              errors={vehicleDataValidation.errors}
              onFieldBlur={vehicleDataValidation.validate}
            />
          );
        }
      case 5:
        if (origin === 'outra_corretora') {
          return (
            <VehicleDataConfirmation
              data={vehicleData}
              onChange={updateVehicleData}
              errors={vehicleDataValidation.errors}
              onFieldBlur={vehicleDataValidation.validate}
            />
          );
        } else {
          return (
            <RiskDataConfirmation
              data={riskData}
              onChange={updateRiskData}
              errors={riskDataValidation.errors}
              onFieldBlur={riskDataValidation.validate}
            />
          );
        }
      case 6:
        if (origin === 'outra_corretora') {
          return (
            <RiskDataConfirmation
              data={riskData}
              onChange={updateRiskData}
              errors={riskDataValidation.errors}
              onFieldBlur={riskDataValidation.validate}
            />
          );
        } else {
          return <FinalConfirmation onConfirm={handleFinalSubmit} />;
        }
      case 7:
        return <FinalConfirmation onConfirm={handleFinalSubmit} />;
      default:
        return null;
    }
  };

  const isLastStep = () => {
    return (origin === 'outra_corretora' && currentStep === 7) || 
           (origin === 'jj_amorim' && currentStep === 6);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-12 px-4">
      <div className="w-full max-w-5xl mx-auto">
        <ProgressIndicator
          currentStep={getCurrentStepIndex()}
          totalSteps={getTotalSteps()}
          stepTitles={getStepTitles()}
        />

        {renderCurrentStep()}

        {!isLastStep() && (
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
              <span>Próxima Etapa</span>
              <ArrowRight className="h-5 w-5" />
            </Button>
          </div>
        )}

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
