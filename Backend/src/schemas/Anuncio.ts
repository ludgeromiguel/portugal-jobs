import { FastifySchema } from 'fastify';

const AnuncioCreate: FastifySchema = {
  description: 'Criar um novo anúncio',
  summary: 'Criar um novo anúncio',
  operationId: 'criarAnuncio',
  tags: ['Anúncios'],
  body: {
    type: 'object',
    properties: {
      companyName: { type: 'string' },
      local: { type: 'string' },
      salary: { type: 'number' },
      isNegotiable: { type: 'boolean' },
      role: { type: 'string' },
      typeJob: { type: 'string' },
      description: { type: 'string' },
      requirements: { type: 'string' },
      contractType: { type: 'string' },
    },
  },
  response: {
    201: {
      description: 'Anuncio criado com sucesso',
      type: 'object',
      properties: {
        anuncio: {
          type: 'object',
          properties: {
            id: { type: 'string' },
            ownerID: { type: 'string' },
            companyName: { type: 'string' },
            local: { type: 'string' },
            salary: { type: 'number' },
            isNegotiable: { type: 'boolean' },
            role: { type: 'string' },
            typeJob: { type: 'string' },
            description: { type: 'string' },
            requirements: { type: 'string' },
            contractType: { type: 'string' },
            createdAt: { type: 'string' },
            updatedAt: { type: 'string' },
          },
        },
        message: { type: 'string' },
      },
    },
    400: {
      description: 'Dados para criar o anuncio inválidos',
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
    500: {
      description: 'Erro interno do servidor',
      type: 'object',
      properties: {
        message: { type: 'string' },
      },
    },
    429: {
      description: 'Muitas tentativas de criar um anúncio',
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

const ApagarAnuncio: FastifySchema = {
  description: 'Apagar um anúncio',
  summary: 'Apagar um anúncio',
  operationId: 'apagarAnuncio',
  tags: ['Anúncios'],
  params: {
    type: 'object',
    properties: {
      anuncioID: { type: 'string' },
    },
  },
  response: {
    200: {
      description: 'Anuncio apagado com sucesso',
      type: 'object',
      properties: {
        message: { type: 'string' },
      },
    },
    400: {
      description: 'Dados para apagar o anuncio inválidos',
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
      description: 'Muitas tentativas de apagar um anúncio',
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

const EditarAnuncio: FastifySchema = {
  description: 'Editar um anúncio',
  summary: 'Editar um anúncio',
  operationId: 'editarAnuncio',
  tags: ['Anúncios'],
  body: {
    type: 'object',
    properties: {
      local: { type: 'string' },
      salary: { type: 'number' },
      isNegotiable: { type: 'boolean' },
      role: { type: 'string' },
      typeJob: { type: 'string' },
      description: { type: 'string' },
      requirements: { type: 'string' },
      contractType: { type: 'string' },
    },
  },
  params: {
    type: 'object',
    properties: {
      anuncioID: { type: 'string' },
    },
  },
  response: {
    200: {
      description: 'Anuncio editado com sucesso',
      type: 'object',
      properties: {
        message: { type: 'string' },
        anuncio: {
          type: 'object',
          properties: {
            id: { type: 'string' },
            ownerID: { type: 'string' },
            companyName: { type: 'string' },
            local: { type: 'string' },
            salary: { type: 'number' },
            isNegotiable: { type: 'boolean' },
            role: { type: 'string' },
            typeJob: { type: 'string' },
            description: { type: 'string' },
            requirements: { type: 'string' },
            contractType: { type: 'string' },
            createdAt: { type: 'string' },
            updatedAt: { type: 'string' },
          },
        },
      },
    },
    400: {
      description: 'Dados para editar o anuncio inválidos',
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
    500: {
      description: 'Erro interno do servidor',
      type: 'object',
      properties: {
        message: { type: 'string' },
      },
    },
    429: {
      description: 'Muitas tentativas de editar um anúncio',
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

const CandidatarAnuncio: FastifySchema = {
  description: 'Candidatar-se a um anúncio',
  summary: 'Candidatar-se a um anúncio',
  operationId: 'candidatarAnuncio',
  tags: ['Anúncios'],
  params: {
    type: 'object',
    properties: {
      anuncioID: { type: 'string' },
    },
  },
  response: {
    201: {
      description: 'Candidatura criada com sucesso',
      type: 'object',
      properties: {
        candidatura: {
          type: 'object',
          properties: {
            id: { type: 'string' },
            ownerID: { type: 'string' },
            anuncioID: { type: 'string' },
            status: { type: 'number' },
            createdAt: { type: 'string' },
            updatedAt: { type: 'string' },
          },
        },
        message: { type: 'string' },
      },
    },
    400: {
      description: 'Dados para criar a candidatura inválidos',
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
      description: 'Muitas tentativas de criar uma candidatura',
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

const GetAnuncios: FastifySchema = {
  description: 'Obter anúncios',
  summary: 'Obter anúncios',
  operationId: 'getAnuncios',
  tags: ['Anúncios'],
  querystring: {
    type: 'object',
    properties: {
      local: { type: 'string' },
      salary: { type: 'number' },
      typeJob: { type: 'string' },
      role: { type: 'string' },
      contractType: { type: 'string' },
      pageSize: { type: 'number' },
      pageIndex: { type: 'number' },
    },
  },
  response: {
    200: {
      description: 'Anuncios obtidos com sucesso',
      type: 'object',
      properties: {
        anuncios: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              id: { type: 'string' },
              ownerID: { type: 'string' },
              companyName: { type: 'string' },
              local: { type: 'string' },
              salary: { type: 'number' },
              isNegotiable: { type: 'boolean' },
              role: { type: 'string' },
              typeJob: { type: 'string' },
              description: { type: 'string' },
              requirements: { type: 'string' },
              contractType: { type: 'string' },
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
      description: 'Dados para obter os anuncios inválidos',
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
      description: 'Muitas tentativas de obter anuncios',
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

const GetAnuncio: FastifySchema = {
  description: 'Obter um anúncio especifico',
  summary: 'Obter um anúncio especifico',
  operationId: 'getAnuncio',
  tags: ['Anúncios'],
  params: {
    type: 'object',
    properties: {
      anuncioID: { type: 'string' },
    },
  },
  response: {
    200: {
      description: 'Anuncio obtido com sucesso',
      type: 'object',
      properties: {
        anuncio: {
          type: 'object',
          properties: {
            id: { type: 'string' },
            ownerID: { type: 'string' },
            companyName: { type: 'string' },
            local: { type: 'string' },
            salary: { type: 'number' },
            isNegotiable: { type: 'boolean' },
            role: { type: 'string' },
            typeJob: { type: 'string' },
            description: { type: 'string' },
            requirements: { type: 'string' },
            contractType: { type: 'string' },
            createdAt: { type: 'string' },
            updatedAt: { type: 'string' },
          },
        },
        IsCandidatado: { type: 'boolean' },
        message: { type: 'string' },
      },
    },
    400: {
      description: 'Dados para obter o anuncio inválidos',
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
      description: 'Muitas tentativas de obter anuncios',
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

export {
  AnuncioCreate, ApagarAnuncio, EditarAnuncio, CandidatarAnuncio, GetAnuncios, GetAnuncio,
};
