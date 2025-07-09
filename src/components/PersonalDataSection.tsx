import React, { memo } from 'react';
import StablePersonalData from '@/components/stable-personal-data';

interface PersonalData {
  fullName: string;
  cpf: string;
  birthDate: string;
  maritalStatus: string;
  email: string;
  phone: string;
  profession: string;
}

interface PersonalDataSectionProps {
  data: PersonalData;
  onChange: (field: keyof PersonalData, value: string) => void;
  errors: { [key: string]: string };
  onFieldBlur: (field: string, value: string) => void;
  isOptional?: boolean;
}

const PersonalDataSection: React.FC<PersonalDataSectionProps> = memo(({ 
  data, 
  onChange, 
  errors, 
  onFieldBlur,
  isOptional = false
}) => {
  return (
    <StablePersonalData
      data={data}
      onChange={onChange}
      errors={errors}
      onFieldBlur={onFieldBlur}
      isOptional={isOptional}
    />
  );
});

PersonalDataSection.displayName = 'PersonalDataSection';

export default PersonalDataSection;
