var express = require('express');
var app = express();
var bodyParser = require('body-parser');

var films = [
  {
    id: 1,
    title: 'Reservior Dogs',
    descr: 'Good movie and great author of the movie it is just some text',
    rating: '5',
    released: '1999'
  },
  {
    id: 2,
    title: 'Pirates of the Caribean',
    descr: 'Nice movie and great author of the movie it is just some text',
    rating: '4',
    released: '2004'
  }
];

var currentId = 2;

var PORT = process.env.PORT || 3000;

app.use(express.static(__dirname));
app.use(bodyParser.json());

app.get('/films', function(req, res) {
  res.send({films: films});
});

app.post('/films',function(req, res) {
  var filmTitle = req.body.title;
  var filmDecsr = req.body.descr;
  var filmRate = req.body.rating;
  var filmRelease = req.body.released;
  currentId++;

  films.push({
    id: currentId,
    title: filmTitle,
    descr: filmDecsr,
    rating: filmRate,
    released: filmRelease

  });
  res.send('Successfully created film!');
});

app.put('/films/:id', function(req, res) {
  var id = req.params.id;
  var newTitle = req.body.newTitle;
  var newDesc = req.body.newDesc;
  var newRating = req.body.newRating;
  var newRelease = req.body.newRelease;

  var found = false;

  films.forEach(function(film, index) {
    if (!found && film.id === Number(id)) {
      film.title = newTitle;
      film.descr = newDesc;
      film.rating = Number(newRating);
      film.released = Number(newRelease);
    }
  });
  res.send("Successfully updated product!");
});

app.delete('/films/:id', function(req, res) {
  var id = req.params.id;

  var found = false;

  films.forEach(function(film, index){
    if (!found && film.id === Number(id)){
      films.splice(index, 1);

    }
  });
  res.send('Successfully deleted film!');
});

app.listen(PORT, function() {
  console.log('Server listeninf on ' + PORT);
});
