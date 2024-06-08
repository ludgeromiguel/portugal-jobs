[Swagger](https://portugaljobs.diogomarques.dev/api/docs/static/index.html#/Anúncios/candidatarAnuncio)

Rota: ```/anuncios/:anuncioID/candidatar```
Metodo: ```POST```

Headers:
```
{
  'Authorization': 'Bearer Token'
}
```

Respostas possíveis:

Status Code: 201 (Candidatura criada com sucesso)
Response data:
```
candidatura: {
  id: string,
  ownerID: string,
  anuncioID: string,
  status: number,
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

Status Code: 400, 404 e 500 (400 - dados do request inválidos, 404 - Anúncio não existente, 500 - Ocorreu algum erro na api)
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