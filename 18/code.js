const compass = [
  [0, -1], [1, 0], [0, 1], [-1, 0],
]
function adjacent(coords, walls) {
  const [x, y] = coords.split(',').map(c => parseInt(c))
  return compass.map(function([dx, dy]) {
    return [x+dx, y+dy].join(',')
  }).filter(neighbour => !walls.has(neighbour))
}

function graph_of_map(map, fourbots) {
  const walls = new Set()
  const keylocations = new Map()
  const contents = new Map()
  const robots = []

  if (fourbots) {
    const [rx, ry] = map.map(function(line, y, map) {
      const x = line.indexOf('@')
      if (x !== -1) {
        return [x, y]
      }
    }).filter(v => v)[0]
    map[ry-1] = map[ry-1].slice(0, rx-1) + '@#@' + map[ry-1].slice(rx+2)
    map[ry] = map[ry].slice(0, rx-1) + '###' + map[ry].slice(rx+2)
    map[ry+1] = map[ry+1].slice(0, rx-1) + '@#@' + map[ry+1].slice(rx+2)
  }

  map.forEach(function(line, y) {
    line.split('').forEach(function(char, x) {
      const coords = [x, y].join(',')
      if ( char === '#' ) {
        walls.add(coords)
      } else if ( char === '@' ) {
        const bot = robots.push(coords) - 1
        keylocations.set('robot' + bot, coords)
      } else if ( /([A-Z])/.test(char) ) {
        const val = 1 << (char.charCodeAt(0) - 65)
        contents.set(coords, [val, 'door'])
      } else if ( /([a-z])/.test(char) ) {
        const val = 1 << (char.charCodeAt(0) - 97)
        contents.set(coords, [val, 'key'])
        keylocations.set(val, coords)
      }
    })
  })

  const shortroutes = new Map()
  function record_route(origin, destination, doors, steps) {
    const lookup = origin + '->' + destination
    const [cdoors, csteps] = (shortroutes.get(lookup)||['', Infinity])
    if ( steps < csteps ) {
      shortroutes.set(lookup, [doors, steps])
    }
  }

  const floodfill = []
  Array.from(keylocations).forEach(function([start, pos]) {
    floodfill.push([start, pos, new Set([pos]), 0, 0])
  })

  while ( floodfill.length > 0 ) {
    let [start, pos, visited, doors, steps] = floodfill.shift()
    const [objecthere, typehere] = contents.get(pos)||[0, 'start']
    if ( objecthere > 0 && objecthere !== start && typehere === 'key' ) {
      record_route(start, objecthere, doors, steps)
    } else if ( typehere === 'door' ) {
      doors = doors|objecthere
    }

    adjacent(pos, walls).forEach(function(neighbour) {
      if ( !visited.has(neighbour) ) {
        const nowvisited = new Set(visited)
        nowvisited.add(neighbour)
        floodfill.push([start, neighbour, nowvisited, doors, steps+1])
      }
    })
  }

  const graph = {}
  Array.from(keylocations.keys()).forEach(function(k) {
    graph[k] = {}
  })
  Array.from(shortroutes).forEach(function([route, [doors, dist]]) {
    const [origin, destination] = route.split('->') //.map(i => parseInt(i))
    graph[origin][destination] = { doors, dist }
  })

  return graph
}

function accessible_paths(graph, position, keyring) {
  const node = graph[position]||{}
  const accessible = []

  Object.keys(node).map(i => parseInt(i)).forEach(function(neighbour) {
    if ( (neighbour & keyring) === 0 ) {
      const { doors, dist } = node[neighbour]
      if ( (doors & keyring) === doors ) {
        accessible.push([neighbour, dist])
      }
    }
  })

  return accessible
}

function route_prioritiser() {
  const top = 0
  const parent = i => ((i + 1) >>> 1) - 1
  const left = i => (i << 1) + 1
  const right = i => (i + 1) << 1

  const heap = []
  const index = new Map()

  function size() {
    return heap.length
  }
  function peek() {
    return heap[top]
  }
  function lesser(i, j) {
    return heap[i][2] < heap[j][2]
  }
  function swap(i, j) {
    [heap[i], heap[j]] = [heap[j], heap[i]]
    indexset(heap[i][0], heap[i][1], i)
    indexset(heap[j][0], heap[j][1], j)
  }
  function siftUp(node) {
    node = node||(size() - 1)
    while ( node > top && lesser(node, parent(node)) ) {
      swap(node, parent(node))
      node = parent(node)
    }
    return node
  }
  function siftDown(node) {
    node = node||top
    while (
      ( left(node) < size() && lesser(left(node), node) ) ||
      ( right(node) < size() && lesser(right(node), node) )
    ) {
      let maxChild = (right(node) < size() &&
                      lesser(right(node), left(node))) ? right(node)
                                                       : left(node)
      swap(node, maxChild)
      node = maxChild
    }
    return node
  }
  function indexkey(route, pos) {
    return [route, pos].join(',')
  }
  function indexhas(route, pos) {
    return index.has(indexkey(route, pos))
  }
  function indexget(route, pos) {
    return index.get(indexkey(route, pos))
  }
  function indexset(route, pos, value) {
    return index.set(indexkey(route, pos), value)
  }
  function indexdelete(route, pos, value) {
    return index.delete(indexkey(route, pos))
  }
  function update(route, pos, newvalue) {
    let node = indexget(route, pos)
    const prevvalue = heap[node][2]
    if ( newvalue < prevvalue ) {
      heap[node] = [route, pos, newvalue]
      return siftUp(node)
    }
    return node
  }
  function push(value) {
    const [route, pos, dist] = value
    if ( indexhas(route, pos) ) {
      indexset(route, pos, update(route, pos, dist))
    } else {
      heap.push(value)
      indexset(route, pos, siftUp())
    }
    return size()
  }
  function pop() {
    const popped = this.peek()
    const bottom = this.size() - 1
    if ( bottom > top ) {
      swap(top, bottom)
    }
    heap.pop()
    indexdelete(popped[0], popped[1])
    siftDown()
    return popped
  }

  return { size, peek, push, pop }
}

function shortest_path(graph) {
  const consider = route_prioritiser()
  const [robots, allkeys] = Object.keys(graph).reduce(function(acc, k) {
    if ( k.includes('robot') ) {
      acc[0].push(k)
    } else {
      acc[1] = acc[1]|parseInt(k)
    }
    return acc
  }, [[], 0])

  consider.push([0, robots, 0])

  while ( consider.size() > 0 ) {
    const [keyring, positions, dist] = consider.pop()
    if ( keyring === allkeys ) {
      return dist
    }
    positions.forEach(function(pos, p) {
      accessible_paths(graph, pos, keyring).forEach(function([npos, xtradist]) {
        const nkeyring = keyring|npos
        const ndist = dist + xtradist
        const npositions = positions.map(function(oldpos, o) {
          return ( o === p ) ? npos : oldpos
        })
        consider.push([nkeyring, npositions, ndist])
      })
    })
  }

  return Infinity
}
