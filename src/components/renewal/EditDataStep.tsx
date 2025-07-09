
import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { ChevronDown, ChevronRight, User, Car, Shield, Send, Edit3 } from 'lucide-react';
import PersonalDataEdit from './PersonalDataEdit';
import VehicleDataEdit from './VehicleDataEdit';
import RiskDataEdit from './RiskDataEdit';

interface RenewalEditableData {
  personalData: {
    fullName: string;
    cpf: string;
    birthDate: string;
    maritalStatus: string;
    email: string;
    phone: string;
    profession: string;
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

interface EditDataStepProps {
  data: RenewalEditableData;
  onChange: (section: keyof RenewalEditableData, field: string, value: string) => void;
  onSubmit: () => void;
}

const EditDataStep: React.FC<EditDataStepProps> = ({
  data,
  onChange,
  onSubmit
}) => {
  const [openSections, setOpenSections] = useState<{
    personal: boolean;
    vehicle: boolean;
    risk: boolean;
  }>({
    personal: false,
    vehicle: false,
    risk: false
  });

  const toggleSection = (section: 'personal' | 'vehicle' | 'risk') => {
    setOpenSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const CollapsibleSection = ({ 
    section, 
    title, 
    icon: Icon, 
    description,
    children 
  }: { 
    section: 'personal' | 'vehicle' | 'risk';
    title: string; 
    icon: any;
    description: string;
    children: React.ReactNode;
  }) => (
    <Collapsible 
      open={openSections[section]} 
      onOpenChange={() => toggleSection(section)}
    >
      <CollapsibleTrigger asChild>
        <Card className="cursor-pointer transition-all duration-300 hover:shadow-lg border-2 border-gray-200 hover:border-blue-300 rounded-2xl">
          <CardHeader className="pb-6">
            <CardTitle className="text-2xl font-bold text-gray-800 flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-14 h-14 bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl flex items-center justify-center mr-4 shadow-lg">
                  <Icon className="h-7 w-7 text-white" />
                </div>
                <div>
                  <div>{title}</div>
                  <p className="text-sm font-normal text-gray-600 mt-1">{description}</p>
                </div>
              </div>
              <div className="flex items-center text-blue-600">
                <span className="text-lg font-medium mr-3">
                  {openSections[section] ? 'Recolher' : 'Expandir'}
                </span>
                {openSections[section] ? (
                  <ChevronDown className="h-6 w-6" />
                ) : (
                  <ChevronRight className="h-6 w-6" />
                )}
              </div>
            </CardTitle>
          </CardHeader>
        </Card>
      </CollapsibleTrigger>
      <CollapsibleContent className="mt-6">
        {children}
      </CollapsibleContent>
    </Collapsible>
  );

  return (
    <div className="space-y-10">
      {/* Instrução */}
      <Card className="bg-gradient-to-r from-blue-50 via-cyan-50 to-blue-50 border-l-4 border-blue-500 shadow-lg rounded-2xl">
        <CardContent className="p-8">
          <div className="flex items-center space-x-4 mb-4">
            <Edit3 className="h-8 w-8 text-blue-600" />
            <h3 className="text-2xl font-semibold text-gray-800">Edição de Dados</h3>
          </div>
          <p className="text-lg text-gray-700 font-medium leading-relaxed">
            Por favor, indique abaixo quais informações foram alteradas. 
            Você só precisa preencher o(s) campo(s) que mudou(aram).
          </p>
          <p className="text-gray-600 mt-3 text-base">
            Clique nas seções abaixo para expandir e editar apenas os dados que foram alterados.
          </p>
        </CardContent>
      </Card>

      {/* Seções Expansíveis */}
      <div className="space-y-8">
        <CollapsibleSection
          section="personal"
          title="Dados Pessoais"
          description="Nome, CPF, data de nascimento, estado civil, contatos"
          icon={User}
        >
          <PersonalDataEdit
            data={data.personalData}
            onChange={(field, value) => onChange('personalData', field, value)}
          />
        </CollapsibleSection>

        <CollapsibleSection
          section="vehicle"
          title="Dados do Veículo"
          description="Modelo, placa, chassis, ano e financiamento"
          icon={Car}
        >
          <VehicleDataEdit
            data={data.vehicleData}
            onChange={(field, value) => onChange('vehicleData', field, value)}
          />
        </CollapsibleSection>

        <CollapsibleSection
          section="risk"
          title="Questionário de Risco"
          description="CEP, tipo de garagem, residência e uso do veículo"
          icon={Shield}
        >
          <RiskDataEdit
            data={data.riskData}
            onChange={(field, value) => onChange('riskData', field, value)}
          />
        </CollapsibleSection>
      </div>

      {/* Botão de Envio */}
      <div className="flex justify-center pt-8">
        <Button
          onClick={onSubmit}
          className="h-16 px-12 text-xl font-semibold bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white transition-all duration-300 rounded-2xl flex items-center space-x-4 shadow-xl hover:shadow-2xl transform hover:scale-105"
          size="lg"
        >
          <span>Enviar Alterações para Orçamento</span>
          <Send className="h-6 w-6" />
        </Button>
      </div>
    </div>
  );
};

export default EditDataStep;
