module.exports = function(){

	var mongoose = require('mongoose');
	var Schema = mongoose.Schema;

	var equipes = new Schema({
        id_criador: String,
		nome_criador: String,
		id_membros: String,
		nome_membros: String,
		equipe: String,
		senha: String,
		numero_membros: Number,
		pontos: Number
	});

	return mongoose.model('Equipes', equipes);
};