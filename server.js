const bodyParser = require('body-parser');
const express = require('express');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const {PORT, DATABASE_URL} = require('./config');
const {Vocab} = require('./models');

const app = express();
app.use(bodyParser.json());
app.use(express.static('public'))

app.get('/', (req, res) => {
	res.sendFile(__dirname+'/public/index.html')
})


app.get('/terms/:id', (req, res) => {//returning all 
	Vocab
		.findById(req.params.id)
		.then(term => res.json(term.apiRepr()))
		.catch(err => {
			console.error(err);
				res.status(500).json({message: 'Internal server error'})
		});
});


app.get('/terms', (req, res) => {
	console.log('page is', req.query.page);
	const pageNumber = req.query.page || 1;
	const filters = {};
	const queryableFields = ['year', 'type_select'];
	queryableFields.forEach(field => {
		if (req.query[field]) {
			filters[field] = req.query[field];
		}
	});
	Vocab
		.paginate(filters, { page: pageNumber, limit: 6}, function(error, result) {
		console.log(result);
		res.json({
				terms: result.docs.map(
					(term) => term.apiRepr())
			});
	})
	// Vocab
	// 	.find(filters)
		// .paginate({}, { page: 3, limit: 10 })
		// .find().limit(10)
		// .then(terms => {
		// 	res.json({
		// 		terms: terms.map(
		// 			(term) => term.apiRepr())
		// 	});
		// })
		// .find(filters)
		// .then(terms => res.json( 
		// 	terms.map(term => term.apiRepr())
		// ))
		// .catch(err => {
		// 	console.log(err);
		// 	res.status(500).json({message: 'Internal server error'})
		// });
});

app.post('/terms', (req, res) => {
	const authorizationKey = "someString";
	console.log(req.body);
	const requiredFields = ['year', 'english', 'lao', 'secret'];
	for (let i=0; i<requiredFields.length; i++) {
		const field = requiredFields[i];
		if (!(field in req.body)) {
			const message = `Missing \`${field}\` in request body`
			console.error(message);
			return res.status(400).send(message);
		}
	}
	if (req.body.secret !== authorizationKey) {
		return res.status(401).send('The provided secret is not correct');
	}

	Vocab
		.create({
			year: req.body.year,
			type_select: req.body.type_select,
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
	if (req.params.id !== req.body.id) {
		const message = (
			`Request path id (${req.params.id}) and request body id ` +
      		`(${req.body.id}) must match`);
		console.error(message);
		return res.status(400).json({message: message});
	}
	const updated = {};
	const updateableFields = ['year', 'type_select', 'english', 'lao'];

	updateableFields.forEach(field => {
		if (field in req.body) {
			updated[field] = req.body[field];
		}
	});
	Vocab
		.findByIdAndUpdate(req.params.id, {$set: updated})
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


