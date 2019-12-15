function move(program, compass) {
  const dir = ['?', 'N', 'S', 'W', 'E'].indexOf(compass)
  return run_program(program, [dir], true)
}

const attempt_moves = [
  ['N', 0, 1],
  ['E', 1, 0],
  ['S', 0, -1],
  ['W', -1, 0],
]

function fewest_moves(program) {
  const visited = new Set(['0,0'])
  const search = [[program, 0, 0, 0]]
  let found = -1

  while ( search.length > 0 && found === -1 ) {
    const [prog, x, y, dist] = search.shift()
    visited.add([x, y].join(','))

    attempt_moves.map(([compass, dx, dy]) => [move(prog, compass), x+dx, y+dy])
                 .filter(([mp, mx, my]) => !visited.has([mx, my].join(',')))
                 .forEach(function([mp, mx, my]) {
                   const mv = mp.output.pop()
                   if ( mv === 2 ) {
                     found = dist + 1
                   } else if ( mv === 0 ) {
                     visited.add([mx, my].join(','))
                   } else if ( mv === 1 ) {
                     search.push([mp, mx, my, dist+1])
                   }
                 })
  }

  return found
}
