require('dotenv').config();
const express = require('express');
const connectBD = require('./databese/userDatabase');



// start server

const app = express();
connectBD();

const port = process.env.PORT || 3000;

app.get('/', (req, res) => res.send('Hello World!'));

app.listen(port, () => console.log(`Server is running http://localhost: ${ port }`));









