class SudokuSolver {
  constructor() {
    this.getPuzzleObject.bind(this)
    this.validate.bind(this)
    this.checkRowPlacement.bind(this)
    this.checkColPlacement.bind(this)
    this.checkRegionPlacement.bind(this)
  }

  getPuzzleObject(puzzleString) {
    let puzzleObject = Array.from(puzzleString)
    .reduce((acc, item, i, a) => {
      let itemValue = item === '.' ? item : parseInt(item)
      let rowLetter = String.fromCharCode(97 + Math.floor(i/9))
      if (i % 9 === 0) {
        acc[rowLetter] = [ itemValue ]
      } else {
        acc[rowLetter].push(itemValue)
      }
      return acc
    }, {})
    return puzzleObject
  }

  validate(puzzleString) {
    const re = /^[1-9\.]{81}$/
    if (puzzleString.length !== 81) return { error: 'Expected puzzle to be 81 characters long' }
    if (!puzzleString.match(re)) return { error: 'Invalid characters in puzzle'}
    // let puzzleObject = getPuzzleObject(puzzleString)
    return { success: puzzleString }
  }

  checkRowPlacement(puzzleString, row, column, value) {
    let puzzleObject = this.getPuzzleObject(puzzleString)
    if (puzzleObject[row].includes(parseInt(value))) {
      return false
    }
    return true
  }

  checkColPlacement(puzzleString, row, column, value) {
    let puzzleObject = this.getPuzzleObject(puzzleString)
    let col = column - 1
    for (let [k, v] of Object.entries(puzzleObject)) {
      if (puzzleObject[k][col] === value) { return false }
    }
    return true
  }

  checkRegionPlacement(puzzleString, row, column, value) {
    let puzzleObject = this.getPuzzleObject(puzzleString)
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

  solve(puzzleString) {

    const quickCheck = (pS, r, c, v) => {
      let rowCheck = this.checkRowPlacement(pS, r, c, v)
      let colCheck = this.checkColPlacement(pS, r, c, v)
      let regCheck = this.checkRegionPlacement(pS, r, c, v)
      return (rowCheck && colCheck && regCheck) ? true : false
    }

    const getInfo = (i, puzzleArray) => {
      return {
        value: puzzleArray[i],
        index: i,
        row: String.fromCharCode(97 + Math.floor(i / 9)),
        col: (i % 9) + 1
      }
    }

    let puzzleArray = puzzleString.split('')
    // console.log(puzzleArray)
    let solutionArray = puzzleArray
    let i = 0
    while (i < 81) {
      let info = getInfo(i, puzzleArray)
      // {
      //   value: puzzleArray[i],
      //   index: i,
      //   row: String.fromCharCode(97 + Math.floor(i / 9)),
      //   col: (i % 9) + 1
      // }
      if (info.value !== '.') {
        solutionArray[i] = info.value
        i++
      } else {

        for (let v = 1; v < 10; v++) {
          if (quickCheck(solutionArray.join(''), info.row, info.col, v)) {
            solutionArray[i] = v
            i++
            break
          } else {
            if (v === 9) {
              console.log({...info, v: v})
              let n = puzzleArray.lastIndexOf('.', i - 1)
              solutionArray[n] += 1
              i = n + 1
              console.log(solutionArray)
              // i++
            }
          }
        }
      }
    }
    // let solutionArray = puzzleArray
    //   .reduce((acc, item, i, a) => {
    //     let info = {
    //       value: item,
    //       index: i,
    //       row: String.fromCharCode(97 + Math.floor(i / 9)),
    //       col: (i % 9) + 1
    //     }
    //     // console.log(acc)
    //     if (item !== '.') {
    //       return acc
    //     } else {
    //       // let stuck = false
    //       for (let v = 1; v < 10; v++) {
    //         if (quickCheck(acc.join(''), info.row, info.col, v)) {
    //           acc[i] = v
    //           return acc
    //         } else {
    //           if (v === 9) {
    //             console.log(acc)
    //             console.log({...info, v: v})
    //           }
    //         }
    //       }
    //     }
    //   }, puzzleArray)
    console.log(solutionArray.join(''))
    // return { solution: solutionArray.join('') }

    // let puzzleObject = this.getPuzzleObject(puzzleString)
    // if (error) return { error: 'Puzzle cannot be solved' }
    // let mostNumbers = {
    //   row: { label: 'a', count: 0 },
    //   col: { label: 1, count: 0 },
    //   reg: { label: ['a', 1], count: 0 },
    // }
    // for (let [k, v] in puzzleObject) {
    //   // console.log(puzzleObject[k])
    //   let rowNumCount = puzzleObject[k].reduce((acc, item, i, a) => {
    //     return typeof item === 'number' ? acc += 1 : acc
    //   }, 0)
    //   if (rowNumCount > mostNumbers.row.count) {
    //     mostNumbers.row.label = k
    //     mostNumbers.row.count = rowNumCount
    //   }
    // }
    // console.log(mostNumbers)
    //
    // let colNumCount = 0
    // for (let i = 0; i < 9; i++) {
    //   for (let r of ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i']) {
    //     if (typeof puzzleObject[r][i] === 'number') { colNumCount += 1 }
    //   }
    //   if (colNumCount > mostNumbers.col.count) {
    //     mostNumbers.col.label = i + 1
    //     mostNumbers.col.count = colNumCount
    //   }
    //   colNumCount = 0
    // }
    //
    // const rowRegions = [ ['a', 'b', 'c'], ['d', 'e', 'f'], ['g', 'h', 'i'] ]
    // const colRegions = [ [0, 1, 2], [3, 4, 5], [6, 7, 8] ]
    // let regNumCount = 0
    // for (let row of rowRegions) {
    //   for (let col of colRegions) {
    //     for (let r of row) {
    //       for (let c of col) {
    //         if (typeof puzzleObject[r][c] === 'number') { regNumCount += 1 }
    //       }
    //     }
    //     if (regNumCount > mostNumbers.reg.count) {
    //       mostNumbers.reg.label = [ row[0], col[0] + 1 ]
    //       mostNumbers.reg.count = regNumCount
    //     }
    //     console.log(regNumCount)
    //     regNumCount = 0
    //   }
    // }
    //
    // console.log(mostNumbers)
    return {}
    // return { solution: 'somesolutionishere12834693....'}
  }
}

module.exports = SudokuSolver;
