module.exports = function(){

	var mongoose = require('mongoose');
	var Schema = mongoose.Schema;

	var locais = new Schema({
		titulo: String,
		descricao: String,
		pontos: Number,
		filename: String,
        latitude: String,
        longitude: String        
	});

	return mongoose.model('Locais', locais);
};