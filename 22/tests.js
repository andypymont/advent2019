QUnit.test('stack(deck)', function(assert) {
  const cases = [
    {
      input: [1, 2, 3],
      expected: [3, 2, 1],
    },
    {
      input: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
      expected: [9, 8, 7, 6, 5, 4, 3, 2, 1, 0],
    },
    {
      input: [4, 5, 1, 2, 3, 0],
      expected: [0, 3, 2, 1, 5, 4],
    }
  ]
  cases.forEach(function({ input, expected }) {
    const desc = [
      'stack([',
      input.join(', '),
      ']) === [',
      expected.join(', '),
      ']',
    ].join('')
    assert.deepEqual(stack(input), expected, desc)
  })
})

QUnit.test('cut(deck, cards)', function(assert) {
  const cases = [
    {
      deck: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
      cards: 3,
      expected: [3, 4, 5, 6, 7, 8, 9, 0, 1, 2],
    },
    {
      deck: [2, 4, 6, 8],
      cards: 2,
      expected: [6, 8, 2, 4],
    },
    {
      deck: [1, 2, 3, 4, 5, 6, 7],
      cards: 5,
      expected: [6, 7, 1, 2, 3, 4, 5],
    },
    {
      deck: [4, 2, 8, 6],
      cards: 2,
      expected: [8, 6, 4, 2],
    },
    {
      deck: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
      cards: -4,
      expected: [6, 7, 8, 9, 0, 1, 2, 3, 4, 5],
    }
  ]
  cases.forEach(function({ deck, cards, expected }) {
    const desc = [
      'cut([',
      deck.join(', '),
      '], ',
      cards,
      ') === [',
      expected.join(', '),
      ']'
    ].join('')
    assert.deepEqual(cut(deck, cards), expected, desc)
  })
})

QUnit.test('deal(deck, increment)', function(assert) {
  const cases = [
    {
      deck: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
      increment: 3,
      expected: [0, 7, 4, 1, 8, 5, 2, 9, 6, 3],
    },
    {
      deck: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
      increment: 7,
      expected: [0, 3, 6, 9, 2, 5, 8, 1, 4, 7],
    }
  ]
  cases.forEach(function({ deck, increment, expected }) {
    const desc = [
      'deal([',
      deck.join(', '),
      '], ',
      increment,
      ') === [',
      expected.join(', '),
      ']'
    ].join('')
    assert.deepEqual(deal(deck, increment), expected, desc)
  })
})

QUnit.test('shuffle(instructions, decksize)', function(assert) {
  const cases = [
    {
      instructions: [
        'deal with increment 7',
        'deal into new stack',
        'deal into new stack',
      ],
      expected: [0, 3, 6, 9, 2, 5, 8, 1, 4, 7],
      desc: 'first example from puzzle description',
    },
    {
      instructions: [
        'cut 6',
        'deal with increment 7',
        'deal into new stack',
      ],
      expected: [3, 0, 7, 4, 1, 8, 5, 2, 9, 6],
      desc: 'second example from puzzle description',
    },
    {
      instructions: [
        'deal with increment 7',
        'deal with increment 9',
        'cut -2',
      ],
      expected: [6, 3, 0, 7, 4, 1, 8, 5, 2, 9],
      desc: 'third example from puzzle description',
    },
    {
      instructions: [
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
      ],
      expected: [9, 2, 5, 8, 1, 4, 7, 0, 3, 6],
      desc: 'fourth example from puzzle description',
    }
  ]
  cases.forEach(function({ instructions, expected, desc }) {
    assert.deepEqual(shuffle(instructions, 10), expected, desc)
  })
})

QUnit.test('Solutions', async function(assert) {
  const instructions = await fetch_puzzle_input_lines()
  const shuffled = shuffle(instructions, 10007)
  assert.equal(
    shuffled.indexOf(2019),
    5472,
    'Part 1: position of card 2019 after one shuffle === 5472',
  )
})
