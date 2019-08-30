const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const curso = require('./routes/curso');
const professor = require('./routes/professor');
const turma = require('./routes/turma');

var app = express();

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

module.exports = app;
