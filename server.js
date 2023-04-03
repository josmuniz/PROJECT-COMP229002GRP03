var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var mongo = require('mongoose');
var sanitize = require('mongo-sanitize');

//mongodb+srv://curvey:curveyrocks@cluster0.zh6u2.mongodb.net/SurveyDatabase?retryWrites=true&w=majority'


var db = mongo.connect('mongodb+srv://JMVCentnial2023:m6Oe5nhD30xOfsXA@cluster0.bppojlu.mongodb.net/surveydb?retryWrites=true&w=majority',{ useUnifiedTopology: true } ,function(err, response){
    if(err){
        console.log(err);
    }else{
        console.log('Connected to database'+ db, ' + ', response);
    }
});
// Start security code
const passport = require('passport');
require('./models/user.model');
require('./models/survey.model');
require('./models/survey_response.model');
require('./controllers/auth.controller');
const permissionController = require('./controllers/permission.controller');
const config = require('./env.config');
const Surfer = config.permissionLevels.Surfer;
const Member = config.permissionLevels.Member;
const Master = config.permissionLevels.Master;


// Load the REST service for users (generated by express generator)
var usersRouter = require('./routes/users');
var surveyRouter = require('./routes/survey');
var surveyResponseRouter = require('./routes/survey_response');
// End security code

var app = express()
//app.use(bodyParser());
app.use(bodyParser.json({limit:'5mb'}));
app.use(bodyParser.urlencoded({extended: true}));

var distDir = __dirname + "/dist/";
app.use(express.static(distDir));



app.use(function(req, res, next){
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});
// Start security code
app.use('/api/users', usersRouter);
app.use('/api/survey', surveyRouter);
app.use('/api/survey_response', surveyResponseRouter);


app.get('*', (request, response) => {
	response.sendFile(path.join(__dirname, "/dist/", 'index.html'));
});


var server = app.listen(process.env.PORT || 3000, function () {
    var port = server.address().port;
    console.log("App now running on port", port);
  });