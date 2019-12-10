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

QUnit.test('angle_between()', function(assert) {
  const cases = [
    [[0, 0], [2, 0], 90],
    [[0, 0], [1, 1], 135],
    [[1, 2], [7, 3], 99.46],
    [[1, 2], [8, 7], 125.54],
    [[5, 8], [7, 3], 21.80],
    [[5, 8], [8, 9], 108.43],
    [[5, 8], [1, 9], 255.96],
  ]
  cases.forEach(function([a, b, expected]) {
    const desc = [
      'angle_between([',
      a.join(', '),
      '], [',
      b.join(', '),
      ']) === ',
      expected
    ].join('')
    assert.equal(angle_between(a, b), expected, desc)
  })
})

QUnit.test('asteroids_visible()', function(assert) {
  const cases = [
    {
      asteroids: [
        [6, 0], [8, 0], [0, 1], [3, 1], [5, 1], [2, 2], [3, 2], [4, 2], [5, 2],
        [6, 2], [7, 2], [8, 2], [1, 3], [3, 3], [5, 3], [6, 3], [7, 3], [1, 4],
        [4, 4], [2, 5], [7, 5], [9, 5], [0, 6], [3, 6], [8, 6], [1, 7], [2, 7],
        [4, 7], [7, 7], [8, 7], [9, 7], [0, 8], [1, 8], [5, 8], [8, 8], [1, 9],
        [6, 9], [7, 9], [8, 9], [9, 9]
      ],
      position: [5, 8],
      ix: 33,
      expected: [
        [5, 3], [6, 0], [6, 2], [6, 3], [7, 2], [8, 0], [7, 3], [8, 2], [7, 5],
        [9, 5], [8, 6], [7, 7], [8, 7], [9, 7], [8, 8], [9, 9], [8, 9], [7, 9],
        [6, 9], [1, 9], [1, 8], [1, 7], [2, 7], [0, 6], [4, 7], [1, 3], [0, 1],
        [2, 2], [3, 3], [3, 2], [3, 1], [4, 4], [4, 2]
      ]
    },
    {
      asteroids: [
        [0, 0], [2, 0], [6, 0], [8, 0], [1, 1], [2, 1], [3, 1], [8, 1], [1, 2],
        [6, 2], [0, 3], [1, 3], [3, 3], [5, 3], [7, 3], [9, 3], [4, 4], [6, 4],
        [8, 4], [1, 5], [2, 5], [5, 5], [6, 5], [7, 5], [9, 5], [2, 6], [6, 6],
        [7, 6], [2, 7], [3, 7], [8, 7], [9, 7], [6, 8], [1, 9], [2, 9], [3, 9],
        [4, 9], [6, 9], [7, 9], [8, 9]
      ],
      position: [1, 2],
      ix: 8,
      expected: [
        [1, 1], [2, 0], [2, 1], [3, 1], [6, 0], [8, 0], [8, 1], [6, 2], [9, 3],
        [7, 3], [5, 3], [8, 4], [9, 5], [6, 4], [3, 3], [6, 5], [9, 7], [4, 4],
        [8, 7], [5, 5], [6, 6], [8, 9], [7, 9], [6, 8], [6, 9], [4, 9], [3, 7],
        [2, 5], [3, 9], [2, 6], [2, 7], [2, 9], [1, 3], [0, 3], [0, 0]
      ]
    }
  ]
  cases.forEach(function({asteroids, position, ix, expected}, ex) {
    assert.deepEqual(asteroids_visible(position, ix, asteroids),
                     expected,
                     'asteroids_visible(..) for example ' + (ex + 1))
  })
})

QUnit.test('most_asteroids_visible()', function(assert) {
  const cases = [
    {
      input: [
        [6, 0], [8, 0], [0, 1], [3, 1], [5, 1], [2, 2], [3, 2], [4, 2], [5, 2],
        [6, 2], [7, 2], [8, 2], [1, 3], [3, 3], [5, 3], [6, 3], [7, 3], [1, 4],
        [4, 4], [2, 5], [7, 5], [9, 5], [0, 6], [3, 6], [8, 6], [1, 7], [2, 7],
        [4, 7], [7, 7], [8, 7], [9, 7], [0, 8], [1, 8], [5, 8], [8, 8], [1, 9],
        [6, 9], [7, 9], [8, 9], [9, 9],
      ],
      expected: [
        [5, 3], [6, 0], [6, 2], [6, 3], [7, 2], [8, 0], [7, 3], [8, 2], [7, 5],
        [9, 5], [8, 6], [7, 7], [8, 7], [9, 7], [8, 8], [9, 9], [8, 9], [7, 9],
        [6, 9], [1, 9], [1, 8], [1, 7], [2, 7], [0, 6], [4, 7], [1, 3], [0, 1],
        [2, 2], [3, 3], [3, 2], [3, 1], [4, 4], [4, 2]
      ]
    },
    {
      input: [
        [0, 0], [2, 0], [6, 0], [8, 0], [1, 1], [2, 1], [3, 1], [8, 1], [1, 2],
        [6, 2], [0, 3], [1, 3], [3, 3], [5, 3], [7, 3], [9, 3], [4, 4], [6, 4],
        [8, 4], [1, 5], [2, 5], [5, 5], [6, 5], [7, 5], [9, 5], [2, 6], [6, 6],
        [7, 6], [2, 7], [3, 7], [8, 7], [9, 7], [6, 8], [1, 9], [2, 9], [3, 9],
        [4, 9], [6, 9], [7, 9], [8, 9]
      ],
      expected: [
        [1, 1], [2, 0], [2, 1], [3, 1], [6, 0], [8, 0], [8, 1], [6, 2], [9, 3],
        [7, 3], [5, 3], [8, 4], [9, 5], [6, 4], [3, 3], [6, 5], [9, 7], [4, 4],
        [8, 7], [5, 5], [6, 6], [8, 9], [7, 9], [6, 8], [6, 9], [4, 9], [3, 7],
        [2, 5], [3, 9], [2, 6], [2, 7], [2, 9], [1, 3], [0, 3], [0, 0]
      ]
    }
  ]
  cases.forEach(function({input, expected}, ex) {
    assert.deepEqual(most_asteroids_visible(input),
                     expected,
                     'most_asteroids_visible(..) for example ' + (ex + 1))
  })
})

QUnit.test('Solutions', async function(assert) {
  const asteroids = await fetch_puzzle_input().then(read_map)
  const visible = most_asteroids_visible(asteroids)
  assert.equal(visible.length,
               230,
               'Part 1 - max possible visible asteroids: 230')
  assert.deepEqual(visible[199],
                   [12, 5],
                   'Part 2 - 200th item clockwise: x=12, y=5')
})
