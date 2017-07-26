// SETUP
var express = require('express');
var http = require('http');
var hostname = '127.0.0.1';
var port = 3000;
var app = express();
var API_KEY = process.env.FOOD_API_KEY;
var API_ROOT = "http://api.nal.usda.gov/ndb/";

// ROUTES
app.use(express.static('static'));

app.get('/', function (req, res) {
   res.sendFile( __dirname + "/" + "index.html" );
})

app.get('/search', function (req, res) {
    console.log('term: ', req.query.search_term);
    searchFood(req.query.search_term, res);
})

app.get('/item', function (req, res) {
    console.log('term: ', req.query.ndbno);
    getFood(req.query.ndbno, res);
})

var server = app.listen(port, function () {
   console.log(`Listening at http://${hostname}:${port}`)
   console.log('hostname ', hostname)
})


// FUNCTIONS
var searchFood = function (search_term, res) {
    var url_part1 = "search/?format=json&q=";
    var url_part2 = "&sort=r&max=25&offset=0&ds=Standard Reference&api_key=";
    var url = API_ROOT + url_part1 + search_term + url_part2 + API_KEY;
    chunkResponse(res, url);
};


var getFood = function (ndbno, res) {
    var url_part1 = "reports/?ndbno=";
    var url_part2 = "&type=b&format=json&api_key=";
    var url = API_ROOT + url_part1 + ndbno + url_part2 + API_KEY;
    chunkResponse(res, url);
}


var chunkResponse = function (res, url) {
    var buffer = "",
        data;

    var request = http.get(url, function (response) {
        // data is streamed in chunks from the server
        // so we have to handle the "data" event

        response.on("data", function (chunk) {
            buffer += chunk;
        });

        response.on("end", function (err) {
            // finished transferring data
            // dump the raw data
            data = JSON.parse(buffer);
            res.send(buffer);
        });
    });
}

