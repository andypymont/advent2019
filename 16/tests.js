QUnit.test('pattern(element)', function(assert) {
  const cases = [
    [0, [0, 1, 0, -1]],
    [1, [0, 0, 1, 1, 0, 0, -1, -1]],
    [2, [0, 0, 0, 1, 1, 1, 0, 0, 0, -1, -1, -1]],
    [3, [0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, -1, -1, -1, -1]],
  ]
  cases.forEach(function([element, expected]) {
    assert.deepEqual(
      pattern(element),
      expected,
      'pattern(element)'
    )
  })
})

QUnit.test('phase(sequence)', function(assert) {
  const example = [
    [1, 2, 3, 4, 5, 6, 7, 8],
    [4, 8, 2, 2, 6, 1, 5, 8],
    [3, 4, 0, 4, 0, 4, 3, 8],
    [0, 3, 4, 1, 5, 5, 1, 8],
    [0, 1, 0, 2, 9, 4, 9, 8],
  ]
  const cases = [
    [example[0], example[1]],
    [example[1], example[2]],
    [example[2], example[3]],
    [example[3], example[4]],
  ]
  cases.forEach(function([input, expected]) {
    assert.deepEqual(
      phase(input),
      expected,
      'phase([' + input.join(', ') + '])',
    )
  })
})

QUnit.test('ftf(signal, phases)', function(assert) {
  const cases = [
    ['80871224585914546619083218645595', 100, '24176176'],
    ['19617804207202209144916044189917', 100, '73745418'],
    ['69317163492948606335995924319873', 100, '52432133'],
  ]
  cases.forEach(function([signal, phases, expected]) {
    assert.equal(
      ftf(signal, phases),
      expected,
      'ftf("' + signal + '", ' + phases + ') === "' + expected + '"'
    )
  })
})

QUnit.test('Solutions', async function(assert) {
  const input = await fetch_puzzle_input()
  assert.deepEqual(
    ftf(input, 100),
    '40580215',
    'Part 1: 100 phases on puzzle input produces "40580215"'
  )
})
