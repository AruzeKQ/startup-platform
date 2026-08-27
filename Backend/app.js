require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');

const app = express();

//users router

//projects router

//tasks router

//chat router

//documents router

//reviews router



//connect to mongodb local 
mongoose.connect(process.env.DB_URL)
    .then(() => console.log('connected to mongodb'))
    .catch(err => console.log('error when connecting to mongodb', err));


app.use(express.json());

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`listening on port: ${port}`);
});