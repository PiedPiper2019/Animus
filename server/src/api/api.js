const express = require('express');
const server = express();
const userController = require('./controllers/user.controller')


server.get("/", (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

server.get("/json", (req, res) => {
    res.json({ message: "Hello world" });
});

server.get("/userInfo/:userId", userController.getUser)

server.use((req, res) => {
    const error = new Error("Invalid route");
    next(error);
});

server.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    next();
})

module.exports = server