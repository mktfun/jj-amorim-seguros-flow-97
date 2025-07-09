
import React from 'react';
import StableVehicleData from '@/components/stable-vehicle-data';

interface VehicleData {
  model: string;
  plate: string;
  year: string;
  isFinanced: string;
}

interface VehicleDataEditProps {
  data: VehicleData;
  onChange: (field: keyof VehicleData, value: string) => void;
}

const VehicleDataEdit: React.FC<VehicleDataEditProps> = ({ 
  data, 
  onChange
}) => {
  const handleBlur = () => {
    // No validation needed for edit mode
  };

  const errors = {};

  return (
    <StableVehicleData
      data={data}
      onChange={onChange}
      errors={errors}
      onFieldBlur={handleBlur}
      isOptional={true}
    />
  );
};

export default VehicleDataEdit;
