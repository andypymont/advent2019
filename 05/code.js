function op({ ip, memory, input, output }) {
  const opcode = memory[ip] % 100
  const argmodes = ((memory[ip] - opcode)/100).toString().padStart(2, "0")

  const arg1 = (argmodes[1] === '0') ? memory[ip+1] : ip+1
  const arg2 = (argmodes[0] === '0') ? memory[ip+2] : ip+2
  const arg3 = ip+3

  if ( opcode === 1 ) { // ADD
    memory = memory.map(function(val, ix) {
      return ( ix === memory[arg3] ) ? memory[arg1] + memory[arg2] : val
    })
    ip += 4
  } else if ( opcode === 2 ) { // MULTIPLY
    memory = memory.map(function(val, ix) {
      return ( ix === memory[arg3] ) ? memory[arg1] * memory[arg2] : val
    })
    ip += 4
  } else if ( opcode === 3 ) { // INPUT
    memory = memory.map(function(val, ix) {
      return ( ix === arg1 ) ? input[0] : val
    })
    input = input.slice(1)
    ip += 2
  } else if ( opcode === 4 ) { // OUTPUT
    output = output.concat(memory[arg1])
    ip += 2
  } else if ( opcode === 5 ) { // JUMP-IF-TRUE
    if ( memory[arg1] !== 0 ) {
      ip = memory[arg2]
    } else {
      ip += 3
    }
  } else if ( opcode === 6 ) { // JUMP-IF-FALSE
    if ( memory[arg1] === 0 ) {
      ip = memory[arg2]
    } else {
      ip += 3
    }
  } else if ( opcode === 7 ) { // LESS THAN
    const rv = memory[arg1] < memory[arg2] ? 1 : 0
    memory = memory.map(function(val, ix) {
      return ( ix === memory[arg3] ) ? rv : val
    })
    ip += 4
  } else if ( opcode === 8 ) { // EQUALS
    const rv = memory[arg1] === memory[arg2] ? 1 : 0
    memory = memory.map(function(val, ix) {
      return ( ix === memory[arg3] ) ? rv : val
    })
    ip += 4
  }

  return { ip, memory, input, output }
}

function read_program(programtext) {
  return programtext.split(',').map(i => parseInt(i))
}

function run_program(initial_memory, inputs) {
  let program = {
    memory: initial_memory,
    input: inputs||[],
    ip: 0,
    output :[]
  }

  while ( program.memory[program.ip] !== 99 ) {
    program = op(program)
  }

  return program
}
