QUnit.test('read_layers()', function(assert) {
  const cases = [
    [
      ['123456789012', 3, 2],
      [[1, 2, 3, 4, 5, 6], [7, 8, 9, 0, 1, 2]]
    ],
    [
      ['1234512345123451', 2, 2],
      [[1, 2, 3, 4], [5, 1, 2, 3], [4, 5, 1, 2], [3, 4, 5, 1]]
    ]
  ]
  cases.forEach(function([args, expected]) {
    const desc = [
      'read_layers("',
      args[0],
      '",',
      args.slice(1).join(','),
      ') === [',
      expected.map(x => '[' + x.join(',') + ']').join(','),
      ']'
    ].join('')
    assert.deepEqual(read_layers(...args), expected, desc)
  })
})

QUnit.test('pixel_counts()', function(assert) {
  const cases = [
    [
      [1, 2, 1, 2, 0, 1],
      new Map([[1, 3], [2, 2], [0, 1]]),
    ],
    [
      [0, 0, 0, 0, 1, 2],
      new Map([[0, 4], [1, 1], [2, 1]]),
    ],
    [
      [2, 0, 2, 0],
      new Map([[2, 2], [0, 2]])
    ],
  ]
  cases.forEach(function([input, expected]) {
    assert.deepEqual(
      pixel_counts(input),
      expected,
      'pixel_counts([' + input.join(',') + '])'
    )
  })
})

QUnit.test('checksum()', function(assert) {
  const cases = [
    ['123456789012', 3, 2, 1],
    ['1102200121101122', 8, 1, 12]
  ]
  cases.forEach(function([image, width, height, expected]) {
    const desc = [
      'checksum("',
      image,
      '",',
      width,
      ',',
      height,
      ') === ',
      expected
    ].join('')
    assert.equal(checksum(image, width, height),
                 expected,
                 desc)
  })
})

QUnit.test('Solutions', async function(assert) {
  const image = await fetch_puzzle_input()
  assert.equal(checksum(image, 25, 6),
               2684,
               'Part 1: checksum(...) of image is 2684')
})
