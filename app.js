var express = require('express');
var app = express();
var http = require('http');


app.use(express.static('html')); //to render html

app.get('/', function(request, response) {
    sendtoPage(request, response, '/');
});


var sendtoPage = function(request, response, pagename){
	var options = {
        root: 'html/'
    };

var pageTofile = {'/':'default.html','/home':'default.html', '/about':'about.html', '/contact':'contact.html'};

response.sendFile(pageTofile[pagename], options, function(err) { //http://expressjs.com/api.html#res.sendFile
        if (err) {
            console.log(err);
            response.status(err.status).end();
        } else {
            console.log('Sent:');
        }
    });

}

app.get('/home', function(request, response) {
sendtoPage(request, response, '/home');
});

app.get('/about', function(request, response) {
sendtoPage(request, response, '/about');
});

app.get('/contact', function(request, response){
sendtoPage(request, response, '/contact');
});




app.listen(3000, function() {
    console.log("listening on port 3000");
});
module.exports = app;
