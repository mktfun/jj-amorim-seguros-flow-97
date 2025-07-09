import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ArrowRight, Send } from 'lucide-react';
import ProgressIndicator from './ProgressIndicator';
import PersonalDataStep from './PersonalDataStep';
import VehicleDataStep from './VehicleDataStep';
import RiskQuestionnaireStep from './RiskQuestionnaireStep';
import { useFormValidation, validationPatterns, validateCPF } from '@/hooks/useFormValidation';
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
  mainDriverData: {
    isDifferentFromInsured: string;
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
    mainDriverData: {
      isDifferentFromInsured: '',
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
      customValidator: validateCPF,
      message: 'CPF inválido. Por favor, verifique o número.' 
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
    },
    // Validação condicional para o condutor principal
    isDifferentFromInsured: { required: true, message: 'Selecione uma opção sobre o principal condutor' },
    // Campos condicionais do condutor principal
    mainDriverFullName: { required: false, message: 'Nome completo do principal condutor é obrigatório' },
    mainDriverCpf: { 
      required: false, 
      pattern: validationPatterns.cpf,
      customValidator: validateCPF,
      message: 'CPF inválido. Por favor, verifique o número.' 
    },
    mainDriverBirthDate: { required: false, message: 'Data de nascimento do principal condutor é obrigatória' },
    mainDriverMaritalStatus: { required: false, message: 'Estado civil do principal condutor é obrigatório' },
    mainDriverEmail: { 
      required: false, 
      pattern: validationPatterns.email, 
      message: 'Email deve ter um formato válido' 
    },
    mainDriverPhone: { 
      required: false, 
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
    year: { required: true, message: 'Ano/modelo é obrigatório' },
    isFinanced: { required: true, message: 'Selecione se o veículo está financiado' }
  });

  const riskDataValidation = useFormValidation({
    cep: { 
      required: true, 
      pattern: validationPatterns.cep, 
      message: 'CEP deve estar no formato 00000-000' 
    },
    numero: { required: true, message: 'Número do endereço é obrigatório' },
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

  const updateMainDriverData = (field: keyof FormData['mainDriverData'], value: string) => {
    console.log('Atualizando dados do condutor principal:', field, value);
    setFormData(prev => ({
      ...prev,
      mainDriverData: { ...prev.mainDriverData, [field]: value }
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

    // Clear young driver fields if youngResidents is 'nao'
    if (field === 'youngResidents' && value === 'nao') {
      setFormData(prev => ({
        ...prev,
        riskData: { 
          ...prev.riskData, 
          youngDriversUseVehicle: '',
          youngDriverAge: '',
          youngDriverGender: ''
        }
      }));
    }

    // Clear young driver details if they don't use vehicle
    if (field === 'youngDriversUseVehicle' && value === 'nao') {
      setFormData(prev => ({
        ...prev,
        riskData: { 
          ...prev.riskData, 
          youngDriverAge: '',
          youngDriverGender: ''
        }
      }));
    }
  };

  const validateCurrentStep = (): boolean => {
    console.log('Validando etapa atual:', currentStep);
    console.log('Dados atuais do formulário:', formData);
    
    switch (currentStep) {
      case 1:
        // Validar dados pessoais básicos
        const basicData = {
          fullName: formData.personalData.fullName,
          cpf: formData.personalData.cpf,
          birthDate: formData.personalData.birthDate,
          maritalStatus: formData.personalData.maritalStatus,
          email: formData.personalData.email,
          phone: formData.personalData.phone,
          isDifferentFromInsured: formData.mainDriverData.isDifferentFromInsured
        };
        
        console.log('Validando dados básicos:', basicData);
        
        // Validar campos básicos primeiro
        let isBasicValid = true;
        Object.entries(basicData).forEach(([key, value]) => {
          if (!personalDataValidation.validate(key, value)) {
            isBasicValid = false;
          }
        });
        
        console.log('Dados básicos válidos:', isBasicValid);
        
        // Se o principal condutor é diferente, validar também os dados dele
        if (formData.mainDriverData.isDifferentFromInsured === 'nao') {
          console.log('Validando dados do condutor principal diferente');
          const mainDriverValidationData = {
            mainDriverFullName: formData.mainDriverData.fullName,
            mainDriverCpf: formData.mainDriverData.cpf,
            mainDriverBirthDate: formData.mainDriverData.birthDate,
            mainDriverMaritalStatus: formData.mainDriverData.maritalStatus,
            mainDriverEmail: formData.mainDriverData.email,
            mainDriverPhone: formData.mainDriverData.phone
          };
          
          console.log('Dados do condutor principal:', mainDriverValidationData);
          
          // Validar cada campo do condutor principal
          let isMainDriverValid = true;
          Object.entries(mainDriverValidationData).forEach(([key, value]) => {
            if (!value || value.trim() === '') {
              console.log(`Campo ${key} está vazio`);
              personalDataValidation.validate(key, value);
              isMainDriverValid = false;
            } else {
              if (!personalDataValidation.validate(key, value)) {
                isMainDriverValid = false;
              }
            }
          });
          
          console.log('Dados do condutor principal válidos:', isMainDriverValid);
          return isBasicValid && isMainDriverValid;
        }
        
        return isBasicValid;
      case 2:
        return vehicleDataValidation.validateAll(formData.vehicleData as { [key: string]: string });
      case 3:
        const riskValidationData = { ...formData.riskData };
        // Only validate workParking if usesForWork is 'sim'
        if (formData.riskData.usesForWork !== 'sim') {
          delete riskValidationData.workParking;
        }
        // Only validate young driver fields if applicable
        if (formData.riskData.youngResidents !== 'sim') {
          delete riskValidationData.youngDriversUseVehicle;
          delete riskValidationData.youngDriverAge;
          delete riskValidationData.youngDriverGender;
        } else if (formData.riskData.youngDriversUseVehicle !== 'sim') {
          delete riskValidationData.youngDriverAge;
          delete riskValidationData.youngDriverGender;
        }
        return riskDataValidation.validateAll(riskValidationData as { [key: string]: string });
      default:
        return true;
    }
  };

  const handleNext = async () => {
    console.log('Clicou em próxima etapa');
    if (validateCurrentStep()) {
      if (currentStep < 3) {
        setCurrentStep(currentStep + 1);
        console.log('Avançando para etapa:', currentStep + 1);
      } else {
        // Final step - processar e enviar dados
        try {
          console.log('Dados coletados completos:', formData);
          
          // Estruturar dados com base no tipo de condutor
          const isMainDriverDifferent = formData.mainDriverData.isDifferentFromInsured === 'nao';
          
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
            mainDriverData: isMainDriverDifferent ? {
              isDifferentFromInsured: formData.mainDriverData.isDifferentFromInsured,
              ...formData.mainDriverData
            } : {
              isDifferentFromInsured: formData.mainDriverData.isDifferentFromInsured,
              fullName: formData.personalData.fullName,
              cpf: formData.personalData.cpf,
              birthDate: formData.personalData.birthDate,
              maritalStatus: formData.personalData.maritalStatus,
              email: formData.personalData.email,
              phone: formData.personalData.phone
            },
            flowType: 'Nova Cotacao de Seguro'
          };

          await processAndSendData(unifiedData);
          
        } catch (error) {
          console.error('Erro ao processar dados:', error);
          alert('Erro ao processar os dados. Por favor, tente novamente.');
        }
      }
    } else {
      console.log('Validação falhou - botão não deve avançar');
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
            mainDriverData={formData.mainDriverData}
            onChange={updatePersonalData}
            onMainDriverChange={updateMainDriverData}
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
