const chai = require("chai");
const chaiHttp = require('chai-http');
const { puzzlesAndSolutions } = require('../controllers/puzzle-strings.js')
const { invalidPuzzles } = require('../controllers/invalid-puzzles.js')
const assert = chai.assert;
const server = process.env.LIVE_URL || require('../app');


chai.use(chaiHttp);

suite('Functional Tests', function() {
  this.timeout(5000)

  suite('Testing the /api/solve endpoint', () => {

    test('Solve a puzzle with valid puzzle string: POST request to /api/solve', (done) => {
      chai.request(server)
        .post('/api/solve')
        .type('json')
        .send({ puzzle: puzzlesAndSolutions[0][0] })
        .end( (err, res) => {
          assert.equal(res.status, 200, 'return status should be 200')
          assert.isObject(res.body, 'returned object should be of type object')
          assert.property(res.body, 'solution', 'returned object should contain a solution property')
          assert.isString(res.body.solution, 'returned solution property should be of type string')
          assert.equal(res.body.solution, puzzlesAndSolutions[0][1], 'returned solution should be the same as the known, valid solution')
          done()
        })
    })

    test('Solve a puzzle with missing puzzle string: POST request to /api/solve', (done) => {
      chai.request(server)
        .post('/api/solve')
        .type('json')
        .send({ fakeproperty: 'something' })
        .end( (err, res) => {
          assert.equal(res.status, 200, 'return status should be 200')
          assert.isObject(res.body, 'returned object should be of type object')
          assert.property(res.body, 'error', 'returned object should contain an error property')
          assert.isString(res.body.error, 'returned error property should be of type string')
          assert.equal(res.body.error, 'Required field missing', 'returned error should contain a helpful message')
          done()
        })
    })

    test('Solve a puzzle with invalid characters: POST request to /api/solve', (done) => {
      chai.request(server)
        .post('/api/solve')
        .type('json')
        .send({ puzzle: invalidPuzzles[0] })
        .end( (err, res) => {
          assert.equal(res.status, 200, 'return status should be 200')
          assert.isObject(res.body, 'returned object should be of type object')
          assert.property(res.body, 'error', 'returned object should contain an error property')
          assert.isString(res.body.error, 'returned error property should be of type string')
          assert.equal(res.body.error, 'Invalid characters in puzzle', 'returned error should contain a helpful message')
          done()
        })
    })

    test('Solve a puzzle with incorrect length: POST request to /api/solve', (done) => {
      chai.request(server)
        .post('/api/solve')
        .type('json')
        .send({ puzzle: invalidPuzzles[1] }) // puzzle too long
        .end( (err, res) => {
          assert.equal(res.status, 200, 'return status should be 200')
          assert.isObject(res.body, 'returned object should be of type object')
          assert.property(res.body, 'error', 'returned object should contain an error property')
          assert.isString(res.body.error, 'returned error property should be of type string')
          assert.equal(res.body.error, 'Expected puzzle to be 81 characters long', 'returned error should contain a helpful message')
          chai.request(server)
            .post('/api/solve')
            .type('json')
            .send({ puzzle: invalidPuzzles[2] }) // puzzle too short
            .end( (err, res) => {
              assert.equal(res.status, 200, 'return status should be 200')
              assert.isObject(res.body, 'returned object should be of type object')
              assert.property(res.body, 'error', 'returned object should contain an error property')
              assert.isString(res.body.error, 'returned error property should be of type string')
              assert.equal(res.body.error, 'Expected puzzle to be 81 characters long', 'returned error should contain a helpful message')
              done()
            })
        })
    })

    test('Solve a puzzle that cannot be solved: POST request to /api/solve', (done) => {
      chai.request(server)
        .post('/api/solve')
        .type('json')
        .send({ puzzle: invalidPuzzles[3] })
        .end( (err, res) => {
          assert.equal(res.status, 200, 'return status should be 200')
          assert.isObject(res.body, 'returned object should be of type object')
          assert.property(res.body, 'error', 'returned object should contain an error property')
          assert.isString(res.body.error, 'returned error property should be of type string')
          assert.equal(res.body.error, 'Puzzle cannot be solved', 'returned error should contain a helpful message')
          done()
        })
    })

  })


  suite('Testing the /api/check endpoint', () => {

    // Check a puzzle placement with all fields: POST request to /api/check
    // Check a puzzle placement with single placement conflict: POST request to /api/check
    // Check a puzzle placement with multiple placement conflicts: POST request to /api/check
    // Check a puzzle placement with all placement conflicts: POST request to /api/check
    // Check a puzzle placement with missing required fields: POST request to /api/check
    // Check a puzzle placement with invalid characters: POST request to /api/check
    // Check a puzzle placement with incorrect length: POST request to /api/check
    // Check a puzzle placement with invalid placement coordinate: POST request to /api/check
    // Check a puzzle placement with invalid placement value: POST request to /api/check

  })

});
