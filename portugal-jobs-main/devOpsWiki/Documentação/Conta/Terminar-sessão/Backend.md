[Swagger](https://portugaljobs.diogomarques.dev/api/docs/static/index.html#/Utilizadores/terminarSessao)

Rota: `/logout`
Metodo: `DELETE`
Headers:
```
{
  'Authorization': 'Bearer Token'
}
```

Respostas possíveis:

Status Code: 200 (A sessão foi terminada com sucesso)
Response data:
```
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