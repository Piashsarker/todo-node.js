
 var bodyParser = require('body-parser');
 var mongoose = require('mongoose');


 // Connect to mongoDB Database
 mongoose.Promise = global.Promise ;
 mongoose.connect('mongodb://piashsarker:piash@ds147265.mlab.com:47265/piashsarker_todo_database' , {
   useMongoClient : true
 })

// create a schema - this is like a blueprint

var todoSchema = new mongoose.Schema({
  item : String
});

// Creting model based on schema
var todoModel = mongoose.model('Todo',todoSchema);

/**var itemOne = todoModel({item: 'Connect mongoDb With node.js'}).save(
  function(err){
    if(err) throw err ;
    console.log('item saved in the monogoDb database');
  });
*/




/* var data = [{item:'Lean Node.js' },
{item:'Learn TypeScript' },{item:'Learn ionic' },{item:'Learn Kotlin' }]; */

var urlEncodedParser = bodyParser.urlencoded({extended:false});

module.exports= function(app){

  app.get('/todo',function(req, res){
      // get data from the mongoDb and pass it to the view
      todoModel.find({} , function(err , data){
          if(err) {
            throw err ;
          }else{

              res.render('todo',{todos: data});
          }

      });



  });

  app.post('/todo',urlEncodedParser , function(req, res){
      // Get data from the view and add it to new MongoDB
      var newTodo = todoModel(req.body).save(function(err, data){
         res.json(data);

        console.log("Data saved in mongoDb "+data);
      });


  });

  app.delete('/todo/:item',function(req, res){
      /** Delete item from the mongoDB **/
        console.log(req.params.item);

        todoModel.find({item:req.params.item}).remove(
          function(err , data){
            if(err){
              throw err ;
            }
            else{
              console.log(req.params.item+" Deleted From MonogoDB. "
              +"Now list is "+data);
              res.json(data);

            }
          });
  });





}
