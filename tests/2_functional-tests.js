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

    test('Check a puzzle placement with all fields: POST request to /api/check', (done) => {
      let puzzleCheck = {
        puzzle: puzzlesAndSolutions[0][0],
        coordinate: 'B2',
        value: 4
      }
      chai.request(server)
        .post('/api/check')
        .type('json')
        .send(puzzleCheck)
        .end( (err, res) => {
          assert.equal(res.status, 200, 'return status should be 200')
          assert.isObject(res.body, 'returned object should be of type object')
          assert.property(res.body, 'valid', 'returned object should contain a valid property')
          assert.isBoolean(res.body.valid, 'the valid property should be a boolean value')
          assert.isTrue(res.body.valid, 'for valid input the valid property should return as true')
          done()
        })
    })

    test('Check a puzzle placement with single placement conflict: POST request to /api/check', (done) => {
      let puzzleCheck = {
        puzzle: puzzlesAndSolutions[1][0],
        coordinate: 'f7',
        value: 3
      }
      chai.request(server)
        .post('/api/check')
        .type('json')
        .send(puzzleCheck)
        .end( (err, res) => {
          assert.equal(res.status, 200, 'return status should be 200')
          assert.isObject(res.body, 'returned object should be of type object')
          assert.property(res.body, 'valid', 'returned object should contain a valid property')
          assert.isBoolean(res.body.valid, 'the valid property should be a boolean value')
          assert.isNotTrue(res.body.valid, 'for input with a conflict the valid property should return as false')
          assert.property(res.body, 'conflict', 'for input with a conflict a conflict property should be present')
          assert.isArray(res.body.conflict, 'for input with a conflict the conflict property should be an array')
          assert.include(res.body.conflict, 'region', 'for a conflict within a coordinate\'s region, that should be noted in the conflict property')
          done()
        })
    })

    test('Check a puzzle placement with multiple placement conflicts: POST request to /api/check', (done) => {
      let puzzleCheck = {
        puzzle: puzzlesAndSolutions[2][0],
        coordinate: 'H4',
        value: 5
      }
      chai.request(server)
        .post('/api/check')
        .type('json')
        .send(puzzleCheck)
        .end( (err, res) => {
          assert.equal(res.status, 200, 'return status should be 200')
          assert.isObject(res.body, 'returned object should be of type object')
          assert.property(res.body, 'valid', 'returned object should contain a valid property')
          assert.isBoolean(res.body.valid, 'the valid property should be a boolean value')
          assert.isNotTrue(res.body.valid, 'for input with a conflict the valid property should return as false')
          assert.property(res.body, 'conflict', 'for input with a conflict a conflict property should be present')
          assert.isArray(res.body.conflict, 'for input with a conflict the conflict property should be an array')
          assert.include(res.body.conflict, 'region', 'for a conflict within a coordinate\'s region, that should be noted in the conflict property')
          assert.include(res.body.conflict, 'column', 'for a conflict within a coordinate\'s region, that should be noted in the conflict property')
          done()
        })
    })

    test('Check a puzzle placement with all placement conflicts: POST request to /api/check', (done) => {
      let puzzleCheck = {
        puzzle: puzzlesAndSolutions[3][0],
        coordinate: 'c7',
        value: 4
      }
      chai.request(server)
        .post('/api/check')
        .type('json')
        .send(puzzleCheck)
        .end( (err, res) => {
          assert.equal(res.status, 200, 'return status should be 200')
          assert.isObject(res.body, 'returned object should be of type object')
          assert.property(res.body, 'valid', 'returned object should contain a valid property')
          assert.isBoolean(res.body.valid, 'the valid property should be a boolean value')
          assert.isNotTrue(res.body.valid, 'for input with a conflict the valid property should return as false')
          assert.property(res.body, 'conflict', 'for input with a conflict a conflict property should be present')
          assert.isArray(res.body.conflict, 'for input with a conflict the conflict property should be an array')
          assert.include(res.body.conflict, 'region', 'for a conflict within a coordinate\'s region, that should be noted in the conflict property')
          assert.include(res.body.conflict, 'column', 'for a conflict within a coordinate\'s column, that should be noted in the conflict property')
          assert.include(res.body.conflict, 'row', 'for a conflict within a coordinate\'s row, that should be noted in the conflict property')
          done()
        })
    })

    test('Check a puzzle placement with missing required fields: POST request to /api/check', (done) => {
      chai.request(server)
        .post('/api/check')
        .type('json')
        .send({ some: 'random', object: 'here' })
        .end( (err, res) => {
          assert.equal(res.status, 200, 'return status should be 200')
          assert.isObject(res.body, 'returned object should be of type object')
          assert.property(res.body, 'error', 'returned object should contain an error property')
          assert.isString(res.body.error, 'the error property should be a string value')
          assert.equal(res.body.error, 'Required field(s) missing')
          done()
        })
    })

    test('Check a puzzle placement with invalid characters: POST request to /api/check', (done) => {
      let puzzleCheck = {
        puzzle: invalidPuzzles[0],
        coordinate: 'C7',
        value: 4
      }
      chai.request(server)
        .post('/api/check')
        .type('json')
        .send(puzzleCheck)
        .end( (err, res) => {
          assert.equal(res.status, 200, 'return status should be 200')
          assert.isObject(res.body, 'returned object should be of type object')
          assert.property(res.body, 'error', 'returned object should contain an error property')
          assert.isString(res.body.error, 'the error property should be a string value')
          assert.equal(res.body.error, 'Invalid characters in puzzle')
          done()
        })
    })

    test('Check a puzzle placement with incorrect length: POST request to /api/check', (done) => {
      let puzzleCheck = {
        puzzle: invalidPuzzles[1], // too long
        coordinate: 'c7',
        value: 4
      }
      let puzzleCheck2 = {
        puzzle: invalidPuzzles[2], // too short
        coordinate: 'C7',
        value: 4
      }
      chai.request(server)
        .post('/api/check')
        .type('json')
        .send(puzzleCheck)
        .end( (err, res) => {
          assert.equal(res.status, 200, 'return status should be 200')
          assert.isObject(res.body, 'returned object should be of type object')
          assert.property(res.body, 'error', 'returned object should contain an error property')
          assert.isString(res.body.error, 'the error property should be a string value')
          assert.equal(res.body.error, 'Expected puzzle to be 81 characters long')
          chai.request(server)
            .post('/api/check')
            .type('json')
            .send(puzzleCheck2)
            .end( (err, res) => {
              assert.equal(res.status, 200, 'return status should be 200')
              assert.isObject(res.body, 'returned object should be of type object')
              assert.property(res.body, 'error', 'returned object should contain an error property')
              assert.isString(res.body.error, 'the error property should be a string value')
              assert.equal(res.body.error, 'Expected puzzle to be 81 characters long')
              done()
            })
        })
    })

    test('Check a puzzle placement with invalid placement coordinate: POST request to /api/check', (done) => {
      let puzzleCheck = {
        puzzle: puzzlesAndSolutions[4][0],
        coordinate: 'd69',
        value: 3
      }
      chai.request(server)
        .post('/api/check')
        .type('json')
        .send(puzzleCheck)
        .end( (err, res) => {
          assert.equal(res.status, 200, 'return status should be 200')
          assert.isObject(res.body, 'returned object should be of type object')
          assert.property(res.body, 'error', 'returned object should contain an error property')
          assert.isString(res.body.error, 'the error property should be a string value')
          assert.equal(res.body.error, 'Invalid coordinate')
          done()
        })
    })

    test('Check a puzzle placement with invalid placement value: POST request to /api/check', (done) => {
      let puzzleCheck = {
        puzzle: puzzlesAndSolutions[4][0],
        coordinate: 'E9',
        value: 23
      }
      chai.request(server)
        .post('/api/check')
        .type('json')
        .send(puzzleCheck)
        .end( (err, res) => {
          assert.equal(res.status, 200, 'return status should be 200')
          assert.isObject(res.body, 'returned object should be of type object')
          assert.property(res.body, 'error', 'returned object should contain an error property')
          assert.isString(res.body.error, 'the error property should be a string value')
          assert.equal(res.body.error, 'Invalid value')
          done()
        })
    })


  })

});
