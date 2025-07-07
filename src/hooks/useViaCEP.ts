
import { useState } from 'react';

interface ViaCEPResponse {
  cep: string;
  logradouro: string;
  complemento: string;
  bairro: string;
  localidade: string;
  uf: string;
  ibge: string;
  gia: string;
  ddd: string;
  siafi: string;
  erro?: boolean;
}

interface AddressData {
  logradouro: string;
  bairro: string;
  localidade: string;
  uf: string;
}

export const useViaCEP = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchAddress = async (cep: string): Promise<AddressData | null> => {
    // Remove any non-numeric characters and validate format
    const cleanCep = cep.replace(/\D/g, '');
    
    if (cleanCep.length !== 8) {
      setError('CEP deve conter exatamente 8 dígitos');
      return null;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`https://viacep.com.br/ws/${cleanCep}/json/`);
      
      if (!response.ok) {
        throw new Error('Erro na consulta do CEP');
      }

      const data: ViaCEPResponse = await response.json();

      if (data.erro) {
        setError('CEP não encontrado. Por favor, digite o endereço manualmente.');
        return null;
      }

      return {
        logradouro: data.logradouro || '',
        bairro: data.bairro || '',
        localidade: data.localidade || '',
        uf: data.uf || ''
      };
    } catch (error) {
      console.error('Erro ao buscar CEP:', error);
      setError('Erro ao consultar CEP. Verifique sua conexão e tente novamente.');
      return null;
    } finally {
      setLoading(false);
    }
  };

  const clearError = () => setError(null);

  return {
    fetchAddress,
    loading,
    error,
    clearError
  };
};
