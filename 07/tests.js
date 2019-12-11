const p1 = '3,15,3,16,1002,16,10,16,1,16,15,15,4,15,99,0,0'
const p2 = '3,23,3,24,1002,24,10,24,1002,23,-1,23,101,5,23,23,1,24,23,' +
           '23,4,23,99,0,0'
const p3 = '3,31,3,32,1002,32,10,32,1001,31,-2,31,1007,31,0,33,1002,33,' +
           '7,33,1,33,31,31,1,32,31,31,4,31,99,0,0,0'

QUnit.test('thruster_signal()', function(assert) {
  const cases = [
    [p1, [4, 3, 2, 1, 0], 43210],
    [p2, [0, 1, 2, 3, 4], 54321],
    [p3, [1, 0, 4, 3, 2], 65210],
  ]
  cases.forEach(function([program, phasesettings, expected]) {
    const desc = [
      'thruster_signal(read_program("',
      program.split(',').slice(0, 4).join(','),
      '"), [',
      phasesettings.join(','),
      ']) === ',
      expected
    ].join('')
    assert.equal(thruster_signal(read_program(program), phasesettings),
                 expected,
                 desc)
  })
})

QUnit.test('setting_options()', function(assert) {
  assert.deepEqual(setting_options([0, 1]),
                   [[0, 1], [1,0]],
                   'setting_options([0, 1])')
  assert.deepEqual(setting_options([2, 3, 4]),
                   [[2, 3, 4], [2, 4, 3], [3, 2, 4], [3, 4, 2],
                    [4, 2, 3], [4, 3, 2]],
                   'setting_options([2, 3, 4])')
})

QUnit.test('max_thruster_signal()', function(assert) {
  const cases = [
    [p1, 43210],
    [p2, 54321],
    [p3, 65210],
  ]
  cases.forEach(function([program, expected]) {
    const desc = [
      'max_thruster_signal(read_program("',
      program.split(',').slice(0, 4).join(','),
      '...',
      '")) === ',
      expected
    ].join('')
    assert.equal(max_thruster_signal(read_program(program)),
                 expected,
                 desc)
  })
})

const p4 = '3,26,1001,26,-4,26,3,27,1002,27,2,27,1,27,26,27,4,27,1001,' +
           '28,-1,28,1005,28,6,99,0,0,5'
const p5 = '3,52,1001,52,-5,52,3,53,1,52,56,54,1007,54,5,55,1005,55,26,' +
           '1001,54,-5,54,1105,1,12,1,53,54,53,1008,54,0,55,1001,55,1,' +
           '55,2,53,55,53,4,53,1001,56,-1,56,1005,56,6,99,0,0,0,0,10'

QUnit.test('thruster_signal() with output loop', function(assert) {
  const cases = [
    [p4, [9, 8, 7, 6, 5], 139629729],
    [p5, [9, 7, 8, 5, 6], 18216],
  ]
  cases.forEach(function([program, phasesettings, expected]) {
    const desc = [
      'thruster_signal(read_program("',
      program.split(',').slice(0, 4).join(','),
      '"), [',
      phasesettings.join(','),
      '], true) === ',
      expected
    ].join('')
    assert.equal(thruster_signal(read_program(program),
                                 phasesettings,
                                 true),
                 expected,
                 desc)
  })
})

QUnit.test('max_thruster_signal() with output loop', function(assert) {
  const cases = [
    [p4, 139629729],
    [p5, 18216],
  ]
  cases.forEach(function([program, expected]) {
    const desc = [
      'max_thruster_signal(read_program("',
      program.split(',').slice(0, 4).join(','),
      '..."), [5, 6, 7, 8, 9], true) === ',
      expected
    ].join('')
    assert.equal(max_thruster_signal(read_program(program),
                                     [5, 6, 7, 8, 9],
                                     true),
                 expected,
                 desc)
  })
})

QUnit.test('Solutions', async function(assert) {
  const program = await fetch_puzzle_input().then(read_program)
  assert.equal(max_thruster_signal(program, [0, 1, 2, 3, 4]),
               46014,
               'Part 1: max thruster signal for program: 46014')
  assert.equal(max_thruster_signal(program, [5, 6, 7, 8, 9], true),
               19581200,
               'Part 2: max thruster signal w/looping program: 19581200')
})
