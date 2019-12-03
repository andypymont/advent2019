QUnit.test('visited(..)', function(assert) {
  const cases = [
    {
      input: 'U5',
      expected: new Map([['0,1', 1], ['0,2', 2], ['0,3', 3], ['0,4', 4],
                         ['0,5', 5]]),
    },
    {
      input: 'R2,U2,L3',
      expected: new Map([['1,0', 1], ['2,0', 2], ['2,1', 3], ['2,2', 4],
                         ['1,2', 5], ['0,2', 6], ['-1,2', 7]]),
    },
    {
      input: 'R8,U5,L5,D3',
      expected: new Map([['1,0', 1], ['2,0', 2], ['3,0', 3], ['4,0', 4],
                         ['5,0', 5], ['6,0', 6], ['7,0', 7], ['8,0', 8],
                         ['8,1', 9], ['8,2', 10], ['8,3', 11], ['8,4', 12],
                         ['8,5', 13], ['7,5', 14], ['6,5', 15], ['5,5', 16],
                         ['4,5', 17], ['3,5', 18], ['3,4', 19], ['3,3', 20],
                         ['3,2', 21]])
    },
  ]
  cases.forEach(function({ input, expected }) {
    assert.deepEqual(visited(input), expected, 'visited("' + input + '")')
  })
})

QUnit.test('crossovers(..)', function(assert) {
  // R8,U5,L5,D3
  const first = new Map([
    ['1,0', 1], ['2,0', 2], ['3,0', 3], ['4,0', 4], ['5,0', 5], ['6,0', 6],
    ['7,0', 7], ['8,0', 8], ['8,1', 9], ['8,2', 10], ['8,3', 11], ['8,4', 12],
    ['8,5', 13], ['7,5', 14], ['6,5', 15], ['5,5', 16], ['4,5', 17],
    ['3,5', 18], ['3,4', 19], ['3,3', 20], ['3,2', 21]
  ])
  // U7,R6,D4,L4
  const second = new Map([
    ['0,1', 1], ['0,2', 2], ['0,3', 3], ['0,4', 4], ['0,5', 5], ['0,6', 6],
    ['0,7', 7], ['1,7', 8], ['2,7', 9], ['3,7', 10], ['4,7', 11], ['5,7', 12],
    ['6,7', 13], ['6,6', 14], ['6,5', 15], ['6,4', 16], ['6,3', 17],
    ['5,3', 18], ['4,3', 19], ['3,3', 20], ['2,3', 21]
  ])
  assert.deepEqual(crossovers([first, second]), new Set(['6,5', '3,3']))
})

QUnit.test('manhattan(..)', function(assert) {
  const cases = [
    { input: '0,0', expected: 0 },
    { input: '1,2', expected: 3 },
    { input: '4,2', expected: 6 },
    { input: '-1,3', expected: 4 },
    { input: '-2,-5', expected: 7 },
    { input: '0,15', expected: 15 },
    { input: '14,-15', expected: 29 },
  ]
  cases.forEach(function( { input, expected } ) {
    assert.equal(manhattan(input), expected)
  })
})

QUnit.test('step_summer(a, b)(..)', function(assert) {
  // R8,U5,L5,D3
  const first = new Map([
    ['1,0', 1], ['2,0', 2], ['3,0', 3], ['4,0', 4], ['5,0', 5], ['6,0', 6],
    ['7,0', 7], ['8,0', 8], ['8,1', 9], ['8,2', 10], ['8,3', 11], ['8,4', 12],
    ['8,5', 13], ['7,5', 14], ['6,5', 15], ['5,5', 16], ['4,5', 17],
    ['3,5', 18], ['3,4', 19], ['3,3', 20], ['3,2', 21]
  ])
  // U7,R6,D4,L4
  const second = new Map([
    ['0,1', 1], ['0,2', 2], ['0,3', 3], ['0,4', 4], ['0,5', 5], ['0,6', 6],
    ['0,7', 7], ['1,7', 8], ['2,7', 9], ['3,7', 10], ['4,7', 11], ['5,7', 12],
    ['6,7', 13], ['6,6', 14], ['6,5', 15], ['6,4', 16], ['6,3', 17],
    ['5,3', 18], ['4,3', 19], ['3,3', 20], ['2,3', 21]
  ])

  const cases = [
    { input: '1,0', expected: 1 },
    { input: '0,3', expected: 3 },
    { input: '6,5', expected: 30 },
    { input: '3,3', expected: 40 },
  ]

  const step_sum = step_summer(first, second)
  cases.forEach(function( { input, expected }) {
    assert.equal(step_sum(input), expected)
  })
})

QUnit.test('nearest_crossing(wires)', function(assert) {
  const cases = [
    {
      input: ['R8,U5,L5,D3',
              'U7,R6,D4,L4'].join('\n'),
      expected: { manhattan: 6, steps: 30 },
    },
    {
      input: ['R75,D30,R83,U83,L12,D49,R71,U7,L72',
              'U62,R66,U55,R34,D71,R55,D58,R83'].join('\n'),
      expected: { manhattan: 159, steps: 610 },
    },
    {
      input: ['R98,U47,R26,D63,R33,U87,L62,D20,R33,U53,R51',
              'U98,R91,D20,R16,D67,R40,U7,R15,U6,R7'].join('\n'),
      expected: { manhattan: 135, steps: 410 },
    }
  ]
  cases.forEach(function({ input, expected }) {
    assert.deepEqual(nearest_crossing(input), expected)
  })
})

QUnit.test('Solutions', async function(assert) {
    const input = await fetch_puzzle_input().then(pi => pi.trim())
    const nearest = nearest_crossing(input)

    assert.equal(nearest['manhattan'],
                 1626,
                 'Part 1: nearest_crossing(input)["manhattan"] == 1626')
    assert.equal(nearest['steps'],
                 27330,
                 'Part 2: nearest_crossing(input)["steps"] == 27330')
})
