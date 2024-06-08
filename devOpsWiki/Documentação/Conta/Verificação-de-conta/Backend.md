Para verificar a conta existem duas rotas, uma para enviar o código de verificação para o email, e o outro para enviar o código e verificar a conta.

**Rota para obter o código:**
[Swagger](https://portugaljobs.diogomarques.dev/api/docs/static/index.html#/Utilizadores/obterCodigoVerificacao)

Rota: `/@me/verificationCode`
Metodo: `GET`
Headers:
```
{
  'Authorization': 'Bearer Token'
}
```

Respostas possíveis:

Status Code: 200 (Código de verificação enviado)
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

Status Code: 400 e 500 (400 - dados do request inválidos ou já tem um código, 500 - Ocorreu algum erro na api)
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
<br/><br/>

**Rota para verificar a conta:**
[Swagger](https://portugaljobs.diogomarques.dev/api/docs/static/index.html#/Utilizadores/verificarConta)

Rota: `/verificateAccount`
Metodo: `PUT`
Body:
```
{
   verifyCode: string
}
```
Headers:
```
{
  'Authorization': 'Bearer Token'
}
```

Respostas possíveis:

Status Code: 200 (Conta verificada com sucesso)
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

Status Code: 400 e 500 (400 - dados do request ou código de verificação inválidos, 500 - Ocorreu algum erro na api)
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