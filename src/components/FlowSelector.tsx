
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Car, 
  RefreshCw, 
  FileText, 
  AlertTriangle, 
  Shield,
  Home,
  Building,
  Heart,
  Plane
} from 'lucide-react';

interface FlowSelectorProps {
  onFlowSelect: (flow: string) => void;
}

const FlowSelector: React.FC<FlowSelectorProps> = ({ onFlowSelect }) => {
  const flows = [
    {
      id: 'new-quote',
      title: 'Seguro Auto Novo',
      description: 'Faça uma nova cotação de seguro auto',
      icon: Car,
      color: 'bg-blue-500',
      hoverColor: 'hover:bg-blue-600'
    },
    {
      id: 'renewal',
      title: 'Renovação',
      description: 'Renove seu seguro auto',
      icon: RefreshCw,
      color: 'bg-green-500',
      hoverColor: 'hover:bg-green-600'
    },
    {
      id: 'second-invoice',
      title: 'Segunda Via de Boleto',
      description: 'Acesse rapidamente o boleto da sua apólice',
      icon: FileText,
      color: 'bg-purple-500',
      hoverColor: 'hover:bg-purple-600'
    },
    {
      id: 'claim',
      title: 'Sinistro Segurado JJ&Amorim',
      description: 'Comunique um sinistro de forma rápida',
      icon: AlertTriangle,
      color: 'bg-red-500',
      hoverColor: 'hover:bg-red-600'
    },
    {
      id: 'fianca',
      title: 'Seguro Fiança',
      description: 'Proteja sua locação com seguro fiança',
      icon: Shield,
      color: 'bg-indigo-500',
      hoverColor: 'hover:bg-indigo-600'
    },
    {
      id: 'residencial',
      title: 'Seguro Residencial',
      description: 'Proteja sua casa e seus bens',
      icon: Home,
      color: 'bg-teal-500',
      hoverColor: 'hover:bg-teal-600'
    },
    {
      id: 'empresarial',
      title: 'Seguro Empresarial',
      description: 'Proteção completa para sua empresa',
      icon: Building,
      color: 'bg-orange-500',
      hoverColor: 'hover:bg-orange-600'
    },
    {
      id: 'vida',
      title: 'Seguro de Vida Individual',
      description: 'Proteção para você e sua família',
      icon: Heart,
      color: 'bg-pink-500',
      hoverColor: 'hover:bg-pink-600'
    },
    {
      id: 'viagem',
      title: 'Seguro Viagem',
      description: 'Viaje com tranquilidade e segurança',
      icon: Plane,
      color: 'bg-cyan-500',
      hoverColor: 'hover:bg-cyan-600'
    }
  ];

  return (
    <div className="max-w-4xl mx-auto">
      <Card className="mb-8 bg-white shadow-lg">
        <CardHeader className="text-center pb-6">
          <div className="flex justify-center mb-6">
            <img 
              src="/lovable-uploads/563b889c-fc42-4e1c-bb40-3e7333ba4c19.png" 
              alt="JJ & Amorim Logo" 
              className="h-20 w-auto object-contain"
            />
          </div>
          <CardTitle className="text-3xl font-bold text-blue-600 mb-2">
            Bem-vindo ao Questionário
          </CardTitle>
          <CardTitle className="text-3xl font-bold text-cyan-500 mb-4">
            JJ & Amorim!
          </CardTitle>
          <p className="text-gray-600 text-lg">
            Para iniciarmos, por favor, selecione qual o seu objetivo com este questionário:
          </p>
        </CardHeader>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {flows.map((flow) => {
          const IconComponent = flow.icon;
          return (
            <Card 
              key={flow.id}
              className="cursor-pointer transition-all duration-300 hover:shadow-xl hover:scale-105 bg-white border-2 border-gray-100 hover:border-blue-200"
              onClick={() => onFlowSelect(flow.id)}
            >
              <CardContent className="p-6">
                <div className="flex flex-col items-center text-center space-y-4">
                  <div className={`${flow.color} ${flow.hoverColor} p-4 rounded-full transition-colors duration-300`}>
                    <IconComponent className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800">
                    {flow.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {flow.description}
                  </p>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default FlowSelector;
