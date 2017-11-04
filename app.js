var express = require('express');
var todoController = require('./controllers/todoController');
var todoApiController = require('./controllers/todoApiController');
var app = express();

//set up template engine

app.set('view engine', 'ejs');
// static files
app.use(express.static('./public'));

// fire the controller

todoController(app);
todoApiController(app);


//listen to port
app.listen(process.env.PORT || 5000);
console.log('listening in 3000 PORT');
