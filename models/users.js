module.exports = function(){

	var mongoose = require('mongoose');
	var Schema = mongoose.Schema;

	var usuarios = new Schema({
		nome: String,
		email: String,
		cpf: String,
        senha: String,
        equipe_id: String,
		equipe_nome: String,
		pontos: Number,
		celular: String,
		local_id: String
	});

	return mongoose.model('Usuarios', usuarios);
};