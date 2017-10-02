// dictionary.create('3', 'Bio', 'ພາສາ ລາວ');
// dictionary.create('3', 'Anter/o', 'ພາສາ ລາວ');

// app.use(express.static('public'));

// const dictionaryRouter = require('./router');
// app.use('/dictionary', dictionaryRouter);

// var listener = app.listen(process.env.PORT, function () {
//   console.log('Your app is listening on port ' + listener.address().port);
// });

const bodyParser = require('body-parser');
var express = require('express');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const {PORT, DATABASE_URL} = require('./config');
const {Vocab} = require('./models');

const app = express();
app.use(bodyParser.json());

app.get('/terms', (req, res) => {
	Vocab
		.find()
		.then(terms => {
			res.json({
				terms: terms.map(
					(term) => term.apiRepr())
			});
		})
		.catch(
			err => {
				console.error(err);
				res.status(500).json({message: 'Internal server error'})
			})
});

app.get('/terms/:id', (req, res) => {
	Vocab
		.findById(req.params.id)
		.then(term => res.json(term.apiRepr()))
		.catch(err => {
			console.error(err);
				res.status(500).json({message: 'Internal server error'})
		});
});

app.get('/terms', (req, res) => {
	const filters = {};
	const queryableFields = ['year', 'type'];
	queryableFields.forEach(field => {
		if (req.query[field]) {
			filters[field] = req.query[field];
		}
	});
	Vocab
		.find(filters)
		.then(terms => res.json(
			terms.map(term => term.apiRepr())
		))
		.catch(err => {
			console.log(err);
			res.status(500).json({message: 'Internal server error'})
		});
});

app.post('/terms', (req, res) => {
	const requiredFields = ['year', 'english', 'lao'];
	for (let i=0; i<requiredFields.length; i++) {
		const field = requiredFields[i];
		if (!(field in req.body)) {
			const message = `Missing \`${field}\` in request body`
			console.error(message);
			return res.status(400).send(message);
		}
	}
	Vocab
		.create({
			year: req.body.year,
			type: req.body.year,
			english: req.body.english,
			lao: req.body.lao
		})
		.then(
			term => res.status(201).json(term.apiRepr()))
		.catch(err => {
			console.error(err);
			res.status(500).json({message: 'Internal server error'});
		});
});

app.put('/terms/:id', (req, res) => {
	if (!(req.params.id && req.body.id && req.params.id === req.body.id)) {
		const message = (
			`Request path id (${req.params.id}) and request body id ` +
      		`(${req.body.id}) must match`);
		console.error(message);
		return res.status(400).json({message: message});
	}
	const toUpdate = [];
	const updateableFields = ['year', 'type', 'english', 'lao'];

	updateableFields.forEach(field => {
		if (field in req.body) {
			toUpdate[field] = req.body[field];
		}
	});
	Vocab
		.findByIdAndUpdate(req.params.id, {$set: toUpdate})
		.then(term => res.status(204).end())
		.catch(err => res.status(500).json({message: 'Internal server error'}))
});

app.delete('/terms/:id', (req, res) => {
  Vocab
    .findByIdAndRemove(req.params.id)
    .then(() => res.status(204).end())
    .catch(err => res.status(500).json({message: 'Internal server error'}));
});

app.use('*', function(req, res) {
  res.status(404).json({message: 'Not Found'});
});


let server;

// this function connects to our database, then starts the server
function runServer(databaseUrl=DATABASE_URL, port=PORT) {

  return new Promise((resolve, reject) => {
    mongoose.connect(databaseUrl, err => {
      if (err) {
        return reject(err);
      }
      server = app.listen(port, () => {
        console.log(`Your app is listening on port ${port}`);
        resolve();
      })
      .on('error', err => {
        mongoose.disconnect();
        reject(err);
      });
    });
  });
}

// this function closes the server, and returns a promise. we'll
// use it in our integration tests later.
function closeServer() {
  return mongoose.disconnect().then(() => {
     return new Promise((resolve, reject) => {
       console.log('Closing server');
       server.close(err => {
           if (err) {
               return reject(err);
           }
           resolve();
       });
     });
  });
}

// if server.js is called directly (aka, with `node server.js`), this block
// runs. but we also export the runServer command so other code (for instance, test code) can start the server as needed.
if (require.main === module) {
  runServer().catch(err => console.error(err));
};

// module.exports = {app, runServer, closeServer};
module.exports = {app, runServer, closeServer};
// app.use(express.static('public'));
// app.listen(process.env.PORT || 8080);
