function patched_program({ ip, rb, memory, input, output, status }, n, v) {
  return {
    ip,
    rb,
    memory: memory.map((curr, ix) => ix === 1 ? n : ix === 2 ? v : curr),
    input,
    output,
    status,
  }
}

function run_intcode(program, noun, verb) {
  return run_program(patched_program(program, noun, verb)).memory[0]
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
