[Swagger](https://portugaljobs.diogomarques.dev/api/docs/static/index.html#/Anúncios/criarAnuncio)

Rota: ```/anuncios```
Metodo: ```POST```
Body:
```
{
  companyName: string,
  local: string,
  salary: number,
  isNegotiable: boolean,
  role: string,
  typeJob: string,
  description: string,
  requirements: string, (opcional)
  contractType: string
}
```

Headers:
```
{
  'Authorization': 'Bearer Token'
}
```

Respostas possíveis:

Status Code: 201 (Anúncio criado com sucesso)
Response data:
```
anuncio: {
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
}
message : string
```

Status Code: 401 (O Utilizador não existe ou o token é inválido)
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