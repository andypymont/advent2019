QUnit.test('read_orbits()', function(assert) {
  [
    [
      'COM)B\nB)C\nC)D\nD)E\nE)F\nB)G\nG)H\nD)I\nE)J\nJ)K\nK)L',
      new Map([
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
    ],
    [
      'COM)A\r\nCOM)B\r\nA)C\r\nB)D\r\nD)E',
      new Map([
        ['A', 'COM'],
        ['B', 'COM'],
        ['C', 'A'],
        ['D', 'B'],
        ['E', 'D']
      ])
    ],
  ].forEach(function([input, expected]) {
    assert.deepEqual(read_orbits(input), expected)
  })
})

QUnit.test('object_orbits()', function(assert) {
  const a = new Map([
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
  const b = new Map([
    ['A', 'COM'],
    ['B', 'COM'],
    ['C', 'A'],
    ['D', 'B'],
    ['E', 'D']
  ])
  const cases = [
    [a, 'COM', 0, 'a, "COM"'],
    [a, 'D', 3, 'a, "D"'],
    [a, 'L', 7, 'a, "L"'],
    [b, 'COM', 0, 'b, "COM"'],
    [b, 'A', 1, 'b, "A"'],
    [b, 'E', 3, 'b, "E"']
  ]
  cases.forEach(function([orbits, object, expected, args]) {
    assert.equal(object_orbits(orbits, object),
                 expected,
                 'object_orbits(' + args + ') === ' + expected)
  })
})

QUnit.test('total_orbits()', function(assert) {
  const a = new Map([
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
  const b = new Map([
    ['A', 'COM'],
    ['B', 'COM'],
    ['C', 'A'],
    ['D', 'B'],
    ['E', 'D']
  ])
  const cases = [
    [total_orbits(a), 42, 'total_orbits(a)'],
    [total_orbits(b), 9, 'total_orbits(b)'],
  ]
  cases.forEach(function([input, expected, desc]) {
    assert.equal(input, expected, desc)
  })
})

QUnit.test('Solutions', async function(assert) {
  const puzzle_input = await fetch_puzzle_input().then(t => t.trim())
  const orbits = read_orbits(puzzle_input)

  console.log('orbits.size', orbits.size)

  assert.equal(total_orbits(orbits),
               0,
               'Part 1: total_orbits(read_orbits(puzzle_input)) ')
})
