const mongoose = require('mongoose');

const schema = mongoose.Schema({
    nome: {
        type: String,
        required: true
    },
    formacao: {
      type: String,
      required: false
    },
    endereco: {
      type: String,
      required: false
    },
    telefone: {
      type: String,
      required: true
    },
    dataNascimento: {
      type: Date,
      required: true
    },
    cpf: {
      type: String,
      required: true,
      index: {unique: true}
    },
    rg: {
      type: String,
      required: true
    },
    valorHoraAula: {
      type: Number,
      required: true,
      default: 20,
      min: 15,
      max: 50
    },
    email: {
      type: String,
      required: true,
      index: {unique: true}
    }
});

module.exports = mongoose.model('Professor', schema, 'professores');