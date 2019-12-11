function create_robot() {
  const position = [0, 0]
  const facing = 'up'
  const painted = new Map()
  return { position, facing, painted }
}

function colour_beneath_robot(robot) {
  return robot.painted.get(robot.position.join(','))||0
}

function spray_paint(robot, colour) {
  robot.painted.set(robot.position.join(','), colour)
  return robot
}

const turns = {
  'left': {
    'up': 'left',
    'left': 'down',
    'down': 'right',
    'right': 'up',
  },
  'right': {
    'up': 'right',
    'right': 'down',
    'down': 'left',
    'left': 'up',
  }
}

const vectors = {
  'left': [-1, 0],
  'up': [0, 1],
  'right': [1, 0],
  'down': [0, -1],
}

function turn_and_advance({ position, facing, painted }, turn) {
  facing = turns[turn][facing]
  const [x, y] = vectors[facing]
  position = [position[0] + x,
              position[1] + y]
  return { position, facing, painted }
}

function painted(program, start_on_white) {
  let robot = start_on_white ? spray_paint(create_robot(), 1) :
                               create_robot()
  let outputs = 0
  while ( program.status !== 'finished' ) {
    program.input = []
    program = run_program(
      program,
      [robot.painted.get(robot.position.join(','))||0],
      true
    )
    if ( program.status !== 'finished' ) {
      outputs++
      if ( outputs % 2 === 1 ) { // odd input - paint colour
        robot = spray_paint(robot, program.output.shift())
      } else { // even input - turn direction
        const turn = program.output.shift() === 0 ? 'left' : 'right'
        robot = turn_and_advance(robot, turn)
      }
    }
  }
  return robot.painted
}

function render_paint_map(paint) {
  const coords = Array.from(paint.keys())
                      .map(txt => txt.split(',').map(x => parseInt(x)))
  const x_coords = coords.map(c => c[0])
  const y_coords = coords.map(c => c[1])
  const x_min = x_coords.reduce((a, b) => Math.min(a, b))
  const x_max = x_coords.reduce((a, b) => Math.max(a, b))
  const y_min = y_coords.reduce((a, b) => Math.min(a, b))
  const y_max = y_coords.reduce((a, b) => Math.max(a, b))

  function row(y) {
    return Array(x_max-x_min+1).fill()
                               .map(function(_, x_offset) {
                                 const x = x_min + x_offset
                                 const key = [x, y].join(',')
                                 const colour = paint.get(key)|0
                                 return colour === 1 ? '#' : ' '
                               })
                               .join('')
  }

  return Array(y_max-y_min+1).fill()
                             .map((_, y_offset) => row(y_min + y_offset))
                             .reverse()
                             .join('\n')
}
