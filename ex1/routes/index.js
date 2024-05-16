var express = require('express');
var router = express.Router();
const Contrato = require('../controllers/contrato');

/* GET home page. */
router.get('/', function(req, res) {
  const entidade = req.query.entidade;
  const tipo = req.query.tipo;
  if(entidade){
    Contrato.findByEntidade(entidade)
          .then(data => res.jsonp(data))
          .catch(erro => res.jsonp(erro))
  }
  else if (tipo){
    Contrato.findByTipo(tipo)
          .then(data => res.jsonp(data))
          .catch(erro => res.jsonp(erro))
  }
  else{
    Contrato.list()
          .then(data => res.jsonp(data))
          .catch(erro => res.jsonp(erro))
  }
});


router.get('/tipos', function(req, res) {
  Contrato.findDistinctTipos()
      .then(data => res.jsonp(data))
      .catch(erro => res.jsonp(erro))
});

router.get('/entidades', function(req, res) {
  Contrato.findDistinctEntidades()
      .then(data => res.jsonp(data))
      .catch(erro => res.jsonp(erro))
});

router.get('/:id', function(req, res) {
  Contrato.findById(req.params.id)
      .then(data => res.jsonp(data))
      .catch(erro => res.jsonp(erro))
});


router.post('/', function(req, res) {
  Contrato.insert(req.body)
    .then(data => res.jsonp(data))
    .catch(erro => res.status(522).jsonp(erro))
});

router.put('/:id', function (req, res) {
  Contrato.edit(req.params.id, req.body)
    .then(data => res.jsonp(data))
    .catch(erro => res.status(523).jsonp(erro))
});


router.delete('/:id', function(req, res) {
  return Contrato.removeById(req.params.id)
    .then(data => res.jsonp(data))
    .catch(erro => res.status(524).jsonp(erro))
});

module.exports = router;
