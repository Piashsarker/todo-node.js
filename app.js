var express = require('express');
var todoController = require('./controllers/todoController');
var app = express();

//set up template engine

app.set('view engine', 'ejs');
// static files
app.use(express.static('./public'));

// fire the controller

todoController(app);


//listen to port
var PORT = 3000 || process.env.PORT ;
app.listen(PORT);
console.log('listening in 3000 PORT');
