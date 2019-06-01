/* Uploads de arquivos */
var multer  = require('multer');

var storage = multer.diskStorage({
  	destination: function (req, file, cb) {
    	cb(null, 'public/images/locais/'); // Jogando nesse diretorio
  	},
  	filename: function (req, file, cb) {
		var ext = file.originalname.substr(file.originalname.lastIndexOf('.') + 1); 
    	cb(null, file.fieldname + '-' + Date.now() + '.' + ext);
  	}
});
var upload = multer({ storage: storage });

module.exports = function(app){
	var index = app.controllers.index; // pega da pasta controllers, o controllers esta setado em load
	app.get('/', require('connect-ensure-login').ensureLoggedIn(), index.index); 

	app.post('/createEquipe', index.createEquipe);

	app.post('/submit/thebatmanlocao', upload.single('arquivo'), index.upload);
};