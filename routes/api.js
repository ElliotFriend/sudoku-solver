'use strict';

import { getPuzzleObject } from '../controllers/helpers.js'
const SudokuSolver = require('../controllers/sudoku-solver.js');

module.exports = function (app) {

  let solver = new SudokuSolver();

  app.route('/api/check')
    .post((req, res) => {
      if (!req.body.puzzle || !req.body.coordinate || !req.body.value) return res.json({ error: 'Required field(s) missing' })
      let puzzle = req.body.puzzle
      let coordinate = req.body.coordinate
      let value = parseInt(req.body.value)
      let isValid = solver.validate(puzzle)
      if (isValid.error) return res.json({ error: isValid.error })
      if (!/^[A-I]{1}[1-9]{1}$/i.test(coordinate)) return res.json({ error: 'Invalid coordinate' })
      if (!/^[1-9]{1}$/.test(value)) return res.json({ error: 'Invalid value' })

      // we've passed all the validations, let's get to sudoku-in' now!
      let rowNumber = (coordinate.substring(0, 1).toLowerCase()).charCodeAt(0) - 96
      let colNumber = coordinate.substring(1, 2)
      let rowCheck = solver.checkRowPlacement(puzzle, rowNumber, colNumber, value)
      let colCheck = solver.checkColPlacement(puzzle, rowNumber, colNumber, value)
      let regionCheck = solver.checkRegionPlacement(puzzle, rowNumber, colNumber, value)

      let responseObject = {
        valid: rowCheck && colCheck && regionCheck ? true : false
      }
      if (!responseObject.valid) {
        responseObject.conflict = []
        if (!rowCheck) responseObject.conflict.push('row')
        if (!colCheck) responseObject.conflict.push('column')
        if (!regionCheck) responseObject.conflict.push('region')
      }
      res.json(responseObject)
    });

  app.route('/api/solve')
    .post((req, res) => {
      if (!req.body.puzzle) return res.json({ error: 'Required field missing'})
      let puzzle = req.body.puzzle
      let valid = solver.validate(puzzle)
      if (valid.error) return res.json({ error: valid.error })

      // we've passed all the validations, let's get to sudoku-in' now!
      // let puzzleObject = getPuzzleObject(puzzle)
      let solution = solver.solve(puzzle)
      res.json(solution)
      // if (solution.error) return res.json({ error: solution.error })
      // res.json(solution)
    });
};
