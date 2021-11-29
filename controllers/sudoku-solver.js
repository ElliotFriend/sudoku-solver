class SudokuSolver {

  validate(puzzleString) {
    const re = /^[1-9\.]{81}$/
    if (puzzleString.length !== 81) return { error: 'Expected puzzle to be 81 characters long' }
    if (!puzzleString.match(re)) return { error: 'Invalid characters in puzzle'}
    // let puzzleObject = getPuzzleObject(puzzleString)
    return { success: puzzleString }
  }

  checkRowPlacement(puzzleObject, row, column, value) {
    if (puzzleObject[row].includes(parseInt(value))) {
      return false
    }
    return true
  }

  checkColPlacement(puzzleObject, row, column, value) {
    let col = column - 1
    for (let [k, v] of Object.entries(puzzleObject)) {
      if (puzzleObject[k][col] === value) { return false }
    }
    return true
  }

  checkRegionPlacement(puzzleObject, row, column, value) {
    let col = column - 1
    const rowRegions = [ ['a', 'b', 'c'], ['d', 'e', 'f'], ['g', 'h', 'i'] ]
    let colRegions = [ [0, 1, 2], [3, 4, 5], [6, 7, 8] ]
    let regRows = rowRegions.find(item => item.includes(row))
    let regCols = colRegions.find(item => item.includes(col))
    for (let r of regRows) {
      for (let c of regCols) {
        if (puzzleObject[r][c] === value) { return false }
      }
    }
    return true
  }

  solve(puzzleString) {
    if (error) return { error: 'Puzzle cannot be solved' }
    return { solution: 'somesolutionishere12834693....'}
  }
}

module.exports = SudokuSolver;
