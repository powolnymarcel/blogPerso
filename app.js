var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var expressValidator = require('express-validator');
var flash = require('connect-flash');
var mongoose = require('mongoose');
var routes = require('./routes/index');
var users = require('./routes/users');
var articles = require('./routes/articles');
var categories = require('./routes/categories');
var gestionnaire = require('./routes/gestionnaire');

var app = express();


	//*******************************On va chercher les catégories pour les afficher dans le footer en permanence
//Trouvé sur http://expressjs.com/api.html#app.locals
	Categorie = require('./modeles/categorie.js');
	Categorie.recupCategories(function(err,categories){
		var variablePorteeTouteAppli = app.locals.categories =categories;
		console.log(variablePorteeTouteAppli);
	});
//*******************************FIN





//connexion à mongoose
mongoose.connect('mongodb://localhost/blogPerso');
var db= mongoose.connection;

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//****************************************************************Middleware pour les session
app.use(session({
	secret: 'keyboard cat',
	resave: false,
	saveUninitialized: true
}))
//**************************************************************************************************************************************
//****************************************************************Middleware pour la validation

// In this example, the formParam value is going to get morphed into form body format useful for printing.
app.use(expressValidator({
	errorFormatter: function(param, msg, value) {
		var namespace = param.split('.')
				, root    = namespace.shift()
				, formParam = root;

		while(namespace.length) {
			formParam += '[' + namespace.shift() + ']';
		}
		return {
			param : formParam,
			msg   : msg,
			value : value
		};
	}
}));
//**************************************************************************************************************************************
//****************************************************************Middleware pour les messages flash
app.use(require('connect-flash')());
app.use(function (req, res, next) {
				// Assignation de require express-messages à la variable globale res.locals.messages  qui sera accessible dans les vues
	res.locals.messages = require('express-messages')(req, res);
	next();
});
//**************************************************************************************************************************************

app.use('/', routes);
app.use('/users', users);
app.use('/articles', articles);
app.use('/categories', categories);
app.use('/gestionnaire', gestionnaire);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
