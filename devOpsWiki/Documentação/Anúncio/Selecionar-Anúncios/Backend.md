[Swagger](https://portugaljobs.diogomarques.dev/api/docs/static/index.html#/Anúncios/getAnuncios)

Rota: ```/anuncios?local=&salary=&typeJob=&role=&contractType=&pageSize=&pageIndex=```
Metodo: ```GET```

Querystring:
```
local: Filtrar por cidade
salary: Filtrar por salário, ou seja salario=500 significa que só retorna anuncios com salário iguais ou superior a 500
typeJob: O tipo de trabalho que pretende filtrar. Só são aceitáveis "remoto", "presencial" ou "híbrido"
role: Qual o trabalho pelo qual pretende filtrar. Exemplo: "Python dev"
contractType: Tipo de contrato. Exemplo "Efetivo"

pageSize: Quantidade de anuncios apresentados por cada página
pageIndex: A página que pretende. Por exemplo, pageIndex=3 e pageSize=2 vai retornar os anúncios 5 e 6.

A única queryString obrigatória para o funcionamento da rota é o "pageSize".
Caso não passe nenhum dos 5 filtros (local, salario, typeJob, role, na queryString, ele irá retornar todos os anúncios consoante o que foi passado na queryString referente à paginação ( pageSize e pageIndex). 
```

Headers:
```
{
  'Authorization': 'Bearer Token'
}
```

Respostas possíveis:

Status Code: 200 (Anúncios selecionados com sucesso )
Response data:
```
anuncios: [ {
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
} ]
message: string ( Anúncios selecionados com sucesso )
paginas: number ( Quantidade de páginas para os filtros fornecidos dependendo do limit, ou seja da quantidade de anúncios que tem por página. )
paginaAtual: number ( Página pedida na queryString. Se não for requerida então página=1 )
nRegistos: number ( Quantidade de registos que existem para os filtros fornecidos )
```

Status Code: 401 (O Utilizador não existe ou o token é inválido)
Response data:
```
{
  message: string
}
```

Status Code: 404 (Anúncio não existe com os filtros fornecidos ou número de página inválida)
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