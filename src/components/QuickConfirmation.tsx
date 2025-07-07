
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle, Send } from 'lucide-react';

interface QuickConfirmationProps {
  onConfirm: () => void;
}

const QuickConfirmation: React.FC<QuickConfirmationProps> = ({ onConfirm }) => {
  return (
    <div className="flex justify-center">
      <Card className="bg-white shadow-lg border-0 rounded-2xl overflow-hidden max-w-2xl w-full">
        <CardHeader className="bg-gradient-to-r from-green-50 to-blue-50 pb-6 text-center">
          <CardTitle className="text-3xl font-bold text-gray-800 flex items-center justify-center">
            <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center mr-4">
              <CheckCircle className="h-8 w-8 text-white" />
            </div>
            Confirmação de Dados
          </CardTitle>
        </CardHeader>
        <CardContent className="p-8 text-center">
          <div className="space-y-6">
            <p className="text-xl text-gray-700 leading-relaxed">
              <span className="font-bold text-blue-700">Ótimo!</span> Seus dados permanecem os mesmos. 
              Para finalizar a sua renovação e que a Corretora JJ & Amorim dê prosseguimento, 
              clique no botão abaixo.
            </p>
            
            <div className="pt-4">
              <Button
                onClick={onConfirm}
                className="h-14 px-10 text-lg font-semibold bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white transition-all duration-200 rounded-xl flex items-center space-x-3 shadow-lg hover:shadow-xl mx-auto"
                size="lg"
              >
                <span>Confirmar e Enviar para Renovação</span>
                <Send className="h-5 w-5" />
              </Button>
            </div>

            {/* Informações adicionais */}
            <div className="mt-8 pt-6 border-t border-gray-200">
              <div className="bg-gradient-to-r from-blue-50 to-cyan-50 p-4 rounded-xl">
                <p className="text-gray-600 text-sm">
                  <span className="font-medium text-blue-700">📞 Próximo passo:</span> Nossa equipe entrará em contato via WhatsApp para finalizar sua renovação com as melhores condições do mercado.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default QuickConfirmation;
