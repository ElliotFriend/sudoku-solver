class SudokuSolver {

  validate(puzzleString) {
    const re = /^[1-9\.]{81}$/
    if (puzzleString.length !== 81) return { error: 'Expected puzzle to be 81 characters long' }
    if (!puzzleString.match(re)) return { error: 'Invalid characters in puzzle'}
    return true
  }

  checkRowPlacement(puzzleString, row, column, value) {

  }

  checkColPlacement(puzzleString, row, column, value) {

  }

  checkRegionPlacement(puzzleString, row, column, value) {

  }

  solve(puzzleString) {
    if (error) return { error: 'Puzzle cannot be solved' }
    return { solution: 'somesolutionishere12834693....'}
  }
}

module.exports = SudokuSolver;
