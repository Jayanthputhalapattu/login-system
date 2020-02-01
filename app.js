var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser  = require('body-parser');
var exphbs = require("express-handlebars");
var expressValidator = require("express-validator");
var flash = require("connect-flash");
var session = require("express-session");
var passport = require("passport");
var LocalStrategy = require('passport-local'),strategy;
var app = express();
app.use(express.static('static'))

var routes = require("./routes/index.js");
var users = require("./routes/users.js");

app.set("views",path.join(__dirname+ "views"))
app.engine('handlebars',exphbs({defaultLayout:'layout'}))
app.set('view engine',"handlebars");

//bodyparser

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}))
app.use(cookieParser());

app.use(session({
	secret :"secret",
	saveUninitialized :true,
	resave : true
}))


app.use("/",routes);
app.use("/users",users);

app.listen(3000,function(){
	//console.log("server startedon port 3000")
})
