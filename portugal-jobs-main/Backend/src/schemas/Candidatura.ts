import { FastifySchema } from 'fastify';

const ApagarCandidatura: FastifySchema = {
  description: 'Apagar uma candidatura',
  summary: 'Apagar uma candidatura',
  operationId: 'apagarCandidatura',
  tags: ['Candidaturas'],
  params: {
    type: 'object',
    properties: {
      candidaturaID: { type: 'string' },
    },
  },
  response: {
    200: {
      description: 'Candidatura apagada com sucesso',
      type: 'object',
      properties: {
        message: { type: 'string' },
      },
    },
    400: {
      description: 'Dados do request inválidos',
      type: 'object',
      properties: {
        message: { type: 'string' },
      },
    },
    401: {
      description: 'Credenciais inválidas',
      type: 'object',
      properties: {
        message: { type: 'string' },
      },
    },
    404: {
      description: 'Candidatura não encontrada',
      type: 'object',
      properties: {
        message: { type: 'string' },
      },
    },
    500: {
      description: 'Erro interno do servidor',
      type: 'object',
      properties: {
        message: { type: 'string' },
      },
    },
    429: {
      description: 'Muitas tentativas de apagar a candidatura',
      type: 'object',
      properties: {
        code: { type: 'number' },
        error: { type: 'string' },
        message: { type: 'string' },
        date: { type: 'string' },
        expiresIn: { type: 'string' },
      },
    },
    403: {
      description: 'Foste banido temporariamente da api',
      type: 'object',
      properties: {
        code: { type: 'number' },
        error: { type: 'string' },
        message: { type: 'string' },
        date: { type: 'string' },
        expiresIn: { type: 'string' },
      },
    },
  },
};

const SelecionarCandidaturasByAnuncio: FastifySchema = {
  description: 'Selecionar candidaturas de um anúncio',
  summary: 'Selecionar candidaturas de um anúncio',
  operationId: 'selecionarCandidaturasByAnuncio',
  tags: ['Anúncios'],
  querystring: {
    type: 'object',
    properties: {
      pageSize: { type: 'number' },
      pageIndex: { type: 'number' },
    },
  },
  params: {
    type: 'object',
    properties: { anuncioID: { type: 'string' } },
  },
  response: {
    200: {
      description: 'Candidaturas selecionadas com sucesso',
      type: 'object',
      properties: {
        candidaturas: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              id: { type: 'string' },
              ownerID: { type: 'string' },
              anuncioID: { type: 'string' },
              status: { type: 'number' },
              ownerFirstName: { type: 'string' },
              ownerLastName: { type: 'string' },
              ownerUsername: { type: 'string' },
              createdAt: { type: 'string' },
              updatedAt: { type: 'string' },
            },
          },
        },
        message: { type: 'string' },
        paginas: { type: 'number' },
        paginaAtual: { type: 'number' },
        nRegistos: { type: 'number' },
      },
    },
    400: {
      description: 'Dados do request inválidos',
      type: 'object',
      properties: {
        message: { type: 'string' },
      },
    },
    401: {
      description: 'Credenciais inválidas',
      type: 'object',
      properties: {
        message: { type: 'string' },
      },
    },
    404: {
      description: 'Anuncio não encontrado',
      type: 'object',
      properties: {
        message: { type: 'string' },
      },
    },
    500: {
      description: 'Erro interno do servidor',
      type: 'object',
      properties: {
        message: { type: 'string' },
      },
    },
    429: {
      description: 'Muitas tentativas de selecionar as candidaturas',
      type: 'object',
      properties: {
        code: { type: 'number' },
        error: { type: 'string' },
        message: { type: 'string' },
        date: { type: 'string' },
        expiresIn: { type: 'string' },
      },
    },
    403: {
      description: 'Foste banido temporariamente da api',
      type: 'object',
      properties: {
        code: { type: 'number' },
        error: { type: 'string' },
        message: { type: 'string' },
        date: { type: 'string' },
        expiresIn: { type: 'string' },
      },
    },
  },
};

const SelecionarCandidaturasByUser: FastifySchema = {
  description: 'Selecionar candidaturas do utilizador',
  summary: 'Selecionar candidaturas do utilizador',
  operationId: 'selecionarCandidaturasByUser',
  tags: ['Utilizadores'],
  querystring: {
    type: 'object',
    properties: {
      pageSize: { type: 'number' },
      pageIndex: { type: 'number' },
    },
  },
  response: {
    200: {
      description: 'Candidaturas selecionadas com sucesso',
      type: 'object',
      properties: {
        candidaturas: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              id: { type: 'string' },
              ownerID: { type: 'string' },
              anuncioID: { type: 'string' },
              status: { type: 'number' },
              nomeAnuncio: { type: 'string' },
              nomeCompanhia: { type: 'string' },
              createdAt: { type: 'string' },
              updatedAt: { type: 'string' },
            },
          },
        },
        message: { type: 'string' },
        paginas: { type: 'number' },
        paginaAtual: { type: 'number' },
        nRegistos: { type: 'number' },
      },
    },
    400: {
      description: 'Dados do request inválidos',
      type: 'object',
      properties: {
        message: { type: 'string' },
      },
    },
    401: {
      description: 'Credenciais inválidas',
      type: 'object',
      properties: {
        message: { type: 'string' },
      },
    },
    404: {
      description: 'Não existem candidaturas',
      type: 'object',
      properties: {
        message: { type: 'string' },
      },
    },
    500: {
      description: 'Erro interno do servidor',
      type: 'object',
      properties: {
        message: { type: 'string' },
      },
    },
    429: {
      description: 'Muitas tentativas de selecionar as candidaturas',
      type: 'object',
      properties: {
        code: { type: 'number' },
        error: { type: 'string' },
        message: { type: 'string' },
        date: { type: 'string' },
        expiresIn: { type: 'string' },
      },
    },
    403: {
      description: 'Foste banido temporariamente da api',
      type: 'object',
      properties: {
        code: { type: 'number' },
        error: { type: 'string' },
        message: { type: 'string' },
        date: { type: 'string' },
        expiresIn: { type: 'string' },
      },
    },
  },
};

export { ApagarCandidatura, SelecionarCandidaturasByAnuncio, SelecionarCandidaturasByUser };
