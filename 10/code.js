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

const atan = ratio => Math.atan(ratio) * (180/Math.PI)

function angle_between(origin, point) {
  const x = point[0] - origin[0]
  const y = point[1] - origin[1]
  const signs = [Math.sign(x), Math.sign(y)].join(',')

  return ({
    '-1,-1': (x, y) => 270 + atan(y/x),
    '-1,1': (x, y) => 270 - atan(y/x),
    '1,1': (x, y) => 90 + atan(y/x),
    '1,-1': (x, y) => 90 - atan(y/x),
    '0,0': (x, y) => -1,
    '1,0': (x, y) => 90,
    '-1,0': (x, y) => 270,
    '0,-1': (x, y) => 0,
    '0,1': (x, y) => 180,
  }[signs](Math.abs(x), Math.abs(y)).toFixed(2))
}

function distance_between(origin, asteroid) {
  return Math.abs(asteroid[0]-origin[0]) + Math.abs(asteroid[1]-origin[1])
}

function asteroids_visible(origin, number, asteroids) {
  const fov = new Map()
  asteroids.filter((_, ix) => ix !== number)
           .forEach(function(asteroid) {
             const angle = angle_between(origin, asteroid)
             if (!fov.has(angle)) {
               fov.set(angle, asteroid)
             } else {
               const neighbour = fov.get(angle)
               if ( distance_between(origin, asteroid) <
                    distance_between(origin, neighbour) ) {
                 fov.set(angle, asteroid)
               }
             }
           })
  return Array.from(fov.keys())
              .sort((a, b) => a - b)
              .map(angle => fov.get(angle))
}

function most_asteroids_visible(asteroids) {
  return asteroids.map(asteroids_visible)
                  .reduce((a, b) => a.length > b.length ? a : b)
}
