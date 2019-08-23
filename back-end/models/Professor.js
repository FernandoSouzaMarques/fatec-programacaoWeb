const mongoose = require('mongoose');

const schema = mongoose.Schema({
    nome: {
        type: String,
        required: true
    },
    cpf: {
      type: Number,
      required: true
    }
});

module.exports = mongoose.model('Professor', schema, 'professores');