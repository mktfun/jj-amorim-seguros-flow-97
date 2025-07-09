
import React, { memo } from 'react';
import StableVehicleData from '@/components/stable-vehicle-data';

interface VehicleData {
  model: string;
  plate: string;
  chassis: string;
  year: string;
  isFinanced: string;
}

interface VehicleDataSectionProps {
  data: VehicleData;
  onChange: (field: keyof VehicleData, value: string) => void;
  errors: { [key: string]: string };
  onFieldBlur: (field: string, value: string) => void;
  isOptional?: boolean;
}

const VehicleDataSection: React.FC<VehicleDataSectionProps> = memo(({ 
  data, 
  onChange, 
  errors, 
  onFieldBlur,
  isOptional = false
}) => {
  return (
    <StableVehicleData
      data={data}
      onChange={onChange}
      errors={errors}
      onFieldBlur={onFieldBlur}
      isOptional={isOptional}
    />
  );
});

VehicleDataSection.displayName = 'VehicleDataSection';

export default VehicleDataSection;
