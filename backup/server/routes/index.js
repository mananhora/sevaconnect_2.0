var express = require('express');
var router = express.Router();
var path = require('path');
var pg = require('pg');
var connectionString = require(path.join(__dirname, '../', '../', 'config'));


router.get('/', function(req, res, next) {
  res.sendFile(path.join(__dirname, '../', '../', 'client', 'views', 'index.html'));
});


router.post('/nonprofits', function(req, res) {

    var results = [];

    // Grab data from http request
    var data = {text: req.body.text, complete: false};

    // Get a Postgres client from the connection pool
    pg.connect(connectionString, function(err, client, done) {

        // SQL Query > Insert Data
        client.query("INSERT INTO items(text, complete) values($1, $2)", [data.text, data.complete]);

        // SQL Query > Select Data
        var query = client.query("SELECT * FROM NonProfitsList ORDER BY id ASC");
        // Stream results back one row at a time
        query.on('row', function(row) {
            results.push(row);
        });

        // After all data is returned, close connection and return results
        query.on('end', function() {
            client.end();
            return res.json(results);
        });

        // Handle Errors
        if(err) {
          console.log(err);
        }

    });
});


//router to get list of all nonprofits
router.get('/nonprofits', function(req, res) {
    var results = [];

    // Get a Postgres client from the connection pool
    pg.connect(connectionString, function(err, client, done) {

        // SQL Query > Select Data
        var query = client.query("SELECT * FROM NonProfitsList ORDER BY id ASC;");

        // Stream results back one row at a time
        query.on('row', function(row) {

            for(var i = 0; i<results.length;i=i+1){
                //console.log(results[i].ngoname);
            }
            //console.log(results);
            results.push(row);
        });

        // After all data is returned, close connection and return results
        query.on('end', function() {
            client.end();
            return res.json(results);
        });

        // Handle Errors
        if(err) {
          console.log(err);
        }

    });

});



router.post('/nonprofitsbycause', function(req, res) {
    var results = [];
    var cause = req.body.text;
    
    console.log("CAUSE  "+cause);

    // Get a Postgres client from the connection pool
    pg.connect(connectionString, function(err, client, done) {

        // SQL Query > Select Data
        var query = client.query(" SELECT * FROM NonProfitsList where cause='"+cause+"';");
        console.log("query executed");
        // Stream results back one row at a time
        query.on('row', function(row) {
            console.log("sending results");

            for(var i = 0; i<results.length;i=i+1){
                console.log(results[i].ngoname);
            }
            console.log(results);
            results.push(row);
        });

        // After all data is returned, close connection and return results
        query.on('end', function() {
            console.log("ending connection");
            client.end();
            return res.json(results);
        });

        // Handle Errors
        if(err) {
            console.log("error");
          console.log(err);
        }

    });

});

router.post('/nonprofitsbylocation', function(req, res) {
    var results = [];

    var location = req.body.location;
    // Get a Postgres client from the connection pool
    pg.connect(connectionString, function(err, client, done) {

        // SQL Query > Select Data
        var query = client.query(" SELECT * FROM NonProfitsList where location='"+location+"';");
        // Stream results back one row at a time
        query.on('row', function(row) {
            console.log(results);
            results.push(row);
        });

        // After all data is returned, close connection and return results
        query.on('end', function() {
            console.log("ending connection");
            client.end();
            return res.json(results);
        });

        // Handle Errors
        if(err) {
            console.log("error");
          console.log(err);
        }

    });

});



router.put('/nonprofits/:todo_id', function(req, res) {

    var results = [];

    // Grab data from the URL parameters
    var id = req.params.todo_id;

    // Grab data from http request
    var data = {text: req.body.text, complete: req.body.complete};

    // Get a Postgres client from the connection pool
    pg.connect(connectionString, function(err, client, done) {

        // SQL Query > Update Data
        client.query("UPDATE items SET text=($1), complete=($2) WHERE id=($3)", [data.text, data.complete, id]);

        // SQL Query > Select Data
        var query = client.query("SELECT * FROM items ORDER BY id ASC");

        // Stream results back one row at a time
        query.on('row', function(row) {
            results.push(row);
        });

        // After all data is returned, close connection and return results
        query.on('end', function() {
            client.end();
            return res.json(results);
        });

        // Handle Errors
        if(err) {
          console.log(err);
        }

    });

});

router.delete('/nonprofits/:todo_id', function(req, res) {

    var results = [];

    // Grab data from the URL parameters
    var id = req.params.todo_id;


    // Get a Postgres client from the connection pool
    pg.connect(connectionString, function(err, client, done) {

        // SQL Query > Delete Data
        client.query("DELETE FROM items WHERE id=($1)", [id]);

        // SQL Query > Select Data
        var query = client.query("SELECT * FROM NonProfitsList ORDER BY id ASC");

        // Stream results back one row at a time
        query.on('row', function(row) {
            var ngo = JSON.parse(results);
            for(var i = 0; i<ngo.length; i++){
                console.log(ngo[i].ngoname);
                console.log("hello");
            }
            results.push(row);
        });

        // After all data is returned, close connection and return results
        query.on('end', function() {
            client.end();
            return res.json(results);
        });

        // Handle Errors
        if(err) {
          console.log(err);
        }

    });

});


module.exports = router;
