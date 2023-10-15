[Swagger](https://portugaljobs.diogomarques.dev/api/docs/static/index.html#/Utilizadores/alterarInformacaoUtilizador)

Rota: `/@me/update/data`
Metodo: `PUT`
Body: `(ambos são opcionais, porem tem de passar pelo menos um)`
```
{
  password: string,
  number: number
}
```

Respostas possíveis:

Status Code: `200` (Dados alterados com sucesso)
Response data:
```
{
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