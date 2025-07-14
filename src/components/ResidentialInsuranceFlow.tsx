
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowLeft, Send, Home, User, MapPin } from 'lucide-react';
import { useFormValidation, validationPatterns, validateCPF } from '@/hooks/useFormValidation';
import { useViaCEP } from '@/hooks/useViaCEP';

interface ResidentialInsuranceFlowProps {
  onBack: () => void;
}

interface FormData {
  personalData: {
    fullName: string;
    cpf: string;
    birthDate: string;
    email: string;
    phone: string;
    profession: string;
  };
  propertyData: {
    cep: string;
    logradouro: string;
    bairro: string;
    localidade: string;
    uf: string;
    numero: string;
    complemento: string;
    propertyType: string;
    propertyPurpose: string;
    structureValue: string;
    contentsValue: string;
  };
}

const ResidentialInsuranceFlow: React.FC<ResidentialInsuranceFlowProps> = ({ onBack }) => {
  const [formData, setFormData] = useState<FormData>({
    personalData: {
      fullName: '',
      cpf: '',
      birthDate: '',
      email: '',
      phone: '',
      profession: ''
    },
    propertyData: {
      cep: '',
      logradouro: '',
      bairro: '',
      localidade: '',
      uf: '',
      numero: '',
      complemento: '',
      propertyType: '',
      propertyPurpose: '',
      structureValue: '',
      contentsValue: ''
    }
  });

  const { fetchAddress, loading } = useViaCEP();

  const validation = useFormValidation({
    fullName: { required: true, message: 'Nome completo é obrigatório' },
    cpf: { 
      required: true, 
      pattern: validationPatterns.cpf,
      customValidator: validateCPF,
      message: 'CPF inválido. Por favor, verifique o número.' 
    },
    birthDate: { required: true, message: 'Data de nascimento é obrigatória' },
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
    profession: { required: true, message: 'Profissão é obrigatória' },
    cep: { 
      required: true, 
      pattern: validationPatterns.cep, 
      message: 'CEP deve estar no formato 00000-000' 
    },
    numero: { required: true, message: 'Número é obrigatório' },
    propertyType: { required: true, message: 'Tipo de imóvel é obrigatório' },
    propertyPurpose: { required: true, message: 'Finalidade do imóvel é obrigatória' },
    structureValue: { required: true, message: 'Valor da estrutura é obrigatório' },
    contentsValue: { required: true, message: 'Valor dos bens é obrigatório' }
  });

  const updatePersonalData = (field: keyof FormData['personalData'], value: string) => {
    setFormData(prev => ({
      ...prev,
      personalData: { ...prev.personalData, [field]: value }
    }));
  };

  const updatePropertyData = (field: keyof FormData['propertyData'], value: string) => {
    setFormData(prev => ({
      ...prev,
      propertyData: { ...prev.propertyData, [field]: value }
    }));
  };

  const formatCPF = (value: string) => {
    const numbers = value.replace(/\D/g, '');
    if (numbers.length <= 11) {
      return numbers.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
    }
    return value;
  };

  const formatPhone = (value: string) => {
    const numbers = value.replace(/\D/g, '');
    if (numbers.length <= 11) {
      if (numbers.length <= 10) {
        return numbers.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3');
      } else {
        return numbers.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
      }
    }
    return value;
  };

  const formatCEP = (value: string) => {
    const numbers = value.replace(/\D/g, '');
    if (numbers.length <= 8) {
      return numbers.replace(/(\d{5})(\d{3})/, '$1-$2');
    }
    return value;
  };

  const formatCurrency = (value: string) => {
    const numbers = value.replace(/\D/g, '');
    const formatted = new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(parseInt(numbers) / 100);
    return formatted;
  };

  const handleCPFChange = (value: string) => {
    const formatted = formatCPF(value);
    updatePersonalData('cpf', formatted);
  };

  const handlePhoneChange = (value: string) => {
    const formatted = formatPhone(value);
    updatePersonalData('phone', formatted);
  };

  const handleCEPChange = async (value: string) => {
    const formatted = formatCEP(value);
    updatePropertyData('cep', formatted);
    
    if (formatted.length === 9) {
      const addressData = await fetchAddress(formatted);
      if (addressData) {
        updatePropertyData('logradouro', addressData.logradouro);
        updatePropertyData('bairro', addressData.bairro);
        updatePropertyData('localidade', addressData.localidade);
        updatePropertyData('uf', addressData.uf);
      }
    }
  };

  const handleCurrencyChange = (field: 'structureValue' | 'contentsValue', value: string) => {
    const formatted = formatCurrency(value);
    updatePropertyData(field, formatted);
  };

  const validateForm = (): boolean => {
    const allData = {
      ...formData.personalData,
      ...formData.propertyData
    };
    
    return validation.validateAll(allData as { [key: string]: string });
  };

  const handleSubmit = () => {
    if (validateForm()) {
      console.log('Dados do seguro residencial:', formData);
      alert('Cotação enviada com sucesso! Entraremos em contato em breve.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-12 px-4">
      <div className="w-full max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Cotação de Seguro Residencial
          </h1>
          <p className="text-xl text-gray-600">
            Proteja seu lar com a melhor cobertura
          </p>
        </div>

        <div className="space-y-8">
          {/* Dados Pessoais */}
          <Card className="bg-white shadow-lg border-0 rounded-2xl overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-blue-50 to-cyan-50 pb-6">
              <CardTitle className="text-3xl font-bold text-gray-800 flex items-center">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl flex items-center justify-center mr-4">
                  <User className="h-6 w-6 text-white" />
                </div>
                Dados Pessoais
              </CardTitle>
              <p className="text-gray-600 text-lg mt-2 ml-16">
                Informações do segurado
              </p>
            </CardHeader>
            <CardContent className="p-8">
              <div className="space-y-8">
                {/* Nome Completo */}
                <div>
                  <Label htmlFor="fullName" className="text-base font-semibold text-gray-700 mb-2 block">
                    Nome Completo <span className="text-blue-600">*</span>
                  </Label>
                  <Input
                    id="fullName"
                    type="text"
                    value={formData.personalData.fullName}
                    onChange={(e) => updatePersonalData('fullName', e.target.value)}
                    onBlur={(e) => validation.validate('fullName', e.target.value)}
                    className={`h-12 text-base border-2 rounded-xl transition-all duration-200 ${
                      validation.errors.fullName 
                        ? 'border-red-400 focus:border-red-500 bg-red-50' 
                        : 'border-gray-200 focus:border-blue-500 hover:border-gray-300'
                    }`}
                    placeholder="Digite seu nome completo"
                  />
                  {validation.errors.fullName && (
                    <p className="text-red-500 text-sm mt-2 flex items-center">
                      <span className="w-4 h-4 bg-red-500 rounded-full flex items-center justify-center text-white text-xs mr-2">!</span>
                      {validation.errors.fullName}
                    </p>
                  )}
                </div>

                <div className="grid gap-8 md:grid-cols-2">
                  {/* CPF */}
                  <div>
                    <Label htmlFor="cpf" className="text-base font-semibold text-gray-700 mb-2 block">
                      CPF <span className="text-blue-600">*</span>
                    </Label>
                    <Input
                      id="cpf"
                      type="text"
                      value={formData.personalData.cpf}
                      onChange={(e) => handleCPFChange(e.target.value)}
                      onBlur={(e) => validation.validate('cpf', e.target.value)}
                      className={`h-12 text-base border-2 rounded-xl transition-all duration-200 ${
                        validation.errors.cpf 
                          ? 'border-red-400 focus:border-red-500 bg-red-50' 
                          : 'border-gray-200 focus:border-blue-500 hover:border-gray-300'
                      }`}
                      placeholder="000.000.000-00"
                      maxLength={14}
                    />
                    {validation.errors.cpf && (
                      <p className="text-red-500 text-sm mt-2 flex items-center">
                        <span className="w-4 h-4 bg-red-500 rounded-full flex items-center justify-center text-white text-xs mr-2">!</span>
                        {validation.errors.cpf}
                      </p>
                    )}
                  </div>

                  {/* Data de Nascimento */}
                  <div>
                    <Label htmlFor="birthDate" className="text-base font-semibold text-gray-700 mb-2 block">
                      Data de Nascimento <span className="text-blue-600">*</span>
                    </Label>
                    <Input
                      id="birthDate"
                      type="date"
                      value={formData.personalData.birthDate}
                      onChange={(e) => updatePersonalData('birthDate', e.target.value)}
                      onBlur={(e) => validation.validate('birthDate', e.target.value)}
                      className={`h-12 text-base border-2 rounded-xl transition-all duration-200 ${
                        validation.errors.birthDate 
                          ? 'border-red-400 focus:border-red-500 bg-red-50' 
                          : 'border-gray-200 focus:border-blue-500 hover:border-gray-300'
                      }`}
                    />
                    {validation.errors.birthDate && (
                      <p className="text-red-500 text-sm mt-2 flex items-center">
                        <span className="w-4 h-4 bg-red-500 rounded-full flex items-center justify-center text-white text-xs mr-2">!</span>
                        {validation.errors.birthDate}
                      </p>
                    )}
                  </div>
                </div>

                <div className="grid gap-8 md:grid-cols-2">
                  {/* Email */}
                  <div>
                    <Label htmlFor="email" className="text-base font-semibold text-gray-700 mb-2 block">
                      Email <span className="text-blue-600">*</span>
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.personalData.email}
                      onChange={(e) => updatePersonalData('email', e.target.value)}
                      onBlur={(e) => validation.validate('email', e.target.value)}
                      className={`h-12 text-base border-2 rounded-xl transition-all duration-200 ${
                        validation.errors.email 
                          ? 'border-red-400 focus:border-red-500 bg-red-50' 
                          : 'border-gray-200 focus:border-blue-500 hover:border-gray-300'
                      }`}
                      placeholder="seu@email.com"
                    />
                    {validation.errors.email && (
                      <p className="text-red-500 text-sm mt-2 flex items-center">
                        <span className="w-4 h-4 bg-red-500 rounded-full flex items-center justify-center text-white text-xs mr-2">!</span>
                        {validation.errors.email}
                      </p>
                    )}
                  </div>

                  {/* Telefone */}
                  <div>
                    <Label htmlFor="phone" className="text-base font-semibold text-gray-700 mb-2 block">
                      Telefone (WhatsApp) <span className="text-blue-600">*</span>
                    </Label>
                    <Input
                      id="phone"
                      type="text"
                      value={formData.personalData.phone}
                      onChange={(e) => handlePhoneChange(e.target.value)}
                      onBlur={(e) => validation.validate('phone', e.target.value)}
                      className={`h-12 text-base border-2 rounded-xl transition-all duration-200 ${
                        validation.errors.phone 
                          ? 'border-red-400 focus:border-red-500 bg-red-50' 
                          : 'border-gray-200 focus:border-blue-500 hover:border-gray-300'
                      }`}
                      placeholder="(11) 99999-9999"
                      maxLength={15}
                    />
                    {validation.errors.phone && (
                      <p className="text-red-500 text-sm mt-2 flex items-center">
                        <span className="w-4 h-4 bg-red-500 rounded-full flex items-center justify-center text-white text-xs mr-2">!</span>
                        {validation.errors.phone}
                      </p>
                    )}
                  </div>
                </div>

                {/* Profissão */}
                <div>
                  <Label htmlFor="profession" className="text-base font-semibold text-gray-700 mb-2 block">
                    Profissão <span className="text-blue-600">*</span>
                  </Label>
                  <Input
                    id="profession"
                    type="text"
                    value={formData.personalData.profession}
                    onChange={(e) => updatePersonalData('profession', e.target.value)}
                    onBlur={(e) => validation.validate('profession', e.target.value)}
                    className={`h-12 text-base border-2 rounded-xl transition-all duration-200 ${
                      validation.errors.profession 
                        ? 'border-red-400 focus:border-red-500 bg-red-50' 
                        : 'border-gray-200 focus:border-blue-500 hover:border-gray-300'
                    }`}
                    placeholder="Digite sua profissão"
                  />
                  {validation.errors.profession && (
                    <p className="text-red-500 text-sm mt-2 flex items-center">
                      <span className="w-4 h-4 bg-red-500 rounded-full flex items-center justify-center text-white text-xs mr-2">!</span>
                      {validation.errors.profession}
                    </p>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Dados do Imóvel */}
          <Card className="bg-white shadow-lg border-0 rounded-2xl overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-green-50 to-blue-50 pb-6">
              <CardTitle className="text-3xl font-bold text-gray-800 flex items-center">
                <div className="w-12 h-12 bg-gradient-to-r from-green-600 to-green-700 rounded-xl flex items-center justify-center mr-4">
                  <Home className="h-6 w-6 text-white" />
                </div>
                Dados do Imóvel
              </CardTitle>
              <p className="text-gray-600 text-lg mt-2 ml-16">
                Informações sobre o imóvel a ser segurado
              </p>
            </CardHeader>
            <CardContent className="p-8">
              <div className="space-y-8">
                {/* CEP */}
                <div>
                  <Label htmlFor="cep" className="text-base font-semibold text-gray-700 mb-2 block">
                    CEP do Imóvel <span className="text-blue-600">*</span>
                  </Label>
                  <Input
                    id="cep"
                    type="text"
                    value={formData.propertyData.cep}
                    onChange={(e) => handleCEPChange(e.target.value)}
                    onBlur={(e) => validation.validate('cep', e.target.value)}
                    className={`h-12 text-base border-2 rounded-xl transition-all duration-200 ${
                      validation.errors.cep 
                        ? 'border-red-400 focus:border-red-500 bg-red-50' 
                        : 'border-gray-200 focus:border-blue-500 hover:border-gray-300'
                    }`}
                    placeholder="00000-000"
                    maxLength={9}
                  />
                  {loading && <p className="text-blue-500 text-sm mt-2">Buscando endereço...</p>}
                  {validation.errors.cep && (
                    <p className="text-red-500 text-sm mt-2 flex items-center">
                      <span className="w-4 h-4 bg-red-500 rounded-full flex items-center justify-center text-white text-xs mr-2">!</span>
                      {validation.errors.cep}
                    </p>
                  )}
                </div>

                {/* Endereço completo */}
                <div className="grid gap-8 md:grid-cols-2">
                  <div>
                    <Label className="text-base font-semibold text-gray-700 mb-2 block">
                      Logradouro
                    </Label>
                    <Input
                      type="text"
                      value={formData.propertyData.logradouro}
                      readOnly
                      className="h-12 text-base border-2 rounded-xl bg-gray-50 border-gray-200"
                    />
                  </div>
                  <div>
                    <Label className="text-base font-semibold text-gray-700 mb-2 block">
                      Bairro
                    </Label>
                    <Input
                      type="text"
                      value={formData.propertyData.bairro}
                      readOnly
                      className="h-12 text-base border-2 rounded-xl bg-gray-50 border-gray-200"
                    />
                  </div>
                </div>

                <div className="grid gap-8 md:grid-cols-3">
                  <div>
                    <Label className="text-base font-semibold text-gray-700 mb-2 block">
                      Cidade
                    </Label>
                    <Input
                      type="text"
                      value={formData.propertyData.localidade}
                      readOnly
                      className="h-12 text-base border-2 rounded-xl bg-gray-50 border-gray-200"
                    />
                  </div>
                  <div>
                    <Label className="text-base font-semibold text-gray-700 mb-2 block">
                      Estado
                    </Label>
                    <Input
                      type="text"
                      value={formData.propertyData.uf}
                      readOnly
                      className="h-12 text-base border-2 rounded-xl bg-gray-50 border-gray-200"
                    />
                  </div>
                  <div>
                    <Label htmlFor="numero" className="text-base font-semibold text-gray-700 mb-2 block">
                      Número <span className="text-blue-600">*</span>
                    </Label>
                    <Input
                      id="numero"
                      type="text"
                      value={formData.propertyData.numero}
                      onChange={(e) => updatePropertyData('numero', e.target.value)}
                      onBlur={(e) => validation.validate('numero', e.target.value)}
                      className={`h-12 text-base border-2 rounded-xl transition-all duration-200 ${
                        validation.errors.numero 
                          ? 'border-red-400 focus:border-red-500 bg-red-50' 
                          : 'border-gray-200 focus:border-blue-500 hover:border-gray-300'
                      }`}
                      placeholder="123"
                    />
                    {validation.errors.numero && (
                      <p className="text-red-500 text-sm mt-2 flex items-center">
                        <span className="w-4 h-4 bg-red-500 rounded-full flex items-center justify-center text-white text-xs mr-2">!</span>
                        {validation.errors.numero}
                      </p>
                    )}
                  </div>
                </div>

                {/* Complemento */}
                <div>
                  <Label htmlFor="complemento" className="text-base font-semibold text-gray-700 mb-2 block">
                    Complemento
                  </Label>
                  <Input
                    id="complemento"
                    type="text"
                    value={formData.propertyData.complemento}
                    onChange={(e) => updatePropertyData('complemento', e.target.value)}
                    className="h-12 text-base border-2 rounded-xl border-gray-200 focus:border-blue-500 hover:border-gray-300"
                    placeholder="Apartamento, casa, etc."
                  />
                </div>

                <div className="grid gap-8 md:grid-cols-2">
                  {/* Tipo de Imóvel */}
                  <div>
                    <Label className="text-base font-semibold text-gray-700 mb-2 block">
                      Tipo de Imóvel <span className="text-blue-600">*</span>
                    </Label>
                    <Select 
                      value={formData.propertyData.propertyType} 
                      onValueChange={(value) => updatePropertyData('propertyType', value)}
                    >
                      <SelectTrigger className={`h-12 text-base border-2 rounded-xl transition-all duration-200 ${
                        validation.errors.propertyType 
                          ? 'border-red-400 focus:border-red-500 bg-red-50' 
                          : 'border-gray-200 focus:border-blue-500 hover:border-gray-300'
                      }`}>
                        <SelectValue placeholder="Selecione o tipo" />
                      </SelectTrigger>
                      <SelectContent className="bg-white z-50 border-2 border-gray-200 rounded-xl shadow-xl">
                        <SelectItem value="casa" className="text-base py-3 hover:bg-blue-50 rounded-lg">Casa</SelectItem>
                        <SelectItem value="apartamento" className="text-base py-3 hover:bg-blue-50 rounded-lg">Apartamento</SelectItem>
                        <SelectItem value="cobertura" className="text-base py-3 hover:bg-blue-50 rounded-lg">Cobertura</SelectItem>
                        <SelectItem value="kitnet" className="text-base py-3 hover:bg-blue-50 rounded-lg">Kitnet</SelectItem>
                      </SelectContent>
                    </Select>
                    {validation.errors.propertyType && (
                      <p className="text-red-500 text-sm mt-2 flex items-center">
                        <span className="w-4 h-4 bg-red-500 rounded-full flex items-center justify-center text-white text-xs mr-2">!</span>
                        {validation.errors.propertyType}
                      </p>
                    )}
                  </div>

                  {/* Finalidade do Imóvel */}
                  <div>
                    <Label className="text-base font-semibold text-gray-700 mb-2 block">
                      Finalidade do Imóvel <span className="text-blue-600">*</span>
                    </Label>
                    <Select 
                      value={formData.propertyData.propertyPurpose} 
                      onValueChange={(value) => updatePropertyData('propertyPurpose', value)}
                    >
                      <SelectTrigger className={`h-12 text-base border-2 rounded-xl transition-all duration-200 ${
                        validation.errors.propertyPurpose 
                          ? 'border-red-400 focus:border-red-500 bg-red-50' 
                          : 'border-gray-200 focus:border-blue-500 hover:border-gray-300'
                      }`}>
                        <SelectValue placeholder="Selecione a finalidade" />
                      </SelectTrigger>
                      <SelectContent className="bg-white z-50 border-2 border-gray-200 rounded-xl shadow-xl">
                        <SelectItem value="residencia-habitual" className="text-base py-3 hover:bg-blue-50 rounded-lg">Residência habitual</SelectItem>
                        <SelectItem value="veraneio" className="text-base py-3 hover:bg-blue-50 rounded-lg">Veraneio</SelectItem>
                        <SelectItem value="aluguel" className="text-base py-3 hover:bg-blue-50 rounded-lg">Aluguel</SelectItem>
                        <SelectItem value="investimento" className="text-base py-3 hover:bg-blue-50 rounded-lg">Investimento</SelectItem>
                      </SelectContent>
                    </Select>
                    {validation.errors.propertyPurpose && (
                      <p className="text-red-500 text-sm mt-2 flex items-center">
                        <span className="w-4 h-4 bg-red-500 rounded-full flex items-center justify-center text-white text-xs mr-2">!</span>
                        {validation.errors.propertyPurpose}
                      </p>
                    )}
                  </div>
                </div>

                <div className="grid gap-8 md:grid-cols-2">
                  {/* Valor Estimado da Estrutura */}
                  <div>
                    <Label htmlFor="structureValue" className="text-base font-semibold text-gray-700 mb-2 block">
                      Valor Estimado do Imóvel (estrutura) <span className="text-blue-600">*</span>
                    </Label>
                    <Input
                      id="structureValue"
                      type="text"
                      value={formData.propertyData.structureValue}
                      onChange={(e) => handleCurrencyChange('structureValue', e.target.value)}
                      onBlur={(e) => validation.validate('structureValue', e.target.value)}
                      className={`h-12 text-base border-2 rounded-xl transition-all duration-200 ${
                        validation.errors.structureValue 
                          ? 'border-red-400 focus:border-red-500 bg-red-50' 
                          : 'border-gray-200 focus:border-blue-500 hover:border-gray-300'
                      }`}
                      placeholder="R$ 0,00"
                    />
                    {validation.errors.structureValue && (
                      <p className="text-red-500 text-sm mt-2 flex items-center">
                        <span className="w-4 h-4 bg-red-500 rounded-full flex items-center justify-center text-white text-xs mr-2">!</span>
                        {validation.errors.structureValue}
                      </p>
                    )}
                  </div>

                  {/* Valor Estimado dos Bens */}
                  <div>
                    <Label htmlFor="contentsValue" className="text-base font-semibold text-gray-700 mb-2 block">
                      Valor Estimado de Bens (conteúdo) <span className="text-blue-600">*</span>
                    </Label>
                    <Input
                      id="contentsValue"
                      type="text"
                      value={formData.propertyData.contentsValue}
                      onChange={(e) => handleCurrencyChange('contentsValue', e.target.value)}
                      onBlur={(e) => validation.validate('contentsValue', e.target.value)}
                      className={`h-12 text-base border-2 rounded-xl transition-all duration-200 ${
                        validation.errors.contentsValue 
                          ? 'border-red-400 focus:border-red-500 bg-red-50' 
                          : 'border-gray-200 focus:border-blue-500 hover:border-gray-300'
                      }`}
                      placeholder="R$ 0,00"
                    />
                    {validation.errors.contentsValue && (
                      <p className="text-red-500 text-sm mt-2 flex items-center">
                        <span className="w-4 h-4 bg-red-500 rounded-full flex items-center justify-center text-white text-xs mr-2">!</span>
                        {validation.errors.contentsValue}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Botões de Navegação */}
        <div className="flex justify-between items-center mt-10">
          <Button
            onClick={onBack}
            variant="outline"
            className="h-14 px-8 text-base font-semibold border-2 border-blue-600 text-blue-600 hover:bg-blue-50 hover:border-blue-700 transition-all duration-200 rounded-xl flex items-center space-x-2"
            size="lg"
          >
            <ArrowLeft className="h-5 w-5" />
            <span>Voltar</span>
          </Button>

          <Button
            onClick={handleSubmit}
            className="h-14 px-8 text-base font-semibold bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white transition-all duration-200 rounded-xl flex items-center space-x-2 shadow-lg hover:shadow-xl"
            size="lg"
          >
            <span>Enviar Cotação</span>
            <Send className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ResidentialInsuranceFlow;
