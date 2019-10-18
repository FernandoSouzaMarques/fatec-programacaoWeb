const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const curso = require('./routes/curso');
const professor = require('./routes/professor');
const turma = require('./routes/turma');
const aluno = require('./routes/aluno');
const avaliacao = require('./routes/avaliacao');
const nota = require('./routes/nota');

var app = express();
const cors = require('cors');
app.use(cors());

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

const database = require('./config/database');
database('mongodb://localhost:27017/programacao-web');


app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/curso', curso);
app.use('/professor', professor);
app.use('/turma', turma);
app.use('/aluno', aluno);
app.use('/avaliacao', avaliacao);
app.use('/nota', nota);

module.exports = app;
