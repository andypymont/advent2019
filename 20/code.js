function c(x, y) {
  return [x, y].join(',')
}

function read_map(inputlines) {
  return new Map(inputlines.flatMap(function(row, y) {
    return row.split('').map(function(char, x) {
      return [c(x, y), char]
    })
  }))
}

function map_info(map) {
  const gates = new Map()
  const connections = new Map()
  const g = coords => map.get(coords)||' '
  const nongatechars = ['.', '#', ' ']
  const is_gate = coords => nongatechars.indexOf(g(coords)) === -1

  function connect(coords) {
    if ( connections.has(coords) ) {
      return connections.get(coords)
    } else {
      const rv = new Set()
      connections.set(coords, rv)
      return rv
    }
  }

  function gate(gatename) {
    if ( gates.has(gatename) ) {
      return gates.get(gatename)
    } else {
      const rv = new Set()
      gates.set(gatename, rv)
      return rv
    }
  }

  Array.from(map.entries())
       .forEach(function([coords, char]) {
         if ( char === '.' ) {
           const [x, y] = coords.split(',').map(a => parseInt(a))
           const conn = connect(coords)

           const north = c(x, y-1)
           const northtwice = c(x, y-2)
           const east = c(x+1, y)
           const easttwice = c(x+2, y)
           const south = c(x, y+1)
           const southtwice = c(x, y+2)
           const west = c(x-1, y)
           const westtwice = c(x-2, y)

           const neighbours = [north, east, south, west]
           neighbours.forEach(function(neighbour) {
             if ( g(neighbour) === '.' ) {
               conn.add(neighbour)
             }
           })
           const potentialgates = [
             [northtwice, north],
             [east, easttwice],
             [south, southtwice],
             [westtwice, west]
           ]
           potentialgates.filter(([g1, g2]) => is_gate(g1) && is_gate(g2))
                         .forEach(function([g1, g2]) {
                           gate(g(g1)+g(g2)).add(coords)
                         })
         }
       })

  Array.from(gates.entries())
       .forEach(function([gatename, neighbours]) {
         neighbours = Array.from(neighbours)
         Array.from(neighbours).forEach(function(neighbour, n, neighbours) {
           const conn = connect(neighbour)
           neighbours.filter((_, ix) => ix !== n)
                     .forEach(function(other) {
                       conn.add(other)
                     })
         })
       })

  return { gates, connections }
}

function shortest_a_to_z(mapinfo) {
  const start = Array.from(mapinfo.gates.get('AA')||[]).shift()
  const dest = Array.from(mapinfo.gates.get('ZZ')||[]).shift()

  if ( start && dest ) {
    const visited = new Set()
    const search = [[start, 0]]

    while ( search.length > 0 ) {
      const [location, steps] = search.shift()
      if ( location === dest ) {
        return steps
      } else {
        visited.add(location)
        const neighbours = Array.from(mapinfo.connections.get(location))||[]
        neighbours.filter(neighbour => !visited.has(neighbour))
                  .forEach(neighbour => search.push([neighbour, steps+1]))
      }
    }
  } else {
    return -1
  }
}
