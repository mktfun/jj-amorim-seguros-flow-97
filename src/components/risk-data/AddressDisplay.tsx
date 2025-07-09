
import React, { memo } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { MapPin } from 'lucide-react';

interface AddressData {
  logradouro: string;
  bairro: string;
  localidade: string;
  uf: string;
}

interface AddressDisplayProps {
  data: AddressData;
  onChange: (field: keyof AddressData, value: string) => void;
}

const AddressDisplay: React.FC<AddressDisplayProps> = memo(({ data, onChange }) => (
  <div className="bg-accent p-4 rounded-lg border border-jj-cyan-border">
    <div className="flex items-center mb-3">
      <MapPin className="h-4 w-4 text-primary mr-2" />
      <h4 className="text-sm font-medium jj-blue-dark">Endereço Completo</h4>
    </div>
    
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <Label htmlFor="logradouro" className="text-xs font-medium text-muted-foreground mb-1 block">
          Logradouro (Rua)
        </Label>
        <Input
          id="logradouro"
          type="text"
          value={data.logradouro}
          onChange={(e) => onChange('logradouro', e.target.value)}
          className="h-8 text-xs bg-white"
          placeholder="Rua, Avenida..."
          readOnly
        />
      </div>

      <div>
        <Label htmlFor="bairro" className="text-xs font-medium text-muted-foreground mb-1 block">
          Bairro
        </Label>
        <Input
          id="bairro"
          type="text"
          value={data.bairro}
          onChange={(e) => onChange('bairro', e.target.value)}
          className="h-8 text-xs bg-white"
          placeholder="Bairro"
          readOnly
        />
      </div>

      <div>
        <Label htmlFor="localidade" className="text-xs font-medium text-muted-foreground mb-1 block">
          Cidade
        </Label>
        <Input
          id="localidade"
          type="text"
          value={data.localidade}
          onChange={(e) => onChange('localidade', e.target.value)}
          className="h-8 text-xs bg-white"
          placeholder="Cidade"
          readOnly
        />
      </div>

      <div>
        <Label htmlFor="uf" className="text-xs font-medium text-muted-foreground mb-1 block">
          Estado (UF)
        </Label>
        <Input
          id="uf"
          type="text"
          value={data.uf}
          onChange={(e) => onChange('uf', e.target.value)}
          className="h-8 text-xs bg-white"
          placeholder="UF"
          readOnly
        />
      </div>
    </div>
    
    <p className="text-muted-foreground text-xs mt-2">
      📍 Endereço preenchido automaticamente com base no CEP
    </p>
  </div>
));

AddressDisplay.displayName = 'AddressDisplay';

export default AddressDisplay;
