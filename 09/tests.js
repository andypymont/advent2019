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

QUnit.test('provided test programs', function(assert) {
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

QUnit.test('Solutions', async function(assert) {
  const program = await fetch_puzzle_input().then(read_program)
  assert.equal(run_program(program, [1]).output.shift(),
               3345854957,
               'BOOST keycode === 3345854957')
  assert.equal(run_program(program, [2]).output.shift(),
               68938,
               'BOOST coordinates === 68938')
})
