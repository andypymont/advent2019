const compass = [
  [0, -1], [1, 0], [0, 1], [-1, 0],
]
function adjacent(coords, walls) {
  const [x, y] = coords.split(',').map(c => parseInt(c))
  return compass.map(function([dx, dy]) {
    return [x+dx, y+dy].join(',')
  }).filter(neighbour => !walls.has(neighbour))
}

function graph_of_map(map) {
  const walls = new Set()
  const objects = new Map()
  const contents = new Map()

  map.forEach(function(line, y) {
    line.split('').forEach(function(char, x) {
      const coords = [x, y].join(',')
      if ( char === '#' ) {
        walls.add(coords)
      } else if ( char !== '.' ) {
        objects.set(char, coords)
        contents.set(coords, char)
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
  Array.from(objects).filter(function([objectname, pos]) {
    return (objectname === '@' || objectname === objectname.toLowerCase() )
  }).forEach(function([start, pos]) {
    floodfill.push([start, pos, new Set([pos]), '', 0])
  })

  while ( floodfill.length > 0 ) {
    let [start, pos, visited, doors, steps] = floodfill.shift()
    const objecthere = contents.get(pos)||'@'
    if ( objecthere !== '@' && objecthere !== start ) {
      if ( objecthere === objecthere.toLowerCase() ) {
        record_route(start, objecthere, doors, steps)
      } else {
        doors = doors + objecthere
      }
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
  Array.from(shortroutes).forEach(function([route, [doors, dist]]) {
    const [origin, destination] = route.split('->')
    if ( !(origin in graph)  ) {
      graph[origin] = {}
    }
    graph[origin][destination] = { doors, dist }
  })

  return graph
}

function accessible_paths(graph, position, keyring) {
  const node = graph[position]||{}
  const accessible = []
  for ( neighbour in node ) {
    if ( keyring.indexOf(neighbour) === -1 ) {
      const { doors, dist } = node[neighbour]
      const needkeys = doors.toLowerCase().split('')
      if ( needkeys.every(k => (keyring.indexOf(k) !== -1)) ) {
        accessible.push([neighbour, dist])
      }
    }
  }
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
    return heap[i][1] < heap[j][1]
  }
  function swap(i, j) {
    [heap[i], heap[j]] = [heap[j], heap[i]]
    indexset(heap[i][0], i)
    indexset(heap[j][0], j)
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
  function indexkey(route) {
    return Array.from(route).sort().join('') + '-' + route.slice(-1)
  }
  function indexhas(route) {
    return index.has(indexkey(route))
  }
  function indexget(route) {
    return index.get(indexkey(route))
  }
  function indexset(route, value) {
    return index.set(indexkey(route), value)
  }
  function indexdelete(route, value) {
    return index.delete(indexkey(route), value)
  }
  function update(route, newvalue) {
    let node = indexget(route)
    const prevvalue = heap[node][1]
    if ( newvalue < prevvalue ) {
      heap[node] = [route, newvalue]
      return siftUp(node)
    }
    return node
  }
  function push([route, dist]) {
    const value = [route, dist]
    if ( indexhas(route) ) {
      indexset(route, update(route, dist))
    } else {
      heap.push(value)
      indexset(route, siftUp())
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
    indexdelete(popped[0])
    siftDown()
    return popped
  }

  return { size, peek, push, pop }
}

function shortest_path(graph) {
  const consider = route_prioritiser()
  let keycount = 0
  for ( key in graph ) {
    if ( key !== '@') {
      keycount++
    }
  }
  const solutions = []

  accessible_paths(graph, '@', '').forEach(function([pos, dist]) {
    consider.push([pos, dist])
  })

  while ( consider.size() > 0 ) {
    const [keyring, dist] = consider.pop()
    if ( keyring.length === keycount ) {
      return dist
    }
    const pos = keyring.slice(-1)
    accessible_paths(graph, pos, keyring).forEach(function([npos, xtradist]) {
      const nkeyring = keyring + npos
      const ndist = dist + xtradist
      consider.push([nkeyring, ndist])
    })
  }

  return Infinity
}
