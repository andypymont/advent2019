function c(x, y) {
  return [x, y].join(',')
}

function read_map(inputlines) {
  const map = new Map(inputlines.flatMap(function(row, y) {
    return row.split('').map(function(char, x) {
      return [c(x, y), char]
    })
  }))

  const gates = new Map()
  const adjacency = new Map()
  let outside = {
    x: [2, 2],
    y: [2, 2],
  }

  const g = coords => (map.get(coords))||' '
  const nongatechars = ['.', '#', ' ']
  const is_gate = coords => nongatechars.indexOf(g(coords)) === -1

  function connect(coords) {
    if ( adjacency.has(coords) ) {
      return adjacency.get(coords)
    } else {
      const rv = new Set()
      adjacency.set(coords, rv)
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

           if ( x > outside.x[1] ) {
             outside.x[1] = x
           }
           if ( y > outside.y[1] ) {
             outside.y[1] = y
           }

           const north = c(x, y-1)
           const north2 = c(x, y-2)
           const east = c(x+1, y)
           const east2 = c(x+2, y)
           const south = c(x, y+1)
           const south2 = c(x, y+2)
           const west = c(x-1, y)
           const west2 = c(x-2, y)

           const neighbours = [north, east, south, west]
           neighbours.forEach(function(neighbour) {
             if ( g(neighbour) === '.' ) {
               conn.add(neighbour)
             }
           })

           const potentialgates = [
             [north2, north],
             [east, east2],
             [south, south2],
             [west2, west]
           ]
           potentialgates.filter(([g1, g2]) => is_gate(g1) && is_gate(g2))
                         .forEach(function([g1, g2]) {
                           gate(g(g1)+g(g2)).add(coords)
                         })
         }
       })

       return { gates, adjacency, outside }
}

function visitable(mapinfo, location) {
  const directly = Array.from(mapinfo.adjacency.get(location))||[]
  const indirectly = []

  const is_outside_x = x => mapinfo.outside.x.some(ox => ox === x)
  const is_outside_y = y => mapinfo.outside.y.some(oy => oy === y)

  const gates = Array.from(mapinfo.gates.entries())

  Array.from(mapinfo.gates.entries()).forEach(function([gatename, reaches]) {
    if ( reaches.has(location) ) {
      reaches.forEach(function(destination) {
        if ( destination !== location ) {
          const [x, y] = location.split(',').map(coords => parseInt(coords))
          const dir = (is_outside_x(x) || is_outside_y(y)) ? 'out': 'in'
          indirectly.push([dir, destination])
        }
      })
    }
  })

  return directly.map(coords => ['step', coords])
                 .concat(indirectly)
}

function shortest_a_to_z(mapinfo, recursive=false) {
  const start = Array.from(mapinfo.gates.get('AA')||[]).shift()
  const dest = Array.from(mapinfo.gates.get('ZZ')||[]).shift()

  if ( start && dest ) {
    const visited = new Set()
    const search = [[start, 1, 0]]

    while ( search.length > 0 ) {
      const [location, level, steps] = search.shift()
      if ( location === dest && level === 1 ) {
        return steps
      } else {
        visited.add(level + ':' + location)
        const possible = visitable(mapinfo, location)
        possible.forEach(function([dir, neighbour]) {
          let newlevel = level
          newlevel += (recursive && (dir === 'in')) ? 1 : 0
          newlevel -= (recursive && (dir === 'out')) ? 1 : 0
          if ( newlevel > 0 && !visited.has(newlevel + ':' + neighbour) ) {
            search.push([neighbour, newlevel, steps+1])
          }
        })
      }
    }
    return -1
  } else {
    return -1
  }
}
