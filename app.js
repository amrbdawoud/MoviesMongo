require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const PORT = process.env.PORT || 3001;
const moviesRouter = require('./routes/movies');

app.use(express.urlencoded({extended: true}));
app.use(express.json());

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
