module.exports = function(app){
	var principal = app.controllers.principal; // pega da pasta controllers, o controllers esta setado em load
    app.get('/minhaEquipe', require('connect-ensure-login').ensureLoggedIn(), principal.index);
    app.get('/capturas', require('connect-ensure-login').ensureLoggedIn(), principal.capturas);
    app.get('/ranking', require('connect-ensure-login').ensureLoggedIn(), principal.ranking);
    app.get('/sobre', require('connect-ensure-login').ensureLoggedIn(), principal.sobre);
    app.get('/encontrarEquipe', require('connect-ensure-login').ensureLoggedIn(), principal.encontrar);  
    app.get('/DevCode/:id', require('connect-ensure-login').ensureLoggedIn(), principal.devcode); 
    app.get('/vis/:id', require('connect-ensure-login').ensureLoggedIn(), principal.vis); 

    app.get('/submitLocal/thebatman456macacodouradohashdeouro', principal.enviaLocal);

    app.post('/entrarEquipe', principal.entrarEquipe);
    app.post('/pontuar', principal.pontuar);
    
    
};