const mongoose = require('mongoose');

const schema = mongoose.Schema({
    nome: {
        type: String,
        required: true
    },
    dia_semana: {
        type: String,
        required: true,
        enum: ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado']
    },
    horario_inicial: {
        type: Date,
        required: true
    },
    horario_final: {
        type: Date,
        required: true
    },
    data_inicial: {
        type: Date,
        required: true
    },
    data_final: {
        type: Date,
        required: true
    },
    professor: {
        type: mongoose.ObjectId,
        required: true,
        ref: 'Professor'
    },
    curso: {
        type: mongoose.ObjectId,
        required: true,
        ref: 'Curso'
    }

});

module.exports = mongoose.model('Turma', schema, 'turmas');