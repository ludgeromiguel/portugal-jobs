[Swagger](https://portugaljobs.diogomarques.dev/api/docs/static/index.html#/Anúncios/editarAnuncio)

Rota: ```/anuncios/:anuncioID```
Metodo: ```PUT```
Body:
```
{
  local: string (opcional),
  salary: number (opcional) ,
  isNegotiable: boolean (opcional),
  role: string (opcional),
  typeJob: string (opcional),
  description: string (opcional),
  requirements: string, (opcional)
  contractType: string (opcional)
}
```

Headers:
```
{
  'Authorization': 'Bearer Token'
}
```

Respostas possíveis:

Status Code: 201 (Anúncio editado com sucesso)
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

Status Code: 401 (O Utilizador não existe ou o token é inválido ou não tens permissão para editar aquela anúncio.)
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