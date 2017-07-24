const http = require('http');

const hostname = '127.0.0.1';
const port = 3000;
var API_KEY = process.env.FOOD_API_KEY;

const server = http.createServer((req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    // console.log(req.url);
    var qparams = req.url.split('?');
    var search_term = qparams[1];
    if (search_term) {
        search(search_term, res);
    };
    // get is a simple wrapper for request()
    // which sets the http method to GET
});

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});

// url for bananas


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
            res.end(buffer);
        });

    });
    return buffer

};
