type FastifyEnvSchemaPropsTypes = 'string' | 'number' | 'boolean';

interface FastifyEnvSchemaProps {
  DATABASE_URL: { type: FastifyEnvSchemaPropsTypes; default?: string };
  PORT: { type: FastifyEnvSchemaPropsTypes; default?: number };
  HOST: { type: FastifyEnvSchemaPropsTypes; default?: string };
  REDIS_IP: { type: FastifyEnvSchemaPropsTypes; default?: string };
  REDIS_PORT: { type: FastifyEnvSchemaPropsTypes; default?: number };
  REDIS_PASSWORD: { type: FastifyEnvSchemaPropsTypes; default?: string };
  JWT_SECRET: { type: FastifyEnvSchemaPropsTypes; default?: string };
  MAIL_HOST: { type: FastifyEnvSchemaPropsTypes; default?: string };
  MAIL_PORT: { type: FastifyEnvSchemaPropsTypes; default?: number };
  MAIL_USER: { type: FastifyEnvSchemaPropsTypes; default?: string };
  MAIL_PASS: { type: FastifyEnvSchemaPropsTypes; default?: string };
  MAIL_NOREPLY: { type: FastifyEnvSchemaPropsTypes; default?: string };
}

interface FastifyEnvSchema {
  type: string;
  required: string[];
  properties: FastifyEnvSchemaProps;
  additionalProperties: boolean;
}
