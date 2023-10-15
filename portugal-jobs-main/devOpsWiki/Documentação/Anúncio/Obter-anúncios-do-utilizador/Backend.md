[Swagger](https://portugaljobs.diogomarques.dev/api/docs/static/index.html#/Utilizadores/obterAnunciosUtilizador)

Rota: `/@me/anuncios?pageSize=&pageIndex=`
Metodo: `GET`

Querystring:
```
pageSize: number,
pageIndex: number, (opcional)
```

Headers:
```
{
  'Authorization': 'Bearer Token'
}
```

Respostas possíveis:

Status Code: 200 (Anúncios selecionados com sucesso )
Response data:
```
anuncios: [ {
  id: string,
  ownerID: string,
  companyName: string,
  local: string,
  salary: number,
  isNegotiable: boolean,
  role: string,
  typeJob: string,
  description: string,
  requirements?: string,
  contractType: string,
  createdAt: string,
  updatedAt: string
} ]
message: string 
paginas: number 
paginaAtual: number
nRegistos: number
```

Status Code: 401 (O Utilizador não existe ou o token é inválido)
Response data:
```
{
  message: string
}
```

Status Code: 404 (Anúncio não existe com os filtros fornecidos ou número de página inválida)
Response data:
```
{
  message: string
}
```

Status Code: 400 e 500 (400 - dados do request inválidos, 500 - Ocorreu algum erro na api)
Response data: 
```
{
  message: string 
}
```

Status Code: `429` e `403` (A pessoa atingiu o rate limit da api)
Response data:
```
{
  code: number,
  error: string,
  message: string,
  date: string,
  expiresIn: string
}
``` 