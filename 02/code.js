function op(opcode, in1, in2, out) {
  const operate = (x, y) => (opcode == 1) ? x+y : x*y
  return function (current, ix, memory) {
    return ix == out ? operate(memory[in1], memory[in2]) : current
  }
}

function run_program(memory) {
  let ip = 0
  while ( memory[ip] != 99 ) {
    memory = memory.map(op(...memory.slice(ip, ip+4)))
    ip += 4
  }
  return memory
}

function read_program(input) {
  return input.trim()
              .split(',')
              .map(x => parseInt(x))
}

function run_intcode(program, noun, verb) {
  const patches = {1: noun, 2: verb}
  const memory = program.map((cur, ix) => ix in patches ? patches[ix] : cur)
  return run_program(memory)[0]
}

function find_verb_and_noun(program, f = run_intcode) {
  for ( let noun = 0; noun < 250; noun++ ) {
    for ( let verb = 0; verb < 250; verb++ ) {
      if ( f(program, noun, verb) == 19690720 ) {
        return { noun, verb }
      }
    }
  }
}
