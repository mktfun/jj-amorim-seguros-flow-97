
import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { ChevronDown, ChevronRight, User, Car, Shield, Send } from 'lucide-react';
import PersonalDataSection from './PersonalDataSection';
import VehicleDataSection from './VehicleDataSection';
import RiskDataSection from './RiskDataSection';

interface PersonalData {
  fullName: string;
  cpf: string;
  birthDate: string;
  maritalStatus: string;
  email: string;
  phone: string;
}

interface VehicleData {
  model: string;
  plate: string;
  chassis: string;
  year: string;
  isFinanced: string;
}

interface RiskData {
  cep: string;
  garageType: string;
  residenceType: string;
  usesForWork: string;
  workParking: string;
  youngResidents: string;
  rideshareWork: string;
}

interface ConditionalEditStepProps {
  personalData: PersonalData;
  vehicleData: VehicleData;
  riskData: RiskData;
  onPersonalDataChange: (field: keyof PersonalData, value: string) => void;
  onVehicleDataChange: (field: keyof VehicleData, value: string) => void;
  onRiskDataChange: (field: keyof RiskData, value: string) => void;
  errors: { [key: string]: string };
  onFieldBlur: (field: string, value: string) => void;
  onSubmit: () => void;
}

const ConditionalEditStep: React.FC<ConditionalEditStepProps> = ({
  personalData,
  vehicleData,
  riskData,
  onPersonalDataChange,
  onVehicleDataChange,
  onRiskDataChange,
  errors,
  onFieldBlur,
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
    children 
  }: { 
    section: 'personal' | 'vehicle' | 'risk';
    title: string; 
    icon: any; 
    children: React.ReactNode;
  }) => (
    <Collapsible 
      open={openSections[section]} 
      onOpenChange={() => toggleSection(section)}
    >
      <CollapsibleTrigger asChild>
        <Card className="cursor-pointer transition-all duration-200 hover:shadow-md border-2 border-gray-200 hover:border-blue-300">
          <CardHeader className="pb-4">
            <CardTitle className="text-xl font-bold text-gray-800 flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg flex items-center justify-center mr-3">
                  <Icon className="h-5 w-5 text-white" />
                </div>
                {title}
              </div>
              <div className="flex items-center text-blue-600">
                <span className="text-sm font-medium mr-2">
                  {openSections[section] ? 'Recolher' : 'Expandir'}
                </span>
                {openSections[section] ? (
                  <ChevronDown className="h-5 w-5" />
                ) : (
                  <ChevronRight className="h-5 w-5" />
                )}
              </div>
            </CardTitle>
          </CardHeader>
        </Card>
      </CollapsibleTrigger>
      <CollapsibleContent className="mt-4">
        {children}
      </CollapsibleContent>
    </Collapsible>
  );

  return (
    <div className="space-y-8">
      {/* Instrução */}
      <Card className="bg-gradient-to-r from-blue-50 to-cyan-50 border-l-4 border-blue-500">
        <CardContent className="p-6">
          <p className="text-lg text-gray-700 font-medium">
            Por favor, indique abaixo quais informações foram alteradas. 
            Você só precisa preencher o(s) campo(s) que mudou(aram).
          </p>
          <p className="text-gray-600 mt-2">
            Clique nas seções abaixo para expandir e editar apenas os dados que foram alterados.
          </p>
        </CardContent>
      </Card>

      {/* Seções Expansíveis */}
      <div className="space-y-6">
        <CollapsibleSection
          section="personal"
          title="Dados Pessoais do Principal Condutor"
          icon={User}
        >
          <PersonalDataSection
            data={personalData}
            onChange={onPersonalDataChange}
            errors={errors}
            onFieldBlur={onFieldBlur}
            isOptional={true}
          />
        </CollapsibleSection>

        <CollapsibleSection
          section="vehicle"
          title="Dados do Veículo"
          icon={Car}
        >
          <VehicleDataSection
            data={vehicleData}
            onChange={onVehicleDataChange}
            errors={errors}
            onFieldBlur={onFieldBlur}
            isOptional={true}
          />
        </CollapsibleSection>

        <CollapsibleSection
          section="risk"
          title="Questionário de Risco"
          icon={Shield}
        >
          <RiskDataSection
            data={riskData}
            onChange={onRiskDataChange}
            errors={errors}
            onFieldBlur={onFieldBlur}
            isOptional={true}
          />
        </CollapsibleSection>
      </div>

      {/* Botão de Envio */}
      <div className="flex justify-center pt-6">
        <Button
          onClick={onSubmit}
          className="h-14 px-10 text-lg font-semibold bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white transition-all duration-200 rounded-xl flex items-center space-x-3 shadow-lg hover:shadow-xl"
          size="lg"
        >
          <span>Enviar Alterações para Orçamento</span>
          <Send className="h-5 w-5" />
        </Button>
      </div>
    </div>
  );
};

export default ConditionalEditStep;
