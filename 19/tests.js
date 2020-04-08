const test_programs = [
  [
    3, 17, 3, 18, 1002, 17, 10, 15, 1, 15, 18, 15, 109, 19, 204, 0, 99, 0,  0,
    1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0,
    0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0,
    0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1,
  ]
].map(prog => read_program(prog.join(',')))

QUnit.test('check_tractor_beam(program, x, y)', function(assert) {
  const cases = [
    [0, 0, 0, 1],
    [0, 1, 1, 1],
    [0, 1, 2, 0],
    [0, 8, 5, 0],
    [0, 8, 7, 1],
  ]
  cases.forEach(function([test_prog, x, y, expected]) {
    const desc = [
      'check_tractor_beam(test_programs[',
      test_prog,
      '], ',
      x,
      ', ',
      y,
      ') === ',
      expected
    ].join('')
    assert.equal(
      check_tractor_beam(test_programs[test_prog], x, y),
      expected,
      desc
    )
  })
})

QUnit.test('area_covered(program, size)', function(assert) {
  assert.equal(area_covered(test_programs[0], 10),
               27,
               'area_covered(test_programs[0], 10) === 27')
})

QUnit.test('Solutions', async function(assert) {
  const program = await fetch_puzzle_input().then(read_program)
  assert.equal(area_covered(program, 50),
               176,
               'Part 1: area affected by tractor beam = 176')
})
