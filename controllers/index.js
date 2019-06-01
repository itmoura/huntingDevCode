module.exports = function(app) {

	var Usuarios = app.models.users;
	var Equipes = app.models.equipes;
	var Locais = app.models.locais;

 	var IndexController = {
		index: function(req,res) {
			if(req.user.equipe_id == null){
				res.render('index', { title: 'Hunting DevCode', user: req.user });
			} else {
				res.redirect('/minhaEquipe');
			}
      		
		},
		createEquipe: function(req,res){
			var model = new Equipes;
			model.id_criador = req.user._id;
			model.nome_criador = req.user.nome;
			model.id_membros = req.user._id;
            model.nome_membros = req.user.nome;
			model.equipe = req.body.equipe;
			model.senha = req.body.senha;
			model.numero_membros = 1;
			model.save(function(err){
				if (err) {
					console.log(err);
					res.write('<script>alert("Falha ao criar equipe =/ (to bad)"); window.location="../"</script>');
				} else {
					Equipes.findOne().sort({'_id': -1}).exec(function(err, data1){
						var id_equipe = data1._id;
						var nome_equipe = data1.equipe;
						Usuarios.findOne({_id: req.user._id}, function(err, data2){
							var model = data2;
							model.equipe_id = id_equipe;
							model.equipe_nome = nome_equipe;
							model.save(function(err){
								if (err) {
									console.log(err);
									res.write('<script>alert("Falha ao entrar na equipe =/ (to bad)"); window.location="../"</script>');
								} else {
									res.redirect('/minhaEquipe');
								}
							});
						});
					});
				}
	  		});
		},
		upload: function(req, res, next){
			var model = new Locais;
			model.titulo = req.body.titulo;
			model.descricao = req.body.descricao;
			model.pontos = req.body.pontos;
			model.latitude = req.body.latitude;
			model.longitude = req.body.longitude;
			model.filename = req.file.filename;
			model.save(function(err){
				if (err) {
					console.log(err);
					res.write('<script>alert("Falha ao cadastrar!"); window.location="../"</script>');
				} else {
					Locais.findOne().sort({'_id': -1}).exec(function(err, data){
						res.send("http://huntingdev-codes.umbler.net/DevCode/"+data._id);
					});
					// res.redirect('/submitLocal/thebatman456macacodouradohashdeouro');
				}
	  		});
		}
  	}

  	return IndexController;
}
