const { connection } = require("./database/connection");
const express = require('express');
const cors = require('cors');

//Initialize apps
console.log('Initialized node app');

//Connect to database
connection();

//Create Node server
const app = express();
const port = 3900;

//Configurate cors
app.use(cors());

//Convert body to js object
app.use(express.json());

//Create routes
app.get('/testing', (req, res) => {
    console.log('se ha ejecutado');
    return res.status(200).json([{
        course: 'Api rest node',
        autor: 'Juan Manuel Ramirez',
        url: 'juanmanuel.com'
    },
    {
        course: 'Api rest node',
        autor: 'Juan Manuel Ramirez',
        url: 'juanmanuel.com'
    }]);
});

app.get('/', (req, res) => {
    return res.status(200).send(
        `<h1>Starting to create a rest api with node.</h1>`
    )
});

//Create server and listen http requests
app.listen(port, () => {
    console.log(`Serve running in port ${port}`);
});