class SudokuSolver {
  constructor() {
    // this.getPuzzleObject.bind(this)
    this.getPuzzleArray.bind(this)
    this.validate.bind(this)
    this.checkRowPlacement.bind(this)
    this.checkColPlacement.bind(this)
    this.checkRegionPlacement.bind(this)
  }

  // getPuzzleObject(puzzleString) {
  //   let puzzleObject = Array.from(puzzleString)
  //   .reduce((acc, item, i, a) => {
  //     let itemValue = item === '.' ? item : parseInt(item)
  //     let rowLetter = String.fromCharCode(97 + Math.floor(i/9))
  //     if (i % 9 === 0) {
  //       acc[rowLetter] = [ itemValue ]
  //     } else {
  //       acc[rowLetter].push(itemValue)
  //     }
  //     return acc
  //   }, {})
  //   return puzzleObject
  // }

  getPuzzleArray(puzzleString) {
    let puzzleArray = Array.from(puzzleString)
    .reduce((acc, item, i, a) => {
      let val = item === '.' ? 0 : parseInt(item)
      let row = Math.floor(i/9)
      if (i % 9 === 0) {
        acc[row] = [ val ]
      } else {
        acc[row].push(val)
      }
      return acc
    }, [])
    return puzzleArray
  }

  validate(puzzleString) {
    const re = /^[1-9\.]{81}$/
    if (puzzleString.length !== 81) return { error: 'Expected puzzle to be 81 characters long' }
    if (!puzzleString.match(re)) return { error: 'Invalid characters in puzzle'}
    // let puzzleObject = getPuzzleObject(puzzleString)
    return { success: puzzleString }
  }

  checkRowPlacement(puzzleString, row, column, value) {
    let puzzleArray = this.getPuzzleArray(puzzleString)
    row--
    if (puzzleArray[row].includes(parseInt(value))) { return false }
    return true
  }

  checkColPlacement(puzzleString, row, column, value) {
    let puzzleArray = this.getPuzzleArray(puzzleString)
    column--
    for (let i = 0; i < 9; i++) {
      if (puzzleArray[i][column] === parseInt(value)) { return false }
    }
    return true
  }

  checkRegionPlacement(puzzleString, row, column, value) {
    let puzzleArray = this.getPuzzleArray(puzzleString)
    column--
    row--
    // const rowRegions = [ ['a', 'b', 'c'], ['d', 'e', 'f'], ['g', 'h', 'i'] ]
    const rowRegions = [ [0, 1, 2], [3, 4, 5], [6, 7, 8] ]
    const colRegions = [ [0, 1, 2], [3, 4, 5], [6, 7, 8] ]
    let regRows = rowRegions.find(item => item.includes(row))
    let regCols = colRegions.find(item => item.includes(column))
    for (let r of regRows) {
      for (let c of regCols) {
        if (puzzleArray[r][c] === parseInt(value)) { return false }
      }
    }
    return true
  }

  solve(puzzleString) {

    // const getInfo = (i, puzzleArray) => {
    //   return {
    //     value: puzzleArray[i],
    //     index: i,
    //     row: String.fromCharCode(97 + Math.floor(i / 9)),
    //     col: (i % 9) + 1
    //   }
    // }

    const quickCheck = (pS, r, c, v) => {
      let rowCheck = this.checkRowPlacement(pS, r, c, v)
      let colCheck = this.checkColPlacement(pS, r, c, v)
      let regCheck = this.checkRegionPlacement(pS, r, c, v)
      return (rowCheck && colCheck && regCheck) ? true : false
    }

    const puzzle = puzzleString
    const puzzleArray = this.getPuzzleArray(puzzle)
    let solutionArray = puzzleArray
    // console.log(solutionArray)

    const canBeSolved = (puzzle, solutionArray) => {
      let row = 0
      let col = 0
      let zeroLeft = false

      for (let r = 0; r < 9; r++) {
        for (let c = 0; c < 9; c++) {
          if (solutionArray[r][c] === 0) {
            row = r
            col = c

            zeroLeft = true
            break
          }
        }
        if (zeroLeft) {
          break
        }
      }

      if (!zeroLeft) {
        return true
      }

      for (let n = 1; n <= 9; n++) {
        if (quickCheck(puzzle, String.fromCharCode(97 + row), col + 1, n)) {
          solutionArray[row][col] = n
          // console.log(solutionArray.map(e => e.join('')).join(''))
          if (canBeSolved(solutionArray.map(e => e.join('')).join(''), solutionArray)) {
            return true
          } else {
            solutionArray[row][col] = 0
          }
        }
      }
      return false
    }

    if (canBeSolved(puzzle, solutionArray)) {
      return { solution: solutionArray.map(e => e.join('')).join('') }
    } else {
      return { error: 'Puzzle cannot be solved' }
    }
  }
}

module.exports = SudokuSolver;
