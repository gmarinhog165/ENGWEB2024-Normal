var express = require('express');
var router = express.Router();
var axios = require('axios');

/* GET home page. */
router.get('/', function(req, res) {
  var d = new Date().toISOString().substring(0,16)
  axios.get('http://localhost:16000/contratos')
                    .then(resposta => {
                      res.render('index', { contratos: resposta.data, data: d});
                    })
                    .catch( erro => {
                      res.render('error', {error: erro, message: 'Erro ao recuperar os contratos'})
                    })
});

router.get('/:id', function(req, res) {
  var d = new Date().toISOString().substring(0,16)
  axios.get('http://localhost:16000/contratos/'+ req.params.id)
                    .then(resposta => {
                      res.render('contrato', { contrato: resposta.data, data: d});
                    })
                    .catch( erro => {
                      res.render('error', {error: erro, message: 'Erro ao recuperar o contrato'})
                    })
});


function calcularSomatorioContratos(contratos) {
  return contratos.reduce((total, contrato) => {
    const preco = parseFloat(contrato.precoContratual.replace(',', '.'));
    return total + preco;
  }, 0);
}


router.get('/entidades/:nipc', function(req, res) {
  var d = new Date().toISOString().substring(0,16)
  axios.get('http://localhost:16000/contratos?entidade='+ req.params.nipc)
                    .then(resposta => {
                      var somatorio = calcularSomatorioContratos(resposta.data);
                      res.render('entidade', { contratos: resposta.data, somatorio, data: d, nipc: resposta.data[0].NIPC_entidade_comunicante,
                        entidadeNome: resposta.data[0].entidade_comunicante});

                    })
                    .catch( erro => {
                      res.render('error', {error: erro, message: 'Erro ao recuperar o contrato'})
                    })
});


module.exports = router;
