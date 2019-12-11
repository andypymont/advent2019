QUnit.test('create_robot()', function(assert) {
  const expected = {
    position: [0, 0],
    facing: 'up',
    painted: new Map(),
  }
  assert.deepEqual(create_robot(),
                   expected)
})

QUnit.test('colour_beneath_robot(robot)', function(assert) {
  const cases = [
    {
      input: {
        position: [0, 0],
        facing: 'up',
        painted: new Map([['1,1', 1]]),
      },
      expected: 0,
      desc: 'robot in unpainted location: return 0 [black]'
    },
    {
      input: {
        position: [0, 0],
        facing: 'up',
        painted: new Map([['0,0', 1]]),
      },
      expected: 1,
      desc: 'robot in painted location: return paint colour'
    }
  ]
  cases.forEach(function({ input, expected, desc }) {
    assert.equal(colour_beneath_robot(input),
                 expected,
                 desc)
  })
})

QUnit.test('spray_paint(robot)', function(assert) {
  const cases = [
    {
      input_robot: {
        position: [3, 4],
        facing: 'left',
        painted: new Map([['0,0', 0], ['1,2', 1]])
      },
      input_colour: 1,
      expected: {
        position: [3, 4],
        facing: 'left',
        painted: new Map([['0,0', 0], ['1,2', 1], ['3,4', 1]])
      },
      desc: 'paint unpainted location: adds to map'
    },
    {
      input_robot: {
        position: [1, 2],
        facing: 'right',
        painted: new Map([['0,0', 0], ['1,2', 1]])
      },
      input_colour: 0,
      expected: {
        position: [1, 2],
        facing: 'right',
        painted: new Map([['0,0', 0], ['1,2', 0]]),
      },
      desc: 'paint painted location: amends map'
    }
  ]
  cases.forEach(function({ input_robot, input_colour, expected, desc }) {
    assert.deepEqual(spray_paint(input_robot, input_colour),
                     expected,
                     desc)
  })
})

QUnit.test('turn_and_advance(robot, turn)', function(assert) {
  const cases = [
    [[1, 2], 'up', 'left', [0, 2], 'left'],
    [[3, 3], 'left', 'left', [3, 2], 'down'],
    [[7, -2], 'right', 'left', [7, -1], 'up'],
    [[-1, -1], 'up', 'right', [0, -1], 'right'],
  ]
  cases.forEach(function([in_pos, in_face, turn, out_pos, out_face]) {
    const input = {
      position: in_pos,
      facing: in_face,
      painted: new Map(),
    }
    const expected = {
      position: out_pos,
      facing: out_face,
      painted: new Map(),
    }
    const desc = [
      'turn ',
      turn,
      ' from [',
      in_pos.join(','),
      '] when facing ',
      in_face
    ].join('')
    assert.deepEqual(turn_and_advance(input, turn), expected, desc)
  })
})

QUnit.test('painted(program)', function(assert) {
  const test_program = read_program(
    '104,1,104,0,104,0,104,0,104,1,104,0,104,1,104,0,104,0,104,1,104,1,104,' +
    '0,104,1,104,0,99'
  )
  const expected = new Map([
    ['0,0', 0],
    ['-1,0', 0],
    ['-1,-1', 1],
    ['0,-1', 1],
    ['1,0', 1],
    ['1,1', 1],
  ])
  assert.deepEqual(painted(test_program),
                   expected)
})

QUnit.test('painted(program, true) - start on white', function(assert) {
  const test_program = read_program(
    '3,19,104,1,104,0,104,0,104,0,104,1,104,0,104,1,104,0,104,0,104,1,104,' +
    '1,104,0,104,1,104,0,99'
  )
  const expected = new Map([
    ['0,0', 1],
    ['-1,0', 0],
    ['-1,-1', 1],
    ['0,-1', 1],
    ['1,0', 1],
    ['1,1', 1],
  ])
  assert.deepEqual(painted(test_program, true),
                   expected)
})

QUnit.test('render_paint_map()', function(assert) {
  const cases = [
    {
      input: new Map([
        ['0,0', 0],
        ['-1,0', 0],
        ['-1,-1', 1],
        ['0,-1', 1],
        ['1,0', 1],
        ['1,1', 1],
      ]),
      expected: [
        '  #',
        '  #',
        '## ',
      ].join('\n')
    }
  ]
  cases.forEach(function({ input, expected }) {
    assert.equal(render_paint_map(input), expected)
  })
})


QUnit.test('Solutions', async function(assert) {
  const program = await fetch_puzzle_input().then(read_program)

  assert.equal(painted(program).size,
               1932,
               'Part 1: start on black, 1932 painted locations')
  const word = [
    ' ####  ##  #  # #  #  ##    ## #### ###    ',
    ' #    #  # #  # # #  #  #    # #    #  #   ',
    ' ###  #    #### ##   #       # ###  #  #   ',
    ' #    # ## #  # # #  # ##    # #    ###    ',
    ' #    #  # #  # # #  #  # #  # #    # #    ',
    ' ####  ### #  # #  #  ###  ##  #### #  #   ',
  ].join('\n')
  assert.equal(render_paint_map(painted(program, true)),
               word,
               'Part 2: start on white, spells EGHKGJER')
})
