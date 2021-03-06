const express = require('express');
const bodyParser = require('body-parser');

// create express app
const app = express();

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// parse requests of content-type - application/json
app.use(bodyParser.json())

// Configuring the database
// const dbConfig = require('./config/development.config.js');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

// Connecting to the database
mongoose.connect(
    'mongodb://12345:12345@nodeblog-shard-00-00.qd4rh.mongodb.net:27017,nodeblog-shard-00-01.qd4rh.mongodb.net:27017,nodeblog-shard-00-02.qd4rh.mongodb.net:27017/12345?ssl=true&replicaSet=atlas-mhnv1h-shard-0&authSource=admin&retryWrites=true&w=majority',
    {
      useNewUrlParser: true,
      useUnifiedTopology: true
    }
  ).then(()=>{
      console.log("Successfully Connected to mongodb")
  }).catch((err)=>{
console.log("Could not connect to the database. Exiting now ...", err);
process.exit();
  });

// define a simple route
app.get('/', (req, res) => {
    res.json({"message": "Welcome to ExpressMongoApp application. Created by IT Jugadu"});
});

require('./app/routes/post.routes.js')(app);

// listen for requests
app.listen(3000, () => {
    console.log("Server is listening on port 3000");
});
