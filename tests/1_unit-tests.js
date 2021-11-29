const chai = require('chai');
const assert = chai.assert;

import { getPuzzleObject } from '../controllers/helpers.js'
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

  suite('Validating Row Placements', () => {

    test('Logic handles a valid row placement', () => {
      let puzzleObject1 = getPuzzleObject(puzzlesAndSolutions[0][0])
      let rowCheck1 = solver.checkRowPlacement(puzzleObject1, 'b', 1, 9)
      assert.isTrue(rowCheck1, 'checkRowPlacement should return true for a valid row placement')
      assert.isOk(rowCheck1, 'checkRowPlacement should return a truthy response for a valid row placement')
      assert.isNotNull(rowCheck1, 'checkRowPlacement should not return a null response')
      let puzzleObject2 = getPuzzleObject(puzzlesAndSolutions[3][0])
      let rowCheck2 = solver.checkRowPlacement(puzzleObject2, 'e', 6, 1)
      assert.isTrue(rowCheck2, 'checkRowPlacement should return true for a valid row placement')
      assert.isOk(rowCheck2, 'checkRowPlacement should return a truthy response for a valid row placement')
      assert.isNotNull(rowCheck2, 'checkRowPlacement should not return a null response')
      let puzzleObject3 = getPuzzleObject(puzzlesAndSolutions[4][0])
      let rowCheck3 = solver.checkRowPlacement(puzzleObject3, 'i', 7, 4)
      assert.isTrue(rowCheck3, 'checkRowPlacement should return true for a valid row placement')
      assert.isOk(rowCheck3, 'checkRowPlacement should return a truthy response for a valid row placement')
      assert.isNotNull(rowCheck3, 'checkRowPlacement should not return a null response')
    })

    test('Logic handles an invalid row placement', () => {
      let puzzleObject1 = getPuzzleObject(puzzlesAndSolutions[0][0])
      let rowCheck1 = solver.checkRowPlacement(puzzleObject1, 'b', 1, 2)
      assert.isNotTrue(rowCheck1, 'checkRowPlacement should return false for an invalid row placement')
      assert.isNotOk(rowCheck1, 'checkRowPlacement should return a falsy response for an invalid row placement')
      assert.isNotNull(rowCheck1, 'checkRowPlacement should not return a null response')
      let puzzleObject2 = getPuzzleObject(puzzlesAndSolutions[3][0])
      let rowCheck2 = solver.checkRowPlacement(puzzleObject2, 'e', 6, 6)
      assert.isNotTrue(rowCheck2, 'checkRowPlacement should return false for an invalid row placement')
      assert.isNotOk(rowCheck2, 'checkRowPlacement should return a falsy response for an invalid row placement')
      assert.isNotNull(rowCheck2, 'checkRowPlacement should not return a null response')
      let puzzleObject3 = getPuzzleObject(puzzlesAndSolutions[4][0])
      let rowCheck3 = solver.checkRowPlacement(puzzleObject3, 'i', 7, 3)
      assert.isNotTrue(rowCheck3, 'checkRowPlacement should return false for an invalid row placement')
      assert.isNotOk(rowCheck3, 'checkRowPlacement should return a falsy response for an invalid row placement')
      assert.isNotNull(rowCheck3, 'checkRowPlacement should not return a null response')
    })

  })

  suite('Validating Column Placements', () => {

    test('Logic handles a valid column placement', () => {
      let puzzleObject1 = getPuzzleObject(puzzlesAndSolutions[0][0])
      let colCheck1 = solver.checkColPlacement(puzzleObject1, 'b', 1, 5)
      assert.isTrue(colCheck1, 'checkColPlacement should return true for a valid row placement')
      assert.isOk(colCheck1, 'checkColPlacement should return a truthy response for a valid row placement')
      assert.isNotNull(colCheck1, 'checkColPlacement should not return a null response')
      let puzzleObject2 = getPuzzleObject(puzzlesAndSolutions[3][0])
      let colCheck2 = solver.checkColPlacement(puzzleObject2, 'e', 6, 1)
      assert.isTrue(colCheck2, 'checkColPlacement should return true for a valid row placement')
      assert.isOk(colCheck2, 'checkColPlacement should return a truthy response for a valid row placement')
      assert.isNotNull(colCheck2, 'checkColPlacement should not return a null response')
      let puzzleObject3 = getPuzzleObject(puzzlesAndSolutions[4][0])
      let colCheck3 = solver.checkColPlacement(puzzleObject3, 'i', 7, 3)
      assert.isTrue(colCheck3, 'checkColPlacement should return true for a valid row placement')
      assert.isOk(colCheck3, 'checkColPlacement should return a truthy response for a valid row placement')
      assert.isNotNull(colCheck3, 'checkColPlacement should not return a null response')
    })

    test('Logic handles an invalid column placement', () => {
      let puzzleObject1 = getPuzzleObject(puzzlesAndSolutions[0][0])
      let colCheck1 = solver.checkColPlacement(puzzleObject1, 'b', 1, 8)
      assert.isNotTrue(colCheck1, 'checkColPlacement should return false for an invalid row placement')
      assert.isNotOk(colCheck1, 'checkColPlacement should return a falsy response for a valid row placement')
      assert.isNotNull(colCheck1, 'checkColPlacement should not return a null response')
      let puzzleObject2 = getPuzzleObject(puzzlesAndSolutions[3][0])
      let colCheck2 = solver.checkColPlacement(puzzleObject2, 'e', 6, 2)
      assert.isNotTrue(colCheck2, 'checkColPlacement should return false for an invalid row placement')
      assert.isNotOk(colCheck2, 'checkColPlacement should return a falsy response for a valid row placement')
      assert.isNotNull(colCheck2, 'checkColPlacement should not return a null response')
      let puzzleObject3 = getPuzzleObject(puzzlesAndSolutions[4][0])
      let colCheck3 = solver.checkColPlacement(puzzleObject3, 'i', 7, 5)
      assert.isNotTrue(colCheck3, 'checkColPlacement should return false for an invalid row placement')
      assert.isNotOk(colCheck3, 'checkColPlacement should return a falsy response for a valid row placement')
      assert.isNotNull(colCheck3, 'checkColPlacement should not return a null response')
    })

  })

  suite('Validating region Placements', () => {

    test('Logic handles a valid region (3x3 grid) placement', () => {
      let puzzleObject1 = getPuzzleObject(puzzlesAndSolutions[0][0])
      let regionCheck1 = solver.checkRegionPlacement(puzzleObject1, 'h', 2, 3)
      assert.isTrue(regionCheck1, 'checkColPlacement should return true for a valid row placement')
      assert.isOk(regionCheck1, 'checkColPlacement should return a truthy response for a valid row placement')
      assert.isNotNull(regionCheck1, 'checkColPlacement should not return a null response')
      let puzzleObject2 = getPuzzleObject(puzzlesAndSolutions[1][0])
      let regionCheck2 = solver.checkRegionPlacement(puzzleObject2, 'f', 7, 7)
      assert.isTrue(regionCheck2, 'checkColPlacement should return true for a valid row placement')
      assert.isOk(regionCheck2, 'checkColPlacement should return a truthy response for a valid row placement')
      assert.isNotNull(regionCheck2, 'checkColPlacement should not return a null response')
      let puzzleObject3 = getPuzzleObject(puzzlesAndSolutions[2][0])
      let regionCheck3 = solver.checkRegionPlacement(puzzleObject3, 'c', 6, 4)
      assert.isTrue(regionCheck3, 'checkColPlacement should return true for a valid row placement')
      assert.isOk(regionCheck3, 'checkColPlacement should return a truthy response for a valid row placement')
      assert.isNotNull(regionCheck3, 'checkColPlacement should not return a null response')
    })

    test('Logic handles an invalid region (3x3 grid) placement', () => {
      let puzzleObject1 = getPuzzleObject(puzzlesAndSolutions[0][0])
      let regionCheck1 = solver.checkRegionPlacement(puzzleObject1, 'h', 2, 9)
      assert.isNotTrue(regionCheck1, 'checkColPlacement should return false for an invalid row placement')
      assert.isNotOk(regionCheck1, 'checkColPlacement should return a falsy response for a valid row placement')
      assert.isNotNull(regionCheck1, 'checkColPlacement should not return a null response')
      let puzzleObject2 = getPuzzleObject(puzzlesAndSolutions[1][0])
      let regionCheck2 = solver.checkRegionPlacement(puzzleObject2, 'f', 7, 6)
      assert.isNotTrue(regionCheck2, 'checkColPlacement should return false for an invalid row placement')
      assert.isNotOk(regionCheck2, 'checkColPlacement should return a falsy response for a valid row placement')
      assert.isNotNull(regionCheck2, 'checkColPlacement should not return a null response')
      let puzzleObject3 = getPuzzleObject(puzzlesAndSolutions[2][0])
      let regionCheck3 = solver.checkRegionPlacement(puzzleObject3, 'c', 6, 3)
      assert.isNotTrue(regionCheck3, 'checkColPlacement should return false for an invalid row placement')
      assert.isNotOk(regionCheck3, 'checkColPlacement should return a falsy response for a valid row placement')
      assert.isNotNull(regionCheck3, 'checkColPlacement should not return a null response')
    })
  })

  suite('Attempting to Solve Puzzles', () => {
    // Valid puzzle strings pass the solver
    // Invalid puzzle strings fail the solver
    // Solver returns the expected solution for an incomplete puzzle
  })

});
