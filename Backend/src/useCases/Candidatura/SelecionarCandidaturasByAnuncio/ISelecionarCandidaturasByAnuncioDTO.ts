interface ISelecionarCandidaturasByAnuncioDTO {
  Params: {
    anuncioID: string,
  }
  Querystring: {
    pageIndex?: number,
    pageSize: number
  }
}

export default ISelecionarCandidaturasByAnuncioDTO;
