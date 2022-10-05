require('dotenv').config();
const http = require('http');
const express = require('express');
const path = require("path");
const { PORT } = require('./config');
const hierarchyRouter = require('./routes/hierarchy');

const app = express();

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use('/hierarchy', hierarchyRouter);

const server = http.createServer(app);
server.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});