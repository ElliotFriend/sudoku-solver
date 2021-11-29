const chai = require('chai');
const assert = chai.assert;

const { puzzlesAndSolutions } = require('../controllers/puzzle-strings.js')
const { invalidPuzzles } = require('../controllers/invalid-puzzles.js')
const Solver = require('../controllers/sudoku-solver.js');
let solver;

suite('UnitTests', () => {
  solver = new Solver
  suite('Validating Puzzle Strings', () => {

    test('Logic handles a valid puzzle string of 81 characters', () => {
      // assert.property(solver.validate(puzzlesAndSolutions[0][0]), 'success', 'Valid strings should get a response object with a success property')
      for (let i in puzzlesAndSolutions) {
        assert.property(solver.validate(puzzlesAndSolutions[i][0]), 'success', 'Valid strings should get a response object with a success property')
        assert.isString(solver.validate(puzzlesAndSolutions[i][0]).success, 'Valid strings should return an object with a success property containing a string')
        assert.equal(solver.validate(puzzlesAndSolutions[i][0]).success, puzzlesAndSolutions[i][0], 'Valid strings should return an object with a success property containing the same string')
      }
    })

    test('Logic handles a puzzle string with invalid characters (not 1-9 or .)', () => {
      assert.property(solver.validate(invalidPuzzles[0]), 'error', 'Strings with invalid characters should get a response object with an error property')
      assert.equal(solver.validate(invalidPuzzles[0]).error, 'Invalid characters in puzzle', 'A helpful error message should be given in response to invalid characters')
    })

    test('Logic handles a puzzle string that is not 81 characters in length', () => {
      assert.property(solver.validate(invalidPuzzles[1]), 'error', 'Strings with fewer than 81 characters should get a response object with an error property')
      assert.equal(solver.validate(invalidPuzzles[1]).error, 'Expected puzzle to be 81 characters long', 'A helpful error message should be given in response to too few characters')
      assert.property(solver.validate(invalidPuzzles[2]), 'error', 'Strings with more than 81 characters should get a response object with an error property')
      assert.equal(solver.validate(invalidPuzzles[2]).error, 'Expected puzzle to be 81 characters long', 'A helpful error message should be given in response to too many characters')
    })

  })

  suite('Validating Grid Placements', () => {
    // Logic handles a valid row placement
    // Logic handles an invalid row placement
    // Logic handles a valid column placement
    // Logic handles an invalid column placement
    // Logic handles a valid region (3x3 grid) placement
    // Logic handles an invalid region (3x3 grid) placement
  })

  suite('Attempting to Solve Puzzles', () => {
    // Valid puzzle strings pass the solver
    // Invalid puzzle strings fail the solver
    // Solver returns the expected solution for an incomplete puzzle
  })

});
