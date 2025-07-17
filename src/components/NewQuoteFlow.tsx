import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ArrowRight, Send } from 'lucide-react';
import ProgressIndicator from './ProgressIndicator';
import PersonTypeStep from './PersonTypeStep';
import IdentificationDataStep from './IdentificationDataStep';
import MaritalStatusStep from './MaritalStatusStep';
import ComplementaryDataStep from './ComplementaryDataStep';
import VehicleZeroKmStep from './VehicleZeroKmStep';
import VehicleDetailsStep from './VehicleDetailsStep';
import VehicleFinancingStep from './VehicleFinancingStep';
import ResidenceTypeStep from './ResidenceTypeStep';
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
    'Dados do Veículo - Zero Km',
    'Detalhes do Veículo',
    'Situação do Veículo',
    'Tipo de Residência',
    'CEP de Pernoite'
  ];

  const personTypeValidation = useFormValidation({
    personType: { required: true, message: 'Selecione o tipo de pessoa' }
  });

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

  const maritalStatusValidation = useFormValidation({
    maritalStatus: { required: true, message: 'Selecione o estado civil' }
  });

  const complementaryDataValidation = useFormValidation({
    birthDate: { 
      required: true, 
      pattern: /^\d{2}\/\d{2}\/\d{4}$/, 
      message: 'Data de nascimento deve estar no formato dd/mm/aaaa' 
    },
    profession: { required: true, message: 'Profissão é obrigatória' }
  });

  const vehicleZeroKmValidation = useFormValidation({
    isZeroKm: { required: true, message: 'Selecione se o veículo é zero km' }
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

  const vehicleFinancingValidation = useFormValidation({
    isFinanced: { required: true, message: 'Selecione se o veículo está financiado' }
  });

  const residenceTypeValidation = useFormValidation({
    residenceType: { required: true, message: 'Selecione o tipo de residência' }
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
  };

  const validateCurrentStep = (): boolean => {
    console.log('Validando etapa atual:', currentStep);
    console.log('Dados atuais do formulário:', formData);
    
    switch (currentStep) {
      case 1:
        return personTypeValidation.validateAll({ personType: formData.personalData.personType || '' });
      case 2:
        const identificationData = {
          fullName: formData.personalData.fullName,
          cpf: formData.personalData.cpf,
          email: formData.personalData.email,
          phone: formData.personalData.phone
        };
        return identificationValidation.validateAll(identificationData as { [key: string]: string });
      case 3:
        return maritalStatusValidation.validateAll({ maritalStatus: formData.personalData.maritalStatus });
      case 4:
        const complementaryData = {
          birthDate: formData.personalData.birthDate,
          profession: formData.personalData.profession
        };
        return complementaryDataValidation.validateAll(complementaryData as { [key: string]: string });
      case 5:
        return vehicleZeroKmValidation.validateAll({ isZeroKm: formData.vehicleData.isZeroKm });
      case 6:
        const vehicleDetailsData = {
          model: formData.vehicleData.model,
          plate: formData.vehicleData.plate,
          year: formData.vehicleData.year
        };
        return vehicleDetailsValidation.validateAll(vehicleDetailsData as { [key: string]: string });
      case 7:
        return vehicleFinancingValidation.validateAll({ isFinanced: formData.vehicleData.isFinanced });
      case 8:
        return residenceTypeValidation.validateAll({ residenceType: formData.riskData.residenceType });
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
      case 1: return personTypeValidation;
      case 2: return identificationValidation;
      case 3: return maritalStatusValidation;
      case 4: return complementaryDataValidation;
      case 5: return vehicleZeroKmValidation;
      case 6: return vehicleDetailsValidation;
      case 7: return vehicleFinancingValidation;
      case 8: return residenceTypeValidation;
      case 9: return addressValidation;
      default: return personTypeValidation;
    }
  };

  const renderCurrentStep = () => {
    const validation = getValidationForCurrentStep();
    
    switch (currentStep) {
      case 1:
        return (
          <PersonTypeStep
            personType={formData.personalData.personType || ''}
            onChange={(value) => updatePersonalData('personType', value)}
            error={validation.errors.personType}
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
          <MaritalStatusStep
            maritalStatus={formData.personalData.maritalStatus}
            onChange={(value) => updatePersonalData('maritalStatus', value)}
            error={validation.errors.maritalStatus}
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
          <VehicleZeroKmStep
            isZeroKm={formData.vehicleData.isZeroKm}
            onChange={(value) => updateVehicleData('isZeroKm', value)}
            error={validation.errors.isZeroKm}
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
          <VehicleFinancingStep
            isFinanced={formData.vehicleData.isFinanced}
            onChange={(value) => updateVehicleData('isFinanced', value)}
            error={validation.errors.isFinanced}
          />
        );
      case 8:
        return (
          <ResidenceTypeStep
            residenceType={formData.riskData.residenceType}
            onChange={(value) => updateRiskData('residenceType', value)}
            error={validation.errors.residenceType}
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-12 px-4">
      <div className="w-full max-w-5xl mx-auto">
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

          <Button
            onClick={handleNext}
            disabled={currentStep === 1 && !formData.personalData.personType}
            className="h-14 px-8 text-base font-semibold bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white transition-all duration-200 rounded-xl flex items-center space-x-2 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
            size="lg"
          >
            <span>{currentStep === 9 ? 'Enviar Orçamento' : 'Próxima Etapa'}</span>
            {currentStep === 9 ? (
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
