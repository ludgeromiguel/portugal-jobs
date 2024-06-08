import { validate as uuidValidate, version as uuidVersionValidate } from 'uuid';

function verifyUUID(uuid: string) : boolean {
  return !uuidValidate(uuid) || uuidVersionValidate(uuid) !== 4;
}

export { verifyUUID };
