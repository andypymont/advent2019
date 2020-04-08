function check_tractor_beam(program, x, y) {
  return run_program(program, [x, y]).output[0]
}

function area_covered(program, size) {
  const dimension = new Array(size).fill(0)
  return dimension.flatMap(function(dx, x) {
    return dimension.map(function(dy, y) {
      return check_tractor_beam(program, x, y)
    })
  }).reduce((a, b) => a + b)
}
