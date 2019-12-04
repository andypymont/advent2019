QUnit.test('check_password()', function(assert) {
  const cases = [
    [122345, true],
    [111111, true],
    [223450, false],
    [123789, false],
    [141414, false],
  ]
  cases.forEach(function([input, expected]) {
    assert.equal(check_password(input),
                 expected,
                 'check_password(' + input + ') === ' + expected)
  })
})

QUnit.test('check passwords in a range', function(assert) {
  const cases = [
    ['122345-122355', 6],
    ['111111-111136', 21],
    ['123789-123888', 2],
  ]
  cases.forEach(function([input, expected]) {
    assert.equal(passwords_in_range(input),
                 expected,
                 'passwords_in_range("' + input + '") === ' + expected)
  })
})

QUnit.test('Solutions', async function(assert) {
  const input = await fetch_puzzle_input().then(x => x.trim())
  assert.equal(passwords_in_range(input),
               466,
               'Part 1: 466 valid passwords in range')
})
