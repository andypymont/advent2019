QUnit.test('ascii_program()', function(assert) {
  const cases = [
    {
      input: [
        104, 104, 104, 101, 104, 108, 104, 108, 104, 111, 104, 32, 104, 119,
        104, 111, 104, 114, 104, 108, 104, 100, 99
      ].join(','),
      expected: 'hello world',
    },
    {
      input: [
        104, 46, 104, 46, 104, 35, 104, 46, 104, 46, 104, 46, 104, 46, 104, 46,
        104, 46, 104, 46, 104, 46, 104, 46, 104, 46, 104, 10, 104, 46, 104, 46,
        104, 35, 104, 46, 104, 46, 104, 46, 104, 46, 104, 46, 104, 46, 104, 46,
        104, 46, 104, 46, 104, 46, 104, 10, 104, 35, 104, 35, 104, 35, 104, 35,
        104, 35, 104, 35, 104, 35, 104, 46, 104, 46, 104, 46, 104, 35, 104, 35,
        104, 35, 104, 10, 104, 35, 104, 46, 104, 35, 104, 46, 104, 46, 104, 46,
        104, 35, 104, 46, 104, 46, 104, 46, 104, 35, 104, 46, 104, 35, 104, 10,
        104, 35, 104, 35, 104, 35, 104, 35, 104, 35, 104, 35, 104, 35, 104, 35,
        104, 35, 104, 35, 104, 35, 104, 35, 104, 35, 104, 10, 104, 46, 104, 46,
        104, 35, 104, 46, 104, 46, 104, 46, 104, 35, 104, 46, 104, 46, 104, 46,
        104, 35, 104, 46, 104, 46, 104, 10, 104, 46, 104, 46, 104, 35, 104, 35,
        104, 35, 104, 35, 104, 35, 104, 46, 104, 46, 104, 46, 104, 94, 104, 46,
        104, 46, 99
      ].join(','),
      expected: '..#..........\n..#..........\n#######...###\n#.#...#...#.#\n' +
                '#############\n..#...#...#..\n..#####...^..',
    }
  ]
  cases.forEach(function({ input, expected }) {
    assert.equal(
      ascii_program(input),
      expected,
      'ascii_program(...) === "' + expected + '"',
    )
  })
})

QUnit.test('find_intersections(map)', function(assert) {
  const map = [
    '..#..........',
    '..#..........',
    '#######...###',
    '#.#...#...#.#',
    '#############',
    '..#...#...#..',
    '..#####...^..',
  ].join('\n')
  assert.deepEqual(
    find_intersections(map),
    [[2, 2], [2, 4], [6, 4], [10, 4]],
  )
})

QUnit.test('alignment_parameter(intersection)', function(assert) {
  const cases = [
    [[2, 2], 4],
    [[13, 4], 52],
    [[2, 4], 8],
    [[4, 6], 24],
    [[5, 5], 25],
    [[1, 21], 21],
    [[4, 10], 40],
  ]
  cases.forEach(function([input, expected]) {
    assert.equal(
      alignment_parameter(input),
      expected,
      'alignment_parameter([' + input.join(', ') + ']) === ' + expected
    )
  })
})

QUnit.test('Solutions', async function(assert) {
  const map = await fetch_puzzle_input().then(ascii_program)
  const intersections = find_intersections(map)
  assert.equal(
    intersections.map(alignment_parameter).reduce((a, b) => a + b),
    6212,
    'Part 1: total of alignment parameters for intersections = 6212',
  )
})
