function outputter(outputs) {
  return run_program(
    read_program(outputs.map(output => '104,' + output)
                        .join(',') + ',99'),
    [],
    true
  )
}

QUnit.test('count_blocks(run_game(program))', function(assert) {
  const cases = [
    {
      program_outputs: [
        1, 2, 3, 4, 5, 6,
      ],
      expected: 0,
    },
    {
      program_outputs: [
        1, 1, 1, 2, 1, 1, 3, 1, 1, 4, 1, 1, 5, 1, 1, 6, 1, 1, 7, 1, 1,
        1, 2, 1, 2, 2, 2, 3, 2, 2, 4, 2, 2, 5, 2, 2, 6, 2, 2, 7, 2, 1,
        1, 3, 1, 2, 3, 0, 3, 3, 2, 4, 3, 2, 5, 3, 2, 6, 3, 2, 7, 3, 1,
        1, 4, 1, 2, 4, 0, 3, 4, 4, 4, 4, 0, 5, 4, 0, 6, 4, 0, 7, 4, 1,
        1, 5, 1, 2, 5, 0, 3, 5, 0, 4, 5, 0, 5, 5, 0, 6, 5, 0, 7, 5, 1,
        1, 6, 1, 2, 6, 0, 3, 6, 0, 4, 6, 3, 5, 6, 0, 6, 6, 0, 7, 6, 1,
        1, 7, 1, 2, 7, 1, 3, 7, 1, 4, 7, 1, 5, 7, 1, 6, 7, 1, 7, 7, 1,
      ],
      expected: 9,
    },
    {
      program_outputs: [
        1, 1, 1, 2, 1, 1, 3, 1, 1, 4, 1, 1, 5, 1, 1, 6, 1, 1, 7, 1, 1,
        1, 2, 1, 2, 2, 2, 3, 2, 2, 4, 2, 2, 5, 2, 2, 6, 2, 2, 7, 2, 1,
        1, 3, 1, 2, 3, 0, 3, 3, 2, 4, 3, 2, 5, 3, 2, 6, 3, 2, 7, 3, 1,
        1, 4, 1, 2, 4, 0, 3, 4, 4, 4, 4, 0, 5, 4, 2, 6, 4, 2, 7, 4, 1,
        1, 5, 1, 2, 5, 0, 3, 5, 0, 4, 5, 0, 5, 5, 0, 6, 5, 2, 7, 5, 1,
        1, 6, 1, 2, 6, 0, 3, 6, 0, 4, 6, 3, 5, 6, 0, 6, 6, 0, 7, 6, 1,
        1, 7, 1, 2, 7, 1, 3, 7, 1, 4, 7, 1, 5, 7, 1, 6, 7, 1, 7, 7, 1,
      ],
      expected: 12,
    },
  ]
  cases.forEach(function({ program_outputs, expected }) {
    const program = outputter(program_outputs)
    assert.equal(count_blocks(run_game(program)), expected)
  })
})

QUnit.test('update_game(game, update)', function(assert) {
  const cases = [
    {
      game: {
        score: 0,
        screen: new Map([
          ['1,1', 2],
          ['1,2', 1],
          ['2,1', 0],
          ['2,2', 0],
        ]),
      },
      update: [1, 1, 0],
      expected: {
        score: 0,
        screen: new Map([
          ['1,1', 0],
          ['1,2', 1],
          ['2,1', 0],
          ['2,2', 0],
        ])
      },
      desc: 'update part of screen #1',
    },
    {
      game: {
        score: 12,
        screen: new Map([
          ['1,1', 0],
          ['2,1', 1],
          ['3,1', 1],
          ['1,2', 0],
          ['2,2', 0],
          ['3,2', 4],
          ['1,3', 0],
          ['2,3', 0],
          ['3,3', 1]
        ]),
      },
      update: [1, 3, 2],
      expected: {
        score: 12,
        screen: new Map([
          ['1,1', 0],
          ['2,1', 1],
          ['3,1', 1],
          ['1,2', 0],
          ['2,2', 0],
          ['3,2', 4],
          ['1,3', 2],
          ['2,3', 0],
          ['3,3', 1 ]
        ])
      },
      desc: 'update part of screen #2',
    },
    {
      game: {
        score: 5,
        screen: new Map([
          ['1,1', 0],
          ['2,1', 0],
          ['3,1', 0],
          ['1,2', 1],
          ['2,2', 0],
          ['2,3', 3],
          ['3,1', 1],
          ['3,2', 2],
          ['3,3', 4],
        ])
      },
      update: [-1, 0, 1444],
      expected: {
        score: 1444,
        screen: new Map([
          ['1,1', 0],
          ['2,1', 0],
          ['3,1', 0],
          ['1,2', 1],
          ['2,2', 0],
          ['2,3', 3],
          ['3,1', 1],
          ['3,2', 2],
          ['3,3', 4],
        ])
      },
      desc: 'update score'
    }
  ]
  cases.forEach(function({ game, update, expected, desc }) {
    assert.deepEqual(
      update_game(game, update),
      expected,
      desc
    )
  })
})

QUnit.test('horizontal_position(game, obj)', function(assert) {
  const examples = [
    {
      score: 200,
      screen: new Map([
        ['1,1', 1], ['2,1', 1], ['3,1', 1], ['4,1', 1], ['5,1', 1],
        ['6,1', 1], ['7,1', 1], ['1,2', 1], ['2,2', 2], ['3,2', 2],
        ['4,2', 2], ['5,2', 2], ['6,2', 2], ['7,2', 1], ['1,3', 1],
        ['2,3', 0], ['3,3', 2], ['4,3', 2], ['5,3', 2], ['6,3', 2],
        ['7,3', 1], ['1,4', 1], ['2,4', 0], ['3,4', 4], ['4,4', 0],
        ['5,4', 2], ['6,4', 2], ['7,4', 1], ['1,5', 1], ['2,5', 0],
        ['3,5', 0], ['4,5', 0], ['5,5', 0], ['6,5', 0], ['7,5', 1],
        ['1,6', 1], ['2,6', 0], ['3,6', 0], ['4,6', 3], ['5,6', 0],
        ['6,6', 0], ['7,6', 1], ['1,7', 1], ['2,7', 1], ['3,7', 1],
        ['4,7', 1], ['5,7', 1], ['6,7', 1], ['7,7', 1]
      ])
    }
  ]
  const cases = [
    {
      ex: 0,
      obj: 4,
      expected: 3,
      desc: 'position of ball in ex 0 === 3'
    },
    {
      ex: 0,
      obj: 3,
      expected: 4,
      desc: 'position of paddle in ex 0 === 4'
    }
  ]
  cases.forEach(function({ ex, obj, expected, desc }) {
    assert.equal(
      horizontal_position(examples[ex], obj),
      expected,
      desc
    )
  })
})

QUnit.test('Solutions', async function(assert) {
  const program = await fetch_puzzle_input().then(read_program)
  assert.equal(
    count_blocks(run_game(program)),
    318,
    'Part 1: 318 blocks on screen'
  )
  assert.equal(
    run_game(program, 2).score,
    16309,
    'Part 2: Score at end of game is 16309'
  )
})
