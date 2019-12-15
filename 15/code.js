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

function map_region(program) {
  const visited = new Set()
  const walls = new Set()
  const search = [[program, 0, 0]]
  let oxygen = 'not found'

  const c = (x, y) => [x, y].join(',')
  const consider = (x, y) => !visited.has(c(x,y)) && !walls.has(c(x,y))

  while ( search.length > 0 ) {
    const [prog, x, y] = search.shift()
    visited.add(c(x, y))

    attempt_moves.map(([compass, dx, dy]) => [compass, x+dx, y+dy])
                 .filter(([compass, mx, my]) => consider(mx, my))
                 .forEach(function([compass, mx, my]) {
                   const mp = move(prog, compass)
                   const mv = mp.output.pop()
                   if ( mv === 0 ) {
                     walls.add(c(mx, my))
                   } else {
                     oxygen = mv === 2 ? c(mx, my) : oxygen
                     search.push([mp, mx, my])
                   }
                 })
  }

  return { walls, oxygen }
}

function distances({ walls, oxygen }) {
  const [ox, oy] = oxygen.split(',').map(x => parseInt(x))
  const visited = new Set([oxygen])
  const search = [[ox, oy, 0]]

  let max = 0
  let origin = -1

  const c = (x, y) => [x, y].join(',')
  const consider = (x, y) => !visited.has(c(x,y)) && !walls.has(c(x,y))

  while ( search.length > 0 ) {
    const [x, y, dist] = search.shift()
    max = Math.max(max, dist)
    origin = (x === 0 & y === 0) ? dist : origin
    visited.add(c(x, y))
    attempt_moves.map(([compass, dx, dy]) => [x+dx, y+dy])
                 .filter(([mx, my]) => consider(mx, my))
                 .forEach(function([mx, my]) {
                   search.push([mx, my, dist+1])
                 })
  }

  return { max, origin }
}
