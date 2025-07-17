
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Clock } from 'lucide-react';
import FlowHeader from './FlowHeader';

interface ComingSoonProps {
  title: string;
  description: string;
  onBack: () => void;
}

const ComingSoon: React.FC<ComingSoonProps> = ({ title, description, onBack }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <FlowHeader />
      <div className="w-full max-w-5xl mx-auto px-4 py-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <Clock className="h-12 w-12 text-white" />
            </div>
            
            <h1 className="text-3xl font-bold text-gray-800 mb-4">
              {title}
            </h1>
            
            <p className="text-gray-600 text-lg mb-8 max-w-2xl mx-auto">
              {description}
            </p>
            
            <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-lg mb-8 max-w-2xl mx-auto">
              <p className="text-blue-800 font-medium">
                Esta funcionalidade está em desenvolvimento e estará disponível em breve.
              </p>
            </div>

            <Button
              onClick={onBack}
              variant="outline"
              className="h-14 px-8 text-base font-semibold border-2 border-blue-600 text-blue-600 hover:bg-blue-50 hover:border-blue-700 transition-all duration-200 rounded-xl flex items-center space-x-2"
              size="lg"
            >
              <ArrowLeft className="h-5 w-5" />
              <span>Voltar à seleção</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComingSoon;
