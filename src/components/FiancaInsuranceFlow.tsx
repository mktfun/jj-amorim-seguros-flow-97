
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ArrowRight, Send } from 'lucide-react';
import ProgressIndicator from './ProgressIndicator';
import FiancaDataStep from './FiancaDataStep';
import { useFormValidation, validationPatterns, validateCPF } from '@/hooks/useFormValidation';

interface FiancaInsuranceFlowProps {
  onBack: () => void;
}

interface FiancaFormData {
  seguradoData: {
    nomeCompleto: string;
    cpf: string;
    dataNascimento: string;
    email: string;
    telefone: string;
    profissao: string;
    rendaBrutaMensal: string;
  };
  imovelData: {
    cep: string;
    logradouro: string;
    bairro: string;
    localidade: string;
    uf: string;
    numero: string;
    complemento: string;
    valorAluguel: string;
    valorCondominio: string;
    valorIPTU: string;
    tipoImovel: string;
    finalidadeImovel: string;
  };
}

const FiancaInsuranceFlow: React.FC<FiancaInsuranceFlowProps> = ({ onBack }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FiancaFormData>({
    seguradoData: {
      nomeCompleto: '',
      cpf: '',
      dataNascimento: '',
      email: '',
      telefone: '',
      profissao: '',
      rendaBrutaMensal: ''
    },
    imovelData: {
      cep: '',
      logradouro: '',
      bairro: '',
      localidade: '',
      uf: '',
      numero: '',
      complemento: '',
      valorAluguel: '',
      valorCondominio: '',
      valorIPTU: '',
      tipoImovel: '',
      finalidadeImovel: ''
    }
  });

  const stepTitles = [
    'Dados do Inquilino e do Imóvel'
  ];

  // Validation rules
  const fiancaValidation = useFormValidation({
    nomeCompleto: { required: true, message: 'Nome completo é obrigatório' },
    cpf: { 
      required: true, 
      pattern: validationPatterns.cpf,
      customValidator: validateCPF,
      message: 'CPF inválido. Por favor, verifique o número.' 
    },
    dataNascimento: { required: true, message: 'Data de nascimento é obrigatória' },
    email: { 
      required: true, 
      pattern: validationPatterns.email, 
      message: 'Email deve ter um formato válido' 
    },
    telefone: { 
      required: true, 
      pattern: validationPatterns.phone, 
      message: 'Telefone deve estar no formato (00) 00000-0000' 
    },
    profissao: { required: true, message: 'Profissão é obrigatória' },
    rendaBrutaMensal: { required: true, message: 'Renda bruta mensal é obrigatória' },
    cep: { 
      required: true, 
      pattern: validationPatterns.cep, 
      message: 'CEP deve estar no formato 00000-000' 
    },
    numero: { required: true, message: 'Número do imóvel é obrigatório' },
    valorAluguel: { required: true, message: 'Valor do aluguel é obrigatório' },
    tipoImovel: { required: true, message: 'Tipo do imóvel é obrigatório' },
    finalidadeImovel: { required: true, message: 'Finalidade do imóvel é obrigatória' }
  });

  const updateSeguradoData = (field: keyof FiancaFormData['seguradoData'], value: string) => {
    console.log('Atualizando dados do segurado:', field, value);
    setFormData(prev => ({
      ...prev,
      seguradoData: { ...prev.seguradoData, [field]: value }
    }));
  };

  const updateImovelData = (field: keyof FiancaFormData['imovelData'], value: string) => {
    console.log('Atualizando dados do imóvel:', field, value);
    setFormData(prev => ({
      ...prev,
      imovelData: { ...prev.imovelData, [field]: value }
    }));
  };

  const validateCurrentStep = (): boolean => {
    console.log('Validando dados da fiança:', formData);
    
    const allData = {
      ...formData.seguradoData,
      ...formData.imovelData
    };

    // Remove optional fields from validation
    const validationData = { ...allData };
    delete validationData.complemento;
    delete validationData.valorCondominio;
    delete validationData.valorIPTU;

    return fiancaValidation.validateAll(validationData as { [key: string]: string });
  };

  const handleNext = async () => {
    console.log('Clicou em próxima etapa - Fiança');
    if (validateCurrentStep()) {
      console.log('Dados coletados da fiança:', formData);
      alert('Dados coletados com sucesso! Funcionalidade em desenvolvimento.');
    } else {
      console.log('Validação falhou - dados incompletos');
    }
  };

  const handleBack = () => {
    onBack();
  };

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <FiancaDataStep
            seguradoData={formData.seguradoData}
            imovelData={formData.imovelData}
            onSeguradoChange={updateSeguradoData}
            onImovelChange={updateImovelData}
            errors={fiancaValidation.errors}
            onFieldBlur={fiancaValidation.validate}
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
          totalSteps={1}
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
            <span>Voltar à seleção</span>
          </Button>

          <Button
            onClick={handleNext}
            className="h-14 px-8 text-base font-semibold bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white transition-all duration-200 rounded-xl flex items-center space-x-2 shadow-lg hover:shadow-xl"
            size="lg"
          >
            <span>Enviar Cotação</span>
            <Send className="h-5 w-5" />
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
              <span className="text-sm font-medium">Cotação rápida e fácil</span>
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

export default FiancaInsuranceFlow;
