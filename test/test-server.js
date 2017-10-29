const chai = require('chai');
const chaiHttp = require('chai-http');

const {app, runServer, closeServer} = require('../server');

const should = chai.should();

chai.use(chaiHttp);

describe('tests', function() {
	before(function() {
		return runServer();
  	});

  	after(function() {
		return closeServer();
  	});

	describe('GET endpoint', function() {
		it('should return terms', function() {
			return chai.request(app)
				.get('/terms')
				.then(function(res) {
					res.should.have.status(200);
					res.should.be.json;
					res.should.be.a('object');
					res.body.terms.should.have.length.of.at.least(3);
					res.body.terms.forEach(function(term) {
						term.should.be.a('object');
						term.should.include.keys('id', 'year', 'english', 'lao');
					});
				});
		});
	});

	describe('POST endpoint', function() {
		it('should add term on POST', function() {
		const newTerm = {year: "1", type_select: "root", english: "cardio", lao: "ພາສາ ລາວ" };
		return chai.request(app)
			.post('/terms')
			.send(newTerm)
			.then(function(res) {
				res.should.have.status(201);
				res.should.be.json;
				res.should.be.a('object');
				res.body.should.include.keys('year', 'type_select', 'english', 'lao');
				res.body.year.should.equal(newTerm.year);
				res.body.type_select.should.equal(newTerm.type_select);
				res.body.english.should.equal(newTerm.english);
				res.body.lao.should.equal(newTerm.lao);
			});
		});
	});

	describe('PUT endpoint', function() {

		it('should update term on PUT', function() {

			const newTerm = {year: 1, type_select: "root", english: "cardio", lao: "ພາສາ ລາວ" };
			return chai.request(app)
				.post('/terms')
				.send(newTerm)
				.then(function(res) {
					return chai.request(app)
					.put(`/terms/${res.body.id}`)
					.send({id: res.body.id, year: 3});

				})
				.then(function(res) {
					res.should.have.status(204);
				});


		});
	});

	describe('DELETE endpoint', function() {
		it('should delete terms on DELETE', function() {
			const newTerm = {year: 1, type_select: "root", english: "cardio", lao: "ພາສາ ລາວ" };
			return chai.request(app)
				.post('/terms')
				.send(newTerm)
				.then(function(res) {
					return chai.request(app)
						.delete(`/terms/${res.body.id}`);
				})
				.then(function(res) {
					res.should.have.status(204);
				});
			
		});
	});
});


