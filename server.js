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

app.get('/beers', function (req, res) {
  Beer.find({}, function (err, beers) {
    // res.send(beers);
    if (error) {
      return next(error);
    } else {
      return res.send(beers);
    }
  });
});

app.post('/beers', function (req, res, next) {
  // let beer = new Beer(req.body);
  // beer.save();
  // console.log(beer);
  Beer.create(req.body);
  res.send(req.body);
});

app.delete('/beers/:postid', function (req, res) {
  let postid = req.params.postid;
  Beer.findByIdAndRemove(postid, function (err, post) {
    // if (err) return console.log(err);
    // res.send(post);
    if (err) {
      return next(err);
    } else {
      res.send(beer);
    }
  });
});

// app.post('/beers/:id/ratings', function (req, res, next) {
//   //code a suitable update object 
//   //using req.body to retrieve the new rating
//   // var updateObject = req.body; 
//   let id = req.params.id;
//   // rating = req.body.rating;
//   Beer.findOne({_id: id}, function (err, beer) {
//     // console.log(beer + 'dfsjkhkgdjfdgh')
//     if (err) {
//       return next(err);
//     } else {
//       // console.log(req.body.rating);
//       beer.ratings.push(Number(req.body.rating));
//       beer.save();
//       res.send(beer);
//     }
//   });
// });

app.post('/beers/:id/ratings', function (req, res, next) {
  //code a suitable update object 
  //using req.body to retrieve the new rating
  let id = req.params.id;
  var updateObject = { $push: { ratings: req.body.rating } };

  Beer.findByIdAndUpdate(id, updateObject, { new: true }, function (err, beer) {
    if (err) {
      return next(err);
    } else {
      // console.log(beer.ratings[0]);
      res.send(beer);
    }
  });
});

app.put('/beers/:beerId/update', function (req, res) {
  let beerId = req.params.beerId,
  param = req.body.param,
  val = req.body.val;
  var updateObject = {};
  updateObject[param] = val;
  // console.log(updateObject + 'here');

  Beer.findByIdAndUpdate(beerId, updateObject, { new: true }, function (err, beer) {
    if (err) {
      // console.log(updateObject + 'here');
      return next(err);
    } else {
      // console.log(beer.ratings[0]);
      // console.log(updateObject + 'here');
      res.send(beer);
    }
  });
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


app.listen(8000, function () {
  console.log("yo yo yo, on 8000!!");
});
