[Swagger](https://portugaljobs.diogomarques.dev/api/docs/static/index.html#/Anúncios/getAnuncio)

Rota: ```/anuncios/:anuncioID```
Metodo: ```GET```

Deverá ser passado um anúncio no paramêtro ":anuncioID", do tipo string que irá retornar em caso de sucesso um e um só anúncio referente ao anuncioID que passar no request.

Headers:
```
{
  'Authorization': 'Bearer Token'
}
```

Respostas possíveis:

Status Code: 200 (Anúncio selecionado com sucesso )
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
IsCandidatado: boolean
message: string ( Anúncio selecionado com sucesso )
```

Status Code: 401 (O Utilizador não existe ou o token é inválido)
Response data:
```
{
  message: string
}
```

Status Code: 404 (Anúncio não existe)
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