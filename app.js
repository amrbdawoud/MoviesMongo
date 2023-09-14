require("dotenv").config();
const express = require("express");
const morgan = require('morgan');
const fs = require('fs');
const path = require('path');
const app = express();
const mongoose = require("mongoose");
const PORT = process.env.PORT || 3001;
const moviesRouter = require('./routes/movies');

app.use(express.urlencoded({extended: true}));
app.use(express.json());

// Create a log stream to write log data to a text file

const logStream = fs.createWriteStream(path.join(__dirname, 'logs.txt'), {
  flags: 'a'
});

// Use the morgan middleware to log requests to the stream
app.use(morgan('combined', { stream: logStream }));

console.log(process.env.CONNECTION_STRING);
mongoose
  .connect(process.env.CONNECTION_STRING, {})
  .then(() => {
    console.log("Connected to MongoDB" + process.env.CONNECTION_STRING);
  })
  .catch((e) => {
    console.log(e);
  });

app.use('/movies', moviesRouter);


app.listen(PORT, () => {
  console.log("⚙ 🚀 Server is running on port 3001");
});
