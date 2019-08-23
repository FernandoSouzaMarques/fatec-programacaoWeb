const mongoose = require('mongoose');

const schema = mongoose.Schema({
    nome: {
        type: String,
        required: true
    },
    duracao_meses: {
        type: Number,
        required: true,
        default: 6
    },
    carga_horaria: {
        type: Number,
        required: true,
        default: 96
    },
    valor_total: {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model('Curso', schema, 'cursos');