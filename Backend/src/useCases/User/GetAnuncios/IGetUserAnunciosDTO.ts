interface IGetUserAnunciosDTO {
  Querystring: {
    pageSize: number;
    pageIndex?: number;
  }
}

export default IGetUserAnunciosDTO;
