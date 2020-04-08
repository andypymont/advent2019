function tractor_beam(program) {
  const cache = new Map()
  function check_tractor_beam(x, y) {
    const coords = x + ',' + y
    const cached = cache.get(coords)
    if (cached) {
      return cached
    } else {
      const calculated = run_program(program, [x, y]).output[0]
      cache.set(coords, calculated)
      return calculated
    }
  }
  return check_tractor_beam
}

function area_covered(tractor, size) {
  let covered = 0
  for ( y = 0; y < size; y++  ) {
    for ( x = 0; x < size; x++ ) {
      covered += tractor(x, y)
    }
  }
  return covered
}

function locate_square(tractor, size) {
  let edgelength = (size - 1)
  let searchy = edgelength
  let leftedge = 0
  while ( true ) {
    while ( tractor(leftedge, searchy) === 0 ) {
      leftedge++
    }
    const bottomleft = tractor(leftedge, searchy)
    const topright = tractor(leftedge+edgelength, searchy-edgelength)
    if ( bottomleft === 1 && topright === 1 ) {
      const x = leftedge
      const y = searchy - edgelength
      const solution = (x*10000) + y
      return { x, y, solution }
    }
    searchy++
  }
}
