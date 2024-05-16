const Contrato = require('../models/contrato');

function compareStrings(a, b) {
  return a.localeCompare(b, undefined, { sensitivity: 'base', ignorePunctuation: true });
}

module.exports.list = async () => {
  return await Contrato
    .find()
    .exec();
}

module.exports.findById = id => {
  return Contrato
    .findOne({ _id: id })
    .exec();
}

module.exports.findByEntidade = entidade => {
    return Contrato
      .find({ NIPC_entidade_comunicante: entidade })
      .exec();
  }
  
module.exports.findByTipo = tipo => {
    return Contrato
      .find({ tipoprocedimento: tipo })
      .exec();
}

module.exports.findDistinctTipos = () => {
  return Contrato.distinct('tipoprocedimento').then(tipos => {
    return tipos.sort(compareStrings);
  });
}

module.exports.findDistinctEntidades = () => {
  return Contrato.distinct('entidade_comunicante').then(tipos => {
    return tipos.sort(compareStrings);
  });
}

module.exports.insert = planta => {
    return Contrato.create(planta);
}

module.exports.edit = (id, comp) => {
  return Contrato.updateOne({_id : id}, comp)
}

module.exports.removeById = id => {
    return Contrato.findByIdAndDelete({ _id: id });
  }
