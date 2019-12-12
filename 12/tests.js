QUnit.test('read_point(input)', function(assert) {
  const cases = [
    ['<x=-1, y=0, z=2>', [-1, 0, 2, 0, 0, 0]],
    ['<x=2, y=-10, z=-7>', [2, -10, -7, 0, 0, 0]],
    ['<x=4, y=-8, z=8>', [4, -8, 8, 0, 0, 0]],
    ['<x=3, y=5, z=-1>', [3, 5, -1, 0, 0, 0]],
  ]
  cases.forEach(function([input, expected]) {
    assert.deepEqual(read_point(input),
                     expected,
                     'read_point("' + input + '")')
  })
})

QUnit.test('apply_gravity(moon, m, moons)', function(assert) {
  const first = [
    [-1, 0, 2, 0, 0, 0],
    [2, -10, -7, 0, 0, 0],
    [4, -8, 8, 0, 0, 0],
    [3, 5, -1, 0, 0, 0],
  ]
  const second = [
    [2, -1, 1, 3, -1, -1],
    [3, -7, -4, 1, 3, 3],
    [1, -7, 5, -3, 1, -3],
    [2, 2, 0, -1, -3, 1]
  ]
  const cases = [
    [first, 0, [-1, 0, 2, 3, -1, -1]],
    [first, 1, [2, -10, -7, 1, 3, 3]],
    [first, 2, [4, -8, 8, -3, 1, -3]],
    [first, 3, [3, 5, -1, -1, -3, 1]],
    [second, 0, [2, -1, 1, 3, -2, -2]],
    [second, 1, [3, -7, -4, -2, 5, 6]],
    [second, 2, [1, -7, 5, 0, 3, -6]],
    [second, 3, [2, 2, 0, -1, -6, 2]],
  ]
  cases.forEach(function([moons, m, expected]) {
    const desc = [
      'apply_gravity([',
      moons[m].join(', '),
      '], ',
      m,
      ', ...) === [',
      expected.join(', '),
      ']'
    ].join('')
    assert.deepEqual(apply_gravity(moons[m], m, moons),
                                   expected,
                                   desc)
  })
})

QUnit.test('advance_moon(moon)', function(assert) {
  const cases = [
    {
      input: [-1, 0, 2, 3, -1, -1],
      expected: [2, -1, 1, 3, -1, -1],
    },
    {
      input: [2, -10, -7, 1, 3, 3],
      expected: [3, -7, -4, 1, 3, 3],
    },
    {
      input: [4, -8, 8, -3, 1, -3],
      expected: [1, -7, 5, -3, 1, -3],
    },
    {
      input: [3, 5, -1, -1, -3, 1],
      expected: [2, 2, 0, -1, -3, 1],
    },
    {
      input: [2, -1, 1, 3, -2, -2],
      expected: [5, -3, -1, 3, -2, -2],
    },
    {
      input: [3, -7, -4, -2, 5, 6],
      expected: [1, -2, 2, -2, 5, 6],
    },
    {
      input: [1, -7, 5, 0, 3, -6],
      expected: [1, -4, -1, 0, 3, -6],
    },
    {
      input: [2, 2, 0, -1, -6, 2],
      expected: [1, -4, 2, -1, -6, 2],
    }
  ]
  cases.forEach(function({ input, expected }) {
    const desc = [
      'advance_moon([',
      input.join(', '),
      ']) === [',
      expected.join(', '),
      ']'
    ]
    assert.deepEqual(advance_moon(input), expected, desc)
  })
})

QUnit.test('progress_motion(moons)', function(assert) {
  const frames = [
    [
      [-1, 0, 2, 0, 0, 0],
      [2, -10, -7, 0, 0, 0],
      [4, -8, 8, 0, 0, 0],
      [3, 5, -1, 0, 0, 0],
    ],
    [
      [2, -1, 1, 3, -1, -1],
      [3, -7, -4, 1, 3, 3],
      [1, -7, 5, -3, 1, -3],
      [2, 2, 0, -1, -3, 1],
    ],
    [
      [5, -3, -1, 3, -2, -2],
      [1, -2, 2, -2, 5, 6],
      [1, -4, -1, 0, 3, -6],
      [1, -4, 2, -1, -6, 2],
    ],
    [
      [5, -6, -1, 0, -3, 0],
      [0, 0, 6, -1, 2, 4],
      [2, 1, -5, 1, 5, -4],
      [1, -8, 2, 0, -4, 0],
    ],
    [
      [2, -8, 0, -3, -2, 1],
      [2, 1, 7, 2, 1, 1],
      [2, 3, -6, 0, 2, -1],
      [2, -9, 1, 1, -1, -1],
    ],
    [
      [-1, -9, 2, -3, -1, 2],
      [4, 1, 5, 2, 0, -2],
      [2, 2, -4, 0, -1, 2],
      [3, -7, -1, 1, 2, -2],
    ],
    [
      [-1, -7, 3, 0, 2, 1],
      [3, 0, 0, -1, -1, -5],
      [3, -2, 1, 1, -4, 5],
      [3, -4, -2, 0, 3, -1],
    ],
    [
      [2, -2, 1, 3, 5, -2],
      [1, -4, -4, -2, -4, -4],
      [3, -7, 5, 0, -5, 4],
      [2, 0, 0, -1, 4, 2],
    ],
    [
      [5, 2, -2, 3, 4, -3],
      [2, -7, -5, 1, -3, -1],
      [0, -9, 6, -3, -2, 1],
      [1, 1, 3, -1, 1, 3],
    ],
    [
      [5, 3, -4, 0, 1, -2],
      [2, -9, -3, 0, -2, 2],
      [0, -8, 4, 0, 1, -2],
      [1, 1, 5, 0, 0, 2],
    ],
    [
      [2, 1, -3, -3, -2, 1],
      [1, -8, 0, -1, 1, 3],
      [3, -6, 1, 3, 2, -3],
      [2, 0, 4, 1, -1, -1],
    ]
  ]
  Array(10).fill()
           .forEach(function(_, frame) {
             assert.deepEqual(
               progress_motion(frames[frame]),
               frames[frame + 1],
               'progress_motion(..frame ' + frame + '..)'
             )
           })
})

QUnit.test('energy(moon)', function(assert) {
  const cases = [
    [[2, 1, -3, -3, -2, 1], 36],
    [[1, -8, 0, -1, 1, 3], 45],
    [[3, -6, 1, 3, 2, -3], 80],
    [[2, 0, 4, 1, -1, -1], 18],
  ]
  cases.forEach(function([input, expected]) {
    const desc = [
      'energy([',
      input.join(', '),
      ']) === ',
      expected
    ].join('')
    assert.equal(energy(input), expected, desc)
  })
})

QUnit.test('total_energy(moons, steps)', function(assert) {
  const cases = [
    {
      moons: [
        [-1, 0, 2, 0, 0, 0],
        [2, -10, -7, 0, 0, 0],
        [4, -8, 8, 0, 0, 0],
        [3, 5, -1, 0, 0, 0],
      ],
      steps: 10,
      expected: 179,
    },
    {
      moons: [
        [-8, -10, 0, 0, 0, 0],
        [5, 5, 10, 0, 0, 0],
        [2, -7, 3, 0, 0, 0],
        [9, -8, -3, 0, 0, 0],
      ],
      steps: 100,
      expected: 1940
    }
  ]
  cases.forEach(function({ moons, steps, expected }, ex) {
    assert.equal(total_energy(moons, steps),
                 expected,
                 'example ' + (ex+1) + ' after ' + steps + ' steps')
  })
})

QUnit.test('Solutions', async function(assert) {
  const moons = await fetch_puzzle_input_lines().then(
    input => input.map(read_point)
  )
  assert.equal(
    total_energy(moons, 1000),
    12644,
    'Part 1: total energy after 1000 iterations === 12,644'
  )
})
