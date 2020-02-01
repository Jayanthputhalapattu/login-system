var express = require("express");
var app = express();
var MongoClient = require("mongodb")
var url = "mongodb://localhost:27017/"
var session = require("express-session");
var cookieParser = require('cookie-parser');
var bodyParser  = require('body-parser');
app.get("/login",function(req,res){
    

	res.render("login")

})

app.post("/login",function(req,res){

	var roll = req.body.rollno;
	var psswrd = req.body.passw;
	
//	console.log(roll + " " + psswrd)
   MongoClient.connect(url,function(err,db){
   	if (err) throw err;
   	var dbo = db.db("studetails");
   	var myObj = {
   		rollno : roll
   	}
   	dbo.collection("basic").find(myObj).toArray(function(err,result){
   		if (err) throw err;
   		var resl = result;
       //  console.log(resl)
         if (resl.length!=0){
         	if (psswrd == resl[0].password){
          var rollno=  req.session.rollno;
       res.render("afterlog",{
       	flname : resl[0].fullname,
       	rollw : resl[0].rollno,
       	fname : resl[0].Fname,
       	mno : resl[0].Mno
       });
      ;
        
       }
       else {
      // 	console.log("Password does not match")
       	res.render("login",{
       		error: "Error : Password doesnot match"
       	})
       }
    
      

}


else {
	//console.log("rollno doesnt exist")
	res.render("login",{
		error :"Error : Invalid Rollno"
	})
	

}
   	})
   })

     
})


module.exports = app;