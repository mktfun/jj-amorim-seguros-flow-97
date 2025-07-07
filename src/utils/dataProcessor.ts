
// Tipos para os dados coletados
export interface ContactData {
  fullName: string;
  cpf: string;
  email: string;
  phone: string;
}

export interface PersonalData {
  fullName: string;
  cpf: string;
  birthDate: string;
  maritalStatus: string;
  email: string;
  phone: string;
}

export interface VehicleData {
  model: string;
  plate: string;
  chassis: string;
  year: string;
  isFinanced: string;
}

export interface RiskData {
  cep: string;
  garageType: string;
  residenceType: string;
  usesForWork: string;
  workParking: string;
  youngResidents: string;
  rideshareWork: string;
}

export interface UnifiedData {
  contactData: ContactData;
  personalData?: PersonalData;
  vehicleData?: VehicleData;
  riskData?: RiskData;
  hasChanges?: boolean | null;
  flowType: 'Nova Cotacao de Seguro' | 'Renovacao Seguro Auto';
}

// Função para traduzir valores técnicos para texto legível
const translateValue = (field: string, value: string): string => {
  const translations: { [key: string]: { [key: string]: string } } = {
    maritalStatus: {
      'solteiro': 'Solteiro(a)',
      'casado': 'Casado(a)',
      'divorciado': 'Divorciado(a)',
      'viuvo': 'Viúvo(a)',
      'uniao_estavel': 'União Estável'
    },
    isFinanced: {
      'sim': 'Sim',
      'nao': 'Não'
    },
    garageType: {
      'automatico': 'Automático',
      'manual': 'Manual',
      'nao_tem': 'Não tem portão'
    },
    residenceType: {
      'casa': 'Casa',
      'apartamento': 'Apartamento',
      'condominio': 'Condomínio'
    },
    usesForWork: {
      'sim': 'Sim',
      'nao': 'Não'
    },
    workParking: {
      'rua': 'Na rua',
      'estacionamento_pago': 'Estacionamento pago',
      'estacionamento_empresa': 'Estacionamento da empresa',
      'garagem_fechada': 'Garagem fechada'
    },
    youngResidents: {
      'sim': 'Sim',
      'nao': 'Não'
    },
    rideshareWork: {
      'sim': 'Sim',
      'nao': 'Não'
    }
  };

  return translations[field]?.[value] || value;
};

// Geração do JSON unificado
export const generateUnifiedJSON = (data: UnifiedData) => {
  const baseStructure = {
    solicitacao: {
      tipo: data.flowType,
      dados_contato: {
        nome_completo: data.contactData.fullName,
        cpf: data.contactData.cpf,
        email: data.contactData.email,
        telefone_whatsapp: data.contactData.phone
      },
      informacoes_auto_seguro: {} as any
    },
    observacao_cliente: "Cliente foi informado sobre o envio de fotos da CNH e documento do veículo quando necessário"
  };

  // Adicionar flag de alteração apenas para renovação
  if (data.flowType === 'Renovacao Seguro Auto' && data.hasChanges !== undefined) {
    baseStructure.solicitacao.informacoes_auto_seguro.houve_alteracao_renovacao = 
      data.hasChanges ? 'sim' : 'nao';
  }

  // Para Nova Cotação: incluir TODOS os dados completos
  if (data.flowType === 'Nova Cotacao de Seguro') {
    if (data.personalData) {
      baseStructure.solicitacao.informacoes_auto_seguro.condutor = {
        data_nascimento: data.personalData.birthDate || "",
        estado_civil: data.personalData.maritalStatus || ""
      };
    }

    if (data.vehicleData) {
      baseStructure.solicitacao.informacoes_auto_seguro.veiculo = {
        modelo: data.vehicleData.model || "",
        placa: data.vehicleData.plate || "",
        chassis: data.vehicleData.chassis || "",
        ano_modelo: data.vehicleData.year || "",
        financiado: data.vehicleData.isFinanced || ""
      };
    }

    if (data.riskData) {
      baseStructure.solicitacao.informacoes_auto_seguro.questionario_risco = {
        cep_pernoite: data.riskData.cep || "",
        portao_garagem: data.riskData.garageType || "",
        tipo_residencia: data.riskData.residenceType || "",
        usa_para_trabalho: data.riskData.usesForWork || "",
        estacionamento_trabalho: data.riskData.workParking || "",
        jovens_residentes: data.riskData.youngResidents || "",
        trabalho_aplicativo: data.riskData.rideshareWork || ""
      };
    }
  }

  // Para Renovação com alterações: incluir APENAS campos alterados/preenchidos
  if (data.flowType === 'Renovacao Seguro Auto' && data.hasChanges === true) {
    const changedFields: any = {};
    
    if (data.personalData) {
      const conductorChanges: any = {};
      if (data.personalData.birthDate) conductorChanges.data_nascimento = data.personalData.birthDate;
      if (data.personalData.maritalStatus) conductorChanges.estado_civil = data.personalData.maritalStatus;
      if (Object.keys(conductorChanges).length > 0) {
        changedFields.condutor = conductorChanges;
      }
    }

    if (data.vehicleData) {
      const vehicleChanges: any = {};
      if (data.vehicleData.model) vehicleChanges.modelo = data.vehicleData.model;
      if (data.vehicleData.plate) vehicleChanges.placa = data.vehicleData.plate;
      if (data.vehicleData.chassis) vehicleChanges.chassis = data.vehicleData.chassis;
      if (data.vehicleData.year) vehicleChanges.ano_modelo = data.vehicleData.year;
      if (data.vehicleData.isFinanced) vehicleChanges.financiado = data.vehicleData.isFinanced;
      if (Object.keys(vehicleChanges).length > 0) {
        changedFields.veiculo = vehicleChanges;
      }
    }

    if (data.riskData) {
      const riskChanges: any = {};
      if (data.riskData.cep) riskChanges.cep_pernoite = data.riskData.cep;
      if (data.riskData.garageType) riskChanges.portao_garagem = data.riskData.garageType;
      if (data.riskData.residenceType) riskChanges.tipo_residencia = data.riskData.residenceType;
      if (data.riskData.usesForWork) riskChanges.usa_para_trabalho = data.riskData.usesForWork;
      if (data.riskData.workParking) riskChanges.estacionamento_trabalho = data.riskData.workParking;
      if (data.riskData.youngResidents) riskChanges.jovens_residentes = data.riskData.youngResidents;
      if (data.riskData.rideshareWork) riskChanges.trabalho_aplicativo = data.riskData.rideshareWork;
      if (Object.keys(riskChanges).length > 0) {
        changedFields.questionario_risco = riskChanges;
      }
    }

    baseStructure.solicitacao.informacoes_auto_seguro = {
      ...baseStructure.solicitacao.informacoes_auto_seguro,
      ...changedFields
    };
  }

  return baseStructure;
};

// Geração da mensagem humanizada e legível para WhatsApp
export const generateWhatsAppMessage = (data: UnifiedData, jsonData: any): string => {
  const isRenewal = data.flowType === 'Renovacao Seguro Auto';
  const hasChanges = data.hasChanges;

  let message = '';

  // Cabeçalho
  message += 'Olá, JJ & Amorim! 🚀\n\n';
  
  if (isRenewal) {
    message += '🔄 SOLICITAÇÃO DE RENOVAÇÃO DE SEGURO AUTO (QAR)!\n\n';
  } else {
    message += '🚗 NOVA COTAÇÃO DE SEGURO AUTO!\n\n';
  }

  // Dados do Cliente
  message += '👤 Dados do Cliente:\n';
  message += `Nome: ${data.contactData.fullName}\n`;
  message += `Email: ${data.contactData.email}\n`;
  message += `Telefone: ${data.contactData.phone}\n`;
  message += `CPF: ${data.contactData.cpf}\n\n`;

  message += '------------------------------\n';
  message += '📋 Detalhes do Questionário:\n\n';

  // Conteúdo específico por fluxo
  if (isRenewal) {
    if (hasChanges === false) {
      message += '✅ O cliente confirmou que NÃO HOUVE ALTERAÇÕES nos dados desde a última renovação.\n\n';
    } else if (hasChanges === true) {
      message += '📝 O cliente informou ALTERAÇÕES. Seguem os dados que foram atualizados:\n\n';
      
      // Listar campos alterados de forma descritiva
      if (data.personalData) {
        if (data.personalData.birthDate) {
          message += `• Nova Data de Nascimento: ${data.personalData.birthDate}\n`;
        }
        if (data.personalData.maritalStatus) {
          message += `• Estado Civil agora é: ${translateValue('maritalStatus', data.personalData.maritalStatus)}\n`;
        }
      }

      if (data.vehicleData) {
        if (data.vehicleData.model) {
          message += `• Novo Modelo do Veículo: ${data.vehicleData.model}\n`;
        }
        if (data.vehicleData.plate) {
          message += `• Nova Placa: ${data.vehicleData.plate}\n`;
        }
        if (data.vehicleData.chassis) {
          message += `• Novo Chassis: ${data.vehicleData.chassis}\n`;
        }
        if (data.vehicleData.year) {
          message += `• Novo Ano/Modelo: ${data.vehicleData.year}\n`;
        }
        if (data.vehicleData.isFinanced) {
          message += `• Está financiado agora?: ${translateValue('isFinanced', data.vehicleData.isFinanced)}\n`;
        }
      }

      if (data.riskData) {
        if (data.riskData.cep) {
          message += `• Novo CEP de Pernoite: ${data.riskData.cep}\n`;
        }
        if (data.riskData.garageType) {
          message += `• Portão da Garagem agora é: ${translateValue('garageType', data.riskData.garageType)}\n`;
        }
        if (data.riskData.residenceType) {
          message += `• Tipo de Residência: ${translateValue('residenceType', data.riskData.residenceType)}\n`;
        }
        if (data.riskData.usesForWork) {
          message += `• Usa para Trabalho: ${translateValue('usesForWork', data.riskData.usesForWork)}\n`;
        }
        if (data.riskData.workParking) {
          message += `• Estacionamento no Trabalho: ${translateValue('workParking', data.riskData.workParking)}\n`;
        }
        if (data.riskData.youngResidents) {
          message += `• Jovens de 18-24 anos na residência: ${translateValue('youngResidents', data.riskData.youngResidents)}\n`;
        }
        if (data.riskData.rideshareWork) {
          message += `• Trabalha com Aplicativo: ${translateValue('rideshareWork', data.riskData.rideshareWork)}\n`;
        }
      }
      message += '\n';
    }
  } else {
    // Nova Cotação - Mostrar todos os dados
    if (data.personalData) {
      message += '👤 Principal Condutor:\n';
      message += `• Data de Nascimento: ${data.personalData.birthDate}\n`;
      message += `• Estado Civil: ${translateValue('maritalStatus', data.personalData.maritalStatus)}\n\n`;
    }

    if (data.vehicleData) {
      message += '🚗 Dados do Veículo:\n';
      message += `• Modelo: ${data.vehicleData.model}\n`;
      message += `• Placa: ${data.vehicleData.plate}\n`;
      message += `• Chassis: ${data.vehicleData.chassis}\n`;
      message += `• Ano/Modelo: ${data.vehicleData.year}\n`;
      message += `• Financiado: ${translateValue('isFinanced', data.vehicleData.isFinanced)}\n\n`;
    }

    if (data.riskData) {
      message += '🏠 Questionário de Risco:\n';
      message += `• CEP de Pernoite: ${data.riskData.cep}\n`;
      message += `• Portão da Garagem: ${translateValue('garageType', data.riskData.garageType)}\n`;
      message += `• Tipo de Residência: ${translateValue('residenceType', data.riskData.residenceType)}\n`;
      message += `• Usa para Trabalho: ${translateValue('usesForWork', data.riskData.usesForWork)}\n`;
      if (data.riskData.workParking) {
        message += `• Estacionamento no Trabalho: ${translateValue('workParking', data.riskData.workParking)}\n`;
      }
      message += `• Jovens de 18-24 anos: ${translateValue('youngResidents', data.riskData.youngResidents)}\n`;
      message += `• Trabalha com Aplicativo: ${translateValue('rideshareWork', data.riskData.rideshareWork)}\n\n`;
    }
  }

  message += '------------------------------\n';
  message += '📄 Observação para Agilizar:\n';
  message += 'O cliente foi informado sobre a opção de enviar fotos da CNH e documento do veículo, caso deseje agilizar o processo.\n\n';
  message += 'O JSON completo com todos os dados está anexo no link. 😉';

  return message;
};

// Função para envio ao RD Station
export const sendToRDStation = async (data: UnifiedData, jsonData: any): Promise<boolean> => {
  try {
    console.log('Enviando dados para RD Station:', jsonData);
    
    // Mapeamento dos campos para RD Station
    const rdStationData = {
      // Campos básicos
      name: data.contactData.fullName,
      email: data.contactData.email,
      personal_phone: data.contactData.phone,
      
      // Campos personalizados
      cf_tipo_solicitacao_seguro: data.flowType,
      cf_cpf: data.contactData.cpf,
    };

    // Adicionar flag de alteração para renovação
    if (data.flowType === 'Renovacao Seguro Auto' && data.hasChanges !== undefined) {
      (rdStationData as any).cf_renovacao_houve_alteracao = data.hasChanges ? 'Sim' : 'Não';
    }

    // Adicionar campos do QAR se disponíveis
    if (data.personalData) {
      (rdStationData as any).cf_data_nascimento = data.personalData.birthDate;
      (rdStationData as any).cf_estado_civil = data.personalData.maritalStatus;
    }

    if (data.vehicleData) {
      (rdStationData as any).cf_veiculo_modelo = data.vehicleData.model;
      (rdStationData as any).cf_veiculo_placa = data.vehicleData.plate;
      (rdStationData as any).cf_veiculo_ano = data.vehicleData.year;
      (rdStationData as any).cf_veiculo_financiado = data.vehicleData.isFinanced;
    }

    if (data.riskData) {
      (rdStationData as any).cf_cep_pernoite = data.riskData.cep;
      (rdStationData as any).cf_portao_garagem = data.riskData.garageType;
      (rdStationData as any).cf_tipo_residencia = data.riskData.residenceType;
      (rdStationData as any).cf_usa_para_trabalho = data.riskData.usesForWork;
      if (data.riskData.workParking) {
        (rdStationData as any).cf_estacionamento_trabalho = data.riskData.workParking;
      }
      (rdStationData as any).cf_jovens_residentes = data.riskData.youngResidents;
      (rdStationData as any).cf_trabalho_aplicativo = data.riskData.rideshareWork;
    }

    // NOTA: Em produção, usar token_rdstation real e endpoint correto
    // Para desenvolvimento, simular o envio
    console.log('Dados preparados para RD Station:', rdStationData);
    
    // Simulação de envio (substituir por chamada real)
    const response = await fetch('https://httpbin.org/post', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...rdStationData,
        token_rdstation: 'TOKEN_PLACEHOLDER' // Usar token real em produção
      })
    });

    console.log('Resposta simulada RD Station:', response.status);
    return response.ok;
  } catch (error) {
    console.error('Erro ao enviar para RD Station:', error);
    return false;
  }
};

// Função principal para processar e enviar dados
export const processAndSendData = async (data: UnifiedData): Promise<void> => {
  try {
    console.log('Iniciando processamento de dados:', data);
    
    // Gerar JSON unificado
    const jsonData = generateUnifiedJSON(data);
    console.log('JSON gerado:', jsonData);
    
    // Gerar mensagem humanizada e legível
    const whatsappMessage = generateWhatsAppMessage(data, jsonData);
    console.log('Mensagem WhatsApp humanizada gerada');
    
    // Enviar para RD Station (assíncrono)
    sendToRDStation(data, jsonData).then(success => {
      if (success) {
        console.log('✅ Dados enviados com sucesso para RD Station');
      } else {
        console.log('❌ Erro ao enviar dados para RD Station');
      }
    });
    
    // Construir URL do WhatsApp com mensagem legível + JSON codificado
    const encodedMessage = encodeURIComponent(whatsappMessage);
    const encodedJson = encodeURIComponent(JSON.stringify(jsonData, null, 2));
    const whatsappUrl = `https://api.whatsapp.com/send?phone=5511979699832&text=${encodedMessage}%0A%0A🔗%20DADOS%20TÉCNICOS%20(JSON):%20${encodedJson}`;
    
    console.log('Redirecionando para WhatsApp com mensagem otimizada...');
    window.open(whatsappUrl, '_blank');
    
  } catch (error) {
    console.error('Erro no processamento de dados:', error);
    throw error;
  }
};
