const Professor = require('../models/Professor');

const controller = {};

controller.novo = async (req, res) => {
   try {
        await Professor.create(req.body);
        //HTTP 201: Created
        res.send('').sendStatus(201);
   }
   catch(erro) {
       console.error(erro);
       //HTTP 500: Internal Server Error
       res.sendStatus(500);
   }
}

controller.listar = async (req, res) => {
    try {
        const professores = await Professor.find().sort('nome');
        res.send(professores);
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
        const professor = await Professor.findOne({_id: id});

        if(professor) res.send(professor);
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
        const modificado = await Professor.findOneAndUpdate({_id: id}, req.body);

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
        const excluido = await Professor.findOneAndDelete({_id: id}, req.body)
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