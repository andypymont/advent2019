const test_program = read_program([
  '109,13,3,13,9,13,204,0,209,4,1105,1,2,-1,0,1,0,1,-1,14,-3,4,0,0,1,0,-1,',
  '-2,-11,-4,1,0,2,0,-17,-2,5,-4,0,0,0,1,-1,-2,-3,-12'
].join(''))

QUnit.test('move(program, direction)', function(assert) {
  const east = move(test_program, 'E')
  const south = move(test_program, 'S')

  const cases = [
    [move(test_program, 'N'), 0, 'north from 0,0: wall'],
    [move(test_program, 'E'), 1, 'east from 0,0: success'],
    [move(test_program, 'W'), 0, 'west from 0,0: wall'],
    [move(test_program, 'S'), 1, 'south from 0,0: success'],
    [move(east, 'N'), 0, 'north from 1,0: wall'],
    [move(east, 'E'), 0, 'east from 1,0: wall'],
    [move(east, 'W'), 1, 'west from 1,0: success'],
    [move(east, 'S'), 0, 'south from 1,0: wall'],
    [move(south, 'N'), 1, 'north from 0,-1: success'],
    [move(south, 'E'), 0, 'east from 0,-1: wall'],
    [move(south, 'W'), 2, 'west from 0,-1: victory'],
    [move(south, 'S'), 0, 'south from 0,-1: wall'],
  ].forEach(function([mv, expected, desc]) {
    assert.equal(mv.output.pop(), expected, desc)
  })
})

QUnit.test('map_region(program)', function(assert) {
  assert.deepEqual(
    map_region(test_program),
    {
      walls: new Set([
        '0,1', '1,1', '-1,0', '2,0', '-2,-1', '1,-1', '-1,-2', '0,-2',
      ]),
      oxygen: '-1,-1',
    }
  )
})

QUnit.test('distances(region)', function(assert) {
  const cases = [
    {
      input: {
        walls: new Set([
          '0,1', '1,1', '-1,0', '2,0', '-2,-1', '1,-1', '-1,-2', '0,-2',
        ]),
        oxygen: '-1,-1',
      },
      expected: {
        origin: 2,
        max: 3,
      }
    },
    {
      input: {
        walls: new Set([
          '0,1', '1,1', '-1,0', '2,0', '3,0', '-1,-1', '1,-1', '4,-1', '-1,-2',
          '3,-2', '0,-3', '1,-3', '2,-3',
        ]),
        oxygen: '1,-2',
      },
      expected: {
        origin: 3,
        max: 4,
      }
    }
  ]
  cases.forEach(function({ input, expected }, ex) {
    assert.deepEqual(
      distances(input),
      expected,
      'Example ' + (ex+1)
    )
  })
})

QUnit.test('Solutions', async function(assert) {
  const program = await fetch_puzzle_input().then(read_program)
  const dist = distances(map_region(program))

  assert.equal(
    dist.origin,
    238,
    'Part 1: fewest moves === 238',
  )
  assert.equal(
    dist.max,
    392,
    'Part 2: minutes to fill === 392'
  )
})
