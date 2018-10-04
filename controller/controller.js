console.log("controller require in server");
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({extended:false});
var MongoClient = require('mongodb').MongoClient;
var url = 'mongodb://localhost:27017/mydb';
module.exports = (function(app){
  app.get('/', function(req,res){
    res.render('home');
  });
  app.get('/register',function(req,res){
    res.render('register');
  });
  app.get('/login',function(req,res){
    res.render('login');
  });
// Login TO DB==================================================================
  app.post('/demo',urlencodedParser,function(req,res){
       var request=req;
    console.log("name:",request.body.name);
    console.log("pass:",request.body.pass);
   MongoClient.connect(url,{useNewUrlParser : true}, function(err, db) {
    var dbo = db.db("local");
   dbo.collection('userprofile').findOne({ name: req.body.name,pass:req.body.pass}, function(err, user) {
           console.log(user);
             

             if  (user.name === req.body.name && user.pass === req.body.pass){
            res.render('completeprofile',{profileData:user});
          }
    
        

   });
 });
});

// //register to DB================================================================
app.post('/regiterToDb',urlencodedParser,function(req,res){
      
 var obj = JSON.stringify(req.body);
 var jsonObj = JSON.parse(obj);
     res.render('profile',{loginData:req.body});
  });


//register profile to MongoDB================================================================
  app.post('/completeprofile',urlencodedParser,function(req,res){
   var obj = JSON.stringify(req.body);
   console.log("Final reg Data : "+obj);
   var jsonObj = JSON.parse(obj);
      MongoClient.connect(url,{useNewUrlParser : true}, function(err, db) {
        var dbo = db.db("local");
      dbo.collection("userprofile").insertOne(jsonObj, function(err, res) {
     if (err) throw err;
     console.log("1 document inserted");
     db.close();
      });
       res.render('completeprofile',{profileData:req.body});
      });
    });
});