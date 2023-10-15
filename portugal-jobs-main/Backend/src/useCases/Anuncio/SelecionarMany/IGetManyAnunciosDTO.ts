interface IGetManyAnunciosDTO {
  Querystring: {
    local?: string,
    salary?: number,
    typeJob?: string,
    role?: string,
    contractType?: string,
    pageIndex?: number,
    pageSize: number
  }
}

export default IGetManyAnunciosDTO;
