O dataset foi alterado manualmente recorrendo a ctrl+f e replace all de `idcontrato` para `_id` , de seguida recorreu-se ao script `script.py` para converter os floats separados por vírgula em separados por ponto.

Para o setup da base de dados utilizei os seguintes comandos:

`docker run -d -p 27017:27017 --name mongodb_ex1 mongo` 

`docker cp contratos.json mongodb_ex1:/tmp`

`docker exec mongodb_ex1 mongoimport -d contratos -c contratos --type json --file /tmp/contratos.json --jsonArray`

Quanto às respostas textuais estas estão incluídas o código e a resposta em `/ex1/queries.txt`.

Para executar as aplicações envolvidas basta correr o comando `npm i` e npm `start` na diretoria da API (/ex1) e o mesmo na diretoria da interface (/ex2). Caso haja algum erro, pode ser necessário fazer `npm i mongoose` para a API e `npm i axios` para a interface.