function read_state(state) {
  return new Map([
    [
      0,
      parseInt(state.join('')
                    .split('')
                    .reverse()
                    .map(x => x === '#' ? 1 : 0)
                    .join(''), 2)
    ]
  ])
}

function neighbours(levelposition, recursive=false) {
  const [level, position] = levelposition.split(';').map(x => parseInt(x))
  const neighbours = new Set()

  function addneighbour(lvl, pos) {
    if ( recursive || lvl === level ) {
      neighbours.add(lvl + ';' + pos)
    }
  }

  if ( position < 5 ) {
    addneighbour(level-1, 7)
  } else if ( position === 17 && recursive ) {
    addneighbour(level+1, 20)
    addneighbour(level+1, 21)
    addneighbour(level+1, 22)
    addneighbour(level+1, 23)
    addneighbour(level+1, 24)
  } else {
    addneighbour(level, position-5)
  }

  if ( position % 5 === 4 ) {
    addneighbour(level-1, 13)
  } else if ( position === 11 && recursive ) {
    addneighbour(level+1, 0)
    addneighbour(level+1, 5)
    addneighbour(level+1, 10)
    addneighbour(level+1, 15)
    addneighbour(level+1, 20)
  } else {
    addneighbour(level, position+1)
  }

  if ( position > 19 ) {
    addneighbour(level-1, 17)
  } else if ( position === 7 && recursive ) {
    addneighbour(level+1, 0)
    addneighbour(level+1, 1)
    addneighbour(level+1, 2)
    addneighbour(level+1, 3)
    addneighbour(level+1, 4)
  } else {
    addneighbour(level, position+5)
  }

  if ( position % 5 === 0 ) {
    addneighbour(level-1, 11)
  } else if ( position === 13 && recursive ) {
    addneighbour(level+1, 4)
    addneighbour(level+1, 9)
    addneighbour(level+1, 14)
    addneighbour(level+1, 19)
    addneighbour(level+1, 24)
  } else {
    addneighbour(level, position-1)
  }

  return neighbours
}

function next_minute(state, recursive=false) {
  const neighbourcount = new Map()

  Array.from(state.entries()).forEach(function([level, substate]) {
    const digits = substate.toString(2)
                           .padStart(25, '0')
                           .split('')
                           .reverse()
    digits.forEach(function(infested, position) {
      if ( infested === '1' ) {
        const myneighbours = neighbours(level + ';' + position, recursive)
        myneighbours.forEach(function(neighbour) {
          const current = neighbourcount.get(neighbour)||0
          neighbourcount.set(neighbour, current+1)
        })
      }
    })
  })

  const unique = (item, ix, arr) => arr.indexOf(item) === ix
  const levels = Array.from(neighbourcount.keys())
                      .map(x => parseInt(x.split(';')[0]))
                      .filter(unique)

  return new Map(
    Array.from(neighbourcount.keys())
         .map(x => parseInt(x.split(';')[0]))
         .filter(unique)
         .map(function(level) {
           const substate = state.get(level)||0
           const digits = substate.toString(2)
                                  .padStart(25, '0')
                                  .split('')
                                  .reverse()
           return [
             level,
             parseInt(
               digits.map(function(infested, position) {
                 const levelpos = level + ';' + position
                 const neighbours = neighbourcount.get(levelpos)||0
                 if ( infested === '1' && neighbours !== 1 ) {
                   return '0'
                 } else if ( infested === '0' &&
                             (neighbours === 1 || neighbours === 2) ) {
                   return '1'
                 } else {
                   return infested
                 }
               }).reverse().join(''),
               2
             )
           ]
         })
  )
}

function after_minutes(state, minutes) {
  return Array(minutes).fill()
                       .reduce(function(acc) {
                         return next_minute(acc, true)
                       }, state)
}

function biodiversity(state) {
  const visited = new Set()
  while ( !visited.has(state.get(0)) ) {
    visited.add(state.get(0))
    state = next_minute(state)
  }
  return state.get(0)
}

function total_bugs(state) {
  return Array.from(state.entries())
              .flatMap(([lvl, substate]) => substate.toString(2).split(''))
              .filter(x => x === '1')
              .length

}
