type DecodedJWTToken = {
  header: {
    alg: string;
    typ: string;
  };
  payload: {
    id: string;
    iat: number;
    date: Date;
  };
  signature: string;
  input: string;
};
