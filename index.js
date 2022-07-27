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

//Create server and listen http requests
app.listen(port, () => {
    console.log(`Serve running in port ${port}`);
});