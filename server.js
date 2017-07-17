// require express and other modules

//call the packages we need
let express = require('express');
let app = express();
let bodyParser = require('body-parser');
let port = process.env.PORT || 6000;  //set our port
let router = express.Router();

//Set up my own API
let dogBreed = [
  {name: 'Great Dane', size: 'XLarge', weight: '130lbs'},
  {name: 'Pit-bull', size: 'Large', weight: '70lbs'},
  {name: 'Puddle', size: 'small', weight: '25lbs'}
]


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});


//1. Get all API from dogBreed
app.get('/api/dogBreed', function index(req, res) {
  res.json(dogBreed);
})


//2. Get one by name
app.get('/api/dogBreed/:name', function show(req, res){
  let dogName = req.params.name;
  let woof = dogBreed.filter(function (doggy) {
    return doggy.name === dogName;
  })[0];
  res.json(woof);
})


//3. POST one to my API
app.post('/api/dogBreed', function (req, res) {

  let newDogName = req.body.name;
  let newDogSize = req.body.size;
  let newDogWeight = req.body.weight;

  let fullInfo = { 'name': newDogName,
                   'size': newDogSize,
                   'weight': newDogWeight };

  dogBreed.push(fullInfo);

  res.json(dogBreed);
});


//4. PUT one by NAME (change)
app.put('/api/dogBreed/:name', function update(req, res) {

    let findName = req.params.name;
    let updateDogList = dogBreed.filter(function (newName) {
      return newName.name === findName;
})[0];

  updateDogList.name = req.body.name;
  updateDogList.size = req.body.size;
  updateDogList.weight = req.body.weight;

  res.json(updateDogList);
});

//5. DELETE one by name
app.delete('/api/dogBreed/:name', function trash(req, res) {

    let toDelete = req.params.name;
    let dogBreedDelete = dogBreed.filter(function (trashBreed) {
      return trashBreed.name === toDelete;
    })[0];

    dogBreed.splice(dogBreed.indexOf(dogBreedDelete), 1);

  res.json(dogBreedDelete);
})



router.get('/', function(req, res) {
  res.json({message: "Got it working"});
});


app.use('/api', router);

app.listen(port);
console.log('Server running on http://localhost:6000');
