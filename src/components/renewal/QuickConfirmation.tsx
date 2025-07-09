
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle, Send, Shield } from 'lucide-react';

interface QuickConfirmationProps {
  onConfirm: () => void;
}

const QuickConfirmation: React.FC<QuickConfirmationProps> = ({ onConfirm }) => {
  return (
    <Card className="bg-white shadow-xl border-0 rounded-3xl overflow-hidden">
      <CardHeader className="bg-gradient-to-r from-green-50 via-blue-50 to-green-50 pb-8">
        <CardTitle className="text-4xl font-bold text-gray-800 flex items-center">
          <div className="w-16 h-16 bg-gradient-to-r from-green-600 to-green-700 rounded-2xl flex items-center justify-center mr-6 shadow-lg">
            <CheckCircle className="h-8 w-8 text-white" />
          </div>
          <div>
            <div>Perfeito!</div>
            <p className="text-lg font-normal text-gray-600 mt-2">
              Seus dados permanecem os mesmos. Vamos finalizar sua renovação.
            </p>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-10">
        <div className="space-y-8">
          <div className="bg-gradient-to-r from-green-50 to-blue-50 p-8 rounded-2xl border-l-4 border-green-500 shadow-sm">
            <div className="flex items-center space-x-4 mb-4">
              <Shield className="h-8 w-8 text-green-600" />
              <h3 className="text-2xl font-semibold text-gray-800">Confirmação Final</h3>
            </div>
            <p className="text-gray-700 text-lg leading-relaxed">
              <strong>Ótimo!</strong> Seus dados permanecem os mesmos da última renovação. 
              Para finalizar sua renovação e que a Corretora JJ & Amorim dê prosseguimento 
              ao processo, clique no botão abaixo.
            </p>
          </div>

          <div className="bg-gray-50 p-6 rounded-2xl">
            <h4 className="text-lg font-semibold text-gray-800 mb-3">O que acontece agora:</h4>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span>Seus dados serão enviados para nossa equipe</span>
              </li>
              <li className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span>Entraremos em contato em até 2 horas úteis</span>
              </li>
              <li className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span>Finalizaremos sua renovação com as melhores condições</span>
              </li>
            </ul>
          </div>

          <div className="flex justify-center pt-4">
            <Button
              onClick={onConfirm}
              className="h-16 px-12 text-xl font-semibold bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white transition-all duration-300 rounded-2xl flex items-center space-x-4 shadow-xl hover:shadow-2xl transform hover:scale-105"
              size="lg"
            >
              <span>Confirmar e Enviar para Renovação</span>
              <Send className="h-6 w-6" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default QuickConfirmation;
