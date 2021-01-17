const express =  require('express');
const request = require('request');
const bodyParser = require('body-parser');

const http = require('http');
const app =  express();
const port = 8000;
var currMovieId = 0;

app.post('/storeMovieId', (req, res) => {
  const movieId = req.body;
  console.log(movieId);
  // console.log(currMovieId);
  currMovieId = movieId.movieId;
  console.log(currMovieId);
  res.send({status: 200});
  return
})
app.get('/getMovieId', (req, res) => {
  res.send({movieId: currMovieId});
  console.log(currMovieId);
})
app.get('*', (req,res) => res.send('Hello World!'));

app.listen(port);