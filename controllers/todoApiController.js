var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var todoController = require('./todoController');

var urlEncodedParser = bodyParser.urlencoded({extended:false});



module.exports= function(app){

  app.get("/api/todo-list", function(req , res){
      console.log(req.url);
      todoController.todoModel.find({} , function(err , data){
          if(err) {
          throw err ;
          var errorObject = {
            message : "404, Not found",
            status : "404"
          }
          res.writeHead(404,{'Content-Type': 'application/json'});
          res.end(JSON.stringify(errorObject));
          }else{
              res.writeHead(200, {'Content-Type':'application/json'});
              res.end(JSON.stringify(data));
          }

      });
  });

}
