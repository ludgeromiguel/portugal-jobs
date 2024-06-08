import { FastifySchema } from 'fastify';

const UserCreateAccount: FastifySchema = {
  description: 'Criar uma conta nova',
  summary: 'Criar uma conta nova',
  operationId: 'criarConta',
  tags: ['Utilizadores'],
  security: [],
  body: {
    type: 'object',
    properties: {
      email: { type: 'string' },
      username: { type: 'string' },
      password: { type: 'string' },
      firstName: { type: 'string' },
      lastName: { type: 'string' },
      number: { type: 'number' },
    },
  },
  response: {
    201: {
      description: 'Utilizador criado com sucesso',
      type: 'object',
      properties: {
        token: { type: 'string' },
        message: { type: 'string' },
      },
    },
    400: {
      description: 'Dados do request para criar a conta inválidos',
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
      description: 'Muitas tentativas de criar conta',
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

const UserLoginAccount: FastifySchema = {
  description: 'Fazer login na conta',
  summary: 'Fazer login na conta',
  operationId: 'fazerLogin',
  tags: ['Utilizadores'],
  security: [],
  body: {
    type: 'object',
    properties: {
      username: { type: 'string' },
      password: { type: 'string' },
    },
  },
  response: {
    200: {
      description: 'Login feito com sucesso',
      type: 'object',
      properties: {
        token: { type: 'string' },
        message: { type: 'string' },
      },
    },
    400: {
      description: 'Dados do request para fazer login inválidos',
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
      description: 'Muitas tentativas de fazer login',
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

const UserGetVerifyAccountCode: FastifySchema = {
  description: 'Obter o código de verificação da conta',
  summary: 'Obter o código de verificação da conta',
  operationId: 'obterCodigoVerificacao',
  tags: ['Utilizadores'],
  response: {
    200: {
      description: 'Código de verificação enviado para o email com sucesso',
      type: 'object',
      properties: {
        message: { type: 'string' },
      },
    },
    400: {
      description: 'Dados do request para obter o código de verificação inválidos',
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
      description: 'Muitas tentativas de obter o código de verificação',
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

const UserVerifyAccount: FastifySchema = {
  description: 'Verificar a conta',
  summary: 'Verificar a conta',
  operationId: 'verificarConta',
  tags: ['Utilizadores'],
  body: {
    type: 'object',
    properties: {
      verifyCode: { type: 'string' },
    },
  },
  response: {
    200: {
      description: 'Conta verificada com sucesso',
      type: 'object',
      properties: {
        message: { type: 'string' },
      },
    },
    400: {
      description: 'Dados do request para verificar a conta inválidos',
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
      description: 'Muitas tentativas de verificar a conta',
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

const UserGetInfo: FastifySchema = {
  description: 'Obter informações do utilizador',
  summary: 'Obter informações do utilizador',
  operationId: 'obterInformacoesUtilizador',
  tags: ['Utilizadores'],
  response: {
    200: {
      description: 'Informações do utilizador obtidas com sucesso',
      type: 'object',
      properties: {
        message: { type: 'string' },
        user: {
          type: 'object',
          properties: {
            id: { type: 'string' },
            firstName: { type: 'string' },
            lastName: { type: 'string' },
            email: { type: 'string' },
            username: { type: 'string' },
            number: { type: 'number' },
            isVerified: { type: 'boolean' },
          },
        },
      },
    },
    406: {
      description: 'A conta do utilizador ainda não está verificada',
      type: 'object',
      properties: {
        message: { type: 'string' },
      },
    },
    400: {
      description: 'Dados do request para obter as informações do utilizador inválidos',
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
      description: 'Muitas tentativas de obter as informações do utilizador',
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

const UserLogoutAccount: FastifySchema = {
  description: 'Terminar sessão',
  summary: 'Terminar sessão',
  operationId: 'terminarSessao',
  tags: ['Utilizadores'],
  response: {
    200: {
      description: 'Sessão terminada com sucesso',
      type: 'object',
      properties: {
        message: { type: 'string' },
      },
    },
    400: {
      description: 'Dados do request para terminar a sessão inválidos',
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
      description: 'Muitas tentativas de terminar a sessão',
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

const UserChangeCurriculum: FastifySchema = {
  description: 'Alterar o currículo do utilizador',
  summary: 'Alterar o currículo do utilizador',
  operationId: 'alterarCurriculoUtilizador',
  tags: ['Utilizadores'],
  response: {
    200: {
      description: 'Currículo alterado com sucesso',
      type: 'object',
      properties: {
        message: { type: 'string' },
      },
    },
    400: {
      description: 'Dados do request para alterar o currículo inválidos',
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
      description: 'Muitas tentativas de alterar o currículo',
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

const UserUpdateInfo: FastifySchema = {
  description: 'Alterar a informação do utilizador',
  summary: 'Alterar a informação do utilizador',
  operationId: 'alterarInformacaoUtilizador',
  tags: ['Utilizadores'],
  body: {
    type: 'object',
    properties: {
      password: { type: 'string' },
      number: { type: 'number' },
    },
  },
  response: {
    200: {
      description: 'Informação alterada com sucesso',
      type: 'object',
      properties: {
        message: { type: 'string' },
      },
    },
    400: {
      description: 'Dados do request para alterar a informação inválidos',
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
      description: 'Muitas tentativas de alterar a informação',
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

const UserGetCurriculum: FastifySchema = {
  description: 'Obter o currículo do utilizador',
  summary: 'Obter o currículo do utilizador',
  operationId: 'obterCurriculoUtilizador',
  tags: ['Utilizadores'],
  params: {
    type: 'object',
    properties: {
      username: { type: 'string' },
    },
  },
  response: {
    200: {},
    302: {},
    400: {
      description: 'Dados do request para obter o currículo inválidos',
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
      description: 'Muitas tentativas de obter o currículo',
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

const UserGetAnuncios: FastifySchema = {
  description: 'Obter os anúncios do utilizador',
  summary: 'Obter os anúncios do utilizador',
  operationId: 'obterAnunciosUtilizador',
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
      description: 'Anúncios obtidos com sucesso',
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
      description: 'Dados do request para obter os anúncios inválidos',
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
      description: 'Utilizador não encontrado',
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
      description: 'Muitas tentativas de obter os anúncios',
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
  UserCreateAccount, UserLoginAccount, UserGetVerifyAccountCode, UserGetCurriculum, UserGetAnuncios,
  UserVerifyAccount, UserGetInfo, UserLogoutAccount, UserChangeCurriculum, UserUpdateInfo,
};
