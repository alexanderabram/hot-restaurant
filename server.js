var express = require("express");
var path = require("path");

var app = express();
var PORT = 3000;

app.use(express.urlencoded({extended:true}));
app.use(express.json());

const tables = [];
const waitlist = [];

//routes

app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "index.html"));
});
app.get("/tables", function(req, res) {
    res.sendFile(path.join(__dirname, "/tables.html"));
});
app.get("/reservations", function(req, res) {
    res.sendFile(path.join(__dirname, "/reservations.html"));
});
app.get("/api/tables", function(req, res) {
    var result = {
        "data": tables
    };
    res.json(result);
});
app.get("/api/waitlist", function(req, res) {
    var result = {
        "data": waitlist
    };
    res.json(result);
});
app.post("/reservations", function(req, res) {
    var reservation = req.body;
    console.log("reservation", reservation);
    if (tables.length < 5) {
        tables.push(reservation);
    }
    else {
        waitlist.push(reservation);
    }
    console.log("tables", tables);
    console.log("waitlist", waitlist);
    res.json(tables);
});

//Starts the server
app.listen(PORT, function() {
    console.log("app listening on PORT " + PORT);
});