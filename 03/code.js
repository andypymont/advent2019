function move(current, direction) {
  if (direction == 'U') {
    return [current[0], current[1]+1]
  } else if (direction == 'D') {
    return [current[0], current[1]-1]
  } else if (direction == 'R') {
    return [current[0]+1, current[1]]
  } else if (direction == 'L') {
    return [current[0]-1, current[1]]
  }
}

function visited(route) {
  let current = [0, 0]
  let steps = 0
  const v = new Map()

  route.split(',').forEach(function(segment) {
    const direction = segment.substring(0, 1)
    const distance = parseInt(segment.substring(1))
    for ( let i = 0; i < distance; i++ ) {
      current = move(current, direction)
      steps++
      const c = current.join(',')
      if ( !(v.has(c)) ) {
        v.set(c, steps)
      }
    }
  })

  return v
}

function crossovers(wires) {
  function intersection(first, second) {
    const is = new Set()
    for ( let item of first.keys() ) {
      if ( second.has(item) ) {
        is.add(item)
      }
    }
    return is
  }

  return wires.reduce((x, y) => intersection(x, y))
}

const sum = (x, y) => x + y

function manhattan(coord) {
  return coord.split(',').map(x => Math.abs(x)).reduce(sum)
}

function step_summer(first, second) {
  return coords => (first.get(coords)||0) + (second.get(coords)||0)
}

function nearest_crossing(routes) {
  const [one, two] = routes.split('\n').map(visited)
  const step_sum = step_summer(one, two)
  const crossing = Array.from(crossovers([one, two]).values())
                        .filter(c => c !== '0,0')

  return {
    manhattan: crossing.map(manhattan).reduce((x,y) => Math.min(x, y)),
    steps: crossing.map(step_sum).reduce((x,y) => Math.min(x, y)),
  }
}
