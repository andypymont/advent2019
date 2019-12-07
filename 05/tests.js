QUnit.test('op 1 - add arguments together', function(assert) {
  const cases = [
    {
      input: {
        memory: [1, 9, 10, 3, 2, 3, 11, 0, 99, 30, 40, 50],
        ip: 0,
        input: [],
        output: [],
        status: 'ready',
      },
      expected: {
        memory: [1, 9, 10, 70, 2, 3, 11, 0, 99, 30, 40, 50],
        ip: 4,
        input: [],
        output: [],
        status: 'ready',
      },
      desc: 'add - both inputs in position mode'
    },
    {
      input: {
        memory: [1101, 9, 10, 3, 2, 3, 11, 0, 99, 30, 40, 50],
        ip: 0,
        input: [],
        output: [],
        status: 'ready',
      },
      expected: {
        memory: [1101, 9, 10, 19, 2, 3, 11, 0, 99, 30, 40, 50],
        ip: 4,
        input: [],
        output: [],
        status: 'ready',
      },
      desc: 'add - both inputs in immediate mode'
    },
    {
      input: {
        memory: [1001, 9, 10, 5, 2, 3, 11, 0, 99, 30, 40, 50],
        ip: 0,
        input: [],
        output: [],
        status: 'ready',
      },
      expected: {
        memory: [1001, 9, 10, 5, 2, 40, 11, 0, 99, 30, 40, 50],
        ip: 4,
        input: [],
        output: [],
        status: 'ready',
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
        status: 'ready',
      },
      expected: {
        memory: [2, 9, 10, 11, 2, 3, 11, 0, 99, 30, 40, 1200],
        ip: 4,
        input: [],
        output: [],
        status: 'ready',
      },
      desc: 'multiply - both inputs in position mode'
    },
    {
      input: {
        memory: [1102, 9, 10, 3, 2, 3, 11, 0, 99, 30, 40, 50],
        ip: 0,
        input: [],
        output: [],
        status: 'ready',
      },
      expected: {
        memory: [1102, 9, 10, 90, 2, 3, 11, 0, 99, 30, 40, 50],
        ip: 4,
        input: [],
        output: [],
        status: 'ready',
      },
      desc: 'multiply - both inputs in immediate mode'
    },
    {
      input: {
        memory: [1002, 9, 10, 5, 2, 3, 11, 0, 99, 30, 40, 50],
        ip: 0,
        input: [],
        output: [],
        status: 'ready',
      },
      expected: {
        memory: [1002, 9, 10, 5, 2, 300, 11, 0, 99, 30, 40, 50],
        ip: 4,
        input: [],
        output: [],
        status: 'ready',
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
        status: 'ready',
      },
      expected: {
        memory: [3, 9, 10, 11, 2, 3, 11, 0, 99, 14, 40, 50],
        ip: 2,
        input: [],
        output: [],
        status: 'ready',
      },
      desc: 'input - only item in input buffer'
    },
    {
      input: {
        memory: [3, 2, 10, 5, 2, 3, 11, 0, 99, 30, 40, 50],
        ip: 0,
        input: [4, 34, 15],
        output: [],
        status: 'ready',
      },
      expected: {
        memory: [3, 2, 4, 5, 2, 3, 11, 0, 99, 30, 40, 50],
        ip: 2,
        input: [34, 15],
        output: [],
        status: 'ready',
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
        status: 'ready',
      },
      expected: {
        memory: [4, 9, 10, 11, 2, 3, 11, 0, 99, 30, 40, 50],
        ip: 2,
        input: [],
        output: [30],
        status: 'ready',
      },
      desc: 'output - position mode to empty output buffer'
    },
    {
      input: {
        memory: [4, 10, 10, 11, 2, 3, 11, 0, 99, 30, 40, 50],
        ip: 0,
        input: [],
        output: [13, 16, -1],
        status: 'ready',
      },
      expected: {
        memory: [4, 10, 10, 11, 2, 3, 11, 0, 99, 30, 40, 50],
        ip: 2,
        input: [],
        output: [13, 16, -1, 40],
        status: 'ready',
      },
      desc: 'output - position mode to longer output buffer'
    },
    {
      input: {
        memory: [104, 2, 10, 5, 2, 3, 11, 0, 99, 30, 40, 50],
        ip: 0,
        input: [],
        output: [],
        status: 'ready',
      },
      expected: {
        memory: [104, 2, 10, 5, 2, 3, 11, 0, 99, 30, 40, 50],
        ip: 2,
        input: [],
        output: [2],
        status: 'ready',
      },
      desc: 'output - immediate mode to empty output buffer'
    },
    {
      input: {
        memory: [104, 8, 10, 5, 2, 3, 11, 0, 99, 30, 40, 50],
        ip: 0,
        input: [],
        output: [-1, -3, 0],
        status: 'ready',
      },
      expected: {
        memory: [104, 8, 10, 5, 2, 3, 11, 0, 99, 30, 40, 50],
        ip: 2,
        input: [],
        output: [-1, -3, 0, 8],
        status: 'ready',
      },
      desc: 'output - immediate mode to longer output buffer'
    }
  ]
  cases.forEach(function({ input, expected, desc }) {
    assert.deepEqual(op(input), expected, desc)
  })
})

QUnit.test('op 5 - jump-if-true', function(assert) {
  const cases = [
    {
      input: {
        memory: [5, 9, 8, 9, 10, 9, 4, 9, 99, -1, 8],
        ip: 0,
        input: [],
        output: [],
        status: 'ready',
      },
      expected: {
        memory: [5, 9, 8, 9, 10, 9, 4, 9, 99, -1, 8],
        ip: 99,
        input: [],
        output: [],
        status: 'ready',
      },
      desc: 'jump if true - position mode, non-zero value'
    },
    {
      input: {
        memory: [5, 5, 8, 9, 10, 9, 4, 9, 0, -1, 8],
        ip: 1,
        input: [],
        output: [],
        status: 'ready',
      },
      expected: {
        memory: [5, 5, 8, 9, 10, 9, 4, 9, 0, -1, 8],
        ip: 4,
        input: [],
        output: [],
        status: 'ready',
      },
      desc: 'jump if true - position mode, zero value'
    },
    {
      input: {
        memory: [1005, 9, 8, 9, 10, 9, 4, 9, 99, -1, 8],
        ip: 0,
        input: [],
        output: [],
        status: 'ready',
      },
      expected: {
        memory: [1005, 9, 8, 9, 10, 9, 4, 9, 99, -1, 8],
        ip: 8,
        input: [],
        output: [],
        status: 'ready',
      },
      desc: 'jump if true - immediate mode, non-zero value'
    },
  ]
  cases.forEach(function({ input, expected, desc }) {
    assert.deepEqual(op(input), expected, desc)
  })
})

QUnit.test('op 6 - jump-if-false', function(assert) {
  const cases = [
    {
      input: {
        memory: [6, 9, 8, 9, 10, 9, 4, 9, 99, -1, 8],
        ip: 0,
        input: [],
        output: [],
        status: 'ready',
      },
      expected: {
        memory: [6, 9, 8, 9, 10, 9, 4, 9, 99, -1, 8],
        ip: 3,
        input: [],
        output: [],
        status: 'ready',
      },
      desc: 'jump if false - position mode, non-zero value'
    },
    {
      input: {
        memory: [99, 6, 8, 9, 10, 20, 4, 9, 0, 0, 8],
        ip: 1,
        input: [],
        output: [],
        status: 'ready',
      },
      expected: {
        memory: [99, 6, 8, 9, 10, 20, 4, 9, 0, 0, 8],
        ip: 0,
        input: [],
        output: [],
        status: 'ready',
      },
      desc: 'jump if false - position mode, zero value'
    },
    {
      input: {
        memory: [1005, 9, 8, 9, 10, 9, 4, 9, 99, -1, 8],
        ip: 0,
        input: [],
        output: [],
        status: 'ready',
      },
      expected: {
        memory: [1005, 9, 8, 9, 10, 9, 4, 9, 99, -1, 8],
        ip: 8,
        input: [],
        output: [],
        status: 'ready',
      },
      desc: 'jump if true - immediate mode, non-zero value'
    },
  ]
  cases.forEach(function({ input, expected, desc }) {
    assert.deepEqual(op(input), expected, desc)
  })
})

QUnit.test('op 7 - less than', function(assert) {
  const cases = [
    {
      input: {
        memory: [1, 2, 7, 4, 5, 6, 7, 8],
        ip: 2,
        input: [],
        output: [],
        status: 'ready',
      },
      expected: {
        memory: [1, 2, 7, 4, 5, 6, 1, 8],
        ip: 6,
        input: [],
        output: [],
        status: 'ready',
      },
      desc: 'less than - position mode, a < b'
    },
    {
      input: {
        memory: [1, 2, 7, 5, 4, 6, 7, 8],
        ip: 2,
        input: [],
        output: [],
        status: 'ready',
      },
      expected: {
        memory: [1, 2, 7, 5, 4, 6, 0, 8],
        ip: 6,
        input: [],
        output: [],
        status: 'ready',
      },
      desc: 'less than - position mode, a > b'
    },
    {
      input: {
        memory: [1, 2, 7, 2, 2, 6, 7, 8],
        ip: 2,
        input: [],
        output: [],
        status: 'ready',
      },
      expected: {
        memory: [1, 2, 7, 2, 2, 6, 0, 8],
        ip: 6,
        input: [],
        output: [],
        status: 'ready',
      },
      desc: 'less than - position mode, a == b'
    },
    {
      input: {
        memory: [-1, 107, 1, 1, 0, 99],
        ip: 1,
        input: [],
        output: [],
        status: 'ready',
      },
      expected: {
        memory: [1, 107, 1, 1, 0, 99],
        ip: 5,
        input: [],
        output: [],
        status: 'ready',
      },
      desc: 'less than - immediate mode, a < b'
    },
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
        status: 'finished',
      },
    },
    {
      programtext: '2,3,0,3,99',
      expected: {
        memory: [2, 3, 0, 6, 99],
        ip: 4,
        input: [],
        output: [],
        status: 'finished',
      },
    },
    {
      programtext: '2,4,4,5,99,0',
      expected: {
        memory: [2, 4, 4, 5, 99, 9801],
        ip: 4,
        input: [],
        output: [],
        status: 'finished',
      },
    },
    {
      programtext: '3,0,4,0,99',
      inputs: [42],
      expected: {
        memory: [42, 0, 4, 0, 99],
        ip: 4,
        input: [],
        output: [42],
        status: 'finished',
      },
    },
    {
      programtext: '1101,100,-1,4,0',
      expected: {
        memory: [1101, 100, -1, 4, 99],
        ip: 4,
        input: [],
        output: [],
        status: 'finished',
      },
    },
    {
      programtext: '3,9,8,9,10,9,4,9,99,-1,8',
      inputs: [8],
      expected: {
        memory: [3, 9, 8, 9, 10, 9, 4, 9, 99, 1, 8],
        ip: 8,
        input: [],
        output: [1],
        status: 'finished',
      },
    },
    {
      programtext: '3,9,8,9,10,9,4,9,99,-1,8',
      inputs: [7],
      expected: {
        memory: [3, 9, 8, 9, 10, 9, 4, 9, 99, 0, 8],
        ip: 8,
        input: [],
        output: [0],
        status: 'finished',
      },
    },
    {
      programtext: '3,3,1108,-1,8,3,4,3,99',
      inputs: [8],
      expected: {
        memory: [3, 3, 1108, 1, 8, 3, 4, 3, 99],
        ip: 8,
        input: [],
        output: [1],
        status: 'finished',
      },
    },
  ]
  cases.forEach(function({ programtext, inputs, expected }) {
    if ( inputs == undefined ) {
      assert.deepEqual(run_program(read_program(programtext)),
                       expected,
                       'run_program(read_program("' + programtext + '"))')
    } else {
      assert.deepEqual(run_program(read_program(programtext), inputs),
                       expected,
                       'run_program(read_program("' + programtext + '", [' +
                       inputs.join(',') + '])')
    }
  })
})

QUnit.test('run_program() jump tests from Part 2', function(assert) {
  const p1 = read_program('3,9,8,9,10,9,4,9,99,-1,8')
  const p2 = read_program('3,3,1108,-1,8,3,4,3,99')
  const eqtests = [
    [8, 1],
    [7, 0],
    [9, 0],
    [-8, 0],
  ]
  eqtests.forEach(function([input, expected]) {
    assert.equal(run_program(p1, [input]).output.shift(),
                 expected,
                 'run_program(p1, [' + input + ']) outputs ' + expected)
    assert.equal(run_program(p2, [input]).output.shift(),
                 expected,
                 'run_program(p2, [' + input + ']) outputs ' + expected)
  })

  const p3 = read_program('3,9,7,9,10,9,4,9,99,-1,8')
  const p4 = read_program('3,3,1107,-1,8,3,4,3,99')
  const lttests = [
    [8, 0],
    [7, 1],
    [9, 0],
    [-8, 1],
  ]
  lttests.forEach(function([input, expected]) {
    assert.equal(run_program(p3, [input]).output.shift(),
                 expected,
                 'run_program(p3, [' + input + ']) outputs ' + expected)
    assert.equal(run_program(p4, [input]).output.shift(),
                 expected,
                 'run_program(p4, [' + input + ']) outputs ' + expected)
  })
})

QUnit.test('Solutions', async function(assert) {
  const program = await fetch_puzzle_input().then(txt => read_program(txt))
  assert.deepEqual(run_program(program, [1]).output,
                   [0, 0, 0, 0, 0, 0, 0, 0, 0, 11933517],
                   'Part 1: Input 1 tests pass & diagnostic code === 11933517')
  assert.deepEqual(run_program(program, [5]).output,
                   [10428568],
                   'Part 2: Input 5 diagnostic code === 10428568')
})
