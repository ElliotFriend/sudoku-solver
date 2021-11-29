'use strict';

const SudokuSolver = require('../controllers/sudoku-solver.js');

module.exports = function (app) {

  let solver = new SudokuSolver();

  app.route('/api/check')
    .post((req, res) => {
      if (!req.body.puzzle || !req.body.coordinate || !req.body.value) return res.json({ error: 'Required field(s) missing' })
      let puzzle = req.body.puzzle
      let coordinate = req.body.coordinate
      let value = req.body.value
      let isValid = solver.validate(puzzle)
      if (isValid.error) return res.json({ error: isValid.error })
      if (!/^[A-I]{1}[1-9]{1}$/i.test(coordinate)) return res.json({ error: 'Invalid coordinate' })
      if (!/^[1-9]{1}$/.test(value)) return res.json({ error: 'invalid value' })

      // we've passed all the validations, let's get to sudoku-in' now!
    });

  app.route('/api/solve')
    .post((req, res) => {
      if (!req.body.puzzle) return res.json({ error: 'Required field missing'})
      let puzzle = req.body.puzzle
      let isValid = solver.validate(puzzle)
      if (isValid.error) return res.json({ error: isValid.error })

      // we've passed all the validations, let's get to sudoku-in' now!
    });
};
