function read_orbits(desc) {
  const orbits = new Map()

  desc.split('\n').forEach(function(line) {
    const [orbited, orbiter] = line.trim().split(')')
    orbits.set(orbiter, orbited)
  })

  return orbits
}

function object_orbits(orbits, obj) {
  return orbits.has(obj) ? (1 + object_orbits(orbits, orbits.get(obj))) : 0
}

function total_orbits(orbits) {
  const map_orbits = obj => object_orbits(orbits, obj)
  const sum = (a, b) => a + b
  return Array.from(orbits.keys()).map(map_orbits).reduce(sum)
}
