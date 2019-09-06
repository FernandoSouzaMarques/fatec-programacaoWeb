const mongoose = require('mongoose');

const schema = mongoose.Schema({
    valor: {
        type: Number,
        required: true,
        min: 0,
        max: 10
    },
    avaliacao: {
        type: mongoose.ObjectId,
        required: true,
        ref: 'Avaliacao'
    },
    aluno: {
        type: mongoose.ObjectId,
        required: true,
        ref: 'Aluno'
    }

});

module.exports = mongoose.model('Nota', schema, 'notas');