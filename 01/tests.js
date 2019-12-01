QUnit.test('fuel_required()', function(assert) {
  const cases = [
    { input: 12, expected: 2 },
    { input: 14, expected: 2 },
    { input: 1969, expected: 654 },
    { input: 100756, expected: 33583 },
  ]
  cases.forEach(function({ input, expected }) {
    const desc = [
      'fuel_required(',
      input,
      ') == ',
      expected
    ].join('')
    assert.equal(fuel_required(input), expected, desc)
  })
})

QUnit.test('total_fuel_required()', function(assert) {
  const input = '12\n14\n1969\n100756'
  const desc = [
    'total_fuel_required(',
    input,
    ') == 34241'
  ].join('')
  assert.equal(total_fuel_required(input), 34241, desc)
})

QUnit.test('Part 1 Solutuon', function(assert) {
  assert.equal(total_fuel_required(puzzle_input),
               3372463,
               'total_fuel_required(puzzle_input) == 3372463')
})
