function getLetters(numb: number): string {
  let code = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const charactersLength = characters.length;

  for (let i = 0; i < numb; i++) {
    code += characters.charAt(Math.floor(Math.random() * charactersLength));
  }

  return code;
}

function getNumbers(numb: number): string {
  let code = '';
  const characters = '0123456789';
  const charactersLength = characters.length;

  for (let i = 0; i < numb; i++) {
    code += characters.charAt(Math.floor(Math.random() * charactersLength));
  }

  return code;
}

function randomizeArray(array: Array<string>): string[] {
  let i: number;
  let j: number;
  let x: string;

  for (i = array.length - 1; i > 0; i--) {
    j = Math.floor(Math.random() * (i + 1));
    x = array[i];
    array[i] = array[j];
    array[j] = x;
  }

  return array;
}

function generateCode(nLetters: number, nNumbers: number): string {
  const letters = getLetters(nLetters);
  const numbers = getNumbers(nNumbers);

  const code = randomizeArray([...letters, ...numbers.toString()]);

  return code.join('');
}

export { generateCode };
