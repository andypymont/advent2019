QUnit.test('read_map()', function(assert) {
  const cases = [
    [
      '.#..#\n.....\n#####\n....#\n...##\n',
      [
        [1, 0], [4, 0],
        [0, 2], [1, 2], [2, 2], [3, 2], [4, 2],
        [4, 3],
        [3, 4], [4, 4],
      ],
    ],
    [
      '......#.#.\n#..#.#....\n..#######.\n.#.#.###..\n.#..#.....\n' +
      '..#....#.#\n#..#....#.\n.##.#..###\n##...#..#.\n.#....####',
      [
        [6, 0], [8, 0],
        [0, 1], [3, 1], [5, 1],
        [2, 2], [3, 2], [4, 2], [5, 2], [6, 2], [7, 2], [8, 2],
        [1, 3], [3, 3], [5, 3], [6, 3], [7, 3],
        [1, 4], [4, 4],
        [2, 5], [7, 5], [9, 5],
        [0, 6], [3, 6], [8, 6],
        [1, 7], [2, 7], [4, 7], [7, 7], [8, 7], [9, 7],
        [0, 8], [1, 8], [5, 8], [8, 8],
        [1, 9], [6, 9], [7, 9], [8, 9], [9, 9],
      ]
    ],
    [
      '......#.#.\n#..#.#....\n..#######.\n.#.#.###..\n.#..#.....\n' +
      '..#....#.#\n#..#....#.\n.##.#..###\n##...#..#.\n.#....####',
      [
        [6, 0], [8, 0],
        [0, 1], [3, 1], [5, 1],
        [2, 2], [3, 2], [4, 2], [5, 2], [6, 2], [7, 2], [8, 2],
        [1, 3], [3, 3], [5, 3], [6, 3], [7, 3],
        [1, 4], [4, 4],
        [2, 5], [7, 5], [9, 5],
        [0, 6], [3, 6], [8, 6],
        [1, 7], [2, 7], [4, 7], [7, 7], [8, 7], [9, 7],
        [0, 8], [1, 8], [5, 8], [8, 8],
        [1, 9], [6, 9], [7, 9], [8, 9], [9, 9],
      ]
    ]
  ]
  cases.forEach(function([input, expected]) {
    assert.deepEqual(read_map(input),
                     expected,
                     'read_map("' + input + '")')
  })
})

QUnit.test('line_of_sight()', function(assert) {
  const asteroids = [
    [3, 1], [3, 2], [1, 3], [2, 3], [3, 3], [4, 3], [2, 4],
  ]
  const cases = [
    [[0, 1], true],
    [[1, 1], true],
    [[3, 1], true],
    [[3, 2], true],
    [[2, 3], true],
    [[4, 3], true],
    [[6, 2], false],
    [[9, 3], false],
    [[4, 4], false],
    [[5, 5], false],
    [[2, 6], false],
  ]
  cases.forEach(function([coords, expected]) {
    const desc = [
      'line_of_sight([',
      coords.join(', '),
      '], asteroids) === ',
      expected
    ].join('')
    assert.equal(line_of_sight(coords, asteroids),
                 expected,
                 desc)
  })
})

QUnit.test('line_of_sight() for example 1', function(assert) {
  const asteroids = [
    [1, -8], [3, -8],
    [-5, -7], [-2, -7], [0, -7],
    [-3, -6], [-2, -6], [-1, -6], [0, -6], [1, -6], [2, -6], [3, -6],
    [-4, -5], [-2, -5], [0, -5], [1, -5], [2, -5],
    [-4, -4], [-1, -4],
    [-3, -3], [2, -3], [4, -3],
    [-5, -2], [-2, -2], [3, -2],
    [-4, -1], [-3, -1], [-1, -1], [2, -1], [3, -1], [4, -1],
    [-5, 0], [-4, 0], [0, 0], [3, 0],
    [-4, 1], [1, 1], [2, 1], [3, 1], [4, 1],
  ]
  const visible = [
    true, true,
    true, true, false,
    true, true, true, false, true, true, true,
    true, true, true, true, true,
    false, true,
    false, true, true,
    true, false, true,
    true, true, true, true, true, true,
    false, true, 'N/A', true,
    true, true, true, true, true,
  ]
  asteroids.forEach(function(asteroid, ix, asteroids) {
    if (visible[ix] !== 'N/A') {
      const desc = [
        '[',
        asteroid[0],
        ', ',
        asteroid[1],
        '] visible: ',
        visible[ix]
      ].join('')
      assert.equal(line_of_sight(asteroid, asteroids),
                   visible[ix],
                   desc)
    }
  })
})

QUnit.test('line_of_sight() for example 2', function(assert) {
  const asteroids = [
    [-1, -2], [1, -2], [5, -2], [7, -2],
    [0, -1], [1, -1], [2, -1], [7, -1],
    [0, 0], [5, 0],
    [-1, 1], [0, 1], [2, 1], [4, 1], [6, 1], [8, 1],
    [3, 2], [5, 2], [7, 2],
    [0, 3], [1, 3], [4, 3], [5, 3], [6, 3], [8, 3],
    [1, 4], [5, 4], [6, 4],
    [1, 5], [2, 5], [7, 5], [8, 5],
    [5, 6],
    [0, 7], [1, 7], [2, 7], [3, 7], [5, 7], [6, 7], [7, 7],
  ]
  const visible = [
    true, true, true, true,
    true, true, true, true,
    'N/A', true,
    true, true, true, true, true, true,
    true, true, true,
    false, true, true, true, false, true,
    true, true, false,
    true, true, true, true,
    true,
    false, true, true, true, true, true, true,
  ]
  asteroids.forEach(function(asteroid, ix, asteroids) {
    if (visible[ix] !== 'N/A') {
      const desc = [
        '[',
        asteroid[0],
        ', ',
        asteroid[1],
        '] visible: ',
        visible[ix]
      ].join('')
      assert.equal(line_of_sight(asteroid, asteroids),
                   visible[ix],
                   desc)
    }
  })
})

QUnit.test('asteroids_visible()', function(assert) {
  const cases = [
    [
      [
        [6, 0], [8, 0], [0, 1], [3, 1], [5, 1], [2, 2], [3, 2], [4, 2], [5, 2],
        [6, 2], [7, 2], [8, 2], [1, 3], [3, 3], [5, 3], [6, 3], [7, 3], [1, 4],
        [4, 4], [2, 5], [7, 5], [9, 5], [0, 6], [3, 6], [8, 6], [1, 7], [2, 7],
        [4, 7], [7, 7], [8, 7], [9, 7], [0, 8], [1, 8], [5, 8], [8, 8], [1, 9],
        [6, 9], [7, 9], [8, 9], [9, 9],
      ],
      [5, 8],
      33,
      33,
    ],
    [
      [
        [0, 0], [2, 0], [6, 0], [8, 0], [1, 1], [2, 1], [3, 1], [8, 1], [1, 2],
        [6, 2], [0, 3], [1, 3], [3, 3], [5, 3], [7, 3], [9, 3], [4, 4], [6, 4],
        [8, 4], [1, 5], [2, 5], [5, 5], [6, 5], [7, 5], [9, 5], [2, 6], [6, 6],
        [7, 6], [2, 7], [3, 7], [8, 7], [9, 7], [6, 8], [1, 9], [2, 9], [3, 9],
        [4, 9], [6, 9], [7, 9], [8, 9]
      ],
      [1, 2],
      8,
      35,
    ]
  ]
  cases.forEach(function([asteroids, position, ix, visible], ex) {
    assert.equal(asteroids_visible(position, ix, asteroids),
                 visible,
                 'example ' + ex + ' has ' + visible + ' visible')
  })
})

QUnit.test('most_asteroids_visible()', function(assert) {
  const cases = [
    [
      [
        [6, 0], [8, 0], [0, 1], [3, 1], [5, 1], [2, 2], [3, 2], [4, 2], [5, 2],
        [6, 2], [7, 2], [8, 2], [1, 3], [3, 3], [5, 3], [6, 3], [7, 3], [1, 4],
        [4, 4], [2, 5], [7, 5], [9, 5], [0, 6], [3, 6], [8, 6], [1, 7], [2, 7],
        [4, 7], [7, 7], [8, 7], [9, 7], [0, 8], [1, 8], [5, 8], [8, 8], [1, 9],
        [6, 9], [7, 9], [8, 9], [9, 9],
      ],
      33,
    ],
    [
      [
        [0, 0], [2, 0], [6, 0], [8, 0], [1, 1], [2, 1], [3, 1], [8, 1], [1, 2],
        [6, 2], [0, 3], [1, 3], [3, 3], [5, 3], [7, 3], [9, 3], [4, 4], [6, 4],
        [8, 4], [1, 5], [2, 5], [5, 5], [6, 5], [7, 5], [9, 5], [2, 6], [6, 6],
        [7, 6], [2, 7], [3, 7], [8, 7], [9, 7], [6, 8], [1, 9], [2, 9], [3, 9],
        [4, 9], [6, 9], [7, 9], [8, 9]
      ],
      35,
    ]
  ]
  cases.forEach(function([input, expected], c) {
    const desc = [
      'most_asteroids_visible(cases[',
      c,
      '][0]) === ',
      expected
    ].join('')
    assert.equal(most_asteroids_visible(input),
                 expected,
                 desc)
  })
})

QUnit.test('Solutions', async function(assert) {
  const asteroids = await fetch_puzzle_input().then(read_map)
  assert.equal(most_asteroids_visible(asteroids),
               230,
               'Part 1 - max possible visible asteroids: 230  ')
})
