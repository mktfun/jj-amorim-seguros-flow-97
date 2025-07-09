
import React, { memo } from 'react';
import StableRiskData from '@/components/stable-risk-data';

interface RiskData {
  cep: string;
  logradouro: string;
  bairro: string;
  localidade: string;
  uf: string;
  garageType: string;
  residenceType: string;
  usesForWork: string;
  workParking: string;
  youngResidents: string;
  rideshareWork: string;
}

interface RiskDataSectionProps {
  data: RiskData;
  onChange: (field: keyof RiskData, value: string) => void;
  errors: { [key: string]: string };
  onFieldBlur: (field: string, value: string) => void;
  isOptional?: boolean;
}

const RiskDataSection: React.FC<RiskDataSectionProps> = memo(({ 
  data, 
  onChange, 
  errors, 
  onFieldBlur,
  isOptional = false
}) => {
  return (
    <StableRiskData
      data={data}
      onChange={onChange}
      errors={errors}
      onFieldBlur={onFieldBlur}
      isOptional={isOptional}
    />
  );
});

RiskDataSection.displayName = 'RiskDataSection';

export default RiskDataSection;
