function read_state(state) {
  return state.join('').split('').map(char => char === '#' ? 1 : 0)
}

function next_minute(state) {
  return state.map(function(infested, position, others) {
    const neighbours = [
      position < 5 ? 0 : others[position - 5],
      position % 5 === 0 ? 0 : others[position - 1],
      position % 5 === 4 ? 0 : others[position + 1],
      position > 19 ? 0 : others[position + 5]
    ].reduce((a, b) => a + b)
    if ( infested && neighbours !== 1 ) {
      return 0
    } else if ( !infested && (neighbours === 1 || neighbours === 2) ) {
      return 1
    } else {
      return infested
    }
  })
}

function first_repeat(state) {
  const visited = new Set()
  let joined = state.join('')
  while ( !visited.has(joined) ) {
    visited.add(joined)
    state = next_minute(state)
    joined = state.join('')
  }
  return state
}
