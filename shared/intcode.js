function read_argmodes(memory, ip, rb) {
  const opcode = memory[ip] % 100
  const argmodes = ((memory[ip] - opcode)/100).toString()
                                              .padStart(3, "0")
                                              .split('')
                                              .reverse()

  function f(arg) {
    if ( argmodes[arg-1] === '0' ) {
      return memory[ip+arg]
    } else if ( argmodes[arg-1] === '2' ) {
      return rb + memory[ip+arg]
    } else {
      return ip+arg
    }
  }

  return f
}

function new_memory(memory, pos, val) {
  return memory.concat(Array(Math.max(pos - memory.length + 1, 0)).fill(0))
               .map((curr, ix) => ix === pos ? val : curr)
}

function op({ ip, rb, memory, input, output, status }, pause_on_output=false) {
  const opcode = memory[ip] % 100

  const arg = read_argmodes(memory, ip, rb)
  const read = a => memory[arg(a)]||0

  if ( opcode === 1 ) { // ADD
    memory = new_memory(memory, arg(3), read(1) + read(2))
    ip += 4
  } else if ( opcode === 2 ) { // MULTIPLY
    memory = new_memory(memory, arg(3), read(1) * read(2))
    ip += 4
  } else if ( opcode === 3 ) { // INPUT
    const first = (input.length === 0) ? -1 : input[0]
    memory = new_memory(memory, arg(1), first)
    input = input.slice(1)
    ip += 2
  } else if ( opcode === 4 ) { // OUTPUT
    output = output.concat(read(1))
    if ( pause_on_output ) {
      status = 'paused'
    }
    ip += 2
  } else if ( opcode === 5 ) { // JUMP-IF-TRUE
    if ( read(1) !== 0 ) {
      ip = read(2)
    } else {
      ip += 3
    }
  } else if ( opcode === 6 ) { // JUMP-IF-FALSE
    if ( read(1) === 0 ) {
      ip = read(2)
    } else {
      ip += 3
    }
  } else if ( opcode === 7 ) { // LESS THAN
    const rv = read(1) < read(2) ? 1 : 0
    memory = new_memory(memory, arg(3), rv)
    ip += 4
  } else if ( opcode === 8 ) { // EQUALS
    const rv = read(1) === read(2) ? 1 : 0
    memory = new_memory(memory, arg(3), rv)
    ip += 4
  } else if ( opcode === 9 ) { // ADJUST RELATIVE BASE
    rb += read(1)
    ip += 2
  } else if ( opcode === 99 ) {
    status = 'finished'
  }

  return { ip, rb, memory, input, output, status }
}

function read_program(programtext) {
  return {
    ip: 0,
    rb: 0,
    memory: programtext.split(',').map(i => parseInt(i)),
    input: [],
    output: [],
    status: 'ready',
  }
}

function run_program(program, inputs, pause_on_output=false) {
  // ready program to continue and add new inputs
  program = {
    ip: program.ip,
    rb: program.rb,
    memory: program.memory,
    input: program.input.concat(inputs||[]),
    output: program.output,
    status: 'ready',
  }

  // run program until paused/finished
  while ( program.status !== 'finished' && program.status !== 'paused' ) {
    program = op(program, pause_on_output)
  }

  return program
}
