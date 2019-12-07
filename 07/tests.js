const p1 = [3,15,3,16,1002,16,10,16,1,16,15,15,4,15,99,0,0]
const p2 = [3,23,3,24,1002,24,10,24,1002,23,-1,23,101,5,23,23,1,24,23,23,
            4,23,99,0,0]
const p3 = [3,31,3,32,1002,32,10,32,1001,31,-2,31,1007,31,0,33,1002,33,7,
            33,1,33,31,31,1,32,31,31,4,31,99,0,0,0]

QUnit.test('thruster_signal()', function(assert) {
  const cases = [
    [p1, [4, 3, 2, 1, 0], 43210],
    [p2, [0, 1, 2, 3, 4], 54321],
    [p3, [1, 0, 4, 3, 2], 65210],
  ]
  cases.forEach(function([program, phasesettings, expected]) {
    const desc = [
      'thruster_signal([',
      program.slice(0, 4).join(','),
      '], [',
      phasesettings.join(','),
      ']) === ',
      expected
    ].join('')
    assert.equal(thruster_signal(program, phasesettings), expected, desc)
  })
})

QUnit.test('setting_options()', function(assert) {
  assert.deepEqual(setting_options(2),
                   [[0, 1], [1,0]],
                   'setting_options(2)')
  assert.deepEqual(setting_options(3),
                   [[0, 1, 2], [0, 2, 1], [1, 0, 2], [1, 2, 0],
                    [2, 0, 1], [2, 1, 0]],
                   'setting_options(3)')
})

QUnit.test('max_thruster_signal()', function(assert) {
  const cases = [
    [p1, 43210],
    [p2, 54321],
    [p3, 65210],
  ]
  cases.forEach(function([program, expected]) {
    const desc = [
      'max_thruster_signal([',
      program.slice(0, 4).join(','),
      '...',
      ']) === ',
      expected
    ].join('')
    assert.equal(max_thruster_signal(program),
                 expected,
                 desc)
  })
})

QUnit.test('Solutions', async function(assert) {
  const program = await fetch_puzzle_input().then(read_program)
  assert.equal(max_thruster_signal(program),
               46014,
               'Part 1: max thruster signal for program is 46014')
})
