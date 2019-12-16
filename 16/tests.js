QUnit.test('phase_digit(_, digit, signal)', function(assert) {
  const cases = [
    [
      0,
      [1, 2, 3, 4, 5, 6, 7, 8],
      4,
    ],
    [
      1,
      [1, 2, 3, 4, 5, 6, 7, 8],
      8,
    ],
    [
      2,
      [1, 2, 3, 4, 5, 6, 7, 8],
      2,
    ],
    [
      2,
      [4, 8, 2, 2, 6, 1, 5, 8],
      0,
    ],
    [
      4,
      [4, 8, 2, 2, 6, 1, 5, 8],
      0,
    ],
    [
      5,
      [4, 8, 2, 2, 6, 1, 5, 8],
      4,
    ],
    [
      6,
      [4, 8, 2, 2, 6, 1, 5, 8],
      3,
    ]
  ]
  cases.forEach(function([digit, signal, expected]) {
    const desc = [
      'phase_digit(_, ',
      digit,
      ', [',
      signal.join(', '),
      ']) === ',
      expected
    ].join('')
    assert.equal(
      phase_digit('', digit, signal),
      expected,
      desc
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

QUnit.test('phase_shortcut(sequence)', function(assert) {
  const example = [
    [1, 2, 3, 4, 5, 6, 7, 8],
    [1, 2, 3, 4, 6, 1, 5, 8],
    [1, 2, 3, 4, 0, 4, 3, 8],
    [1, 2, 3, 4, 5, 5, 1, 8],
    [1, 2, 3, 4, 9, 4, 9, 8],
  ]
  const cases = [
    [example[0], example[1]],
    [example[1], example[2]],
    [example[2], example[3]],
    [example[3], example[4]],
  ]
  cases.forEach(function([input, expected]) {
    assert.deepEqual(
      phase_shortcut(input),
      expected,
      'phase_shortcut([' + input.join(', ') + '])'
    )
  })
})

QUnit.test('fft(signal, phases)', function(assert) {
  const cases = [
    ['80871224585914546619083218645595', 100, '24176176'],
    ['19617804207202209144916044189917', 100, '73745418'],
    ['69317163492948606335995924319873', 100, '52432133'],
  ]
  cases.forEach(function([signal, phases, expected]) {
    assert.equal(
      fft(signal, phases),
      expected,
      'fft("' + signal + '", ' + phases + ') === "' + expected + '"'
    )
  })
})

QUnit.test('fft_real(signal, phase)', function(assert) {
  const cases = [
    ['03036732577212944063491565474664', '84462026'],
    // ['02935109699940807407585447034323', '78725270'],
    // ['03081770884921959731165446850517', '53553731'],
  ]
  cases.forEach(function([signal, expected]) {
    assert.equal(
      fft_real(signal),
      expected,
      'fft_real("' + signal + '") === "' + expected + '"'
    )
  })
})

QUnit.test('Solutions', async function(assert) {
  const input = await fetch_puzzle_input()
  assert.deepEqual(
    fft(input, 100),
    '40580215',
    'Part 1: 100 phases on puzzle input produces "40580215"'
  )
  assert.deepEqual(
    fft_real(input),
    '22621597',
    'Part 2: real FFT algorithm on puzzle input produces "22621597"'
  )
})
