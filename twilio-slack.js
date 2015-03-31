
var http = require('http');
var request = require('request-json');
var client = request.createClient('https://hooks.slack.com/');
var express = require('express');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var app = express();

app.use(morgan('combined'))

app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', function(req, res) {
  res.writeHead(301, {'Location': 'https://github.com/iameli/twilio-slack' });
  res.end();
});

app.post('*', function(req, res){
  var body = req.body;
  var url = 'services' + req.url;
  var payload = {
    username: body.From,
    text: body.Body,
  };
  client.post(url, payload, function(err, res2, body) {
    res.writeHead(200, {"Content-Type": "application/xml"});
    res.end('<Response></Response>');
  });
});

var port = process.env.PORT || 3030;

app.listen(port);

console.log("Listening on port " + port + ".");
