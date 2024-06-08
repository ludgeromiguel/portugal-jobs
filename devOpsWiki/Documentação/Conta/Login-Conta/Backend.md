[Swagger](https://portugaljobs.diogomarques.dev/api/docs/static/index.html#/Utilizadores/fazerLogin)

Rota: `/login`
Metodo: `POST`
Body:
```
{
  username: string,
  password: string
}
```

Respostas possíveis:

Status Code: `200` (Login efetuado com sucesso)
Response data:
```
{
  token: string,
  message: string
}
```

Status Code: `400`, `401` e `500` (`400` - dados do request inválidos, `401` - Email ou password inválidos, `500` - Ocorreu algum erro na api)
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