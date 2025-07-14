
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { StableFormField } from '@/components/ui/stable-form-field';
import { useViaCEP } from '@/hooks/useViaCEP';
import { useFormValidation, validateCPF } from '@/hooks/useFormValidation';

const businessInsuranceSchema = z.object({
  companyName: z.string().min(2, 'Razão social é obrigatória'),
  cnpj: z.string().min(18, 'CNPJ deve ter 18 caracteres'),
  businessActivity: z.string().min(2, 'Ramo de atividade é obrigatório'),
  cep: z.string().min(9, 'CEP deve ter 8 dígitos'),
  logradouro: z.string().min(2, 'Logradouro é obrigatório'),
  bairro: z.string().min(2, 'Bairro é obrigatório'),
  localidade: z.string().min(2, 'Cidade é obrigatória'),
  uf: z.string().min(2, 'Estado é obrigatório'),
  numero: z.string().min(1, 'Número é obrigatório'),
  complemento: z.string().optional(),
  businessPhone: z.string().min(14, 'Telefone comercial é obrigatório'),
  annualRevenue: z.string().min(1, 'Faturamento anual é obrigatório'),
  employeeCount: z.string().min(1, 'Número de funcionários é obrigatório'),
  responsibleName: z.string().min(2, 'Nome do responsável é obrigatório'),
  responsibleCpf: z.string().min(14, 'CPF do responsável é obrigatório'),
  responsibleBirthDate: z.string().min(10, 'Data de nascimento é obrigatória'),
  responsibleEmail: z.string().email('Email inválido'),
  responsiblePhone: z.string().min(15, 'Telefone do responsável é obrigatório'),
  responsibleProfession: z.string().min(2, 'Profissão do responsável é obrigatória'),
});

type BusinessInsuranceData = z.infer<typeof businessInsuranceSchema>;

interface BusinessInsuranceFlowProps {
  onBack: () => void;
}

const BusinessInsuranceFlow: React.FC<BusinessInsuranceFlowProps> = ({ onBack }) => {
  const [formData, setFormData] = useState<Partial<BusinessInsuranceData>>({});
  const { fetchAddress, loading: cepLoading } = useViaCEP();
  
  const { register, handleSubmit, formState: { errors }, setValue, watch } = useForm<BusinessInsuranceData>({
    resolver: zodResolver(businessInsuranceSchema),
    defaultValues: formData,
  });

  const { validate, errors: validationErrors } = useFormValidation({
    responsibleCpf: {
      required: true,
      customValidator: validateCPF,
      message: 'CPF inválido'
    }
  });

  const handleFieldChange = (field: keyof BusinessInsuranceData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setValue(field, value);
  };

  const handleCEPChange = async (value: string) => {
    handleFieldChange('cep', value);
    
    if (value.length === 9) {
      const address = await fetchAddress(value);
      if (address) {
        handleFieldChange('logradouro', address.logradouro);
        handleFieldChange('bairro', address.bairro);
        handleFieldChange('localidade', address.localidade);
        handleFieldChange('uf', address.uf);
      }
    }
  };

  const onSubmit = (data: BusinessInsuranceData) => {
    console.log('Dados do seguro empresarial:', data);
    // Aqui seria implementada a lógica de envio
  };

  const formatCurrency = (value: string) => {
    const numValue = value.replace(/\D/g, '');
    const formatted = new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(parseInt(numValue) / 100);
    return formatted;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <Button
              variant="ghost"
              onClick={onBack}
              className="mb-4 text-gray-600 hover:text-gray-800"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Voltar
            </Button>
            
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              Cotação de Seguro Empresarial
            </h1>
            <p className="text-gray-600">
              Dados da Empresa
            </p>
          </div>

          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="text-xl text-gray-800">
                Informações da Empresa e Responsável
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                {/* Dados da Empresa */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-700 border-b pb-2">
                    Dados da Empresa
                  </h3>
                  
                  <div className="grid md:grid-cols-2 gap-4">
                    <StableFormField
                      id="companyName"
                      label="Razão Social"
                      value={formData.companyName || ''}
                      onChange={(value) => handleFieldChange('companyName', value)}
                      error={errors.companyName?.message}
                      placeholder="Digite a razão social da empresa"
                      required
                    />
                    
                    <StableFormField
                      id="cnpj"
                      label="CNPJ"
                      value={formData.cnpj || ''}
                      onChange={(value) => handleFieldChange('cnpj', value)}
                      error={errors.cnpj?.message}
                      placeholder="00.000.000/0000-00"
                      mask="99.999.999/9999-99"
                      required
                    />
                  </div>

                  <StableFormField
                    id="businessActivity"
                    label="Ramo de Atividade"
                    value={formData.businessActivity || ''}
                    onChange={(value) => handleFieldChange('businessActivity', value)}
                    error={errors.businessActivity?.message}
                    placeholder="Digite o ramo de atividade da empresa"
                    required
                  />

                  <div className="grid md:grid-cols-2 gap-4">
                    <StableFormField
                      id="cep"
                      label="CEP da Empresa"
                      value={formData.cep || ''}
                      onChange={handleCEPChange}
                      error={errors.cep?.message}
                      placeholder="00000-000"
                      mask="99999-999"
                      required
                    />
                    
                    <StableFormField
                      id="numero"
                      label="Número"
                      value={formData.numero || ''}
                      onChange={(value) => handleFieldChange('numero', value)}
                      error={errors.numero?.message}
                      placeholder="123"
                      required
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <StableFormField
                      id="logradouro"
                      label="Logradouro"
                      value={formData.logradouro || ''}
                      onChange={(value) => handleFieldChange('logradouro', value)}
                      error={errors.logradouro?.message}
                      placeholder="Rua, Avenida..."
                      required
                    />
                    
                    <StableFormField
                      id="complemento"
                      label="Complemento"
                      value={formData.complemento || ''}
                      onChange={(value) => handleFieldChange('complemento', value)}
                      error={errors.complemento?.message}
                      placeholder="Sala, Andar... (opcional)"
                    />
                  </div>

                  <div className="grid md:grid-cols-3 gap-4">
                    <StableFormField
                      id="bairro"
                      label="Bairro"
                      value={formData.bairro || ''}
                      onChange={(value) => handleFieldChange('bairro', value)}
                      error={errors.bairro?.message}
                      placeholder="Bairro"
                      required
                    />
                    
                    <StableFormField
                      id="localidade"
                      label="Cidade"
                      value={formData.localidade || ''}
                      onChange={(value) => handleFieldChange('localidade', value)}
                      error={errors.localidade?.message}
                      placeholder="Cidade"
                      required
                    />
                    
                    <StableFormField
                      id="uf"
                      label="Estado"
                      value={formData.uf || ''}
                      onChange={(value) => handleFieldChange('uf', value)}
                      error={errors.uf?.message}
                      placeholder="UF"
                      required
                    />
                  </div>

                  <div className="grid md:grid-cols-3 gap-4">
                    <StableFormField
                      id="businessPhone"
                      label="Telefone Comercial"
                      value={formData.businessPhone || ''}
                      onChange={(value) => handleFieldChange('businessPhone', value)}
                      error={errors.businessPhone?.message}
                      placeholder="(11) 1234-5678"
                      mask="(99) 9999-9999"
                      required
                    />
                    
                    <StableFormField
                      id="annualRevenue"
                      label="Faturamento Anual"
                      value={formData.annualRevenue || ''}
                      onChange={(value) => handleFieldChange('annualRevenue', formatCurrency(value))}
                      error={errors.annualRevenue?.message}
                      placeholder="R$ 0,00"
                      required
                    />
                    
                    <StableFormField
                      id="employeeCount"
                      label="Número de Funcionários"
                      value={formData.employeeCount || ''}
                      onChange={(value) => handleFieldChange('employeeCount', value.replace(/\D/g, ''))}
                      error={errors.employeeCount?.message}
                      placeholder="Ex: 10"
                      required
                    />
                  </div>
                </div>

                {/* Dados do Responsável */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-700 border-b pb-2">
                    Dados do Responsável
                  </h3>
                  
                  <div className="grid md:grid-cols-2 gap-4">
                    <StableFormField
                      id="responsibleName"
                      label="Nome Completo do Responsável"
                      value={formData.responsibleName || ''}
                      onChange={(value) => handleFieldChange('responsibleName', value)}
                      error={errors.responsibleName?.message}
                      placeholder="Digite o nome completo"
                      required
                    />
                    
                    <StableFormField
                      id="responsibleCpf"
                      label="CPF do Responsável"
                      value={formData.responsibleCpf || ''}
                      onChange={(value) => handleFieldChange('responsibleCpf', value)}
                      onBlur={(value) => validate('responsibleCpf', value)}
                      error={errors.responsibleCpf?.message || validationErrors.responsibleCpf}
                      placeholder="000.000.000-00"
                      mask="999.999.999-99"
                      required
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <StableFormField
                      id="responsibleBirthDate"
                      label="Data de Nascimento"
                      value={formData.responsibleBirthDate || ''}
                      onChange={(value) => handleFieldChange('responsibleBirthDate', value)}
                      error={errors.responsibleBirthDate?.message}
                      placeholder="DD/MM/AAAA"
                      mask="99/99/9999"
                      required
                    />
                    
                    <StableFormField
                      id="responsibleEmail"
                      label="Email do Responsável"
                      value={formData.responsibleEmail || ''}
                      onChange={(value) => handleFieldChange('responsibleEmail', value)}
                      error={errors.responsibleEmail?.message}
                      placeholder="email@exemplo.com"
                      type="email"
                      required
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <StableFormField
                      id="responsiblePhone"
                      label="Telefone do Responsável (WhatsApp)"
                      value={formData.responsiblePhone || ''}
                      onChange={(value) => handleFieldChange('responsiblePhone', value)}
                      error={errors.responsiblePhone?.message}
                      placeholder="(11) 99999-9999"
                      mask="(99) 99999-9999"
                      required
                    />
                    
                    <StableFormField
                      id="responsibleProfession"
                      label="Profissão do Responsável"
                      value={formData.responsibleProfession || ''}
                      onChange={(value) => handleFieldChange('responsibleProfession', value)}
                      error={errors.responsibleProfession?.message}
                      placeholder="Digite a profissão"
                      required
                    />
                  </div>
                </div>

                <div className="flex justify-between pt-6">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={onBack}
                    className="flex items-center"
                  >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Voltar
                  </Button>
                  
                  <Button
                    type="submit"
                    className="flex items-center bg-blue-600 hover:bg-blue-700"
                  >
                    Próxima Etapa
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default BusinessInsuranceFlow;
