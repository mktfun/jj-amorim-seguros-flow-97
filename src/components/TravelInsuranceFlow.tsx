
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { ArrowLeft, ArrowRight, Calendar, MapPin, User, Plane } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { StableFormField } from '@/components/ui/stable-form-field';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import { Input } from '@/components/ui/input';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import ProgressIndicator from '@/components/ProgressIndicator';
import RadioQuestion from '@/components/risk-data/RadioQuestion';
import { useFormValidation, validateCPF } from '@/hooks/useFormValidation';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';

const travelInsuranceSchema = z.object({
  // Traveler data
  nomeCompleto: z.string().min(2, 'Nome completo é obrigatório'),
  cpf: z.string().min(11, 'CPF é obrigatório').refine(validateCPF, 'CPF inválido'),
  dataNascimento: z.string().min(10, 'Data de nascimento é obrigatória'),
  email: z.string().email('Email inválido'),
  telefone: z.string().min(11, 'Telefone é obrigatório'),
  profissao: z.string().min(2, 'Profissão é obrigatória'),
  
  // Trip data
  paisDestino: z.string().min(1, 'País de destino é obrigatório'),
  dataInicio: z.date({ required_error: 'Data de início é obrigatória' }),
  dataFim: z.date({ required_error: 'Data de fim é obrigatória' }),
  numeroViajantes: z.string().min(1, 'Número de viajantes é obrigatório'),
  esportesRadicais: z.enum(['sim', 'nao'], { required_error: 'Selecione uma opção' }),
  quaisEsportes: z.string().optional(),
}).refine((data) => data.dataFim > data.dataInicio, {
  message: 'Data de fim deve ser posterior à data de início',
  path: ['dataFim'],
});

type TravelInsuranceFormData = z.infer<typeof travelInsuranceSchema>;

interface TravelInsuranceFlowProps {
  onBack: () => void;
}

const countries = [
  'Estados Unidos', 'França', 'Espanha', 'Itália', 'Alemanha', 'Reino Unido',
  'Portugal', 'Argentina', 'Chile', 'Uruguai', 'Japão', 'Coreia do Sul',
  'Tailândia', 'Singapura', 'Austrália', 'Nova Zelândia', 'Canadá', 'México',
  'Outros'
];

const validationRules = {
  nomeCompleto: { required: true, message: 'Nome completo é obrigatório' },
  cpf: { required: true, customValidator: validateCPF, message: 'CPF inválido' },
  dataNascimento: { required: true, message: 'Data de nascimento é obrigatória' },
  email: { required: true, pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Email inválido' },
  telefone: { required: true, message: 'Telefone é obrigatório' },
  profissao: { required: true, message: 'Profissão é obrigatória' },
  paisDestino: { required: true, message: 'País de destino é obrigatório' },
  numeroViajantes: { required: true, message: 'Número de viajantes é obrigatório' },
  esportesRadicais: { required: true, message: 'Selecione uma opção' },
};

const TravelInsuranceFlow: React.FC<TravelInsuranceFlowProps> = ({ onBack }) => {
  const { errors, validate, validateAll } = useFormValidation(validationRules);
  
  const form = useForm<TravelInsuranceFormData>({
    resolver: zodResolver(travelInsuranceSchema),
    defaultValues: {
      nomeCompleto: '',
      cpf: '',
      dataNascimento: '',
      email: '',
      telefone: '',
      profissao: '',
      paisDestino: '',
      numeroViajantes: '',
      esportesRadicais: 'nao',
      quaisEsportes: '',
    },
  });

  const [formData, setFormData] = useState<Partial<TravelInsuranceFormData>>({});
  const [showSportsDetails, setShowSportsDetails] = useState(false);

  const handleFieldChange = (field: keyof TravelInsuranceFormData, value: string) => {
    const newFormData = { ...formData, [field]: value };
    setFormData(newFormData);
    validate(field, value);
    
    if (field === 'esportesRadicais') {
      setShowSportsDetails(value === 'sim');
      if (value === 'nao') {
        setFormData(prev => ({ ...prev, quaisEsportes: '' }));
      }
    }
  };

  const handleSubmit = (data: TravelInsuranceFormData) => {
    console.log('Dados do seguro viagem:', data);
    // Implementar lógica de envio
  };

  const stepTitles = ['Dados do Viajante e Destino'];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <ProgressIndicator 
          currentStep={1} 
          totalSteps={1} 
          stepTitles={stepTitles}
        />

        <Card className="max-w-4xl mx-auto">
          <CardHeader className="text-center pb-8">
            <CardTitle className="text-3xl font-bold text-gray-800 flex items-center justify-center gap-3">
              <Plane className="w-8 h-8 text-blue-600" />
              Cotação de Seguro Viagem - Seus Dados e Destino
            </CardTitle>
          </CardHeader>

          <CardContent className="space-y-8">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
                {/* Dados do Viajante */}
                <div className="space-y-6">
                  <div className="flex items-center gap-2 mb-6">
                    <User className="w-5 h-5 text-blue-600" />
                    <h3 className="text-xl font-semibold text-gray-800">Dados do Viajante</h3>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <StableFormField
                      id="nomeCompleto"
                      label="Nome Completo"
                      value={formData.nomeCompleto || ''}
                      onChange={(value) => handleFieldChange('nomeCompleto', value)}
                      error={errors.nomeCompleto}
                      placeholder="Digite seu nome completo"
                      required
                    />

                    <StableFormField
                      id="cpf"
                      label="CPF"
                      value={formData.cpf || ''}
                      onChange={(value) => handleFieldChange('cpf', value)}
                      error={errors.cpf}
                      placeholder="000.000.000-00"
                      mask="000.000.000-00"
                      required
                    />

                    <StableFormField
                      id="dataNascimento"
                      label="Data de Nascimento"
                      value={formData.dataNascimento || ''}
                      onChange={(value) => handleFieldChange('dataNascimento', value)}
                      error={errors.dataNascimento}
                      placeholder="dd/mm/aaaa"
                      mask="00/00/0000"
                      required
                    />

                    <StableFormField
                      id="email"
                      label="Email"
                      value={formData.email || ''}
                      onChange={(value) => handleFieldChange('email', value)}
                      error={errors.email}
                      placeholder="seuemail@exemplo.com"
                      type="email"
                      required
                    />

                    <StableFormField
                      id="telefone"
                      label="Telefone (WhatsApp)"
                      value={formData.telefone || ''}
                      onChange={(value) => handleFieldChange('telefone', value)}
                      error={errors.telefone}
                      placeholder="(00) 00000-0000"
                      mask="(00) 00000-0000"
                      required
                    />

                    <StableFormField
                      id="profissao"
                      label="Profissão"
                      value={formData.profissao || ''}
                      onChange={(value) => handleFieldChange('profissao', value)}
                      error={errors.profissao}
                      placeholder="Digite sua profissão"
                      required
                    />
                  </div>
                </div>

                {/* Dados da Viagem */}
                <div className="space-y-6">
                  <div className="flex items-center gap-2 mb-6">
                    <MapPin className="w-5 h-5 text-blue-600" />
                    <h3 className="text-xl font-semibold text-gray-800">Dados da Viagem</h3>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="paisDestino"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm font-medium text-gray-700">
                            País de Destino Principal <span className="text-red-500">*</span>
                          </FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Selecione o país" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {countries.map((country) => (
                                <SelectItem key={country} value={country}>
                                  {country}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <StableFormField
                      id="numeroViajantes"
                      label="Número de Viajantes"
                      value={formData.numeroViajantes || ''}
                      onChange={(value) => handleFieldChange('numeroViajantes', value)}
                      error={errors.numeroViajantes}
                      placeholder="1"
                      type="number"
                      required
                    />

                    <FormField
                      control={form.control}
                      name="dataInicio"
                      render={({ field }) => (
                        <FormItem className="flex flex-col">
                          <FormLabel className="text-sm font-medium text-gray-700">
                            Data de Início da Viagem <span className="text-red-500">*</span>
                          </FormLabel>
                          <Popover>
                            <PopoverTrigger asChild>
                              <FormControl>
                                <Button
                                  variant="outline"
                                  className={cn(
                                    "w-full pl-3 text-left font-normal",
                                    !field.value && "text-muted-foreground"
                                  )}
                                >
                                  {field.value ? (
                                    format(field.value, "dd/MM/yyyy")
                                  ) : (
                                    <span>Selecione a data</span>
                                  )}
                                  <Calendar className="ml-auto h-4 w-4 opacity-50" />
                                </Button>
                              </FormControl>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0" align="start">
                              <CalendarComponent
                                mode="single"
                                selected={field.value}
                                onSelect={field.onChange}
                                disabled={(date) => date < new Date()}
                                initialFocus
                                className="p-3 pointer-events-auto"
                              />
                            </PopoverContent>
                          </Popover>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="dataFim"
                      render={({ field }) => (
                        <FormItem className="flex flex-col">
                          <FormLabel className="text-sm font-medium text-gray-700">
                            Data de Fim da Viagem <span className="text-red-500">*</span>
                          </FormLabel>
                          <Popover>
                            <PopoverTrigger asChild>
                              <FormControl>
                                <Button
                                  variant="outline"
                                  className={cn(
                                    "w-full pl-3 text-left font-normal",
                                    !field.value && "text-muted-foreground"
                                  )}
                                >
                                  {field.value ? (
                                    format(field.value, "dd/MM/yyyy")
                                  ) : (
                                    <span>Selecione a data</span>
                                  )}
                                  <Calendar className="ml-auto h-4 w-4 opacity-50" />
                                </Button>
                              </FormControl>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0" align="start">
                              <CalendarComponent
                                mode="single"
                                selected={field.value}
                                onSelect={field.onChange}
                                disabled={(date) => date < new Date()}
                                initialFocus
                                className="p-3 pointer-events-auto"
                              />
                            </PopoverContent>
                          </Popover>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="space-y-4">
                    <RadioQuestion
                      title="Pratica Esportes Radicais na Viagem?"
                      field="esportesRadicais"
                      value={formData.esportesRadicais || ''}
                      onChange={(value) => handleFieldChange('esportesRadicais', value)}
                      error={errors.esportesRadicais}
                    />

                    {showSportsDetails && (
                      <StableFormField
                        id="quaisEsportes"
                        label="Quais esportes?"
                        value={formData.quaisEsportes || ''}
                        onChange={(value) => handleFieldChange('quaisEsportes', value)}
                        error={errors.quaisEsportes}
                        placeholder="Ex: Paraquedismo, Mergulho, Escalada..."
                      />
                    )}
                  </div>
                </div>

                {/* Navigation Buttons */}
                <div className="flex justify-between pt-8">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={onBack}
                    className="flex items-center gap-2"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    Voltar
                  </Button>

                  <Button
                    type="submit"
                    className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700"
                  >
                    Próxima Etapa
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default TravelInsuranceFlow;
