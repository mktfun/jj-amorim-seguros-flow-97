
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Send } from 'lucide-react';
import ProgressIndicator from './ProgressIndicator';
import FlowHeader from './FlowHeader';
import PersonTypeSelectionStep from './PersonTypeSelectionStep';
import IdentificationDataStep from './IdentificationDataStep';
import MaritalStatusSelectionStep from './MaritalStatusSelectionStep';
import ComplementaryDataStep from './ComplementaryDataStep';
import VehicleZeroKmSelectionStep from './VehicleZeroKmSelectionStep';
import VehicleDetailsStep from './VehicleDetailsStep';
import VehicleFinancingSelectionStep from './VehicleFinancingSelectionStep';
import ResidenceTypeSelectionStep from './ResidenceTypeSelectionStep';
import AddressStep from './AddressStep';
import { useFormValidation, validationPatterns, validateCPF, validateCNPJ } from '@/hooks/useFormValidation';
import { processAndSendData, UnifiedData } from '@/utils/dataProcessor';

interface NewQuoteFlowProps {
  onBack: () => void;
}

interface FormData {
  personalData: {
    personType?: string;
    fullName: string;
    cpf: string;
    birthDate: string;
    maritalStatus: string;
    email: string;
    phone: string;
    profession: string;
  };
  mainDriverData: {
    isDifferentFromInsured: string;
    fullName: string;
    cpf: string;
    birthDate: string;
    maritalStatus: string;
    email: string;
    phone: string;
    profession: string;
  };
  vehicleData: {
    isZeroKm: string;
    model: string;
    plate: string;
    year: string;
    isFinanced: string;
  };
  riskData: {
    residenceType: string;
    cep: string;
    logradouro: string;
    bairro: string;
    localidade: string;
    uf: string;
    numero: string;
    complemento: string;
    garageType: string;
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
      personType: '',
      fullName: '',
      cpf: '',
      birthDate: '',
      maritalStatus: '',
      email: '',
      phone: '',
      profession: ''
    },
    mainDriverData: {
      isDifferentFromInsured: '',
      fullName: '',
      cpf: '',
      birthDate: '',
      maritalStatus: '',
      email: '',
      phone: '',
      profession: ''
    },
    vehicleData: {
      isZeroKm: '',
      model: '',
      plate: '',
      year: '',
      isFinanced: ''
    },
    riskData: {
      residenceType: '',
      cep: '',
      logradouro: '',
      bairro: '',
      localidade: '',
      uf: '',
      numero: '',
      complemento: '',
      garageType: '',
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
    'Tipo de Pessoa',
    'Dados de Identificação',
    'Estado Civil',
    'Dados Complementares',
    'Veículo Zero Km',
    'Detalhes do Veículo',
    'Situação do Veículo',
    'Tipo de Residência',
    'CEP de Pernoite'
  ];

  const identificationValidation = useFormValidation({
    fullName: { required: true, message: 'Nome/Razão Social é obrigatório' },
    cpf: { 
      required: true, 
      pattern: formData.personalData.personType === 'juridica' 
        ? validationPatterns.cnpj 
        : validationPatterns.cpf,
      customValidator: formData.personalData.personType === 'juridica' 
        ? validateCNPJ 
        : validateCPF,
      message: formData.personalData.personType === 'juridica' 
        ? 'CNPJ inválido. Por favor, verifique o número.' 
        : 'CPF inválido. Por favor, verifique o número.' 
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

  const complementaryDataValidation = useFormValidation({
    birthDate: { 
      required: true, 
      pattern: /^\d{2}\/\d{2}\/\d{4}$/, 
      message: 'Data de nascimento deve estar no formato dd/mm/aaaa' 
    },
    profession: { required: true, message: 'Profissão é obrigatória' }
  });

  const vehicleDetailsValidation = useFormValidation({
    model: { required: true, message: 'Modelo do veículo é obrigatório' },
    plate: { 
      required: true, 
      pattern: validationPatterns.plate, 
      message: 'Placa deve estar no formato ABC-1234 ou ABC1D23' 
    },
    year: { required: true, message: 'Ano/modelo é obrigatório' }
  });

  const addressValidation = useFormValidation({
    cep: { 
      required: true, 
      pattern: validationPatterns.cep, 
      message: 'CEP deve estar no formato 00000-000' 
    },
    numero: { required: true, message: 'Número do endereço é obrigatório' }
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
  };

  const handleAutoAdvance = () => {
    setCurrentStep(currentStep + 1);
  };

  const validateCurrentStep = (): boolean => {
    console.log('Validando etapa atual:', currentStep);
    
    switch (currentStep) {
      case 2:
        const identificationData = {
          fullName: formData.personalData.fullName,
          cpf: formData.personalData.cpf,
          email: formData.personalData.email,
          phone: formData.personalData.phone
        };
        return identificationValidation.validateAll(identificationData as { [key: string]: string });
      case 4:
        const complementaryData = {
          birthDate: formData.personalData.birthDate,
          profession: formData.personalData.profession
        };
        return complementaryDataValidation.validateAll(complementaryData as { [key: string]: string });
      case 6:
        const vehicleDetailsData = {
          model: formData.vehicleData.model,
          plate: formData.vehicleData.plate,
          year: formData.vehicleData.year
        };
        return vehicleDetailsValidation.validateAll(vehicleDetailsData as { [key: string]: string });
      case 9:
        const addressData = {
          cep: formData.riskData.cep,
          numero: formData.riskData.numero
        };
        return addressValidation.validateAll(addressData as { [key: string]: string });
      default:
        return true;
    }
  };

  const handleNext = async () => {
    console.log('Clicou em próxima etapa');
    if (validateCurrentStep()) {
      if (currentStep < 9) {
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
            mainDriverData: {
              isDifferentFromInsured: 'nao',
              fullName: formData.personalData.fullName,
              cpf: formData.personalData.cpf,
              birthDate: formData.personalData.birthDate,
              maritalStatus: formData.personalData.maritalStatus,
              email: formData.personalData.email,
              phone: formData.personalData.phone,
              profession: formData.personalData.profession
            },
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
    } else {
      onBack();
    }
  };

  const getValidationForCurrentStep = () => {
    switch (currentStep) {
      case 2: return identificationValidation;
      case 4: return complementaryDataValidation;
      case 6: return vehicleDetailsValidation;
      case 9: return addressValidation;
      default: return identificationValidation;
    }
  };

  const renderCurrentStep = () => {
    const validation = getValidationForCurrentStep();
    
    switch (currentStep) {
      case 1:
        return (
          <PersonTypeSelectionStep
            personType={formData.personalData.personType || ''}
            onSelect={(value) => {
              updatePersonalData('personType', value);
              handleAutoAdvance();
            }}
          />
        );
      case 2:
        return (
          <IdentificationDataStep
            data={{
              personType: formData.personalData.personType || '',
              fullName: formData.personalData.fullName,
              cpf: formData.personalData.cpf,
              email: formData.personalData.email,
              phone: formData.personalData.phone
            }}
            onChange={updatePersonalData}
            errors={validation.errors}
            onFieldBlur={validation.validate}
          />
        );
      case 3:
        return (
          <MaritalStatusSelectionStep
            maritalStatus={formData.personalData.maritalStatus}
            onSelect={(value) => {
              updatePersonalData('maritalStatus', value);
              handleAutoAdvance();
            }}
          />
        );
      case 4:
        return (
          <ComplementaryDataStep
            data={{
              birthDate: formData.personalData.birthDate,
              profession: formData.personalData.profession
            }}
            onChange={updatePersonalData}
            errors={validation.errors}
            onFieldBlur={validation.validate}
          />
        );
      case 5:
        return (
          <VehicleZeroKmSelectionStep
            isZeroKm={formData.vehicleData.isZeroKm}
            onSelect={(value) => {
              updateVehicleData('isZeroKm', value);
              handleAutoAdvance();
            }}
          />
        );
      case 6:
        return (
          <VehicleDetailsStep
            data={{
              model: formData.vehicleData.model,
              plate: formData.vehicleData.plate,
              year: formData.vehicleData.year
            }}
            onChange={updateVehicleData}
            errors={validation.errors}
            onFieldBlur={validation.validate}
          />
        );
      case 7:
        return (
          <VehicleFinancingSelectionStep
            isFinanced={formData.vehicleData.isFinanced}
            onSelect={(value) => {
              updateVehicleData('isFinanced', value);
              handleAutoAdvance();
            }}
          />
        );
      case 8:
        return (
          <ResidenceTypeSelectionStep
            residenceType={formData.riskData.residenceType}
            onSelect={(value) => {
              updateRiskData('residenceType', value);
              handleAutoAdvance();
            }}
          />
        );
      case 9:
        return (
          <AddressStep
            data={{
              cep: formData.riskData.cep,
              logradouro: formData.riskData.logradouro,
              bairro: formData.riskData.bairro,
              localidade: formData.riskData.localidade,
              uf: formData.riskData.uf,
              numero: formData.riskData.numero,
              complemento: formData.riskData.complemento
            }}
            onChange={updateRiskData}
            errors={validation.errors}
            onFieldBlur={validation.validate}
          />
        );
      default:
        return null;
    }
  };

  const shouldShowNextButton = () => {
    return [2, 4, 6, 9].includes(currentStep);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <FlowHeader />
      <div className="w-full max-w-5xl mx-auto px-4 py-6">
        <ProgressIndicator
          currentStep={currentStep}
          totalSteps={9}
          stepTitles={stepTitles}
        />

        {renderCurrentStep()}

        {/* Botões de Navegação */}
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

          {shouldShowNextButton() && (
            <Button
              onClick={handleNext}
              className="h-14 px-8 text-base font-semibold bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white transition-all duration-200 rounded-xl flex items-center space-x-2 shadow-lg hover:shadow-xl"
              size="lg"
            >
              <span>{currentStep === 9 ? 'Enviar Orçamento' : 'Próxima Etapa'}</span>
              <Send className="h-5 w-5" />
            </Button>
          )}
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
