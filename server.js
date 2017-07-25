var express = require('express');
const http = require('http');
const hostname = '127.0.0.1';
const port = 3000;
var app = express();
var API_KEY = process.env.FOOD_API_KEY;


app.use(express.static('static'));

app.get('/', function (req, res) {
   res.sendFile( __dirname + "/" + "index.html" );
})

app.get('/search', function (req, res) {
    console.log('term: ', req.query.search_term);
    search(req.query.search_term, res);
})

var server = app.listen(port, function () {
   console.log(`Listening at http://${hostname}:${port}`)
   console.log('hostname ', hostname)
})

var search = function (search_term, res) {

    const url_part1 = "http://api.nal.usda.gov/ndb/search/?format=json&q=";
    const url_part2 = "&sort=r&max=25&offset=0&ds=Standard Reference&api_key=";
    const url = url_part1 + search_term + url_part2 + API_KEY;
    var buffer = "",
        data,
        route;

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
};
