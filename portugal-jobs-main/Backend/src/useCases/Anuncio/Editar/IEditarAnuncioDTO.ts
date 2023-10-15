interface IEditarAnuncioDTO {
  Params : {
    anuncioID : string,
  }
  Body : {
    local?: string,
    salary?: number,
    isNegotiable?: boolean,
    role?: string,
    typeJob?: string,
    description?: string,
    requirements?: string,
    contractType?: string,
  }
}

export default IEditarAnuncioDTO;
