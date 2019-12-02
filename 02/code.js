function op(opcode, in1, in2, out) {
  const operate = (x, y) => (opcode == 1) ? x+y : x*y
  return function (current, ix, program) {
    return ix == out ? operate(program[in1], program[in2]) : current
  }
}

function run_program(program) {
  let ix = 0
  while ( program[ix] != 99 ) {
    program = program.map(op(...program.slice(ix, ix+4)))
    ix += 4
  }
  return program
}

function read_and_patch_program(input) {
  function patch(cur, ix) {
    if (ix == 1) {
      return 12
    } else if (ix == 2) {
      return 2
    } else {
      return cur
    }
  }
  return input.trim()
              .split(',')
              .map(x => parseInt(x))
              .map(patch)
}
