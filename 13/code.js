function update_game({ score, screen }, update) {
  const [x, y, obj] = update
  if ( x === -1 && y === 0 ) {
    score = obj
  } else {
    screen.set([x, y].join(','), obj)
  }
  return { score, screen }
}

function run_with_input(program, ball, paddle) {
  program.input = [Math.sign(ball-paddle)]
  return run_program(program, [], true)
}

function run_game(program, quarters=1) {
  program.memory[0] = quarters

  let game = {
    score: 'none reported',
    screen: new Map(),
  }
  const output_queue = []

  while ( program.status !== 'finished' ) {
    const paddle = horizontal_position(game, 3)
    const ball = horizontal_position(game, 4)

    program = run_with_input(program, ball, paddle)
    while ( program.output.length > 0 ) {
      output_queue.push(program.output.shift())
    }
    while ( output_queue.length >= 3 ) {
      game = update_game(game,
                         [output_queue.shift(),
                          output_queue.shift(),
                          output_queue.shift()])
    }
  }

  return game
}

function horizontal_position({ score, screen }, obj) {
  const x_coord = ([c, o]) => c.split(',').map(n => parseInt(n))[0]
  const search = Array.from(screen.entries())
                      .filter(([c, o]) => o === obj)
                      .map(x_coord)
  return search.shift()||-1
}

function count_blocks(game) {
  return Array.from(game.screen.values())
              .filter(x => x === 2)
              .length
}
