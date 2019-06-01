var S = require('string');

module.exports = function(app) {

	var Usuarios = app.models.users;
    var Equipes = app.models.equipes;
    var Locais = app.models.locais;

 	var IndexController = {
		index: function(req,res) {
            Equipes.findOne({_id: req.user.equipe_id}, function(err, data){
                Usuarios.find({equipe_id: req.user.equipe_id}, function(err, data2){
                    res.render('equipe/index', { title: 'Hunting DevCode', user: req.user, membros: data, string: S, pontuacao: data2 });
                });
            });
        },
        capturas: function(req,res) {
            Locais.find(function(err, data){
                res.render('equipe/capturas', { title: 'Hunting DevCode', user: req.user, locais: data, string: S });
            });
        },
        ranking: function(req,res) {
            Equipes.find().sort( {'pontos': -1} ).exec(function(err, data){
                res.render('equipe/ranking', { title: 'Hunting DevCode', user: req.user, ranking: data, string: S });
            });
        },
        sobre: function(req,res) {
            res.render('equipe/sobre', { title: 'Hunting DevCode', user: req.user });
        },
        encontrar: function(req,res){          
            Equipes.find({ "numero_membros": { $in: [1, 2] } }, function(err, data){
                if (err) {
                    console.log('Deu erro em room'+err);
                }
                res.render('encontrarEquipe', {equipes: data, user: req.user});
            });
        },
        enviaLocal: function(req,res) {            
            res.render('submitLocais', { title: 'Hunting DevCode'});
        },
        devcode: function(req,res){            
            Locais.findById(req.params.id, function(err, data){
                if (err) {
                    console.log('Deu erro em room'+err);
                }
                res.render('equipe/DevCode', {local: data, user: req.user});
            });
        },
        vis: function(req,res){            
            Locais.findById(req.params.id, function(err, data){
                if (err) {
                    console.log('Deu erro em room'+err);
                }
                res.render('equipe/vis', {local: data, user: req.user});
            });
        },
        pontuar: function(req,res){
            Usuarios.findOne({_id: req.user._id}, function(err, data){
                var contem = 0;
                if(data.local_id != null){
                    var quebra_local = S(data.local_id).parseCSV(",");
                    var tamanho = quebra_local.length;
                    for(var i = 0; i < tamanho; i++){
                        if(quebra_local[i] == req.body.local_id){
                            contem = 1;
                            res.redirect('/minhaEquipe');
                            break;
                        }
                    }
                }
                if(contem == 0){
                    var model = data;
                    var equipe_id = data.equipe_id;
                    var pontos = (data.pontos/1) + (req.body.pontos/1);
                    model.pontos = pontos;
                    model.local_id = data.local_id + ',' + req.body.local_id;
                    model.save(function(err){
                        if (err) {
                            console.log(err);
                            res.write('<script>alert("Falha ao cadastrar DevCode =/ (to bad)"); window.location="../"</script>');
                        } else {
                            Equipes.findOne({_id: equipe_id}, function(err, data2){
                                var model = data2;
                                model.pontos = pontos;
                                model.save(function(err){
                                    if (err) {
                                        console.log(err);
                                        res.write('<script>alert("Falha ao cadastrar DevCode =/ (to bad)"); window.location="../"</script>');
                                    } else {
                                        res.redirect('/minhaEquipe');
                                    }
                                });
                            });
                        }
                    });
                }
            });
        },
        entrarEquipe: function(req,res){
            Equipes.findOne({_id: req.body.id_equipe}, function(err, data){
                if (err) {
                    console.log('Deu erro em room'+err);
                }
                if(data.numero_membros != 3 && req.body.senha == data.senha || data.senha == null){
                    var model = data;
                    var id_equipe = data._id;
                    var nome_equipe = data.equipe;
                    model.numero_membros = data.numero_membros + 1;
                    model.id_membros = data.id_membros + ',' + req.user._id;
                    model.nome_membros = data.nome_membros + ',' + req.user.nome;
                    model.save(function(err){
                        if (err) {
                            console.log(err);
                            res.write('<script>alert("Falha ao entrar na equipe =/ (to bad)"); window.location="../"</script>');
                        } else {
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
                        }
                    });
                }
            });
		}
  	}

  	return IndexController;
}
