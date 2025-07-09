
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import ContactDataStep from './ContactDataStep';
import RenewalOriginQuestion from './RenewalOriginQuestion';
import PreviousPolicyData from './PreviousPolicyData';
import DataChangeQuestion from './DataChangeQuestion';
import QuickConfirmation from './QuickConfirmation';
import EditDataStep from './EditDataStep';
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

interface EditableData {
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
    year: string;
    isFinanced: string;
  };
  riskData: {
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
  };
}

const RenewalFlow: React.FC<RenewalFlowProps> = ({ onBack }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [origin, setOrigin] = useState('');
  const [hasChanges, setHasChanges] = useState('');
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

  const [editableData, setEditableData] = useState<EditableData>({
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
      year: '',
      isFinanced: ''
    },
    riskData: {
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
    }
  });

  const getStepTitles = () => {
    const titles = ['Dados de Contato', 'Origem da Renovação'];
    
    if (origin === 'outra_corretora') {
      titles.push('Dados da Apólice Anterior');
    }
    
    titles.push('Verificação de Alterações');
    
    if (hasChanges === 'nao') {
      titles.push('Confirmação Final');
    } else if (hasChanges === 'sim') {
      titles.push('Edição de Dados');
    }
    
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

  const updateContactData = (field: keyof ContactData, value: string) => {
    setContactData(prev => ({ ...prev, [field]: value }));
  };

  const updatePreviousPolicyData = (field: keyof PreviousPolicyDataType, value: string) => {
    setPreviousPolicyData(prev => ({ ...prev, [field]: value }));
  };

  const updateEditableData = (section: keyof EditableData, field: string, value: string) => {
    setEditableData(prev => ({
      ...prev,
      [section]: { ...prev[section], [field]: value }
    }));
  };

  const getCurrentStepIndex = () => {
    if (currentStep === 1) return 1; // Dados de Contato
    if (currentStep === 2) return 2; // Origem da Renovação
    if (currentStep === 3 && origin === 'outra_corretora') return 3; // Dados da Apólice Anterior
    if (currentStep === 3 && origin === 'jj_amorim') return 3; // Verificação de Alterações
    if (currentStep === 4) return origin === 'outra_corretora' ? 4 : 3; // Verificação de Alterações
    if (currentStep === 5) return origin === 'outra_corretora' ? 5 : 4; // Confirmação Final ou Edição
    return currentStep;
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
        }
        if (!hasChanges) {
          alert('Por favor, selecione uma opção.');
          return false;
        }
        return true;
      case 4:
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
    if (validateCurrentStep()) {
      if (currentStep === 1) {
        setCurrentStep(2);
      } else if (currentStep === 2) {
        if (origin === 'outra_corretora') {
          setCurrentStep(3);
        } else {
          setCurrentStep(4);
        }
      } else if (currentStep === 3) {
        setCurrentStep(4);
      } else if (currentStep === 4) {
        setCurrentStep(5);
      }
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      if (currentStep === 4 && origin === 'jj_amorim') {
        setCurrentStep(2);
      } else {
        setCurrentStep(currentStep - 1);
      }
    } else {
      onBack();
    }
  };

  const handleQuickConfirmation = async () => {
    try {
      const unifiedData: UnifiedData = {
        contactData: contactData,
        personalData: {
          fullName: contactData.fullName,
          cpf: contactData.cpf,
          birthDate: '',
          maritalStatus: '',
          email: contactData.email,
          phone: contactData.phone
        },
        vehicleData: {
          model: '',
          plate: '',
          year: '',
          isFinanced: ''
        },
        riskData: {
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
        },
        hasChanges: false,
        flowType: 'Renovacao Seguro Auto',
        origem_renovacao: origin,
        dados_apolice_anterior: origin === 'outra_corretora' ? previousPolicyData : undefined
      };

      await processAndSendData(unifiedData);
    } catch (error) {
      console.error('Erro ao processar confirmação:', error);
      alert('Erro ao processar os dados. Por favor, tente novamente.');
    }
  };

  const handleEditSubmit = async () => {
    try {
      const unifiedData: UnifiedData = {
        contactData: contactData,
        personalData: editableData.personalData,
        vehicleData: editableData.vehicleData,
        riskData: editableData.riskData,
        hasChanges: true,
        flowType: 'Renovacao Seguro Auto',
        origem_renovacao: origin,
        dados_apolice_anterior: origin === 'outra_corretora' ? previousPolicyData : undefined
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
            error={!origin && currentStep === 2 ? 'Por favor, selecione uma opção' : undefined}
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
            <DataChangeQuestion
              hasChanges={hasChanges}
              onChange={setHasChanges}
              error={!hasChanges && currentStep === 3 ? 'Por favor, selecione uma opção' : undefined}
            />
          );
        }
      case 4:
        return (
          <DataChangeQuestion
            hasChanges={hasChanges}
            onChange={setHasChanges}
            error={!hasChanges && currentStep === 4 ? 'Por favor, selecione uma opção' : undefined}
          />
        );
      case 5:
        if (hasChanges === 'nao') {
          return <QuickConfirmation onConfirm={handleQuickConfirmation} />;
        } else {
          return (
            <EditDataStep
              data={editableData}
              onChange={updateEditableData}
              onSubmit={handleEditSubmit}
            />
          );
        }
      default:
        return null;
    }
  };

  const shouldShowNavigation = currentStep < 5 || (currentStep === 5 && hasChanges === 'sim');

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-12 px-4">
      <div className="w-full max-w-5xl mx-auto">
        <ProgressIndicator
          currentStep={getCurrentStepIndex()}
          totalSteps={getStepTitles().length}
          stepTitles={getStepTitles()}
        />

        {renderCurrentStep()}

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
