QUnit.test('deal into new stack', function(assert) {
  const instructions = ['deal into new stack']
  const expected = [9, 8, 7, 6, 5, 4, 3, 2, 1, 0]
  expected.forEach(function(card, pos) {
    assert.equal(track_card(card, 10, instructions), pos)
    assert.equal(card_in_position(pos, 10, instructions), card)
  })
})

QUnit.test('cut cards', function(assert) {
  const instructions = ['cut 3']
  const expected = [3, 4, 5, 6, 7, 8, 9, 0, 1, 2]
  expected.forEach(function(card, pos) {
    assert.equal(track_card(card, 10, instructions), pos)
    assert.equal(card_in_position(pos, 10, instructions), card)
  })
})

QUnit.test('deal with increment', function(assert) {
  const instructions = ['deal with increment 3']
  const expected = [0, 7, 4, 1, 8, 5, 2, 9, 6, 3]
  expected.forEach(function(card, pos) {
    assert.equal(track_card(card, 10, instructions), pos)
    assert.equal(card_in_position(pos, 10, instructions), card)
  })
})

QUnit.test('track_card(card, decksize, instructions)', function(assert) {
  const examples = [
    [
      'deal with increment 7',
      'deal into new stack',
      'deal into new stack',
    ],
    [
      'cut 6',
      'deal with increment 7',
      'deal into new stack',
    ],
    [
      'deal with increment 7',
      'deal with increment 9',
      'cut -2'
    ],
    [
      'deal into new stack',
      'cut -2',
      'deal with increment 7',
      'cut 8',
      'cut -4',
      'deal with increment 7',
      'cut 3',
      'deal with increment 9',
      'deal with increment 3',
      'cut -1',
    ]
  ]
  const cases = [
    [0, 0, 0],
    [0, 3, 1],
    [0, 9, 3],
    [0, 8, 6],
    [1, 3, 0],
    [1, 7, 2],
    [1, 4, 3],
    [1, 6, 9],
    [2, 3, 1],
    [2, 4, 4],
    [2, 8, 6],
    [2, 2, 8],
    [3, 9, 0],
    [3, 4, 5],
    [3, 0, 7],
    [3, 6, 9],
  ]
  cases.forEach(function([ example, card, expected ]) {
    assert.equal(
      track_card(card, 10, examples[example]),
      expected,
      'example ' + (example + 1) + ', card ' + card + ': ' + expected
    )
  })
})

QUnit.test('card_in_position(card, decksize, instructions)', function(assert) {
  const examples = [
    [
      'deal with increment 7',
      'deal into new stack',
      'deal into new stack',
    ],
    [
      'cut 6',
      'deal with increment 7',
      'deal into new stack',
    ],
    [
      'deal with increment 7',
      'deal with increment 9',
      'cut -2'
    ],
    [
      'deal into new stack',
      'cut -2',
      'deal with increment 7',
      'cut 8',
      'cut -4',
      'deal with increment 7',
      'cut 3',
      'deal with increment 9',
      'deal with increment 3',
      'cut -1',
    ]
  ]
  const cases = [
    [0, 0, 0],
    [0, 1, 3],
    [0, 3, 9],
    [0, 6, 8],
    [1, 0, 3],
    [1, 2, 7],
    [1, 3, 4],
    [1, 9, 6],
    [2, 1, 3],
    [2, 4, 4],
    [2, 6, 8],
    [2, 8, 2],
    [3, 0, 9],
    [3, 5, 4],
    [3, 7, 0],
    [3, 9, 6],
  ]
  cases.forEach(function([ example, position, expected ]) {
    assert.equal(
      card_in_position(position, 10, examples[example]),
      expected,
      'example ' + (example + 1) + ', position ' + position + ': ' + expected
    )
  })
})

QUnit.test('Solutions', async function(assert) {
  const instructions = await fetch_puzzle_input_lines()
  assert.equal(
    track_card(2019, 10007, instructions),
    5472,
    'Part 1: position of card 2019 after one shuffle === 5472',
  )
  assert.equal(
    card_in_position(2020, 119315717514047, instructions),
    0,
    'Part 2: card in position 2020 after 1 shuffle === 0'
  )
})
