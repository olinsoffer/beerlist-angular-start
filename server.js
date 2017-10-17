var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/beers', function () {
  console.log("BEERSDB connection established!!!");
});

var Beer = require('./models/beerModel.js');

var app = express();

app.use(express.static('public'));
app.use(express.static('node_modules'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/beers', function (req, res, next) {
  Beer.find({}, handler(res, next));
});

app.post('/beers', function (req, res, next) {
  Beer.create(req.body, handler(res, next));
});

app.delete('/beers/:postid', function (req, res, next) {
  let postid = req.params.postid;
  Beer.findByIdAndRemove(postid, handler(res, next));
});

app.post('/beers/:id/ratings', function (req, res, next) {
  let id = req.params.id;
  var updateObject = { $push: { ratings: req.body.rating } };

  Beer.findByIdAndUpdate(id, updateObject, { new: true }, handler(res, next));
});

app.put('/beers/:beerId/update', function (req, res, next) {
  let beerId = req.params.beerId,
  param = req.body.param,
  val = req.body.val;
  var updateObject = {};
  updateObject[param] = val;

  Beer.findByIdAndUpdate(beerId, updateObject, { new: true }, handler(res, next));
});

// error handler to catch 404 and forward to main error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// main error handler
// warning - not for use in production code!
app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.send({
    message: err.message,
    error: err
  });
});

function handler(res, next) {
  return function(err, beer) {
    if (err) {
      return next(err);
    }
    res.send(beer);
  };
}

app.listen(8000, function () {
  console.log("yo yo yo, on 8000!!");
});
