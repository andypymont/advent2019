function op({ ip, memory, input, output }) {
  const opcode = memory[ip] % 100
  const argmodes = ((memory[ip] - opcode)/100).toString().padStart(2, "0")

  const arg1 = (argmodes[1] === '0') ? memory[ip+1] : ip+1
  const arg2 = (argmodes[0] === '0') ? memory[ip+2] : ip+2
  const arg3 = ip+3

  if ( opcode === 1 ) {
    memory = memory.map(function(val, ix) {
      return ( ix === memory[arg3] ) ? memory[arg1] + memory[arg2] : val
    })
    ip += 4
  } else if ( opcode === 2 ) {
    memory = memory.map(function(val, ix) {
      return ( ix === memory[arg3] ) ? memory[arg1] * memory[arg2] : val
    })
    ip += 4
  } else if ( opcode === 3 ) {
    memory = memory.map(function(val, ix) {
      return ( ix === arg1 ) ? input[0] : val
    })
    input = input.slice(1)
    ip += 2
  } else if ( opcode === 4 ) {
    output = output.concat(memory[arg1])
    ip += 2
  }

  return { ip, memory, input, output }
}

function run_program(programtext, inputs) {
  let program = {
    memory: programtext.split(',').map(i => parseInt(i)),
    input: inputs == undefined ? [] : inputs.split(',').map(i => parseInt(i)),
    ip: 0,
    output: [],
  }

  while ( program.memory[program.ip] !== 99 ) {
    program = op(program)
  }
  return program
}
