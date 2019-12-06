function read_orbits(lines) {
  return new Map(lines.map(line => line.split(')'))
                      .map(([orbited, orbiter]) => [orbiter, orbited]))
}

function object_orbits(orbits, obj) {
  return orbits.has(obj) ? (1 + object_orbits(orbits, orbits.get(obj))) : 0
}

function total_orbits(orbits) {
  const map_orbits = obj => object_orbits(orbits, obj)
  const sum = (a, b) => a + b
  return Array.from(orbits.keys()).map(map_orbits).reduce(sum)
}

function objects_orbiting(orbits, obj) {
  return new Set(Array.from(orbits.entries())
                      .filter(([chi, par]) => (par === obj))
                      .map(([chi, par]) => chi))
}

function transfers_between(orbits, self, target) {
  const search = [[orbits.get(self), 0]]
  const visited = new Map(search)

  while ( search.length > 0 ) {
    const [location, distance] = search.shift()
    visited.set(location, distance)

    // move toward COM:
    if ( orbits.has(location) && !visited.has(orbits.get(location)) ) {
      search.push([orbits.get(location), distance+1])
    }
    // also try moving into orbit around current neighbours:
    const neighbours = Array.from(objects_orbiting(orbits, location))
    neighbours.filter(neighbour => !visited.has(neighbour))
              .forEach(neighbour => search.push([neighbour, distance+1]))
  }

  return visited.get(target) - 1
}
