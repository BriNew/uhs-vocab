const chai = require('chai');
const chaiHttp = require('chai-http');

const {app, runServer, closeServer} = require('../server');

const should = chai.should();

chai.use(chaiHttp);

describe('GET endpoint', function() {
  	before(function() {
    	return runServer();
  	});

  	after(function() {
    	return closeServer();
  	});
	it('should list terms on GET', function() {
	return chai.request(app)
		.get('/terms')
		.then(function(res) {
			res.should.have.status(200);
			res.should.be.json;
			res.should.be.a('object');
			res.body.terms.should.have.length.of.at.least(1);
			const expectedKeys = ['id', 'year', 'english', 'lao'];
			'terms'.should.include.keys(expectedKeys);
			// const expectedKeys = ['year', 'english', 'lao'];
			// res.body.forEach(function(terms) {
			// 	terms.should.be.a('object');
			// 	terms.should.include.keys(expectedKeys);
			// });
		});
	});
});

describe('POST endpoint', function() {
	before(function() {
    	return runServer();
  	});

  	after(function() {
    	return closeServer();
  	});
	it('should add term on POST', function() {
	const newTerm = {year: "1", type: "root", english: "cardio", lao: "ພາສາ ລາວ" };
	return chai.request(app)
		.post('/terms')
		.send(newTerm)
		.then(function(res) {
			res.should.have.status(201);
			res.should.be.json;
			res.should.be.a('object');
			res.body.should.include.keys('year', 'type', 'english', 'lao');
			// res.body.id.should.not.be.null;
			res.body.year.should.equal(newTerm.year);
			res.body.type.should.equal(newTerm.type);
			res.body.english.should.equal(newTerm.english);
			res.body.lao.should.equal(newTerm.lao);
			// res.body.should.deep.equal(Object.assign(newTerm, {id: res.body.id}));
		});
	});
});

describe('PUT endpoint', function() {
	before(function() {
    	return runServer();
  	});

  	after(function() {
    	return closeServer();
  	});
	it('should update term on PUT'), function() {
		const updateTerm = {year: "3", type: "root", english: "cardi/o", lao: "ພາສາ ລາວ" };
		return chai.request(app)
			.get('/terms')
			.then(function(res) {
				updateTerm.year = res.body[0].id;//array?
				return chai.request(app)
					.put(`/terms/${updateTerm.year}`)
 					.send(updateTerm)
			})
			.then(function(res) {
				res.should.have.status(204);
			});
	};
});

describe('DELETE endpoint', function() {
	before(function() {
    	return runServer();
  	});

  	after(function() {
    	return closeServer();
  	});
	it('should delete terms on DELETE', function() {
		return chai.request(app)
			.get('/terms')
			.then(function(res) {
				return chai.request(res) 
					.delete(`/terms/${res.body[0].id}`);
			})
			.then(function(res) {
				res.should.have.status(204);
			});
	});
});


// db.terms.insert([
// 	{ year : "3", type : "root", english : "abdomin/o", lao : "ພາສາ ລາວ" },
// 	{ year : "3", type : "root", english : "bio", lao : "ພາສາ ລາວ" },
// 	{ year : "3", type : "root", english : "aden/o", lao : "ພາສາ ລາວ" },
// 	{ year : "3", type : "root", english : "anter/o", lao : "ພາສາ ລາວ" }
// ])

