import { FastifyRequest } from 'fastify';

import AppError from '@errors/AppError';

class UserChangeCurriculumVerifications {
  async execute(req: FastifyRequest) {
    const files = await req.saveRequestFiles();

    if (!files || files.length === 0) throw new AppError('Tens de enviar um PDF', 400);

    const file = files[0];

    if (file.filename.split('.').at(-1) !== 'pdf') throw new AppError('Tens de enviar um PDF', 400);

    if (!file.filepath) throw new AppError('Erro ao enviar o ficheiro', 500);

    req.pdfFilePath = file.filepath;
  }
}

export default UserChangeCurriculumVerifications;
