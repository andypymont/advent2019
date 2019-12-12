function read_point(text) {
  return text.substring(1, text.length - 1)
             .split(', ')
             .map(c => parseInt(c.substring(2)))
             .concat([0, 0, 0])
}

function apply_gravity(moon, m, moons) {
  const velocity = moons.reduce(
    function(agg, [x, y, z, vx, vy, vz]) {
      return [
        agg[0] + Math.sign(x - moon[0]),
        agg[1] + Math.sign(y - moon[1]),
        agg[2] + Math.sign(z - moon[2]),
      ]
    },
    moon.slice(3, 6),
  )
  return moon.slice(0, 3).concat(velocity)
}

function advance_moon([x, y, z, vx, vy, vz]) {
  return [x + vx, y + vy, z + vz, vx, vy, vz]
}

function progress_motion(moons) {
  return moons.map(apply_gravity)
              .map(advance_moon)
}

function energy(moon) {
  const [x, y, z, vx, vy, vz] = moon.map(a => Math.abs(a))
  return (x + y + z) * (vx + vy + vz)
}

function total_energy(moons, steps) {
  Array(steps).fill().forEach(function() {
    moons = progress_motion(moons)
  })
  return moons.map(energy)
              .reduce((a, b) => a + b)
}
