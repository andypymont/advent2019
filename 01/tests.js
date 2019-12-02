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

QUnit.test('fuel_required_including_fuel_mass()', function(assert) {
  const cases = [
    { input: 14, expected: 2 },
    { input: 1969, expected: 966 },
    { input: 100756, expected: 50346 }
  ]
  cases.forEach(function({ input, expected }) {
    const desc = [
      'fuel_required_including_fuel_mass(',
      input,
      ') == ',
      expected
    ].join('')
    assert.equal(fuel_required_including_fuel_mass(input), expected, desc)
  })
})

QUnit.test('Solutions', async function(assert) {
  const puzzle_input = await fetch_puzzle_input()
  assert.equal(total_fuel_required(puzzle_input),
               3372463,
               'Part 1: total_fuel_required(puzzle_input) == 3372463')
  assert.equal(total_fuel_required(puzzle_input, true),
               5055835,
               'Part 2: total_fuel_required(puzzle_input, true) == 5055835')

})
