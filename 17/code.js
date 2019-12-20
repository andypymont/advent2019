const c = (x, y) => x + ',' + y

function ascii_program(program, input) {
  if ( input ) {
    program.memory[0] = 2
    const converted_input = [input[3].join(','),
                             input[0].join(','),
                             input[1].join(','),
                             input[2].join(','),
                             'n\n'].join('\n')
                                   .split('')
                                   .map(x => x.charCodeAt(0))
    return run_program(program, converted_input).output.pop()
  } else {
    return run_program(program, []).output.map(x => String.fromCharCode(x))
                                          .join('')
  }
}

function read_map(input) {
  return new Map(input.split('\n')
                      .flatMap(function(line, y, lines) {
                        return line.split('').map(function(char, x) {
                          return [[x, y].join(','), char]
                        })
                      }))
}

const compass = new Map([
  ['N', [0, -1]],
  ['E', [1, 0]],
  ['S', [0, 1]],
  ['W', [-1, 0]],
])

function map_info(map) {
  const facts = {
    intersections: new Set(),
    robot: 'none',
    end: 'none',
    locations: 0
  }
  const coords = Array.from(map.keys())
  const robotchars = new Map([
    ['^', 'N'],
    ['>', 'E'],
    ['v', 'S'],
    ['<', 'W'],
  ])
  function is_scaffold(x, y) {
    const point = c(x, y)
    return map.has(point) && map.get(point) !== '.'
  }

  Array.from(map.keys()).forEach(function(coord) {
    const [x, y] = coord.split(',').map(x => parseInt(x))
    const char = map.get(coord)

    if ( robotchars.has(char) ) {
      facts.locations++
      facts.robot = [x, y, robotchars.get(char)]
    } else if ( char === '#' ) {
      facts.locations++
      const exits = Array.from(compass.entries())
                         .filter(([dir, [dx, dy]]) => is_scaffold(x+dx, y+dy))
                         .length
      if ( exits === 1 ) {
        facts.end = [x, y]
      }
      if ( exits === 4 ) {
        facts.intersections.add(coord)
      }
    }
  })

  return facts
}

function next_move(map, x, y, momentum) {
  const left = new Map([
    ['N', 'W'],
    ['E', 'N'],
    ['S', 'E'],
    ['W', 'S'],
  ])
  const right = new Map([
    ['N', 'E'],
    ['E', 'S'],
    ['S', 'W'],
    ['W', 'N'],
  ])

  function is_scaffold(x, y) {
    const point = c(x, y)
    return map.has(point) && (map.get(point) !== '.')
  }
  function try_direction(dir, x, y) {
    const [dx, dy] = compass.get(dir)
    return is_scaffold(x+dx, y+dy) ? [x+dx, y+dy, dir] : [x, y, false]
  }

  return try_direction(momentum, x, y) ||
         try_direction(left.get(momentum), x, y) ||
         try_direction(right.get(momentum), x, y)
}

function alignment_parameter(intersection) {
  return intersection.split(',')
                     .map(x => parseInt(x))
                     .reduce((a, b) => a*b)
}

function route(map, info) {
  const [endx, endy] = info.end
  let [x, y, dir] = info.robot
  let route = []
  let turn = 'A'
  let section = 0

  const dirs = ['N', 'E', 'S', 'W']
  const left = dir => dirs[(dirs.indexOf(dir)+3)%4]
  const right = dir => dirs[(dirs.indexOf(dir)+1)%4]

  function attempt(ax, ay, adir, turn) {
    const [dx, dy] = compass.get(adir)
    ax += dx
    ay += dy
    if ( map.has(c(ax, ay)) && map.get(c(ax, ay)) !== '.' ) {
      return [ax, ay, adir, turn]
    } else {
      return []
    }
  }

  while ( true ) {
    const attempts = [
      attempt(x, y, dir, 'A'),
      attempt(x, y, left(dir), 'L'),
      attempt(x, y, right(dir), 'R'),
    ].filter(a => a.length > 0)
    if ( attempts.length === 0 ) {
      route.push(section)
      return route
    } else {
      [x, y, dir, turn] = attempts.shift()
      if ( turn === 'A' ) {
        section++
      } else {
        if ( section > 0 ) {
          route.push(section)
        }
        route.push(turn)
        section = 1
      }
    }
  }
}

function substitute(sequence, part, replacement) {
  return sequence.reduce(
    function (rv, item, ix, original) {
      const upcoming = original.slice(ix, ix+part.length)

      if ( rv.skip > 0 ) {
        rv.skip--
      } else if ( upcoming.filter((uc, u) => uc === part[u])
                          .length === part.length ) {
        rv.skip = part.length - 1
        replacement.forEach(x => rv.replaced.push(x))
      } else {
        rv.replaced.push(item)
      }

      return rv
    },
    {
      skip: 0,
      replaced: [],
    }
  ).replaced
}

function unique(item, ix, arr) {
  return arr.map(x => x.toString()).indexOf(item.toString()) === ix
}

function find_repeating_subarrays(arr, length) {
  const marker = {}
  return arr.map((_, ix, a) => a.slice(ix, ix+length))
            .filter(seq => seq.length === length)
            .filter(function(candidate, ix) {
              const replaced = substitute(arr, candidate, [marker])
              return replaced.filter(i => i == marker).length > 1
            })
            .filter(unique)
}

function compress_route(route) {
  const repeats = find_repeating_subarrays
  const lengths = [8, 6, 4, 2]
  const subs = ['A', 'B', 'C']

  const min = (a, b) => Math.min(a, b)
  const no_subs = r => subs.map(sub => r.indexOf(sub)).reduce(min) === -1
  const all_subs = r => r.map(i => subs.indexOf(i)).reduce(min) !== -1

  return lengths.flatMap(l => repeats(route, l))
                .flatMap(function(a) {
                  const route_a = substitute(route, a, ['A'])
                  return lengths.flatMap(l => repeats(route_a, l))
                                .filter(no_subs)
                                .flatMap(function(b) {
                    const route_b = substitute(route_a, b, ['B'])
                    return lengths.flatMap(l => repeats(route_b, l))
                                  .filter(no_subs)
                                  .map(function(c) {
                                    return [
                                      a,
                                      b,
                                      c,
                                      substitute(route_b, c, ['C']),
                                    ]
                                  }).filter(([a, b, c, r]) => all_subs(r))
                  })
                }).shift()
}
