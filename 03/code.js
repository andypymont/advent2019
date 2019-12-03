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
  const v = new Set()
  v.add('0,0')

  route.split(',').forEach(function(segment) {
    const direction = segment.substring(0, 1)
    const distance = parseInt(segment.substring(1))
    for ( let i = 0; i < distance; i++ ) {
      current = move(current, direction)
      v.add(current.join(','))
    }
  })

  return v
}

function crossovers(wires) {
  function intersection(first, second) {
    const is = new Set()
    for ( let item of first ) {
      if ( second.has(item) ) {
        is.add(item)
      }
    }
    return is
  }

  return wires.reduce((x, y) => intersection(x, y))
}

function nearest_crossing(routes) {
  const wires = routes.split('\n').map(visited)
  const sum = (x, y) => x + y
  const manhattan = c => c.split(',').map(x => Math.abs(x)).reduce(sum)

  return Array.from(crossovers(wires).values())
              .map(manhattan)
              .filter(x => x !== 0)
              .reduce((x,y) => Math.min(x,y))
}
