const mongoose = require('mongoose');

module.exports = function(uri) {
	mongoose.connect(uri, { useNewUrlParser: true});

	mongoose.set('useFindAndModify', false);

	mongoose.connection.on('connected' , () => {
		console.log('Mongoose! conectado a ' + uri);
	});

	mongoose.connection.on('disconnected' , () => {
		console.log('Mongoose! desconectado a ' + uri);
	});

	mongoose.connection.on('error', (erro) => {
		console.log('Mongoose! ERROR: ' + erro)
	})

	// Capturamos um sinal de encerramento (SIGINT), Ctrl+C
	process.on('SIGINT', () => {
		mongoose.connection.close(() => {
			console.log('Mongoose! desconectado pelo término da aplicação');
			// 0 indica a que a finalização ocorreu sem erros 
			process.exit(0);
		});
	});
}