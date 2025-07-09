
import React from 'react';
import StablePersonalData from '@/components/stable-personal-data';

interface PersonalData {
  fullName: string;
  cpf: string;
  birthDate: string;
  maritalStatus: string;
  email: string;
  phone: string;
}

interface PersonalDataEditProps {
  data: PersonalData;
  onChange: (field: keyof PersonalData, value: string) => void;
}

const PersonalDataEdit: React.FC<PersonalDataEditProps> = ({ 
  data, 
  onChange
}) => {
  const handleBlur = () => {
    // No validation needed for edit mode
  };

  const errors = {};

  return (
    <StablePersonalData
      data={data}
      onChange={onChange}
      errors={errors}
      onFieldBlur={handleBlur}
      isOptional={true}
    />
  );
};

export default PersonalDataEdit;
