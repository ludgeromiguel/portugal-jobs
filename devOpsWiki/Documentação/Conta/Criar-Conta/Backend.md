[Swagger](https://portugaljobs.diogomarques.dev/api/docs/static/index.html#/Utilizadores/criarConta)

Rota: `/register`
Metodo: `POST`
Body:
```
{
  email: string,
  username: string,
  password: string,
  firstName: string,
  lastName: string,
  number: number
}
```

Respostas possíveis:

Status Code: `201` (Conta criada com sucesso)
Response data:
```
{
  token: string,
  message: string
}
```

Status Code: `400` e `500` (`400` - dados do request inválidos, `500` - Ocorreu algum erro na api)
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