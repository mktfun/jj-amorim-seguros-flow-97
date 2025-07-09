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
  profession: string;
}

export interface MainDriverData {
  isDifferentFromInsured: string;
  fullName: string;
  cpf: string;
  birthDate: string;
  maritalStatus: string;
  email: string;
  phone: string;
  profession: string;
}

export interface VehicleData {
  model: string;
  plate: string;
  chassis?: string; // Made optional since not collected in current flows
  year: string;
  isFinanced: string;
}

export interface RiskData {
  cep: string;
  logradouro: string;
  bairro: string;
  localidade: string;
  uf: string;
  numero: string;
  complemento: string;
  garageType: string;
  residenceType: string;
  usesForWork: string;
  workParking: string;
  youngResidents: string;
  youngDriversUseVehicle: string;
  youngDriverAge: string;
  youngDriverGender: string;
  rideshareWork: string;
}

export interface UnifiedData {
  contactData: ContactData;
  personalData?: PersonalData;
  mainDriverData?: MainDriverData;
  vehicleData?: VehicleData;
  riskData?: RiskData;
  hasChanges?: boolean;
  flowType: 'Nova Cotacao de Seguro' | 'Renovacao Seguro Auto';
  origem_renovacao?: string;
  dados_apolice_anterior?: any;
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
      'garagem-fechada': 'Garagem fechada',
      'garagem-aberta': 'Garagem aberta',
      'na-rua': 'Na rua'
    },
    residenceType: {
      'casa': 'Casa',
      'apartamento': 'Apartamento',
      'apto': 'Apartamento',
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
      'garagem_fechada': 'Garagem fechada',
      'garagem-fechada': 'Garagem fechada',
      'estacionamento': 'Estacionamento',
      'na-rua': 'Na rua'
    },
    youngResidents: {
      'sim': 'Sim',
      'nao': 'Não'
    },
    youngDriversUseVehicle: {
      'sim': 'Sim',
      'nao': 'Não'
    },
    youngDriverGender: {
      'masculino': 'Masculino',
      'feminino': 'Feminino'
    },
    rideshareWork: {
      'sim': 'Sim',
      'nao': 'Não'
    },
    isDifferentFromInsured: {
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
    // Dados do segurado
    if (data.personalData) {
      baseStructure.solicitacao.informacoes_auto_seguro.segurado = {
        nome_completo: data.personalData.fullName || "",
        cpf: data.personalData.cpf || "",
        data_nascimento: data.personalData.birthDate || "",
        estado_civil: data.personalData.maritalStatus || "",
        email: data.personalData.email || "",
        telefone_whatsapp: data.personalData.phone || ""
      };
    }

    // Dados do principal condutor
    if (data.mainDriverData) {
      const isMainDriverDifferent = data.mainDriverData.isDifferentFromInsured === 'nao';
      
      baseStructure.solicitacao.informacoes_auto_seguro.principal_condutor = {
        e_o_mesmo_segurado: isMainDriverDifferent ? 'nao' : 'sim'
      };

      if (isMainDriverDifferent) {
        baseStructure.solicitacao.informacoes_auto_seguro.principal_condutor = {
          ...baseStructure.solicitacao.informacoes_auto_seguro.principal_condutor,
          nome_completo: data.mainDriverData.fullName || "",
          cpf: data.mainDriverData.cpf || "",
          data_nascimento: data.mainDriverData.birthDate || "",
          estado_civil: data.mainDriverData.maritalStatus || "",
          email: data.mainDriverData.email || "",
          telefone_whatsapp: data.mainDriverData.phone || ""
        };
      }
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
        logradouro: data.riskData.logradouro || "",
        bairro: data.riskData.bairro || "",
        localidade: data.riskData.localidade || "",
        uf: data.riskData.uf || "",
        numero_endereco: data.riskData.numero || "",
        complemento_endereco: data.riskData.complemento || "",
        portao_garagem: data.riskData.garageType || "",
        tipo_residencia: data.riskData.residenceType || "",
        usa_para_trabalho: data.riskData.usesForWork || "",
        estacionamento_trabalho: data.riskData.workParking || "",
        jovens_residentes: data.riskData.youngResidents || "",
        jovens_utilizam_veiculo: data.riskData.youngDriversUseVehicle || "",
        idade_jovem_condutor: data.riskData.youngDriverAge || "",
        sexo_jovem_condutor: data.riskData.youngDriverGender || "",
        trabalho_aplicativo: data.riskData.rideshareWork || ""
      };
    }

    // Atualizar observação para incluir referência ao principal condutor
    if (data.mainDriverData?.isDifferentFromInsured === 'nao') {
      baseStructure.observacao_cliente = "Cliente foi informado sobre o envio de fotos da CNH e documento do veículo do Principal Condutor quando necessário";
    } else {
      baseStructure.observacao_cliente = "Cliente foi informado sobre o envio de fotos da CNH e documento do veículo do Principal Condutor (o próprio segurado) quando necessário";
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
      if (data.riskData.logradouro) riskChanges.logradouro = data.riskData.logradouro;
      if (data.riskData.bairro) riskChanges.bairro = data.riskData.bairro;
      if (data.riskData.localidade) riskChanges.localidade = data.riskData.localidade;
      if (data.riskData.uf) riskChanges.uf = data.riskData.uf;
      if (data.riskData.numero) riskChanges.numero_endereco = data.riskData.numero;
      if (data.riskData.complemento) riskChanges.complemento_endereco = data.riskData.complemento;
      if (data.riskData.garageType) riskChanges.portao_garagem = data.riskData.garageType;
      if (data.riskData.residenceType) riskChanges.tipo_residencia = data.riskData.residenceType;
      if (data.riskData.usesForWork) riskChanges.usa_para_trabalho = data.riskData.usesForWork;
      if (data.riskData.workParking) riskChanges.estacionamento_trabalho = data.riskData.workParking;
      if (data.riskData.youngResidents) riskChanges.jovens_residentes = data.riskData.youngResidents;
      if (data.riskData.youngDriversUseVehicle) riskChanges.jovens_utilizam_veiculo = data.riskData.youngDriversUseVehicle;
      if (data.riskData.youngDriverAge) riskChanges.idade_jovem_condutor = data.riskData.youngDriverAge;
      if (data.riskData.youngDriverGender) riskChanges.sexo_jovem_condutor = data.riskData.youngDriverGender;
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

// Geração da mensagem humanizada e legível para WhatsApp (SEM JSON TÉCNICO)
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
  message += `Nome Completo: ${data.contactData.fullName}\n`;
  message += `CPF: ${data.contactData.cpf}\n`;
  message += `Email: ${data.contactData.email}\n`;
  message += `Telefone/WhatsApp: ${data.contactData.phone}\n\n`;

  message += '------------------------------\n';
  message += '📋 Detalhes do Questionário:\n\n';

  // Conteúdo específico por fluxo
  if (isRenewal) {
    if (hasChanges === false) {
      message += '✅ O cliente confirmou que NÃO HOUVE ALTERAÇÕES nos dados desde a última renovação.\n';
      message += 'Por favor, dê prosseguimento com a renovação.\n\n';
    } else if (hasChanges === true) {
      message += '📝 O cliente informou as seguintes ALTERAÇÕES para a renovação:\n\n';
      
      // Listar campos alterados de forma descritiva
      if (data.personalData) {
        if (data.personalData.birthDate) {
          message += `• NOVA Data de Nascimento: ${data.personalData.birthDate}\n`;
        }
        if (data.personalData.maritalStatus) {
          message += `• Estado Civil ALTERADO para: ${translateValue('maritalStatus', data.personalData.maritalStatus)}\n`;
        }
      }

      if (data.vehicleData) {
        if (data.vehicleData.model) {
          message += `• NOVO Modelo do Veículo: ${data.vehicleData.model}\n`;
        }
        if (data.vehicleData.plate) {
          message += `• NOVA Placa: ${data.vehicleData.plate}\n`;
        }
        if (data.vehicleData.chassis) {
          message += `• NOVO Chassis: ${data.vehicleData.chassis}\n`;
        }
        if (data.vehicleData.year) {
          message += `• NOVO Ano/Modelo: ${data.vehicleData.year}\n`;
        }
        if (data.vehicleData.isFinanced) {
          message += `• Veículo está FINANCIADO?: ${translateValue('isFinanced', data.vehicleData.isFinanced)}\n`;
        }
      }

      if (data.riskData) {
        if (data.riskData.cep) {
          message += `• NOVO CEP de Pernoite: ${data.riskData.cep}\n`;
        }
        if (data.riskData.numero) {
          message += `• NOVO Número: ${data.riskData.numero}\n`;
        }
        if (data.riskData.complemento) {
          message += `• NOVO Complemento: ${data.riskData.complemento}\n`;
        }
        if (data.riskData.garageType) {
          message += `• Portão da Garagem ALTERADO para: ${translateValue('garageType', data.riskData.garageType)}\n`;
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
        if (data.riskData.youngDriversUseVehicle) {
          message += `• Jovens utilizam o veículo: ${translateValue('youngDriversUseVehicle', data.riskData.youngDriversUseVehicle)}\n`;
        }
        if (data.riskData.youngDriverAge) {
          message += `• Idade do jovem condutor: ${data.riskData.youngDriverAge} anos\n`;
        }
        if (data.riskData.youngDriverGender) {
          message += `• Sexo do jovem condutor: ${translateValue('youngDriverGender', data.riskData.youngDriverGender)}\n`;
        }
        if (data.riskData.rideshareWork) {
          message += `• Trabalha com Aplicativo: ${translateValue('rideshareWork', data.riskData.rideshareWork)}\n`;
        }
      }
      message += '\n';
    }
  } else {
    // Nova Cotação - Mostrar todos os dados de forma organizada
    if (data.personalData) {
      message += '👤 Dados do Segurado:\n';
      message += `• Nome Completo: ${data.personalData.fullName}\n`;
      message += `• CPF: ${data.personalData.cpf}\n`;
      message += `• Data de Nascimento: ${data.personalData.birthDate}\n`;
      message += `• Estado Civil: ${translateValue('maritalStatus', data.personalData.maritalStatus)}\n`;
      message += `• Email: ${data.personalData.email}\n`;
      message += `• Telefone: ${data.personalData.phone}\n\n`;
    }

    // Informações do Principal Condutor
    if (data.mainDriverData) {
      const isMainDriverDifferent = data.mainDriverData.isDifferentFromInsured === 'nao';
      
      if (isMainDriverDifferent) {
        message += '🚗 Principal Condutor (diferente do segurado):\n';
        message += `• Nome Completo: ${data.mainDriverData.fullName}\n`;
        message += `• CPF: ${data.mainDriverData.cpf}\n`;
        message += `• Data de Nascimento: ${data.mainDriverData.birthDate}\n`;
        message += `• Estado Civil: ${translateValue('maritalStatus', data.mainDriverData.maritalStatus)}\n`;
        message += `• Email: ${data.mainDriverData.email}\n`;
        message += `• Telefone: ${data.mainDriverData.phone}\n\n`;
      } else {
        message += '✅ Principal Condutor: O PRÓPRIO SEGURADO\n\n';
      }
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
      if (data.riskData.logradouro) {
        message += `• Endereço: ${data.riskData.logradouro}`;
        if (data.riskData.numero) message += `, ${data.riskData.numero}`;
        if (data.riskData.complemento) message += `, ${data.riskData.complemento}`;
        message += '\n';
      }
      if (data.riskData.bairro) message += `• Bairro: ${data.riskData.bairro}\n`;
      if (data.riskData.localidade) message += `• Cidade: ${data.riskData.localidade}\n`;
      if (data.riskData.uf) message += `• Estado: ${data.riskData.uf}\n`;
      message += `• Portão da Garagem: ${translateValue('garageType', data.riskData.garageType)}\n`;
      message += `• Tipo de Residência: ${translateValue('residenceType', data.riskData.residenceType)}\n`;
      message += `• Usa para Trabalho: ${translateValue('usesForWork', data.riskData.usesForWork)}\n`;
      if (data.riskData.workParking) {
        message += `• Estacionamento no Trabalho: ${translateValue('workParking', data.riskData.workParking)}\n`;
      }
      message += `• Jovens de 18-24 anos: ${translateValue('youngResidents', data.riskData.youngResidents)}\n`;
      if (data.riskData.youngDriversUseVehicle) {
        message += `• Jovens utilizam o veículo: ${translateValue('youngDriversUseVehicle', data.riskData.youngDriversUseVehicle)}\n`;
        if (data.riskData.youngDriverAge) {
          message += `• Idade do jovem condutor: ${data.riskData.youngDriverAge} anos\n`;
        }
        if (data.riskData.youngDriverGender) {
          message += `• Sexo do jovem condutor: ${translateValue('youngDriverGender', data.riskData.youngDriverGender)}\n`;
        }
      }
      message += `• Trabalha com Aplicativo: ${translateValue('rideshareWork', data.riskData.rideshareWork)}\n\n`;
    }
  }

  message += '------------------------------\n';
  message += '📄 Observação para Agilizar:\n';
  
  // Observação adaptada para o principal condutor
  if (data.mainDriverData?.isDifferentFromInsured === 'nao') {
    message += 'O cliente foi informado sobre a opção de enviar fotos da CNH e documento do veículo do PRINCIPAL CONDUTOR, caso deseje agilizar o processo.\n\n';
  } else {
    message += 'O cliente foi informado sobre a opção de enviar fotos da CNH e documento do veículo, caso deseje agilizar o processo.\n\n';
  }
  
  message += 'Aguardamos seu contato para prosseguirmos! 😉';

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

    // Adicionar informações do principal condutor
    if (data.mainDriverData) {
      (rdStationData as any).cf_principal_condutor_diferente = data.mainDriverData.isDifferentFromInsured === 'nao' ? 'Sim' : 'Não';
      
      if (data.mainDriverData.isDifferentFromInsured === 'nao') {
        (rdStationData as any).cf_principal_condutor_nome = data.mainDriverData.fullName;
        (rdStationData as any).cf_principal_condutor_cpf = data.mainDriverData.cpf;
        (rdStationData as any).cf_principal_condutor_data_nasc = data.mainDriverData.birthDate;
        (rdStationData as any).cf_principal_condutor_estado_civil = data.mainDriverData.maritalStatus;
      }
    }

    if (data.vehicleData) {
      (rdStationData as any).cf_veiculo_modelo = data.vehicleData.model;
      (rdStationData as any).cf_veiculo_placa = data.vehicleData.plate;
      (rdStationData as any).cf_veiculo_ano = data.vehicleData.year;
      (rdStationData as any).cf_veiculo_financiado = data.vehicleData.isFinanced;
    }

    if (data.riskData) {
      (rdStationData as any).cf_cep_pernoite = data.riskData.cep;
      (rdStationData as any).cf_logradouro = data.riskData.logradouro;
      (rdStationData as any).cf_bairro = data.riskData.bairro;
      (rdStationData as any).cf_localidade = data.riskData.localidade;
      (rdStationData as any).cf_uf = data.riskData.uf;
      (rdStationData as any).cf_numero_endereco = data.riskData.numero;
      (rdStationData as any).cf_complemento_endereco = data.riskData.complemento;
      (rdStationData as any).cf_portao_garagem = data.riskData.garageType;
      (rdStationData as any).cf_tipo_residencia = data.riskData.residenceType;
      (rdStationData as any).cf_usa_para_trabalho = data.riskData.usesForWork;
      if (data.riskData.workParking) {
        (rdStationData as any).cf_estacionamento_trabalho = data.riskData.workParking;
      }
      (rdStationData as any).cf_jovens_residentes = data.riskData.youngResidents;
      (rdStationData as any).cf_jovens_utilizam_veiculo = data.riskData.youngDriversUseVehicle;
      (rdStationData as any).cf_idade_jovem_condutor = data.riskData.youngDriverAge;
      (rdStationData as any).cf_sexo_jovem_condutor = data.riskData.youngDriverGender;
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

// Função principal para processar e enviar dados (ATUALIZADA)
export const processAndSendData = async (data: UnifiedData): Promise<void> => {
  try {
    console.log('Iniciando processamento de dados:', data);
    
    // Gerar JSON unificado
    const jsonData = generateUnifiedJSON(data);
    console.log('JSON gerado:', jsonData);
    
    // Gerar mensagem humanizada e legível (SEM JSON TÉCNICO)
    const whatsappMessage = generateWhatsAppMessage(data, jsonData);
    console.log('Mensagem WhatsApp humanizada gerada (sem JSON técnico)');
    
    // Enviar para RD Station (assíncrono)
    sendToRDStation(data, jsonData).then(success => {
      if (success) {
        console.log('✅ Dados enviados com sucesso para RD Station');
      } else {
        console.log('❌ Erro ao enviar dados para RD Station');
      }
    });
    
    // Construir URL do WhatsApp APENAS com mensagem humanizada
    const encodedMessage = encodeURIComponent(whatsappMessage);
    const whatsappUrl = `https://api.whatsapp.com/send?phone=5511979699832&text=${encodedMessage}`;
    
    console.log('Redirecionando para WhatsApp com mensagem 100% humanizada...');
    window.open(whatsappUrl, '_blank');
    
  } catch (error) {
    console.error('Erro no processamento de dados:', error);
    throw error;
  }
};
