QUnit.test('op 1 - add arguments together', function(assert) {
  const cases = [
    {
      input: {
        memory: [1, 9, 10, 3, 2, 3, 11, 0, 99, 30, 40, 50],
        ip: 0,
        rb: 0,
        input: [],
        output: [],
        status: 'ready',
      },
      expected: {
        memory: [1, 9, 10, 70, 2, 3, 11, 0, 99, 30, 40, 50],
        ip: 4,
        rb: 0,
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
        rb: 0,
        input: [],
        output: [],
        status: 'ready',
      },
      expected: {
        memory: [1101, 9, 10, 19, 2, 3, 11, 0, 99, 30, 40, 50],
        ip: 4,
        rb: 0,
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
        rb: 0,
        input: [],
        output: [],
        status: 'ready',
      },
      expected: {
        memory: [1001, 9, 10, 5, 2, 40, 11, 0, 99, 30, 40, 50],
        ip: 4,
        rb: 0,
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
        rb: 0,
        input: [],
        output: [],
        status: 'ready',
      },
      expected: {
        memory: [2, 9, 10, 11, 2, 3, 11, 0, 99, 30, 40, 1200],
        ip: 4,
        rb: 0,
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
        rb: 0,
        input: [],
        output: [],
        status: 'ready',
      },
      expected: {
        memory: [1102, 9, 10, 90, 2, 3, 11, 0, 99, 30, 40, 50],
        ip: 4,
        rb: 0,
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
        rb: 0,
        input: [],
        output: [],
        status: 'ready',
      },
      expected: {
        memory: [1002, 9, 10, 5, 2, 300, 11, 0, 99, 30, 40, 50],
        ip: 4,
        rb: 0,
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
        rb: 0,
        input: [14],
        output: [],
        status: 'ready',
      },
      expected: {
        memory: [3, 9, 10, 11, 2, 3, 11, 0, 99, 14, 40, 50],
        ip: 2,
        rb: 0,
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
        rb: 0,
        input: [4, 34, 15],
        output: [],
        status: 'ready',
      },
      expected: {
        memory: [3, 2, 4, 5, 2, 3, 11, 0, 99, 30, 40, 50],
        ip: 2,
        rb: 0,
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
        rb: 0,
        input: [],
        output: [],
        status: 'ready',
      },
      expected: {
        memory: [4, 9, 10, 11, 2, 3, 11, 0, 99, 30, 40, 50],
        ip: 2,
        rb: 0,
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
        rb: 0,
        input: [],
        output: [13, 16, -1],
        status: 'ready',
      },
      expected: {
        memory: [4, 10, 10, 11, 2, 3, 11, 0, 99, 30, 40, 50],
        ip: 2,
        rb: 0,
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
        rb: 0,
        input: [],
        output: [],
        status: 'ready',
      },
      expected: {
        memory: [104, 2, 10, 5, 2, 3, 11, 0, 99, 30, 40, 50],
        ip: 2,
        rb: 0,
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
        rb: 0,
        input: [],
        output: [-1, -3, 0],
        status: 'ready',
      },
      expected: {
        memory: [104, 8, 10, 5, 2, 3, 11, 0, 99, 30, 40, 50],
        ip: 2,
        rb: 0,
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
        rb: 0,
        input: [],
        output: [],
        status: 'ready',
      },
      expected: {
        memory: [5, 9, 8, 9, 10, 9, 4, 9, 99, -1, 8],
        ip: 99,
        rb: 0,
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
        rb: 0,
        input: [],
        output: [],
        status: 'ready',
      },
      expected: {
        memory: [5, 5, 8, 9, 10, 9, 4, 9, 0, -1, 8],
        ip: 4,
        rb: 0,
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
        rb: 0,
        input: [],
        output: [],
        status: 'ready',
      },
      expected: {
        memory: [1005, 9, 8, 9, 10, 9, 4, 9, 99, -1, 8],
        ip: 8,
        rb: 0,
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
        rb: 0,
        input: [],
        output: [],
        status: 'ready',
      },
      expected: {
        memory: [6, 9, 8, 9, 10, 9, 4, 9, 99, -1, 8],
        ip: 3,
        rb: 0,
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
        rb: 0,
        input: [],
        output: [],
        status: 'ready',
      },
      expected: {
        memory: [99, 6, 8, 9, 10, 20, 4, 9, 0, 0, 8],
        ip: 0,
        rb: 0,
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
        rb: 0,
        input: [],
        output: [],
        status: 'ready',
      },
      expected: {
        memory: [1005, 9, 8, 9, 10, 9, 4, 9, 99, -1, 8],
        ip: 8,
        rb: 0,
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
        rb: 0,
        input: [],
        output: [],
        status: 'ready',
      },
      expected: {
        memory: [1, 2, 7, 4, 5, 6, 1, 8],
        ip: 6,
        rb: 0,
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
        rb: 0,
        input: [],
        output: [],
        status: 'ready',
      },
      expected: {
        memory: [1, 2, 7, 5, 4, 6, 0, 8],
        ip: 6,
        rb: 0,
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
        rb: 0,
        input: [],
        output: [],
        status: 'ready',
      },
      expected: {
        memory: [1, 2, 7, 2, 2, 6, 0, 8],
        ip: 6,
        rb: 0,
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
        rb: 0,
        input: [],
        output: [],
        status: 'ready',
      },
      expected: {
        memory: [1, 107, 1, 1, 0, 99],
        ip: 5,
        rb: 0,
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
        rb: 0,
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
        rb: 0,
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
        rb: 0,
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
        rb: 0,
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
        rb: 0,
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
        rb: 0,
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
        rb: 0,
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
        rb: 0,
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

QUnit.test('run_program() jump tests', function(assert) {
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


QUnit.test('run_program() flag to pause on output', function(assert) {
  const before = {
    ip: 0,
    rb: 0,
    memory: [4, 5, 4, 6, 99, 50, 60],
    input: [],
    output: [],
    status: 'ready',
  }
  const first = {
    ip: 2,
    rb: 0,
    memory: [4, 5, 4, 6, 99, 50, 60],
    input: [],
    output: [50],
    status: 'paused',
  }
  const second = {
    ip: 4,
    rb: 0,
    memory: [4, 5, 4, 6, 99, 50, 60],
    input: [],
    output: [50, 60],
    status: 'paused',
  }
  const third = {
    ip: 4,
    rb: 0,
    memory: [4, 5, 4, 6, 99, 50, 60],
    input: [],
    output: [50, 60],
    status: 'finished',
  }
  assert.deepEqual(run_program(before, [], true), first)
  assert.deepEqual(run_program(first, [], true), second)
  assert.deepEqual(run_program(second, [], true), third)
})

QUnit.test('op 9 - adjust relative base', function(assert) {
  const cases = [
    {
      input: {
        ip: 0,
        rb: 0,
        memory: [9, 0, 99],
        input: [],
        output: [],
        status: 'ready',
      },
      expected: {
        ip: 2,
        rb: 9,
        memory: [9, 0, 99],
        input: [],
        output: [],
        status: 'ready',
      },
      desc: 'op 9 with relative input',
    },
    {
      input: {
        ip: 0,
        rb: 0,
        memory: [109, 2, 99],
        input: [],
        output: [],
        status: 'ready',
      },
      expected: {
        ip: 2,
        rb: 2,
        memory: [109, 2, 99],
        input: [],
        output: [],
        status: 'ready',
      },
      desc: 'op 9 with immediate input',
    }
  ]
  cases.forEach(function({ input, expected, desc }) {
    assert.deepEqual(op(input), expected, desc)
  })
})

QUnit.test('parameters in relative mode', function(assert) {
  const cases = [
    {
      input: {
        ip: 0,
        rb: -3,
        memory: [2201, 9, 10, 5, 99, 0, 13, 23],
        input: [],
        output: [],
        status: 'ready',
      },
      expected: {
        ip: 4,
        rb: -3,
        memory: [2201, 9, 10, 5, 99, 36, 13, 23],
        input: [],
        output: [],
        status: 'ready',
      },
      desc: 'relative input parameters'
    },
    {
      input: {
        ip: 0,
        rb: 3,
        memory: [21102, 101, 23, 2, 99, 0],
        input: [],
        output: [],
        status: 'ready',
      },
      expected: {
        ip: 4,
        rb: 3,
        memory: [21102, 101, 23, 2, 99, 2323],
        input: [],
        output: [],
        status: 'ready',
      },
      desc: 'relative output parameter'
    }
  ]
  cases.forEach(function({ input, expected, desc }) {
    assert.deepEqual(op(input), expected, desc)
  })
})

QUnit.test('access address outside of initial memory', function(assert) {
  cases = [
    {
      input: {
        ip: 0,
        rb: 0,
        memory: [4, 100, 99],
        input: [],
        output: [],
        status: 'ready',
      },
      expected: {
        ip: 2,
        rb: 0,
        memory: [4, 100, 99],
        input: [],
        output: [0],
        status: 'ready',
      },
      desc: 'read from outside memory === 0',
    },
    {
      input: {
        ip: 0,
        rb: 0,
        memory: [1101, 2, 3, 10, 99],
        input: [],
        output: [],
        status: 'ready',
      },
      expected: {
        ip: 4,
        rb: 0,
        memory: [1101, 2, 3, 10, 99, 0, 0, 0, 0, 0, 5],
        input: [],
        output: [],
        status: 'ready',
      },
      desc: 'write to outside memory populates with zeroes'
    },
  ]
  cases.forEach(function({ input, expected, desc }) {
    assert.deepEqual(op(input), expected, desc)
  })
})

QUnit.test('relative base test programs', function(assert) {
  const cases = [
    [
      '109,1,204,-1,1001,100,1,100,1008,100,16,101,1006,101,0,99',
      [109,1,204,-1,1001,100,1,100,1008,100,16,101,1006,101,0,99],
    ],
    [
      '1102,34915192,34915192,7,4,7,99,0',
      [1219070632396864],
    ],
    [
      '104,1125899906842624,99',
      [1125899906842624],
    ]
  ]
  cases.forEach(function([input, expected]) {
    const desc = [
      'run_program(read_program("',
      input,
      '")).output === [',
      expected.join(','),
      ']'
    ].join('')
    assert.deepEqual(run_program(read_program(input)).output,
                     expected,
                     desc)
  })
})
