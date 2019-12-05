QUnit.test('op 1 - add arguments together', function(assert) {
  const cases = [
    {
      input: {
        memory: [1, 9, 10, 3, 2, 3, 11, 0, 99, 30, 40, 50],
        ip: 0,
        input: [],
        output: [],
      },
      expected: {
        memory: [1, 9, 10, 70, 2, 3, 11, 0, 99, 30, 40, 50],
        ip: 4,
        input: [],
        output: [],
      },
      desc: 'add - both inputs in position mode'
    },
    {
      input: {
        memory: [1101, 9, 10, 3, 2, 3, 11, 0, 99, 30, 40, 50],
        ip: 0,
        input: [],
        output: [],
      },
      expected: {
        memory: [1101, 9, 10, 19, 2, 3, 11, 0, 99, 30, 40, 50],
        ip: 4,
        input: [],
        output: [],
      },
      desc: 'add - both inputs in immediate mode'
    },
    {
      input: {
        memory: [1001, 9, 10, 5, 2, 3, 11, 0, 99, 30, 40, 50],
        ip: 0,
        input: [],
        output: [],
      },
      expected: {
        memory: [1001, 9, 10, 5, 2, 40, 11, 0, 99, 30, 40, 50],
        ip: 4,
        input: [],
        output: [],
      },
      desc: 'add - one input in position and one in immediate mode'
    }
  ]
  cases.forEach(function({ input, expected, desc }) {
    assert.deepEqual(op(input), expected, desc)
  })
})

QUnit.test('op 2 - multiply arguments together', function(assert) {
  const cases = [
    {
      input: {
        memory: [2, 9, 10, 11, 2, 3, 11, 0, 99, 30, 40, 50],
        ip: 0,
        input: [],
        output: [],
      },
      expected: {
        memory: [2, 9, 10, 11, 2, 3, 11, 0, 99, 30, 40, 1200],
        ip: 4,
        input: [],
        output: [],
      },
      desc: 'multiply - both inputs in position mode'
    },
    {
      input: {
        memory: [1102, 9, 10, 3, 2, 3, 11, 0, 99, 30, 40, 50],
        ip: 0,
        input: [],
        output: [],
      },
      expected: {
        memory: [1102, 9, 10, 90, 2, 3, 11, 0, 99, 30, 40, 50],
        ip: 4,
        input: [],
        output: [],
      },
      desc: 'multiply - both inputs in immediate mode'
    },
    {
      input: {
        memory: [1002, 9, 10, 5, 2, 3, 11, 0, 99, 30, 40, 50],
        ip: 0,
        input: [],
        output: [],
      },
      expected: {
        memory: [1002, 9, 10, 5, 2, 300, 11, 0, 99, 30, 40, 50],
        ip: 4,
        input: [],
        output: [],
      },
      desc: 'multiply - one input in position and one in immediate mode'
    }
  ]
  cases.forEach(function({ input, expected, desc }) {
    assert.deepEqual(op(input), expected, desc)
  })
})

QUnit.test('op 3 - read from input buffer', function(assert) {
  const cases = [
    {
      input: {
        memory: [3, 9, 10, 11, 2, 3, 11, 0, 99, 30, 40, 50],
        ip: 0,
        input: [14],
        output: [],
      },
      expected: {
        memory: [3, 9, 10, 11, 2, 3, 11, 0, 99, 14, 40, 50],
        ip: 2,
        input: [],
        output: [],
      },
      desc: 'input - only item in input buffer'
    },
    {
      input: {
        memory: [3, 2, 10, 5, 2, 3, 11, 0, 99, 30, 40, 50],
        ip: 0,
        input: [4, 34, 15],
        output: [],
      },
      expected: {
        memory: [3, 2, 4, 5, 2, 3, 11, 0, 99, 30, 40, 50],
        ip: 2,
        input: [34, 15],
        output: [],
      },
      desc: 'input - one item from longer input buffer'
    }
  ]
  cases.forEach(function({ input, expected, desc }) {
    assert.deepEqual(op(input), expected, desc)
  })
})

QUnit.test('op 4 - write to output buffer', function(assert) {
  const cases = [
    {
      input: {
        memory: [4, 9, 10, 11, 2, 3, 11, 0, 99, 30, 40, 50],
        ip: 0,
        input: [],
        output: [],
      },
      expected: {
        memory: [4, 9, 10, 11, 2, 3, 11, 0, 99, 30, 40, 50],
        ip: 2,
        input: [],
        output: [30],
      },
      desc: 'output - position mode to empty output buffer'
    },
    {
      input: {
        memory: [4, 10, 10, 11, 2, 3, 11, 0, 99, 30, 40, 50],
        ip: 0,
        input: [],
        output: [13, 16, -1],
      },
      expected: {
        memory: [4, 10, 10, 11, 2, 3, 11, 0, 99, 30, 40, 50],
        ip: 2,
        input: [],
        output: [13, 16, -1, 40],
      },
      desc: 'output - position mode to longer output buffer'
    },
    {
      input: {
        memory: [104, 2, 10, 5, 2, 3, 11, 0, 99, 30, 40, 50],
        ip: 0,
        input: [],
        output: [],
      },
      expected: {
        memory: [104, 2, 10, 5, 2, 3, 11, 0, 99, 30, 40, 50],
        ip: 2,
        input: [],
        output: [2],
      },
      desc: 'output - immediate mode to empty output buffer'
    },
    {
      input: {
        memory: [104, 8, 10, 5, 2, 3, 11, 0, 99, 30, 40, 50],
        ip: 0,
        input: [],
        output: [-1, -3, 0],
      },
      expected: {
        memory: [104, 8, 10, 5, 2, 3, 11, 0, 99, 30, 40, 50],
        ip: 2,
        input: [],
        output: [-1, -3, 0, 8],
      },
      desc: 'output - immediate mode to longer output buffer'
    }
  ]
  cases.forEach(function({ input, expected, desc }) {
    assert.deepEqual(op(input), expected, desc)
  })
})

QUnit.test('run program', function(assert) {
  const cases = [
    {
      programtext: '1,0,0,0,99',
      expected: {
        memory: [2, 0, 0, 0, 99],
        ip: 4,
        input: [],
        output: [],
      },
    },
    {
      programtext: '2,3,0,3,99',
      expected: {
        memory: [2, 3, 0, 6, 99],
        ip: 4,
        input: [],
        output: [],
      },
    },
    {
      programtext: '2,4,4,5,99,0',
      expected: {
        memory: [2, 4, 4, 5, 99, 9801],
        ip: 4,
        input: [],
        output: [],
      },
    },
    {
      programtext: '3,0,4,0,99',
      inputs: '42',
      expected: {
        memory: [42, 0, 4, 0, 99],
        ip: 4,
        input: [],
        output: [42],
      },
    },
    {
      programtext: '1101,100,-1,4,0',
      expected: {
        memory: [1101, 100, -1, 4, 99],
        ip: 4,
        input: [],
        output: [],
      },
    },
  ]
  cases.forEach(function({ programtext, inputs, expected }) {
    if ( inputs == undefined ) {
      assert.deepEqual(run_program(programtext),
                       expected,
                       'run_program("' + programtext + '")')
    } else {
      assert.deepEqual(run_program(programtext, inputs),
                       expected,
                       'run_program("' + programtext + '", "' + inputs + '")')
    }
  })
})

QUnit.test('Solutions', async function(assert) {
  const programtext = await fetch_puzzle_input().then(txt => txt.trim())
  assert.deepEqual(run_program(programtext, '1').output,
                   [0, 0, 0, 0, 0, 0, 0, 0, 0, 11933517],
                   'Part 1: All tests pass and diagnostic code === 11933517')
})
