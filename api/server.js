const express = require("express");
const server = express();
const gorevRouter = require("./Gorevler/gorev-router");
const taskRouter = require("./Tasklar/task-router");

server.use(express.json());
server.use("/api/gorev", gorevRouter);
server.use("/api/task", taskRouter);

module.exports = server;
