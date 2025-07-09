
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle, Send } from 'lucide-react';

interface FinalConfirmationProps {
  onConfirm: () => void;
}

const FinalConfirmation: React.FC<FinalConfirmationProps> = ({ onConfirm }) => {
  return (
    <Card className="bg-white shadow-xl border-0 rounded-3xl overflow-hidden">
      <CardHeader className="bg-gradient-to-r from-green-50 via-blue-50 to-green-50 pb-8">
        <CardTitle className="text-4xl font-bold text-gray-800 flex items-center">
          <div className="w-16 h-16 bg-gradient-to-r from-green-600 to-green-700 rounded-2xl flex items-center justify-center mr-6 shadow-lg">
            <CheckCircle className="h-8 w-8 text-white" />
          </div>
          <div>
            <div>Confirmação Final</div>
            <p className="text-lg font-normal text-gray-600 mt-2">
              Todos os dados foram confirmados. Finalize sua renovação de seguro.
            </p>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-10">
        <div className="space-y-8 text-center">
          <div className="bg-gradient-to-r from-green-50 to-blue-50 p-8 rounded-2xl border-l-4 border-green-500 shadow-sm">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">🎉 Parabéns!</h3>
            <p className="text-gray-700 text-lg mb-6">
              Você confirmou todos os seus dados para a renovação do seguro auto. 
              Nossa equipe da JJ & Amorim entrará em contato em breve com as melhores condições.
            </p>
            
            <div className="grid md:grid-cols-3 gap-6 mt-8">
              <div className="text-center">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-2xl">📋</span>
                </div>
                <h4 className="font-semibold text-gray-800">Dados Confirmados</h4>
                <p className="text-sm text-gray-600">Todas as informações foram verificadas</p>
              </div>
              
              <div className="text-center">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-2xl">🔒</span>
                </div>
                <h4 className="font-semibold text-gray-800">Seguro & Protegido</h4>
                <p className="text-sm text-gray-600">Seus dados estão seguros conosco</p>
              </div>
              
              <div className="text-center">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-2xl">📞</span>
                </div>
                <h4 className="font-semibold text-gray-800">Contato Rápido</h4>
                <p className="text-sm text-gray-600">Em breve você receberá nossa proposta</p>
              </div>
            </div>
          </div>

          <Button
            onClick={onConfirm}
            className="h-16 px-12 text-xl font-bold bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white transition-all duration-200 rounded-2xl flex items-center space-x-3 shadow-lg hover:shadow-xl mx-auto"
            size="lg"
          >
            <Send className="h-6 w-6" />
            <span>Finalizar Renovação</span>
          </Button>

          <div className="bg-gradient-to-r from-blue-50 to-cyan-50 p-6 rounded-2xl border border-blue-200 shadow-sm">
            <p className="text-gray-700 text-base">
              <span className="font-semibold text-blue-700">🚀 Próximos passos:</span> 
              {' '}Após o envio, nossa equipe analisará suas informações e entrará em contato via WhatsApp 
              com as melhores condições de renovação em até 24 horas.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default FinalConfirmation;
