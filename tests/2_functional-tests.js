const chai = require("chai");
const chaiHttp = require('chai-http');
const assert = chai.assert;
const server = process.env.LIVE_URL || require('../app');

chai.use(chaiHttp);

suite('Functional Tests', function() {
  // this.timeout(5000)
  //
  // // /api/solve endpoint
  // test('Solve a puzzle with valid puzzle string: POST request to /api/solve', () => {
  //   chai.request(server)
  //     .post('/api/solve')
  //     .type('json')
  //     .send({ puzzle: 'something' })
  //     .end( (err, res) => {
  //       assert.equal(true, false)
  //       done()
  //     })
  // })
  //
  // test('Solve a puzzle with missing puzzle string: POST request to /api/solve', () => {
  //   chai.request(server)
  //     .post('/api/solve')
  //     .type('json')
  //     .send({ puzzle: 'something' })
  //     .end( (err, res) => {
  //       assert.equal(true, false)
  //       done()
  //     })
  // })
  //
  // test('Solve a puzzle with invalid characters: POST request to /api/solve', () => {
  //   chai.request(server)
  //     .post('/api/solve')
  //     .type('json')
  //     .send({ puzzle: 'something' })
  //     .end( (err, res) => {
  //       assert.equal(true, false)
  //       done()
  //     })
  // })
  //
  // test('Solve a puzzle with incorrect length: POST request to /api/solve', () => {
  //   chai.request(server)
  //     .post('/api/solve')
  //     .type('json')
  //     .send({ puzzle: 'something' })
  //     .end( (err, res) => {
  //       assert.equal(true, false)
  //       done()
  //     })
  // })
  //
  // test('Solve a puzzle that cannot be solved: POST request to /api/solve', () => {
  //   chai.request(server)
  //     .post('/api/solve')
  //     .type('json')
  //     .send({ puzzle: 'something' })
  //     .end( (err, res) => {
  //       assert.equal(true, false)
  //       done()
  //     })
  // })


  // /api/check endpoint
  // Check a puzzle placement with all fields: POST request to /api/check
  // Check a puzzle placement with single placement conflict: POST request to /api/check
  // Check a puzzle placement with multiple placement conflicts: POST request to /api/check
  // Check a puzzle placement with all placement conflicts: POST request to /api/check
  // Check a puzzle placement with missing required fields: POST request to /api/check
  // Check a puzzle placement with invalid characters: POST request to /api/check
  // Check a puzzle placement with incorrect length: POST request to /api/check
  // Check a puzzle placement with invalid placement coordinate: POST request to /api/check
  // Check a puzzle placement with invalid placement value: POST request to /api/check
});
