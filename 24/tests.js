QUnit.test('read_state(state)', function(assert) {
  const cases = [
    {
      input: [
        '....#',
        '#..#.',
        '#..##',
        '..#..',
        '#....',
      ],
      expected: [0, 0, 0, 0, 1, 1, 0, 0, 1, 0, 1, 0, 0, 1, 1, 0, 0, 1, 0, 0, 1,
                 0, 0, 0, 0],
    },
    {
      input: [
        '#..#.',
        '####.',
        '###.#',
        '##.##',
        '.##..',
      ],
      expected: [1, 0, 0, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 0,
                 1, 1, 0, 0],
    },
    {
      input: [
        '#####',
        '....#',
        '....#',
        '...#.',
        '#.###',
      ],
      expected: [1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1,
                 0, 1, 1, 1],
    },
    {
      input: [
        '#....',
        '####.',
        '...##',
        '#.##.',
        '.##.#',
      ],
      expected: [1, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 0, 1, 1, 0, 0,
                 1, 1, 0, 1],
    },
    {
      input: [
        '####.',
        '....#',
        '##..#',
        '.....',
        '##...',
      ],
      expected: [1, 1, 1, 1, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 1, 0, 0, 0, 0, 0, 1,
                 1, 0, 0, 0],
    }
  ]
  cases.forEach(function({ input, expected }, min) {
    assert.deepEqual(
      read_state(input),
      expected,
      'example after ' + min + ' minutes'
    )
  })
})

QUnit.test('next_minute(state)', function(assert) {
  const cases = [
    [
      [0, 0, 0, 0, 1, 1, 0, 0, 1, 0, 1, 0, 0, 1, 1, 0, 0, 1, 0, 0, 1, 0, 0, 0,
       0],
      [1, 0, 0, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 0, 1, 1, 0,
       0],
    ],
    [
      [1, 0, 0, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 0, 1, 1, 0,
       0],
      [1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 1, 1,
       1],
    ],
    [
      [1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 1, 1,
       1],
      [1, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 0, 1, 1, 0, 0, 1, 1, 0,
       1],
    ],
    [
      [1, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 0, 1, 1, 0, 0, 1, 1, 0,
       1],
      [1, 1, 1, 1, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 1, 0, 0, 0, 0, 0, 1, 1, 0, 0,
       0],
    ]
  ]
  cases.forEach(function([before, after], min) {
    assert.deepEqual(
      next_minute(before),
      after,
      'advance from minute ' + min + ' to minute ' + (min+1)
    )
  })
})

QUnit.test('first_repeat(state)', function(assert) {
  const initial = [0, 0, 0, 0, 1, 1, 0, 0, 1, 0, 1, 0, 0, 1, 1, 0, 0, 1, 0, 0,
                   1, 0, 0, 0, 0]
  assert.deepEqual(
    first_repeat(initial),
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0]
  )
})

QUnit.test('Solutions', async function(assert) {
  const initial = await fetch_puzzle_input_lines().then(read_state)
  assert.equal(
    parseInt(first_repeat(initial).reverse().join(''), 2),
    1113073,
    'Part 1: first repeated state has biodiversity of 0'
  )
})
