const test_map_a = new Map([
  ['B', 'COM'],
  ['C', 'B'],
  ['D', 'C'],
  ['E', 'D'],
  ['F', 'E'],
  ['G', 'B'],
  ['H', 'G'],
  ['I', 'D'],
  ['J', 'E'],
  ['K', 'J'],
  ['L', 'K']
])

const test_map_b = new Map([
  ['A', 'COM'],
  ['B', 'COM'],
  ['C', 'A'],
  ['D', 'B'],
  ['E', 'D']
])

QUnit.test('read_orbits()', function(assert) {
  [
    [
      ['COM)B', 'B)C', 'C)D', 'D)E', 'E)F', 'B)G', 'G)H', 'D)I', 'E)J', 'J)K',
       'K)L'],
      test_map_a
    ],
    [
      ['COM)A', 'COM)B', 'A)C', 'B)D', 'D)E'],
      test_map_b
    ],
  ].forEach(function([input, expected]) {
    assert.deepEqual(read_orbits(input), expected)
  })
})

QUnit.test('object_orbits()', function(assert) {
  const cases = [
    [test_map_a, 'COM', 0, 'test_map_a, "COM"'],
    [test_map_a, 'D', 3, 'test_map_a, "D"'],
    [test_map_a, 'L', 7, 'test_map_a, "L"'],
    [test_map_b, 'COM', 0, 'test_map_b, "COM"'],
    [test_map_b, 'A', 1, 'test_map_b, "A"'],
    [test_map_b, 'E', 3, 'test_map_b, "E"']
  ]
  cases.forEach(function([orbits, object, expected, args]) {
    assert.equal(object_orbits(orbits, object),
                 expected,
                 'object_orbits(' + args + ') === ' + expected)
  })
})

QUnit.test('total_orbits()', function(assert) {
  const cases = [
    [total_orbits(test_map_a), 42, 'total_orbits(test_map_a)'],
    [total_orbits(test_map_b), 9, 'total_orbits(test_map_b)'],
  ]
  cases.forEach(function([input, expected, desc]) {
    assert.equal(input, expected, desc)
  })
})

QUnit.test('objects_orbiting()', function(assert) {
  [
    [objects_orbiting(test_map_a, 'COM'), new Set(['B'])],
    [objects_orbiting(test_map_a, 'B'), new Set(['C', 'G'])],
    [objects_orbiting(test_map_a, 'D'), new Set(['E', 'I'])],
    [objects_orbiting(test_map_b, 'COM'), new Set(['A', 'B'])],
    [objects_orbiting(test_map_b, 'B'), new Set(['D'])],
    [objects_orbiting(test_map_b, 'D'), new Set(['E'])],
    [objects_orbiting(test_map_b, 'E'), new Set()]
  ].forEach(function([input, expected]) {
    assert.deepEqual(input, expected)
  })
})

QUnit.test('transfers_between()', function(assert) {
  [
    [transfers_between(test_map_a, 'J', 'I'), 1],
    [transfers_between(test_map_a, 'H', 'L'), 6],
  ].forEach(function([input, expected]) {
    assert.equal(input, expected)
  })
})

QUnit.test('Solutions', async function(assert) {
  const orbits = await fetch_puzzle_input_lines().then(read_orbits)
  assert.equal(total_orbits(orbits),
               301100,
               'Part 1: total orbits === 301100')
  assert.equal(transfers_between(orbits, 'YOU', 'SAN'),
               547,
               'Part 2: transfers between you and Santa === 547')
})
