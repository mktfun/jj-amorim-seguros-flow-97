
import React from 'react';
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

interface RiskDataEditProps {
  data: RiskData;
  onChange: (field: keyof RiskData, value: string) => void;
}

const RiskDataEdit: React.FC<RiskDataEditProps> = ({ 
  data, 
  onChange
}) => {
  const handleBlur = () => {
    // No validation needed for edit mode
  };

  const errors = {};

  return (
    <StableRiskData
      data={data}
      onChange={onChange}
      errors={errors}
      onFieldBlur={handleBlur}
      isOptional={true}
    />
  );
};

export default RiskDataEdit;
