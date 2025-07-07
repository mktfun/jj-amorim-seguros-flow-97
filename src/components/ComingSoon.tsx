import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Clock } from 'lucide-react';
import RenewalFlow from './RenewalFlow';

interface ComingSoonProps {
  flowType: 'renewal';
  onBack: () => void;
}

const ComingSoon: React.FC<ComingSoonProps> = ({ flowType, onBack }) => {
  // For renewal flow, directly show the RenewalFlow component
  if (flowType === 'renewal') {
    return <RenewalFlow onBack={onBack} />;
  }

  // This should not happen with current implementation, but keeping as fallback
  return (
    <div className="min-h-screen bg-muted flex items-center justify-center py-12 px-4">
      <div className="w-full max-w-2xl animate-fade-in">
        <Card className="p-8 md:p-12 shadow-xl border-jj-cyan-border">
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              <Clock className="h-24 w-24 jj-blue-medium" />
            </div>
            <CardTitle className="text-3xl md:text-4xl font-bold jj-blue-dark mb-4">
              Em Breve!
            </CardTitle>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Esta funcionalidade está sendo desenvolvida pela nossa equipe e estará disponível em breve.
            </p>
          </CardHeader>
          <CardContent>
            <div className="text-center space-y-6">
              <div className="bg-jj-cyan-light p-6 rounded-lg border border-jj-cyan-border">
                <h3 className="text-lg font-semibold jj-blue-dark mb-2">
                  O que está por vir?
                </h3>
                <p className="text-muted-foreground">
                  Estamos trabalhando para trazer uma experiência ainda mais completa e intuitiva para você.
                </p>
              </div>
              
              <Button
                onClick={onBack}
                variant="outline"
                className="border-primary jj-blue-medium hover:bg-accent transition-all-smooth"
                size="lg"
              >
                <ArrowLeft className="mr-2 h-5 w-5" />
                Voltar à seleção
              </Button>
            </div>

            <div className="mt-8 pt-6 border-t border-border text-center">
              <p className="text-sm text-muted-foreground">
                📧 Quer ser notificado? Entre em contato conosco • 📞 JJ & Amorim Corretora
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ComingSoon;
