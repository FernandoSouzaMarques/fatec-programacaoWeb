const mongoose = require('mongoose');
const mongooseSeq = require('mongoose-sequence')(mongoose) ;//mongoose está sendo passado como parametro

const schema = mongoose.Schema({
    nome: {
        type: String,
        required: true
    },
    endereco: {
        type: String,
        required: false
    },
    data_nascimento: {
        type: Date,
        required: true
    },
    telefone: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        index: {unique: true}
    },
    num_matricula: {
        type: Number,
        required: false,
        index: {unique: true}
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
    turma: {
        type: mongoose.ObjectId,
        required: true,
        ref: 'Turma'
    }

});

schema.plugin(mongooseSeq, {inc_field: 'num_matricula', start_seq: 1001});
module.exports = mongoose.model('Aluno', schema, 'alunos');