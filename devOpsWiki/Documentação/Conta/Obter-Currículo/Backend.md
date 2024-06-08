[Swagger](https://portugaljobs.diogomarques.dev/api/docs/static/index.html#/Utilizadores/obterCurriculoUtilizador)

Rota: `/users/:username/curriculum`
Metodo: `GET`

Headers:
```
{
  'Authorization': 'Bearer Token'
}
```

Respostas possíveis:

Status code: 200 e 302 (O utilizador foi redirecionado com sucesso para o currículo)

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

Status Code: 404 (Utilizador não existe ou não tem um currículo válido)
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