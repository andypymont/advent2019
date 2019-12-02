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

QUnit.test('read_program()', function(assert) {
  const cases = [
    { input: '1,12,2,1,1,99\n',
      expected: [1, 12, 2, 1, 1, 99],
    },
    { input: '4,8,16,32,64,128,256,99\t',
      expected: [4, 8, 16, 32, 64, 128, 256, 99],
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
    assert.deepEqual(read_program(input), expected, desc)
  })
})

QUnit.test('find_verb_and_noun(...)', function(assert) {
  const cases = [
    [1, 1],
    [3, 3],
    [4, 5],
    [12, 201],
  ]
  cases.forEach(function( [noun, verb] ) {
    function tester(mem, n, v) {
      if ( n == noun && v == verb) {
        return 19690720
      } else {
        return 1
      }
    }
    assert.deepEqual(find_verb_and_noun([], tester), { noun, verb })
  })
})

QUnit.test('Solutions', async function(assert) {
  const program = await fetch_puzzle_input().then(read_program)
  assert.equal(run_intcode(program, 12, 2),
               5434663,
               'Part 1: run_intcode(program, 12, 2) == 5434663')
  assert.deepEqual(find_verb_and_noun(program),
                   { 'noun': 45, 'verb': 59 },
                   'Part 2: find_verb_and_noun(program) -> noun:45, verb:59')
                   // 100 * 45 * 59 == 265500
})
