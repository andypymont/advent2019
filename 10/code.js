function read_map(map) {
  return map.split('\n')
            .flatMap(function(line, y) {
              return line.split('').map(function(char, x) {
                return [char, x, y]
              })
            })
            .filter(([char, x, y]) => char === '#')
            .map(([char, x, y]) => [x, y])
}

function blocked(target, blocker) {
  const quadrant = (
    Math.sign(target[0]) === Math.sign(blocker[0]) &&
    Math.sign(target[1]) === Math.sign(blocker[1])
  )
  const on_same_line = (
    (target[0] === 0 && blocker[0] === 0) ||
    (target[1] === 0 && blocker[1] === 0) ||
    (target[0]/blocker[0]) === (target[1]/blocker[1])
  )
  const blocker_closer = (
    (Math.abs(blocker[0]) + Math.abs(blocker[1])) <
    (Math.abs(target[0]) + Math.abs(target[1]))
  )
  return (quadrant && on_same_line && blocker_closer)
}

function line_of_sight(target, blockers) {
  return blockers.filter(([x, y]) => !(x === 0 && y === 0))
                 .filter(b => blocked(target, b)).length === 0
}

function asteroids_visible(asteroid, ix, asteroids) {
  return asteroids.filter((_, x) => x !== ix)
                  .map(c => [c[0]-asteroid[0], c[1]-asteroid[1]])
                  .filter((target, t, others) => line_of_sight(target, others))
                  .length
}

function most_asteroids_visible(asteroids) {
  return asteroids.map(asteroids_visible)
                  .reduce((a, b) => Math.max(a, b))
}
