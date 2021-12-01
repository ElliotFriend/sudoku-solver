export const getPuzzleObject = (puzzleString) => {
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

export const getPuzzleArray = (puzzleString) => {
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
