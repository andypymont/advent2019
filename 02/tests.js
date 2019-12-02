QUnit.test('op(1, ...) - adding arguments', function(assert) {
  const input = [1, 9, 10, 3, 2, 3, 11, 0, 99, 30, 40, 50]
  const expected = [1, 9, 10, 70, 2, 3, 11, 0, 99, 30, 40, 50]
  assert.deepEqual(input.map(op(1, 9, 10, 3)), expected)
})

QUnit.test('op(2, ...) - multiplying arguments', function(assert) {
  const input = [1, 9, 10, 70, 2, 3, 11, 0, 99, 30, 40, 50]
  const expected = [3500, 9, 10, 70, 2, 3, 11, 0, 99, 30, 40, 50]
  assert.deepEqual(input.map(op(2, 3, 11, 0)), expected)
})

QUnit.test('run_program() for example programs', function(assert) {
  const cases = [
    { input: [1, 0, 0, 0, 99],
      expected: [2, 0, 0, 0, 99],
    },
    { input: [2, 3, 0, 3, 99],
      expected: [2, 3, 0, 6, 99],
    },
    { input: [2, 4, 4, 5, 99, 0],
      expected: [2, 4, 4, 5, 99, 9801],
    },
    { input: [1, 1, 1, 4, 99, 5, 6, 0, 99],
      expected: [30, 1, 1, 4, 2, 5, 6, 0, 99],
    },
  ]
  cases.forEach(function({ input, expected }) {
    const desc = [
      '[',
      input.join(','),
      '] -> [',
      expected.join(','),
      ']'
    ].join('')
    assert.deepEqual(run_program(input), expected, desc)
  })
})

QUnit.test('read_and_patch_program()', function(assert) {
  const cases = [
    { input: '1,1,1,1,1,99\n',
      expected: [1, 12, 2, 1, 1, 99],
    },
    { input: '4,8,16,32,64,128,256,99\t',
      expected: [4, 12, 2, 32, 64, 128, 256, 99],
    },
  ]
  cases.forEach(function({ input, expected }) {
    const desc = [
      '"',
      input,
      '" => [',
      expected.join(','),
      ']'
    ].join('')
    assert.deepEqual(read_and_patch_program(input), expected, desc)
  })
})

QUnit.test('Solutions', async function(assert) {
  const puzzle_input = await fetch_puzzle_input().then(read_and_patch_program)
  assert.equal(run_program(puzzle_input)[0],
               5434663,
               'Part 1: value at 0 is 5434663')
})
