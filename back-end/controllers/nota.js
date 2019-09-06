const Nota = require('../models/Nota');

const controller = {};

controller.novo = async (req, res) => {
   try {
        await Nota.create(req.body);
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
        const notas = 
            await Nota
                .find()
                .populate('avaliacao')
                .populate('aluno');
        res.send(notas);
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
        const nota = await Nota.findOne({_id: id});

        if(nota) res.send(nota);
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
        const modificado = await Nota.findOneAndUpdate({_id: id}, req.body);

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
        const excluido = await Nota.findOneAndDelete({_id: id}, req.body)
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