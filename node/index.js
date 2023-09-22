// const dbConnect = require('./connection/dbConnection');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const Router = require('./Router');
const helmet = require('helmet');

app.use(cors());
// app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(helmet());


app.use('/', Router);






app.listen(5000, () => {
    console.log(`Node Index js running on port 5000`)
});