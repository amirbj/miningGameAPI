
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes/wines');

var app = module.exports = express.createServer();

// Configuration

app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function(){
  app.use(express.errorHandler());
});

// Routes

app.get('/', routes.findAll);
app.get('/user/:id', routes.findById);
app.post('/users', routes.addUser);
app.put('/users/:id', routes.updateUser);
app.delete('/users/:id', routes.deleteUser);

app.listen(3000, function(){
  console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
});


