var express = require('express');
var router = express.Router();
var db=require('../database');
var app = express();
app.use(express.urlencoded());
app.set('view engine', 'ejs');
app.use(express.static('public'))
app.use('/css',express.static(__dirname + 'public/css'))

// to display registration form 
router.get('/register', function(req, res, next) {
  res.render('registration-form.ejs');
});


// to store user input detail on post request
router.post('/register', function(req, res, next) {
    
    inputData ={
        Name: req.body.first_name,
        Email: req.body.email_address,
        password: req.body.password,
        confirmpassword:req.body.confirm_password
        
       
       
    }
    
// check unique email address

var sql="SELECT * FROM registration WHERE Email =?";
db.query(sql, [inputData.Email] ,function (err, data, fields) {
 if(err) throw err
 if(data.length>1){
     var msg = inputData.Email+ "was already exist";
 
 }else if(inputData.confirmpassword != inputData.password){
    var msg ="Password & Confirm Password is not Matched";
 }else{
     
    // save users data into database
    var sql = 'INSERT INTO registration SET ?';
    console.log(sql);
   db.query(sql, inputData, function (err, data) {
      if (err) throw err;
           });
  var msg ="Your are successfully registered";
 }
 res.render('registration-form.ejs',{alertMsg:msg});
})
     
});
module.exports = router;

