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
      let rowCheck1 = solver.checkRowPlacement(puzzlesAndSolutions[0][0], 2, 1, 9)
      assert.isTrue(rowCheck1, 'checkRowPlacement should return true for a valid row placement')
      assert.isOk(rowCheck1, 'checkRowPlacement should return a truthy response for a valid row placement')
      assert.isNotNull(rowCheck1, 'checkRowPlacement should not return a null response')
      let rowCheck2 = solver.checkRowPlacement(puzzlesAndSolutions[3][0], 5, 6, 1)
      assert.isTrue(rowCheck2, 'checkRowPlacement should return true for a valid row placement')
      assert.isOk(rowCheck2, 'checkRowPlacement should return a truthy response for a valid row placement')
      assert.isNotNull(rowCheck2, 'checkRowPlacement should not return a null response')
      let rowCheck3 = solver.checkRowPlacement(puzzlesAndSolutions[4][0], 9, 7, 4)
      assert.isTrue(rowCheck3, 'checkRowPlacement should return true for a valid row placement')
      assert.isOk(rowCheck3, 'checkRowPlacement should return a truthy response for a valid row placement')
      assert.isNotNull(rowCheck3, 'checkRowPlacement should not return a null response')
    })

    test('Logic handles an invalid row placement', () => {
      let rowCheck1 = solver.checkRowPlacement(puzzlesAndSolutions[0][0], 2, 1, 2)
      assert.isNotTrue(rowCheck1, 'checkRowPlacement should return false for an invalid row placement')
      assert.isNotOk(rowCheck1, 'checkRowPlacement should return a falsy response for an invalid row placement')
      assert.isNotNull(rowCheck1, 'checkRowPlacement should not return a null response')
      let rowCheck2 = solver.checkRowPlacement(puzzlesAndSolutions[3][0], 5, 6, 6)
      assert.isNotTrue(rowCheck2, 'checkRowPlacement should return false for an invalid row placement')
      assert.isNotOk(rowCheck2, 'checkRowPlacement should return a falsy response for an invalid row placement')
      assert.isNotNull(rowCheck2, 'checkRowPlacement should not return a null response')
      let rowCheck3 = solver.checkRowPlacement(puzzlesAndSolutions[4][0], 9, 7, 3)
      assert.isNotTrue(rowCheck3, 'checkRowPlacement should return false for an invalid row placement')
      assert.isNotOk(rowCheck3, 'checkRowPlacement should return a falsy response for an invalid row placement')
      assert.isNotNull(rowCheck3, 'checkRowPlacement should not return a null response')
    })

  })

  suite('Validating Column Placements', () => {

    test('Logic handles a valid column placement', () => {
      let colCheck1 = solver.checkColPlacement(puzzlesAndSolutions[0][0], 2, 1, 5)
      assert.isTrue(colCheck1, 'checkColPlacement should return true for a valid row placement')
      assert.isOk(colCheck1, 'checkColPlacement should return a truthy response for a valid row placement')
      assert.isNotNull(colCheck1, 'checkColPlacement should not return a null response')
      let colCheck2 = solver.checkColPlacement(puzzlesAndSolutions[3][0], 5, 6, 1)
      assert.isTrue(colCheck2, 'checkColPlacement should return true for a valid row placement')
      assert.isOk(colCheck2, 'checkColPlacement should return a truthy response for a valid row placement')
      assert.isNotNull(colCheck2, 'checkColPlacement should not return a null response')
      let colCheck3 = solver.checkColPlacement(puzzlesAndSolutions[4][0], 9, 7, 3)
      assert.isTrue(colCheck3, 'checkColPlacement should return true for a valid row placement')
      assert.isOk(colCheck3, 'checkColPlacement should return a truthy response for a valid row placement')
      assert.isNotNull(colCheck3, 'checkColPlacement should not return a null response')
    })

    test('Logic handles an invalid column placement', () => {
      let colCheck1 = solver.checkColPlacement(puzzlesAndSolutions[0][0], 2, 1, 8)
      assert.isNotTrue(colCheck1, 'checkColPlacement should return false for an invalid row placement')
      assert.isNotOk(colCheck1, 'checkColPlacement should return a falsy response for a valid row placement')
      assert.isNotNull(colCheck1, 'checkColPlacement should not return a null response')
      let colCheck2 = solver.checkColPlacement(puzzlesAndSolutions[3][0], 5, 6, 2)
      assert.isNotTrue(colCheck2, 'checkColPlacement should return false for an invalid row placement')
      assert.isNotOk(colCheck2, 'checkColPlacement should return a falsy response for a valid row placement')
      assert.isNotNull(colCheck2, 'checkColPlacement should not return a null response')
      let colCheck3 = solver.checkColPlacement(puzzlesAndSolutions[4][0], 9, 7, 5)
      assert.isNotTrue(colCheck3, 'checkColPlacement should return false for an invalid row placement')
      assert.isNotOk(colCheck3, 'checkColPlacement should return a falsy response for a valid row placement')
      assert.isNotNull(colCheck3, 'checkColPlacement should not return a null response')
    })

  })

  suite('Validating Region Placements', () => {

    test('Logic handles a valid region (3x3 grid) placement', () => {
      // let puzzleObject1 = getPuzzleObject(puzzlesAndSolutions[0][0])
      let regionCheck1 = solver.checkRegionPlacement(puzzlesAndSolutions[0][0], 8, 2, 3)
      assert.isTrue(regionCheck1, 'checkColPlacement should return true for a valid row placement')
      assert.isOk(regionCheck1, 'checkColPlacement should return a truthy response for a valid row placement')
      assert.isNotNull(regionCheck1, 'checkColPlacement should not return a null response')
      // let puzzleObject2 = getPuzzleObject(puzzlesAndSolutions[1][0])
      let regionCheck2 = solver.checkRegionPlacement(puzzlesAndSolutions[1][0], 6, 7, 7)
      assert.isTrue(regionCheck2, 'checkColPlacement should return true for a valid row placement')
      assert.isOk(regionCheck2, 'checkColPlacement should return a truthy response for a valid row placement')
      assert.isNotNull(regionCheck2, 'checkColPlacement should not return a null response')
      // let puzzleObject3 = getPuzzleObject(puzzlesAndSolutions[2][0])
      let regionCheck3 = solver.checkRegionPlacement(puzzlesAndSolutions[2][0], 3, 6, 4)
      assert.isTrue(regionCheck3, 'checkColPlacement should return true for a valid row placement')
      assert.isOk(regionCheck3, 'checkColPlacement should return a truthy response for a valid row placement')
      assert.isNotNull(regionCheck3, 'checkColPlacement should not return a null response')
    })

    test('Logic handles an invalid region (3x3 grid) placement', () => {
      let regionCheck1 = solver.checkRegionPlacement(puzzlesAndSolutions[0][0], 8, 2, 9)
      assert.isNotTrue(regionCheck1, 'checkColPlacement should return false for an invalid row placement')
      assert.isNotOk(regionCheck1, 'checkColPlacement should return a falsy response for a valid row placement')
      assert.isNotNull(regionCheck1, 'checkColPlacement should not return a null response')
      let regionCheck2 = solver.checkRegionPlacement(puzzlesAndSolutions[1][0], 6, 7, 6)
      assert.isNotTrue(regionCheck2, 'checkColPlacement should return false for an invalid row placement')
      assert.isNotOk(regionCheck2, 'checkColPlacement should return a falsy response for a valid row placement')
      assert.isNotNull(regionCheck2, 'checkColPlacement should not return a null response')
      let regionCheck3 = solver.checkRegionPlacement(puzzlesAndSolutions[2][0], 3, 6, 3)
      assert.isNotTrue(regionCheck3, 'checkColPlacement should return false for an invalid row placement')
      assert.isNotOk(regionCheck3, 'checkColPlacement should return a falsy response for a valid row placement')
      assert.isNotNull(regionCheck3, 'checkColPlacement should not return a null response')
    })
  })

  suite('Attempting to Solve Puzzles', () => {

    test('Valid puzzle strings pass the solver', () => {
      let solveCheck1 = solver.solve(puzzlesAndSolutions[4][0])
      assert.isNotNull(solveCheck1, 'solve should retun a non-null value')
      assert.isObject(solveCheck1, 'solve should return an object')
      assert.property(solveCheck1, 'solution', 'the solve return object should contain a solution property when given a valid, solveable puzzle')
      assert.isString(solveCheck1.solution, 'the solution property should be a string')
      // assert.equal(solveCheck1.solution, puzzlesAndSolutions[4][1], 'the solution property should match the known correct solution to the puzzle')
      let solveCheck2 = solver.solve(puzzlesAndSolutions[3][0])
      assert.isNotNull(solveCheck2, 'solve should retun a non-null value')
      assert.isObject(solveCheck2, 'solve should return an object')
      assert.property(solveCheck2, 'solution', 'the solve return object should contain a solution property when given a valid, solveable puzzle')
      assert.isString(solveCheck2.solution, 'the solution property should be a string')
      // assert.equal(solveCheck2.solution, puzzlesAndSolutions[3][1], 'the solution property should match the known correct solution to the puzzle')
      let solveCheck3 = solver.solve(puzzlesAndSolutions[2][0])
      assert.isNotNull(solveCheck3, 'solve should retun a non-null value')
      assert.isObject(solveCheck3, 'solve should return an object')
      assert.property(solveCheck3, 'solution', 'the solve return object should contain a solution property when given a valid, solveable puzzle')
      assert.isString(solveCheck3.solution, 'the solution property should be a string')
      // assert.equal(solveCheck3.solution, puzzlesAndSolutions[2][1], 'the solution property should match the known correct solution to the puzzle')
      // assert.equal(true, false)
    })

    test('Invalid puzzle strings fail the solver', () => {
      let solveCheck1 = solver.solve(invalidPuzzles[0]) // invalid characters
      assert.isNotNull(solveCheck1, 'solve should retun a non-null value')
      assert.isObject(solveCheck1, 'solve should return an object')
      assert.property(solveCheck1, 'error', 'the solve return object should contain an error property when given a puzzle with invalid characters')
      assert.isString(solveCheck1.error, 'the error property should be a string')
      assert.equal(solveCheck1.error, 'Invalid characters in puzzle', 'the error property should contain helpful information')
      let solveCheck2 = solver.solve(invalidPuzzles[1]) // too long
      assert.isNotNull(solveCheck2, 'solve should retun a non-null value')
      assert.isObject(solveCheck2, 'solve should return an object')
      assert.property(solveCheck2, 'error', 'the solve return object should contain an error property when given a puzzle with too many characters')
      assert.isString(solveCheck2.error, 'the error property should be a string')
      assert.equal(solveCheck2.error, 'Expected puzzle to be 81 characters long', 'the error property should contain helpful information')
      let solveCheck3 = solver.solve(invalidPuzzles[2]) // too short
      assert.isNotNull(solveCheck3, 'solve should retun a non-null value')
      assert.isObject(solveCheck3, 'solve should return an object')
      assert.property(solveCheck3, 'error', 'the solve return object should contain an error property when given a puzzle with too few characters')
      assert.isString(solveCheck3.error, 'the error property should be a string')
      assert.equal(solveCheck3.error, 'Expected puzzle to be 81 characters long', 'the error property should contain helpful information')
      let solveCheck4 = solver.solve(invalidPuzzles[3]) // cannot be solved
      assert.isNotNull(solveCheck4, 'solve should retun a non-null value')
      assert.isObject(solveCheck4, 'solve should return an object')
      assert.property(solveCheck4, 'error', 'the solve return object should contain an error property when given a puzzle with too few characters')
      assert.isString(solveCheck4.error, 'the error property should be a string')
      assert.equal(solveCheck4.error, 'Puzzle cannot be solved', 'the error property should contain helpful information')
    })

    test('Solver returns the expected solution for an incomplete puzzle', () => {
      for (let i in puzzlesAndSolutions) {
        let solveCheck = solver.solve(puzzlesAndSolutions[i][0])
        assert.equal(solveCheck.solution, puzzlesAndSolutions[i][1], 'the solution property should match the known correct solution to the puzzle')
      }
    })
  })

});
