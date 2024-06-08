[Swagger](https://portugaljobs.diogomarques.dev/api/docs/static/index.html#/Anúncios/selecionarCandidaturasByAnuncio)

Rota: ```/anuncios/:anuncioID/candidaturas```
Metodo: ```GET```

QueryString:
```
pageIndex?: number, 
pageSize: number
```
**pageIndex** -> define o número da página que o utilizador pretende.
**pageSize** -> o número de candidaturas que o utilizador quer em cada página. 

Headers:
```
{
  'Authorization': 'Bearer Token'
}
```

Respostas possíveis:

Status Code: 200 ( Candidaturas selecionadas com sucesso )
Response data:
```
message : string
candidaturas: [ { id: string,
              ownerID: string,
              anuncioID: string,
              status: number,
              ownerFirstName: string,
              ownerLastName: string,
              ownerUsername: string,
              createdAt: string,
              updatedAt: string } ]
paginas: number,
paginaAtual: number,
nRegistos: number
```

Status Code: 401 (O Utilizador não existe ou o token é inválido ou não tens permissão para ver as candidaturas daquele anúncio)
Response data:
```
{
  message: string
}
```

Status Code: 400, 404 e 500 (400 - dados do request inválidos, 404 - Anúncio não existe ou não existem candidaturas, 500 - Ocorreu algum erro na api)
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