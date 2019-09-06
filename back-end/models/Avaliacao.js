const mongoose = require('mongoose');

const schema = mongoose.Schema({
    data_hora: {
        type: Date,
        required: true
    },
    conteudo: {
        type: String,
        required: true
    },
    duracao_horas: {
        type: Number,
        required: true,
        default: 1
    },
    turma: {
        type: mongoose.ObjectId,
        required: true,
        ref: 'Turma',
    }
});

module.exports = mongoose.model('Avaliacao', schema, 'avaliacoes');