
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { StableFormField } from '@/components/ui/stable-form-field';
import RadioQuestion from '@/components/risk-data/RadioQuestion';
import { useFormValidation, validateCPF } from '@/hooks/useFormValidation';

const lifeInsuranceSchema = z.object({
  fullName: z.string().min(2, 'Nome completo é obrigatório'),
  cpf: z.string().min(14, 'CPF deve ter 11 dígitos'),
  birthDate: z.string().min(10, 'Data de nascimento é obrigatória'),
  email: z.string().email('Email inválido'),
  phone: z.string().min(15, 'Telefone é obrigatório'),
  profession: z.string().min(2, 'Profissão é obrigatória'),
  gender: z.string().min(1, 'Sexo é obrigatório'),
  smoker: z.string().min(1, 'Informação sobre fumante é obrigatória'),
  seriousIllness: z.string().min(1, 'Informação sobre histórico de doenças é obrigatória'),
  seriousIllnessDetails: z.string().optional(),
  riskySports: z.string().min(1, 'Informação sobre esportes de risco é obrigatória'),
  riskySportsDetails: z.string().optional(),
  insuredCapital: z.string().min(1, 'Capital segurado é obrigatório'),
});

type LifeInsuranceData = z.infer<typeof lifeInsuranceSchema>;

interface LifeInsuranceFlowProps {
  onBack: () => void;
}

const LifeInsuranceFlow: React.FC<LifeInsuranceFlowProps> = ({ onBack }) => {
  const [formData, setFormData] = useState<Partial<LifeInsuranceData>>({});
  
  const { register, handleSubmit, formState: { errors }, setValue, watch } = useForm<LifeInsuranceData>({
    resolver: zodResolver(lifeInsuranceSchema),
    defaultValues: formData,
  });

  const { validate, errors: validationErrors } = useFormValidation({
    cpf: {
      required: true,
      customValidator: validateCPF,
      message: 'CPF inválido'
    }
  });

  const seriousIllness = watch('seriousIllness');
  const riskySports = watch('riskySports');

  const handleFieldChange = (field: keyof LifeInsuranceData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setValue(field, value);
  };

  const onSubmit = (data: LifeInsuranceData) => {
    console.log('Dados do seguro de vida:', data);
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

  const genderOptions = [
    { value: 'masculino', label: 'Masculino' },
    { value: 'feminino', label: 'Feminino' },
    { value: 'outro', label: 'Outro' }
  ];

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
              Cotação de Seguro de Vida
            </h1>
            <p className="text-gray-600">
              Seus Dados
            </p>
          </div>

          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="text-xl text-gray-800">
                Informações Pessoais e de Saúde
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                {/* Dados Pessoais */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-700 border-b pb-2">
                    Dados Pessoais
                  </h3>
                  
                  <div className="grid md:grid-cols-2 gap-4">
                    <StableFormField
                      id="fullName"
                      label="Nome Completo"
                      value={formData.fullName || ''}
                      onChange={(value) => handleFieldChange('fullName', value)}
                      error={errors.fullName?.message}
                      placeholder="Digite seu nome completo"
                      required
                    />
                    
                    <StableFormField
                      id="cpf"
                      label="CPF"
                      value={formData.cpf || ''}
                      onChange={(value) => handleFieldChange('cpf', value)}
                      onBlur={(value) => validate('cpf', value)}
                      error={errors.cpf?.message || validationErrors.cpf}
                      placeholder="000.000.000-00"
                      mask="999.999.999-99"
                      required
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <StableFormField
                      id="birthDate"
                      label="Data de Nascimento"
                      value={formData.birthDate || ''}
                      onChange={(value) => handleFieldChange('birthDate', value)}
                      error={errors.birthDate?.message}
                      placeholder="DD/MM/AAAA"
                      mask="99/99/9999"
                      required
                    />
                    
                    <StableFormField
                      id="email"
                      label="Email"
                      value={formData.email || ''}
                      onChange={(value) => handleFieldChange('email', value)}
                      error={errors.email?.message}
                      placeholder="email@exemplo.com"
                      type="email"
                      required
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <StableFormField
                      id="phone"
                      label="Telefone (WhatsApp)"
                      value={formData.phone || ''}
                      onChange={(value) => handleFieldChange('phone', value)}
                      error={errors.phone?.message}
                      placeholder="(11) 99999-9999"
                      mask="(99) 99999-9999"
                      required
                    />
                    
                    <StableFormField
                      id="profession"
                      label="Profissão"
                      value={formData.profession || ''}
                      onChange={(value) => handleFieldChange('profession', value)}
                      error={errors.profession?.message}
                      placeholder="Digite sua profissão"
                      required
                    />
                  </div>

                  <div className="space-y-4">
                    <RadioQuestion
                      title="Sexo"
                      field="gender"
                      value={formData.gender || ''}
                      onChange={(value) => handleFieldChange('gender', value)}
                      error={errors.gender?.message}
                      options={genderOptions}
                    />
                  </div>
                </div>

                {/* Informações de Saúde */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-700 border-b pb-2">
                    Informações de Saúde
                  </h3>
                  
                  <div className="space-y-6">
                    <RadioQuestion
                      title="Fumante?"
                      field="smoker"
                      value={formData.smoker || ''}
                      onChange={(value) => handleFieldChange('smoker', value)}
                      error={errors.smoker?.message}
                    />

                    <div className="space-y-3">
                      <RadioQuestion
                        title="Histórico de Doenças Graves (Cardíacas, Câncer, Diabetes, etc.)?"
                        field="seriousIllness"
                        value={formData.seriousIllness || ''}
                        onChange={(value) => handleFieldChange('seriousIllness', value)}
                        error={errors.seriousIllness?.message}
                      />
                      
                      {seriousIllness === 'sim' && (
                        <div className="ml-8">
                          <StableFormField
                            id="seriousIllnessDetails"
                            label="Quais doenças?"
                            value={formData.seriousIllnessDetails || ''}
                            onChange={(value) => handleFieldChange('seriousIllnessDetails', value)}
                            error={errors.seriousIllnessDetails?.message}
                            placeholder="Descreva as doenças..."
                          />
                        </div>
                      )}
                    </div>

                    <div className="space-y-3">
                      <RadioQuestion
                        title="Pratica Esportes de Risco (Ex: Paraquedismo, Mergulho Profundo, Escalada)?"
                        field="riskySports"
                        value={formData.riskySports || ''}
                        onChange={(value) => handleFieldChange('riskySports', value)}
                        error={errors.riskySports?.message}
                      />
                      
                      {riskySports === 'sim' && (
                        <div className="ml-8">
                          <StableFormField
                            id="riskySportsDetails"
                            label="Quais esportes?"
                            value={formData.riskySportsDetails || ''}
                            onChange={(value) => handleFieldChange('riskySportsDetails', value)}
                            error={errors.riskySportsDetails?.message}
                            placeholder="Descreva os esportes..."
                          />
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Capital Segurado */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-700 border-b pb-2">
                    Capital Segurado
                  </h3>
                  
                  <StableFormField
                    id="insuredCapital"
                    label="Capital Segurado Desejado"
                    value={formData.insuredCapital || ''}
                    onChange={(value) => handleFieldChange('insuredCapital', formatCurrency(value))}
                    error={errors.insuredCapital?.message}
                    placeholder="R$ 0,00"
                    required
                  />
                  
                  <p className="text-sm text-gray-500">
                    Valor da indenização que será pago aos beneficiários em caso de sinistro.
                  </p>
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

export default LifeInsuranceFlow;
