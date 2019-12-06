QUnit.test('check_password(..)', function(assert) {
  const cases = [
    [122345, {'ascending': true, 'groups': ['1', '22', '3', '4', '5']}],
    [111111, {'ascending': true, 'groups': ['111111']}],
    [223450, {'ascending': false, 'groups': ['22', '3', '4', '5', '0']}],
    [123789, {'ascending': true, 'groups': ['1', '2', '3', '7', '8', '9']}],
    [141414, {'ascending': false, 'groups': ['1', '4', '1', '4', '1', '4']}],
    [112233, {'ascending': true, 'groups': ['11', '22', '33']}],
    [123444, {'ascending': true, 'groups': ['1', '2', '3', '444']}],
    [111122, {'ascending': true, 'groups': ['1111', '22']}],
  ]
  cases.forEach(function([input, expected]) {
    assert.deepEqual(check_password(input),
                     expected,
                     'check_password(' + input + ')')
  })
})

QUnit.test('passwords_in_range(..)', function(assert) {
  const cases = [
    ['122345-122355', {'any_group': 6, 'two_group': 6}],
    ['111111-111136', {'any_group': 21, 'two_group': 2}],
    ['123789-123888', {'any_group': 2, 'two_group': 1}],
  ]
  cases.forEach(function([input, expected]) {
    assert.deepEqual(passwords_in_range(input),
                     expected,
                     'passwords_in_range("' + input + '")')
  })
})

QUnit.test('Solutions', async function(assert) {
  const input = await fetch_puzzle_input()
  const passwords = passwords_in_range(input)

  assert.equal(passwords.any_group, 466, 'Part 1: 466 valid passwords in range')
  assert.equal(passwords.two_group, 292, 'Part 2: 292 valid passwords in range')
})
