QUnit.test('visited(..)', function(assert) {
  const cases = [
    {
      input: 'U5',
      expected: ['0,0', '0,1', '0,2', '0,3', '0,4', '0,5'],
    },
    {
      input: 'R2,U2,L3',
      expected: ['0,0', '1,0', '2,0', '2,1', '2,2', '1,2', '0,2', '-1,2'],
    },
    {
      input: 'R8,U5,L5,D3',
      expected: ['0,0', '1,0', '2,0', '3,0', '4,0', '5,0', '6,0', '7,0', '8,0',
                 '8,1', '8,2', '8,3', '8,4', '8,5', '7,5', '6,5', '5,5', '4,5',
                 '3,5', '3,4', '3,3', '3,2'],
    }
  ]
  cases.forEach(function({ input, expected }) {
    assert.propEqual(visited(input), new Set(expected), 'visited(' + input + ')')
  })
})

QUnit.test('crossovers(..)', function(assert) {
  // R8,U5,L5,D3
  const first = new Set([
    '0,0', '1,0', '2,0', '3,0', '4,0', '5,0', '6,0', '7,0', '8,0', '8,1', '8,2',
    '8,3', '8,4', '8,5', '7,5', '6,5', '5,5', '4,5', '3,5', '3,4', '3,3', '3,2'
  ])
  // U7,R6,D4,L4
  const second = new Set([
    '0,0', '0,1', '0,2', '0,3', '0,4', '0,5', '0,6', '0,7', '1,7', '2,7', '3,7',
    '4,7', '5,7', '6,7', '6,6', '6,5', '6,4', '6,3', '5,3', '4,3', '3,3', '2,3'
  ])
  assert.propEqual(crossovers([first, second]), new Set(['0,0', '6,5', '3,3']))
})

QUnit.test('nearest_crossing(..)', function(assert) {
  const cases = [
    {
      input: ['R8,U5,L5,D3',
              'U7,R6,D4,L4'].join('\n'),
      expected: 6,
    },
    {
      input: ['R75,D30,R83,U83,L12,D49,R71,U7,L72',
              'U62,R66,U55,R34,D71,R55,D58,R83'].join('\n'),
      expected: 159,
    },
    {
      input: ['R98,U47,R26,D63,R33,U87,L62,D20,R33,U53,R51',
              'U98,R91,D20,R16,D67,R40,U7,R15,U6,R7'].join('\n'),
      expected: 135,
    }
  ]
  cases.forEach(function({ input, expected }) {
    assert.equal(nearest_crossing(input), expected)
  })
})

QUnit.test('Solutions', async function(assert) {
    const input = await fetch_puzzle_input().then(pi => pi.trim())
    assert.equal(nearest_crossing(input),
                 1626,
                 'Part 1: nearest_crossing(input) == 1626')
})
