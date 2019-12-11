QUnit.test('run_program() for example programs', function(assert) {
  const cases = [
    { input: '1,0,0,0,99',
      expected: [2, 0, 0, 0, 99],
    },
    { input: '2,3,0,3,99',
      expected: [2, 3, 0, 6, 99],
    },
    { input: '2,4,4,5,99,0',
      expected: [2, 4, 4, 5, 99, 9801],
    },
    { input: '1,1,1,4,99,5,6,0,99',
      expected: [30, 1, 1, 4, 2, 5, 6, 0, 99],
    },
  ]
  cases.forEach(function({ input, expected }) {
    const desc = [
      '"',
      input,
      '" -> [',
      expected.join(', '),
      ']'
    ].join('')
    assert.deepEqual(run_program(read_program(input)).memory, expected, desc)
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
