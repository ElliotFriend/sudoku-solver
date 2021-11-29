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
    const colRegions = [ [0, 1, 2], [3, 4, 5], [6, 7, 8] ]
    let regRows = rowRegions.find(item => item.includes(row))
    let regCols = colRegions.find(item => item.includes(col))
    for (let r of regRows) {
      for (let c of regCols) {
        if (puzzleObject[r][c] === value) { return false }
      }
    }
    return true
  }

  solve(puzzleString, puzzleObject) {
    // if (error) return { error: 'Puzzle cannot be solved' }
    let mostNumbers = {
      row: { label: 'a', count: 0 },
      col: { label: 1, count: 0 },
      reg: { label: ['a', 1], count: 0 },
    }
    for (let [k, v] in puzzleObject) {
      // console.log(puzzleObject[k])
      let rowNumCount = puzzleObject[k].reduce((acc, item, i, a) => {
        return typeof item === 'number' ? acc += 1 : acc
      }, 0)
      if (rowNumCount > mostNumbers.row.count) {
        mostNumbers.row.label = k
        mostNumbers.row.count = rowNumCount
      }
    }

    let colNumCount = 0
    for (let i = 0; i < 9; i++) {
      for (let r of ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i']) {
        if (typeof puzzleObject[r][i] === 'number') { colNumCount += 1 }
      }
      if (colNumCount > mostNumbers.col.count) {
        mostNumbers.col.label = i + 1
        mostNumbers.col.count = colNumCount
      }
      colNumCount = 0
    }

    const rowRegions = [ ['a', 'b', 'c'], ['d', 'e', 'f'], ['g', 'h', 'i'] ]
    const colRegions = [ [0, 1, 2], [3, 4, 5], [6, 7, 8] ]
    let regNumCount = 0
    for (let row of rowRegions) {
      for (let col of colRegions) {
        for (let r of row) {
          for (let c of col) {
            if (typeof puzzleObject[r][c] === 'number') { regNumCount += 1 }
          }
        }
        if (regNumCount > mostNumbers.reg.count) {
          mostNumbers.reg.label = [ row[0], col[0] + 1 ]
          mostNumbers.reg.count = regNumCount
        }
        console.log(regNumCount)
        regNumCount = 0
      }
    }

    console.log(mostNumbers)
    return {}
    // return { solution: 'somesolutionishere12834693....'}
  }
}

module.exports = SudokuSolver;
