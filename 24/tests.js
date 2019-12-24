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
      expected: new Map([[0, 1205552]]),
    },
    {
      input: [
        '#..#.',
        '####.',
        '###.#',
        '##.##',
        '.##..',
      ],
      expected: new Map([[0, 7200233]]),
    },
    {
      input: [
        '#####',
        '....#',
        '....#',
        '...#.',
        '#.###',
      ],
      expected: new Map([[0, 30687775]]),
    },
    {
      input: [
        '#....',
        '####.',
        '...##',
        '#.##.',
        '.##.#',
      ],
      expected: new Map([[0, 23519713]]),
    },
    {
      input: [
        '####.',
        '....#',
        '##..#',
        '.....',
        '##...',
      ],
      expected: new Map([[0, 3165711]]),
    }
  ]
  cases.forEach(function({input, expected}) {
    assert.deepEqual(read_state(input), expected)
  })
})

QUnit.test('neighbours(position)', function(assert) {
  cases = [
    {
      input: '0;0',
      expected: new Set(['0;1', '0;5']),
    },
    {
      input: '0;6',
      expected: new Set(['0;1', '0;5', '0;7', '0;11']),
    },
    {
      input: '0;10',
      expected: new Set(['0;5', '0;11', '0;15']),
    },
    {
      input: '0;19',
      expected: new Set(['0;14', '0;18', '0;24'])
    },
    {
      input: '0;24',
      expected: new Set(['0;19', '0;23']),
    }
  ]
  cases.forEach(function({ input, expected }) {
    assert.deepEqual(
      neighbours(input),
      expected,
      'neighbours("' + input + '")',
    )
  })
})

QUnit.test('neighbours(position, recursive=true)', function(assert) {
  const cases = [
    {
      input: '0;6',
      expected: new Set(['0;1', '0;5', '0;7', '0;11']),
    },
    {
      input: '0;11',
      expected: new Set(['0;6', '0;16', '0;10', '1;0', '1;5', '1;10', '1;15',
                         '1;20'])
    },
    {
      input: '2;14',
      expected: new Set(['2;9', '2;19', '2;13', '1;13']),
    },
    {
      input: '2;17',
      expected: new Set(['2;18', '2;22', '2;16', '3;20', '3;21', '3;22', '3;23',
                         '3;24']),
    },
    {
      input: '6;13',
      expected: new Set(['6;8', '6;14', '6;18', '7;4', '7;9', '7;14', '7;19',
                         '7;24'])
    },
    {
      input: '3;7',
      expected: new Set(['3;2', '3;6', '3;8', '4;0', '4;1', '4;2', '4;3',
                         '4;4'])
    }
  ]
  cases.forEach(function({ input, expected }) {
    assert.deepEqual(
      neighbours(input, true),
      expected,
      'neighbours("' + input + '", true)',
    )
  })
})

QUnit.test('next_minute(state)', function(assert) {
  const states = [
    new Map([[0, 1205552]]),
    new Map([[0, 7200233]]),
    new Map([[0, 30687775]]),
    new Map([[0, 23519713]]),
    new Map([[0, 3165711]])
  ]
  assert.deepEqual(next_minute(states[0]), states[1])
  assert.deepEqual(next_minute(states[1]), states[2])
  assert.deepEqual(next_minute(states[2]), states[3])
  assert.deepEqual(next_minute(states[3]), states[4])
})

QUnit.test('after_minutes(state, mins)', function(assert) {
  const expected = new Map([
    [-5, 4538692],
    [-4, 9175816],
    [-3, 5308485],
    [-2, 15483418],
    [-1, 31720217],
    [0, 2882],
    [1, 33407782],
    [2, 6096231],
    [3, 17859612],
    [4, 361774],
    [5, 501039],
  ])
  assert.deepEqual(
    after_minutes(new Map([[0, 1205552]]), 10),
    expected
  )
})

QUnit.test('total_bugs(state)', function(assert) {
  assert.equal(
    total_bugs(new Map([
      [-5, 4538692],
      [-4, 9175816],
      [-3, 5308485],
      [-2, 15483418],
      [-1, 31720217],
      [0, 2882],
      [1, 33407782],
      [2, 6096231],
      [3, 17859612],
      [4, 361774],
      [5, 501039],
    ])),
    99
  )
})

QUnit.test('biodiversity(initial_state)', function(assert) {
  const initial = new Map([
    [0, 1205552],
  ])
  assert.equal(biodiversity(initial, false), 2129920)
})

QUnit.test('Solutions', async function(assert) {
  const initial = await fetch_puzzle_input_lines().then(read_state)
  assert.equal(
    biodiversity(initial),
    1113073,
    'Part 1: puzzle input has biodiversity of 1113073'
  )
  assert.equal(
    total_bugs(after_minutes(initial, 200)),
    1928,
    'Part 2: 1928 total bugs after 200 minutes in recursive space'
  )
})
