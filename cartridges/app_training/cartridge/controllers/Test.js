"use strict";

var server = require("server");

server.get("Show", function(req, res, next) {
    res.json({ hello: "world" });
    next();
});

module.exports = server.exports();
