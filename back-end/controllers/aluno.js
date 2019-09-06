const Aluno = require('../models/Aluno');

const controller = {};

controller.novo = async (req, res) => {
   try {
        await Aluno.create(req.body);
        //HTTP 201: Created
        res.sendStatus(201);
   }
   catch(erro) {
       console.error(erro);
       //HTTP 500: Internal Server Error
       res.sendStatus(500);
   }
}

controller.listar = async (req, res) => {
    try {
        const alunos = 
            await Aluno
                .find()
                .populate('turma')
        res.send(alunos);
    }
    catch(erro) {
        console.error(erro);
       //HTTP 500: Internal Server Error
       res.sendStatus(500);
    }
}

controller.obterUm = async (req, res) => {
    try {
        const id = req.params.id;
        const aluno = await Aluno.findOne({_id: id});

        if(aluno) res.send(aluno);
        else res.sendStatus(404);
    }
    catch(erro) {
        console.error(erro);
       //HTTP 500: Internal Server Error
       res.sendStatus(500);
    }
}

controller.atualizar = async (req, res) => {
    try {
        const id = req.body._id;
        const modificado = await Aluno.findOneAndUpdate({_id: id}, req.body);

        if(modificado) res.sendStatus(204);
        else res.sendStatus(404);
    }
    catch(error) {
        console.error(erro);
        //HTTP 500: Internal Server Error
        res.sendStatus(500);
    }
}

controller.excluir = async (req, res) => {
    try {
        const id = req.body._id;
        const excluido = await Aluno.findOneAndDelete({_id: id}, req.body)
            if(excluido) res.sendStatus(204);
            else res.sendStatus(404);
    }
    catch(erro) {
        console.error(erro);
       //HTTP 500: Internal Server Error
       res.sendStatus(500);
    }
}
module.exports = controller;