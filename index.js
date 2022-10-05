const http = require('http');
const express = require('express');
const { airtableToken, PORT } = require('./config');

const app = express();


app.get('/ui', (req, res) => {
    return res.status(200).send(
        'UI'
    );
});

const server = http.createServer(app);

server.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});