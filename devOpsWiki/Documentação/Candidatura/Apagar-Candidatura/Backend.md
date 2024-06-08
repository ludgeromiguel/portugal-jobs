[Swagger](https://portugaljobs.diogomarques.dev/api/docs/static/index.html#/Candidaturas/apagarCandidatura)

Rota: ```/candidaturas/:candidaturaID```
Metodo: ```DELETE```

Headers:
```
{
  'Authorization': 'Bearer Token'
}
```

Respostas possíveis:

Status Code: 200 (Candidatura apaga com sucesso)
Response data:
```
message : string
```

Status Code: 401 (O Utilizador não existe ou o token é inválido ou não tens permissão para remover a candidatura)
Response data:
```
{
  message: string
}
```

Status Code: 400, 404 e 500 (400 - dados do request inválidos, 404 - Candidatura não existente, 500 - Ocorreu algum erro na api)
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