function ascii_program(programtext) {
  program = read_program(programtext)
  return run_program(program).output.map(x => String.fromCharCode(x))
                                   .join('')
}

function find_intersections(map) {
  const results = []
  map.split('\n').forEach(function(line, y, lines) {
    line.split('').forEach(function(char, x) {
      if ( x > 0 && y > 0 && x < (line.length-1) && y < (lines.length-1) ) {
        if ( char === '#' && line[x-1] === '#' && line[x+1] === '#' &&
             lines[y-1][x] === '#' && lines[y+1][x] === '#' ) {
          results.push([x, y])
        }
      }
    })
  })
  return results
}

function alignment_parameter([x, y]) {
  return x*y
}
